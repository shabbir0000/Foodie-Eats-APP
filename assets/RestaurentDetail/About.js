import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import Materialcommunityicons from 'react-native-vector-icons/MaterialCommunityIcons'

const yelpfoodapi = {
    image : "https://www.businesslist.pk/img/cats/restaurants.jpg",
    name : "ZAIKA KING",
    price : " $$ ",
    reviews:"1500+",
    rating:"4.5",
    categories:[
        {title:"pakistani"},
        {title:"comfort food"},
        {title:"cofee"},
        {title:"desi food"},
    ]
}



const About = (props) => {
const {image,name,price,reviews,rating,categories} = props.route.params;
const formated = categories.map((cat)=>cat.title).join(" . ");

const description =
 `${formated} ${price ? " . " + price :" " } || ${"⭐" + rating } || ${"🤩 Reviews- " + reviews}`
  
  return (

    <View >

     <Resimg image={image}/>
     <Restext title={name}/>
     <Resdis description={description}/>
     
    </View>

  )
}

const Resimg = (props) => (
    
        <View>
            <Image
                source={{
                    uri: props.image
                  }}

                style={
                    tw`w-full h-44 `
                }
            />

            <TouchableOpacity style={tw`absolute right-5 top-5`}>
                <Materialcommunityicons name="heart-outline" size={25} color="#fff" />
            </TouchableOpacity>

        </View>
   )


const Restext = (props) => (
    <>
        <View
            style={tw`flex-row justify-between mx-2 mt-3`}
        >
            <View>
                <Text
                    style={tw`font-bold text-xl `}
                >
                    {props.title}
                </Text>
                
            </View>
            

        </View>
    </>
)

const Resdis = (props) => (
    <>
       
            <View
                style={tw` mr-2  `}
            >
                <Text
                    style={tw` text-base font-medium mx-2`}
                >
                   {props.description}

                </Text>

            </View>

        
    </>
)
export default About