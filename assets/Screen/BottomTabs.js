import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const BottomTabs = ({ navigation }) => {
  //const {email,name,emailverified,piclink} = route.params;
  return (
    <View
      style={tw`flex-row  justify-between m-2 mx-4  `}
    >
      <TouchableOpacity
        // style={tw`mt-2 ml-4 rounded-xl bg-blue-300 font-bold h-10 w-18`}
        onPress={() => {
          navigation.navigate("Home");
        }
        }
      >
        <Icon icon="home" text='Home' />

      </TouchableOpacity>

    
      <TouchableOpacity
        // style={tw`mt-2 ml-4 rounded-xl bg-blue-300 font-bold h-10 w-18`}
        onPress={() => {
          navigation.navigate("Grocery1");
        }
        }
      >
      <Icon icon="shopping-bag" text='Grocery' />

      </TouchableOpacity>


      <TouchableOpacity
        onPress={() => {
          navigation.navigate("OrderComplete");
        }
        }
      >
        <Icon icon="receipt" text='Orders' />
      </TouchableOpacity>

         
      <TouchableOpacity
        onPress={() => {
         
          navigation.navigate("Logout");
        }
        }
      >
        <Icon icon="user" text='Account' />
      </TouchableOpacity>


    </View>
  )

}

const Icon = (props) => (
  <View>
    <FontAwesome5
      name={props.icon}
      size={25}
      style={tw` self-center`}
    />
    <Text>
      {props.text}
    </Text>
  </View>
)

export default BottomTabs