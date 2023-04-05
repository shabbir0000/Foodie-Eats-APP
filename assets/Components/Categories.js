import { ScrollView, } from 'react-native'
import React from 'react'
import { CatogoryButton ,Lootieview} from './LSFC';



const item = [
    {
        image: require("../images/soft-drink.png"),
        text: "Cocktails",

    },
    {
        image: require("../images/fast-food.png"),
        text: "Recipes",

    },
    {
        image: require("../images/deals.png"),
        text: "Deals",

    },
    {
        image: require("../images/shopping-bag.png"),
        text: "H-Food",

    },

]




const Categories = ({ navigation }) => {





    return (


        <>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>


                <CatogoryButton
                    onPress={() => {
                       
                            navigation.navigate("Cocktail");
                       
                      

                    }}
                    source={item[0].image}
                    text={item[0].text}

                />

                <CatogoryButton
                    onPress={() => {
                        navigation.navigate("Recipes");

                    }}
                    source={item[1].image}
                    text={item[1].text}

                />

                <CatogoryButton
                   onPress={() => {
                       
                    navigation.navigate("Grocery");
               
              

            }}
                    source={item[3].image}
                    text={item[3].text}

                />


            </ScrollView>
        </>




    )
}

export default Categories