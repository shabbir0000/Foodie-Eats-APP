import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import tw from 'twrnc'
import Materialcommunityicons from 'react-native-vector-icons/MaterialCommunityIcons'

export const localresturent = [
    {
        name: "zaika king",
        image_url: "https://propakistani.pk/wp-content/uploads/2022/05/expensive-restaurants.jpg",
        rating: "4.5"


    },
    {
        name: "zaika king",
        image_url: "https://propakistani.pk/wp-content/uploads/2022/05/expensive-restaurants.jpg",
        rating: "4.5"


    },
    {
        name: "zaika king",
        image_url: "https://propakistani.pk/wp-content/uploads/2022/05/expensive-restaurants.jpg",
        rating: "4.5"


    },
];



const Resturentitems = ({ navigation, ...props }) => {


    return (

        <>

            {

                props.restaurentdata.map((restaurants, index) => (
                    <TouchableOpacity
                        activeOpacity={1}
                        style={tw`mb-7`}
                        key={index}
                        onPress={() => navigation.navigate("RestaurentDetail", {
                            name: restaurants.name,
                            image: restaurants.image_url,
                            price: restaurants.price,
                            reviews: restaurants.review_count,
                            rating: restaurants.rating,
                            categories: restaurants.categories
                        })}
                    >
                         
                        <View
                            key={index}
                            style={tw`p-3 mt-3 bg-white`}
                        >
                            <Resimg image={restaurants.image_url} />
                            <Restext name={restaurants.name} rating={restaurants.rating} check={true} />
                        </View>
                    </TouchableOpacity>
                ))

            }

        </>
    )


}


export const Resimg = (props) => (
    <>
        <View>
            <Image
                source={{
                    uri: props.image
                }}

                style={
                    tw`h-40 w-full `
                }
            />


            <TouchableOpacity style={tw`absolute right-5 top-5`}>
                <Materialcommunityicons name="heart-outline" size={25} color="#fff" />
            </TouchableOpacity>


        </View>
    </>
);

export const Restext = (props) => (
    <>
        <View
            style={tw`flex-row justify-between  mt-3`}
        >
            <View>
                <Text
                    style={tw`font-bold `}
                >
                    {props.name}
                </Text>
                <Text
                    style={tw`font-normal text-gray-500`}
                >
                 { props.check ?  "30-35 Min" : "" }
                </Text>
            </View>
            <View
                style={tw` mr-2  `}
            >
                <Text
                    style={tw` text-base`}
                >
                    {props.rating}

                </Text>

            </View>

        </View>
    </>
)



export default Resturentitems