import { View, TouchableOpacity, TextInput, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Searchbar = ({ cityhandler ,click}) => {
  const [text, setText] = useState('');

  useEffect(() => {
    
  }, [text])
  return (
    <View style={tw`flex-row mt-2 justify-center`}>
      {/* <GooglePlacesAutocomplete
        placeholder="Search"

        query={{ Key: "AIzaSyDIspQcf_bGRV1B8Q4reSwPSen5b9fIXAk" }}
       
        onPress={(data, details = null) => {
          console.log(data.description);
        }}

        


        styles={{
          textInput: {
            backgroundColor: '#eee',
            borderRadius: 20,
            fontWeight: "700",
            marginTop: 4,

          },
          textInputContainer: {
            backgroundColor: '#eee',
            borderRadius: 70,
            flexDirection: "row",
            alignItems: "center",
            marginRight: 5,

          },
        }}

        renderleftButton={() => (
          <View
            style={
              tw`absolute`
            }
          >
            <Ionicons name="location-Sharp" size={24} />

          </View>
        )}

      /> */}

      <TextInput
        style={tw`mt-2 border-black border rounded-md font-bold h-10 w-56 text-center`}
        placeholder={
          click ?  "Enter Recipe Name" :"Enter Your City" 
        }

        onChangeText={(newText) => {
          setText(newText)
          // cityhandler(text)
        }
        }
        defaultValue={text}

      />

      <TouchableOpacity
        style={tw`mt-2 ml-4 rounded-md bg-black  h-10 w-18 justify-center`}
        onPress={()=>{
          cityhandler(text)
          setText("")
          }
        }


        // }
        // title="submit"
      >

        <Text
        style={tw`font-semibold text-white text-center`}
        >
          SEARCH
        </Text>
      </TouchableOpacity>



    </View>

  );
}

export default Searchbar