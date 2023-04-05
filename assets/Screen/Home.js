import { SafeAreaView, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import tw from 'twrnc';
import Headertabs from '../Components/Headertabs';
import Searchbar from './Searchbar';
import Categories from '../Components/Categories';
import Resturentitems, { localresturent } from '../Components/Resturentitems';
import BottomTabs from './BottomTabs';
import { Divider } from 'react-native-elements';




const yelp_api_key = "SW_5z9E9x5_nfNpcPn1CaY6IXl8Nisw914s-_2-vJfxvi7Pci-Czma3Q3OQ1ETbPxfKblZSFqTrnt7m9O-iQXxZ1Ji8wqcEc4hWWE34lXenSwuNmT083Ike2wn7YYnYx";

export default function Home({route,navigation}) {

    const [restaurentData, setrestaurentData] = useState(localresturent);
    const [Activetab, setActivetab] = useState("DELIVERY");

    const [city, setcity] = useState("New York")
    // SW_5z9E9x5_nfNpcPn1CaY6IXl8Nisw914s-_2-vJfxvi7Pci-Czma3Q3OQ1ETbPxfKblZSFqTrnt7m9O-iQXxZ1Ji8wqcEc4hWWE34lXenSwuNmT083Ike2wn7YYnYx
    const getyelpresdata = () => {
        try {
            const url = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`

            const object = {
                headers: {
                    Authorization: `Bearer ${yelp_api_key}`
                },
            }

            return fetch(url, object)
                .then((res) => res.json())
                .then((json) => setrestaurentData(json.businesses.filter((business) =>
                    business.transactions.includes(Activetab.toLowerCase())
                )))


                .catch((error) => {
                    console.warn("PLEASE SEARCH VALID CITY");
                    //  <Error/>
                })
        } catch (error) {
            console.warn(error, "NOT SUPPORTED");
        }


    };
    //console.log(setrestaurentData);
    useEffect(() => {
        
        getyelpresdata();
    }, [city, Activetab])

    
    return (
        <View style={tw`h-full bg-gray-100 `}>
            <View style={tw`mt-12 bg-white p-2`}>
                <Headertabs activetab={Activetab} setactivetab={setActivetab} />
                <Searchbar cityhandler={setcity} />

            </View>
            <View style={tw` pb-216px`}>
                <ScrollView vertical ShowsVerticalScrollIndicator={false} >

                    <Categories navigation={navigation} />

                    <Resturentitems restaurentdata={restaurentData} navigation={navigation} />

                </ScrollView>
                <Divider width={1} style={tw`bg-slate-200`} />
                    <BottomTabs navigation={navigation} />
                
             

            </View>
            

        </View>


    )
}