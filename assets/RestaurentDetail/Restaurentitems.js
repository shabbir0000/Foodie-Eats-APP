import { View, Text, Image } from 'react-native'
import React ,{useEffect} from 'react'
import tw from 'twrnc'
import { Divider } from 'react-native-elements'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { useDispatch , useSelector} from 'react-redux'





const Restaurentitems = ({restaurentName ,food , hidecheckbox, marginleft}) => {

    let dispatch = useDispatch();
    

     
    const selectitem = (item,checkboxValue) => 
    dispatch ({
      type:"ADD_TO_CART",
      payload: { ...item, restaurentName:restaurentName,checkboxValue:checkboxValue},
    })

    const item = useSelector((select) => select.cartReducer.selectedItems.items);
    
    const ischeck = (food,item) =>(
        Boolean(item.find((check)=> check.title === food.title))
    )

    
    return (
        <>
            {
                food.map((food,index) => (
                    <View key={index}>
                        <View  style={tw`flex-row justify-between m-7`}>

                            {hidecheckbox ? (<></>) : ( <BouncyCheckbox 
                            onPress= {(checkboxValue)=> selectitem(food,checkboxValue)}
                           isChecked = {ischeck(food,item)}
                           />)}
                            <Foodinfo food={food}  />
                            <Foodimg food={food} marginleft={marginleft? marginleft : 0} />
                        </View>
                        <Divider width={1} />
                    </View>
                ))
            }
        </>
    )

}

const Foodinfo = (props) => (
    <View style={tw`justify-evenly w-44 `}>
        <Text style={tw`font-black text-lg`}>
            {props.food.title}
        </Text>
        <Text style={tw`text-base font-light text-gray-900`} >
            {props.food.description}
        </Text>
        <Text style={tw`text-base font-medium`}>
            {props.food.price}
        </Text>
    </View>
)

const Foodimg = ({marginleft,...props}) => (
    <View>
        <Image
            style={tw`h-20 w-20 ml-${marginleft} `}
            source={{ uri: props.food.image }}
        />
    </View>
)

export default Restaurentitems