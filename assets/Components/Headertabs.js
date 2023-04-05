import { View, Text, TouchableOpacity } from 'react-native'
import React ,{useState}from 'react'
import tw from 'twrnc';

const Headertabs = (props) => {
  const [Activetab, setActivetab] = useState("DELIVERY");
  return (
    <View
      style={
        tw
          `
    items-center
    flex-row
    justify-center
    
    `

      }
    >
      <Headerbutton 
      text="DELIVERY"  
      btncolor="black" 
      textcolor="white"
      activetab={props.activetab}
      setactivetab={props.setactivetab}
      />
      
      <Headerbutton 
      text="PICKUP"  
      btncolor="white" 
      textcolor="black"
      activetab={props.activetab}
      setactivetab={props.setactivetab}
      />
    </View>


  )
}

const Headerbutton = (props) => (
  <TouchableOpacity
     style={     
      tw
        `
        bg-${props.activetab === props.text ? 'black' : 'white' }
         pl-10
         rounded-2xl
        px-5
        py-1

       `
    }
    onPress={()=>props.setactivetab(props.text)}
  >

    <Text
      style={
        tw`
         text-${props.activetab === props.text ? 'white' : 'black'}
         font-black
         text-lg
         `
      } 
      
    >
      {props.text}

    </Text>


  </TouchableOpacity>

);
export default Headertabs