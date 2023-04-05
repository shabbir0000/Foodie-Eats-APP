import { View, Text, ScrollView , TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from "twrnc";
import LottieView from 'lottie-react-native'
import Categories from '../Components/Categories'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Searchbar from '../Screen/Searchbar'

const Grocery = ({navigation}) => {
  const [data, setdata] = useState([])
  const [loading, setloading] = useState(true)
  const [search, setsearch] = useState("pasta")

  let abrot = new AbortController();
  const grocery = async () => {

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'f6f7915005msh33e305553de4ffcp189006jsn6a29b90fe0c5',
        'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
      }
    };

    const url = `https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=` + search ;

    await fetch(url, options , {signal:abrot.signal})
      .then(response => response.json())
      .then(response => {
        // console.log(response)
        setdata(response.hints)
      })
     
      .catch((error) => {
        if (error.name === "AbortError") {
            console.log("fetch aborted");
        } else {
            console.log(error);
        }
    })
  }

  useEffect(() => {
    grocery();

        setTimeout(() => {
            setloading(false);
        }, 5000)


        return () => {
            abrot.abort();
        }
  }, [data])


  return (
    <>
    { 
      loading ? ( 
      <>
       <LottieView style={tw`self-center mt-24 h-72`}
              source={require("../Animation/110285-nutrition.json")}
              autoPlay
              loop={true}
              speed={0.5}
          />
      </> ) : (
    <>
      <View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Home")
                    }

                    }
                >
                    <FontAwesome5
                        name="arrow-left"
                        size={25}
                        style={tw`pt-10 ml-5`}
                    />
                </TouchableOpacity>
                <Searchbar cityhandler={setsearch}  click={true}/>
            </View>
            <View style={tw`pt-4`}>
            <Categories navigation={navigation} />
            </View>
                
      <View >

        <ScrollView horizontal showsHorizontalScrollIndicator={true}>

          {
            data.map((recieve, key) => (
              <>

                <View key={key} style={tw` flex-1 pr-10 items-center pl-10 `}>
                  <View style={tw` border-black text-black h-500px w-72 shadow-lg shadow-slate-500`}>
                    <Text  style={tw`text-center pt-10`}>
                      {"\n"}
                      <Text style={tw`text-base font-medium`}>
                        Food-ID :
                      </Text>
                      {"\n"}
                      {recieve.food.foodId}
                      {"\n"}
                      {"\n"}
                      <Text style={tw`text-base font-medium`}>
                        Food Name :
                      </Text>
                      {"\n"}
                      {recieve.food.label}
                      {"\n"}
                      {"\n"}
                      <Text style={tw`text-base font-medium`}>
                        Food Category :
                      </Text>
                      {"\n"}
                      {recieve.food.category}


                      {"\n"}
                      {"\n"}
                      <Text style={tw`text-base font-medium`}>
                        Nutrients :
                      </Text>
                      {"\n"}
                      {"\n"}
                      Calory : {recieve.food.nutrients.ENERC_KCAL}
                      {"\n"}
                      {"\n"}
                      Protein : {recieve.food.nutrients.PROCNT}
                      {"\n"}
                      {"\n"}
                      Fat : {recieve.food.nutrients.FAT}
                      {"\n"}
                      {"\n"}
                      Colestrole : {recieve.food.nutrients.CHOCDF}
                      {"\n"}
                      {"\n"}
                      Fiber : {recieve.food.nutrients.FIBTG}




                    </Text>

                  </View>

                </View>

              </>
            ))
          }
        </ScrollView>
      </View>
    </>
    
      )
}
</> 
  )
 
}
  
export default Grocery