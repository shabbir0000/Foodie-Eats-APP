import { View, Text, TouchableOpacity, Modal ,ScrollView } from 'react-native'
import React, { useState ,useEffect } from 'react'
import tw from 'twrnc'
import { useSelector } from 'react-redux'
import Modalfile from './Modalfile'
import { app } from '../../Firebase'
import { getFirestore, collection,updateDoc, doc ,query, onSnapshot, orderBy, limit,where } from 'firebase/firestore/';
import { getAuth } from "firebase/auth";

const ViewCart = ({navigation }) => {
    const [GetData, setGetData] = useState([]);
    const [Getid, setid] = useState("");
    const [ModelVisible, setModelVisible] = useState(false);

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
        const q = query(coll, where("email", "==",user.email), limit(1));
        const unSubscribe = onSnapshot(q, snapshot => {
            setGetData(snapshot.docs.map(doc => ({
                data: doc.data(),
                id: doc.id,


            })))
        })

        return () => { unSubscribe() }
    }, [])

    const adddata = () => {
       
    {
       

        GetData.map((dataa) =>{
            const db = getFirestore(app);
            
            const coll = doc(db, "order1" , dataa.id );
            // "84xdXBevHHGxqVoXhNfV"
        // addDoc(coll, {
               
        //     items: items,
        //     restaurentName: restaurentName,
        //     createdAt: serverTimestamp(),

        // });
      //  const loginwithemailandpass = async () => {
            
            
               updateDoc(coll, {
                restaurentName:restaurentName,
                items:items,
              })
            
                setModelVisible(false);
                navigation.navigate("OrderComplete");

                
              }
             
        )}} 
            
         // }
       
   // };

    // console.log(payment);

    const ModelContent = () => {
        return (
            <View
                style={tw`flex-1 justify-end bg-transparent`}
            >
                <View
                    style={tw`bg-white p-2 h-450px border0  `}
                >

                    <Text
                        style={tw`text-center font-semibold mb-3 text-lg`}
                    >
                        {restaurentName}
                    </Text>

                    {
                        items.map((item, index) => (
                            <Modalfile key={index} item={item} />
                        ))
                    }

                    <View style={tw`flex-row justify-between mt-4`}>
                        <Text style={tw`text-left font-semibold mb-3 text-lg`}>Sub-Total</Text>
                        <Text>{payment}$</Text>
                    </View>

                    <View style={tw`flex-row justify-center  `}>
                        <TouchableOpacity
                            style={tw`rounded-3xl bg-black w-72 relative p-3`}
                            onPress={() => {
                                adddata();
                           //   loginwithemailandpass();
                            }}
                        >
                            <Text
                                style={tw`text-center text-white font-semibold text-lg `}
                            >CHECK-OUT   {payment}$ </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        );
    };



    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={ModelVisible}
                onRequestClose={() => setModelVisible(false)}
            >
                {ModelContent()}
            </Modal>
            {total ? (
                <View
                    style={tw`flex-1 items-center flex-row absolute bottom-24 z-999`}
                >
                    <View
                        style={tw`flex-row justify-center w-full`}
                    >
                        <TouchableOpacity
                            style={tw`items-center mt-6 bg-transparent p-3 rounded-3xl w-72 relative border-t-black border`}
                            onPress={() => setModelVisible(true)}
                        >
                            <Text
                                style={tw`text-black text-lg`}
                            >ViewCart      {payment}$</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            ) : (
                <></>
            )
            }
        </>
    );
};

export default ViewCart