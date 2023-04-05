import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import { Resimg, Restext } from '../Components/Resturentitems'
import Categories from '../Components/Categories'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import LottieView from 'lottie-react-native'

const Cocktail = ({ navigation }) => {
    const [click, setclick] = useState([])
    const [loading, setloading] = useState(true)
    // {drinks:[{
    //
    // }]}
    // aise ho api to double then lagay ga jaise neche laga ha or map
    // ma hamesha () lagana ha agr kuch screen par show karwana ha 
    // ha to warna {} lagana ha 
    const abroat = new AbortController();
    const getyelpresdata = async () => {

        const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=cocktail";


        await fetch(url, { signal: abroat.signal })
            .then((data) => data.json())
            .then((data1) => setclick(data1.drinks))

            .catch((error) => {
                if (error.name === "AbortError") {
                    console.log("fetch aborted");
                } else {
                    console.log(error);
                }

            })

        //   console.log(click);

    }

    useEffect(() => {
        getyelpresdata();

        setTimeout(() => {
            setloading(false);
        }, 5000)



        return () => {
            abroat.abort();
        }
    }, [click])


    return (
        <>
            {
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
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Home")
                            }

                            }
                        >
                            <FontAwesome5
                                name="arrow-left"
                                size={25}
                                style={tw`pt-10 ml-5`}
                            />
                        </TouchableOpacity>

                        <View style={tw`mt-2  pb-32`}>
                            <Categories navigation={navigation} />
                            <ScrollView vertical ShowsVerticalScrollIndicator={false} >

                                <View style={tw`h-full p-1  `}>
                                    {

                                        click.map((data, key) => (

                                            <TouchableOpacity
                                                activeOpacity={1}
                                                style={tw`mb-3`}
                                                key={key}

                                                onPress={() => navigation.navigate("Cocktaildetail", {
                                                    drinkname: data.strDrink,
                                                    Category: data.strCategory,
                                                    type: data.strAlcoholic,
                                                    glass: data.strGlass,
                                                    instruction: data.strInstructions,
                                                    ingridiant1: data.strIngredient1,
                                                    ingridiant2: data.strIngredient2,
                                                    ingridiant3: data.strIngredient3,
                                                    ingridiant4: data.strIngredient4,
                                                    measure1: data.strMeasure1,
                                                    measure2: data.strMeasure2,
                                                    measure3: data.strMeasure3,
                                                    measure4: data.strMeasure4,

                                                })}
                                            >

                                                <View
                                                    key={key}
                                                    style={tw`p-3 mt-3 bg-white`}
                                                >
                                                    <Resimg image={data.strDrinkThumb} />
                                                    <Restext name={data.strDrink} rating={data.strCategory} check={false} />
                                                </View>
                                            </TouchableOpacity>

                                        ))
                                    }
                                </View>
                            </ScrollView>
                        </View>
                    </>
                )}
        </>
    )
}

export default Cocktail