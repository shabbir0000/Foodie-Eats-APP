import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import LottieView from 'lottie-react-native';
import tw from 'twrnc'
import { Lootieview } from './LSFC';

const Cocktaildetails = ({ route }) => {
    const [loading, setloading] = useState(true)
    const {
        
        drinkname,
        Category,
        type,
        glass,
        instruction,
        ingridiant1,
        ingridiant2,
        ingridiant3,
        ingridiant4,
        measure1,
        measure2,
        measure3,
        measure4
    
          } = route.params;

    useEffect(() => {
        setTimeout(() => {
            setloading(false)
        }, 2000)
    }, [])


    return (

        loading ? (
            <>
                <LottieView style={tw`self-center mt-24 h-72`}
                    source={require("../Animation/86401-cocktail-mix.json")}
                    autoPlay
                    loop={true}
                    speed={0.5}
                />
            </>
        ) : (
            <>
                <View  style={tw`flex-1`}>
                    <Lootieview source={require("../Animation/61188-cocktail-5.json")} />
                    <View style={tw`mt-5`}>

                        <Text style={tw`self-center font-bold text-2xl `}>
                            {drinkname}    
                        </Text>
                        <Text style={tw`text-center mt-2  text-base`}>
                            {Category}
                            {"\n"}
                            {type}
                            {"\n"}
                            {glass}
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
                        </Text>

                    </View>
                </View>

            </>
        )

    )
}

export default Cocktaildetails