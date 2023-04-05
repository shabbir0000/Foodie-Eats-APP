import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'

const Modalfile = ({item}) => {
    const {title,price} = item;
    
  return (
    <View
    style={tw`flex-row justify-between p-5 border-b-2 border-b-black`}
    >
      <Text style={tw`font-semibold text-base`} >{title}</Text>
      <Text style={tw`opacity-70 text-base`}>{price}</Text>
    </View>
  )
}

export default Modalfile