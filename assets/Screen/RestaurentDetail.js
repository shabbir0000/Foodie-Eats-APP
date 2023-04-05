import { View, Text,ScrollView } from 'react-native'
import React ,{useEffect , useState} from 'react'
import About from '../RestaurentDetail/About'
import { Divider } from 'react-native-elements'
import tw from 'twrnc'
import Restaurentitems from '../RestaurentDetail/Restaurentitems'
import ViewCart from '../RestaurentDetail/ViewCart'


const food = [
  {
      title: "SMOKY CHICKEN",
      description: "masala chicken with red chilli ",
      price: "$10",
      image: "https://i.pinimg.com/736x/05/07/aa/0507aa369ee6562133d72389c38d68a2.jpg"

  },

  {
      title: "BEEF NIAHRI",
      description: "roasted beef with delicius items ",
      price: "$20",
      image: "https://visitlahore.com/wp-content/uploads/2021/07/Traditional-Food-in-Lahore-1-1024x576.jpg"

  },
  {
      title: "TAWA KEEMA",
      description: "merinated chopped keema fry on tawa in desi style ",
      price: "$15",
      image: "https://www.locallylahore.com/wp-content/uploads/Flavours-of-The-Walled-City-lahore1.jpg"

  },
  {
      title: "HALWA PURI",
      description: "mix item with fry puri ",
      price: "$12",
      image: "https://i.dawn.com/large/2019/01/5c4d4eba84f52.png"

  },
  
]

const RestaurentDetail = ({route,navigation}) => {
  

  return (
    <View style={tw`h-full`}>
      <About route={route}/>
      <Divider width={1} />
      <View  style={tw` pb-280px`}>
      <ScrollView vertical ShowsVerticalScrollIndicator={false} >
        <Restaurentitems restaurentName={route.params.name} food={food} />

     
     
      </ScrollView>
      </View>
      
      <ViewCart navigation={navigation}  restaurentName={route.params.name}/>
    </View>
  )
}

export default RestaurentDetail