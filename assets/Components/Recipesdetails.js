import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import LottieView from 'lottie-react-native';
import tw from 'twrnc'
import { Lootieview } from './LSFC';

const Recipesdetails = ({ route }) => {
    const [loading, setloading] = useState(true)
    const {

        mealname,
        Category,
        Area,
        instruction,
        ingridiant1,
        ingridiant2,
        ingridiant3,
        ingridiant4,
        ingridiant5,
        measure1,
        measure2,
        measure3,
        measure4,
        measure5

    } = route.params;

    useEffect(() => {
        setTimeout(() => {
            setloading(false)
        }, 5000)
    }, [])


    return (

        loading ? (
            <>
            <View >
                <LottieView style={tw`self-center mt-24 h-72`}
                    source={require("../Animation/45730-recipes-book-animation.json")}
                    autoPlay
                    loop={true}
                    speed={0.5}
                />
                </View>
            </>
        ) : (
            <>
                <View style={tw`flex-1  mb-72`}>
                    <View style={tw`mt-10`}>
                    <Lootieview source={require("../Animation/45726-recipes-animation.json")} />
                    </View>


                   


                        <View >
                        <ScrollView vertical ShowsVerticalScrollIndicator={false} >
                            <Text style={tw`self-center font-bold text-2xl `}>
                                {mealname}
                            </Text>
                            <Text style={tw`text-center mt-2  text-base`}>
                                {Category}
                                {"\n"}
                                {Area}
                               
                            </Text>

                            <Text style={tw`self-center mt-5 font-bold text-lg `}>
                                INSTRUCTION
                            </Text>
                            <Text style={tw`self-center pl-8 pr-8  mt-2  text-base`}>
                                {instruction}
                            </Text>


                            <Text style={tw`self-center mt-5 font-bold text-lg `}>
                                INGRIDIANTS
                            </Text>
                            <Text style={tw`text-center mt-2  text-base `}>
                                {ingridiant1} : {measure1}
                                {"\n"}
                                {ingridiant2} : {measure2}
                                {"\n"}
                                {ingridiant3} : {measure3}
                                {"\n"}
                                {ingridiant4} : {measure4}
                                {"\n"}
                                {ingridiant5} : {measure5}
                            </Text>

                       
                    </ScrollView>
                    </View>
                </View>

            </>
        )

    )
}

export default Recipesdetails