import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import tw from 'twrnc'
import LottieView from 'lottie-react-native'
import { app } from '../../Firebase'
import { getFirestore, collection, onSnapshot, orderBy, limit, query, where,} from 'firebase/firestore/';
import Restaurentitems from '../RestaurentDetail/Restaurentitems';
import { getAuth, currentUser} from "firebase/auth";
import BottomTabs from './BottomTabs';
import { Divider } from 'react-native-elements';
import { Lootieview } from '../Components/LSFC';

const OrderComplete = ({ navigation }) => {
    const [GetData, setGetData] = useState([]);

    const { items, restaurentName } = useSelector((select) => select.cartReducer.selectedItems);

    const total = items.map((item) => Number(item.price.replace("$", ""))).reduce((pre, cur) => pre + cur, 0);

    const payment = total.toLocaleString("en", {
        style: "currency",
        currency: "USD",
    });

    useEffect(() => {
        const db = getFirestore(app);
        const auth = getAuth();
        const user = auth.currentUser;
        const coll = collection(db, "order1")
        const q = query(coll,where("email", "==",user.email), limit(1));
        const unSubscribe = onSnapshot(q, snapshot => {
            setGetData(snapshot.docs.map(doc => ({
                data: doc.data(),
                id: doc.id,


            })))
        })

        return () => { unSubscribe() }
    }, [])


    return (
        <>
            <SafeAreaView style={tw`pt-10 flex-1`}>
                <LottieView style={tw`self-center mb-7 h-36`}
                    source={require("../Animation/1798-check-animation.json")}
                    autoPlay
                    loop={true}
                    speed={0.5}
                />
                <View >

                    <Text style={tw`font-bold text-lg p-5`}>Your Order At <Text style={tw`text-blue-200`}> {restaurentName}</Text> Has Been Placed For <Text style={tw`text-blue-200`}>{payment} $</Text> </Text>
                </View>
                {

                    GetData.map((dataa) => (

                        <ScrollView key={dataa.id} vertical ShowsVerticalScrollIndicator={false}>
                            <Restaurentitems food={dataa.data.items} id={dataa.id} hidecheckbox={true} />
                            {console.log(dataa.data.items)}
                            {console.log(dataa.id)}
                           <Lootieview  source={require("../Animation/75783-prepare-food.json")}/>
                        </ScrollView>


                    ),

                    )

                }

                {/* <Restaurentitems food={GetData.data} hidecheckbox={true} /> */}

            </SafeAreaView>
            <Divider width={1} />
            <BottomTabs navigation={navigation} />


        </>
    )
}

export default OrderComplete