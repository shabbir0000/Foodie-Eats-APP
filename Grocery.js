import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import LottieView from 'lottie-react-native';
import tw from 'twrnc'


const Grocery = ({navigation}) => {
  const [loading, setloading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
        setloading(false)
    }, 3000)
}, [])

  return (
    loading ? (
      <>
          <LottieView style={tw`self-center mt-36 h-40`}
              source={require("./assets/Animation/113096-coming-soon.json")}
              autoPlay
              loop={true}
              speed={0.5}
          />
      </>
  ) : (
      <>
      {
        navigation.navigate("Home")
      }
      </>
    
  )
  )
}

export default Grocery