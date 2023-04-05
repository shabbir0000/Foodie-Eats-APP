import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import { Resimg, Restext } from '../Components/Resturentitems'
import Categories from '../Components/Categories'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Searchbar from './Searchbar'
import LottieView from 'lottie-react-native'

const Recipes = ({ navigation }) => {
    const [click, setclick] = useState([])
    const [search, setsearch] = useState("beef")
    const [loading, setloading] = useState(true)
    // {drinks:[{
    //
    // }]}
    // aise ho api to double then lagay ga jaise neche laga ha or map
    // ma hamesha () lagana ha agr kuch screen par show karwana ha 
    // ha to warna {} lagana ha 
    let abrot = new AbortController();
    const getyelpresdata = async () => {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=` + search;


        await fetch(url , {signal:abrot.signal})
            .then((data) => data.json())
            .then((data1) => setclick(data1.meals))

            .catch((error) => {
                if (error.name === "AbortError") {
                    console.log("fetch aborted");
                } else {
                    console.log(error);
                }
            })
          
            
        //console.log(click);

    }

    useEffect(() => {
       
        getyelpresdata();

        setTimeout(() => {
            setloading(false);
        }, 5000)


        return () => {
            abrot.abort();
        }
    }, [click])


    return (
        <>
        { 
            loading ? ( 
            <>
             <LottieView style={tw`self-center mt-24 h-72`}
                    source={require("../Animation/45730-recipes-book-animation.json")}
                    autoPlay
                    loop={true}
                    speed={0.5}
                />
            </>) : (
        <>
            <View>
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
                <Searchbar cityhandler={setsearch} click={true}/>
            </View>
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
                                    onPress={() => navigation.navigate("Recipesdetails", {
                                        mealname: data.strMeal,
                                        Category: data.strCategory,
                                        Area: data.strArea,
                                        instruction: data.strInstructions,
                                        ingridiant1: data.strIngredient1,
                                        ingridiant2: data.strIngredient2,
                                        ingridiant3: data.strIngredient3,
                                        ingridiant4: data.strIngredient4,
                                        ingridiant5: data.strIngredient5,
                                        measure1: data.strMeasure1,
                                        measure2: data.strMeasure2,
                                        measure3: data.strMeasure3,
                                        measure4: data.strMeasure4,
                                        measure5: data.strMeasure5,

                                    })}
                                >
                                    <View
                                        key={key}
                                        style={tw`p-3 mt-3 bg-white`}
                                    >
                                        <Resimg image={data.strMealThumb} />
                                        <Restext name={data.strMeal} rating={data.strCategory} check={false} />
                                    </View>
                                </TouchableOpacity>

                            ))
                        }
                    </View>
                </ScrollView>
            </View>
        </>
            )
            }
            </>
    )
}

export default Recipes