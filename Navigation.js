import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { Provider  } from 'react-redux'
import configurestore from './Redux/Store'
import Home from './assets/Screen/Home'
import RestaurentDetail from './assets/Screen/RestaurentDetail'
import OrderComplete from './assets/Screen/OrderComplete'
import LoginAccount from './assets/Screen/LoginAccount'
import Signup from './assets/Screen/Signup'
import Logout from './assets/Screen/Logout'
import Cocktail from './assets/Screen/Cocktail'
import Recipes from './assets/Screen/Recipes'
import Cocktaildetails from './assets/Components/Cocktaildetails'
import Recipesdetails from './assets/Components/Recipesdetails'
import Grocery from './assets/Components/Grocery'
import Grocery1 from './Grocery'
import Forgetpass from './assets/Screen/Forgetpass'

const store = configurestore();

const Navigation = () => {
    const stack = createStackNavigator();
   
    const screenoption = {
        headerShown:false,
    }

  return (
     <Provider store={store}>
   <NavigationContainer>
    <stack.Navigator initialRouteName='Account' screenOptions={screenoption}>
      <stack.Screen name='Home' component={Home}/>
      <stack.Screen name='RestaurentDetail' component={RestaurentDetail}/>
      <stack.Screen name='Cocktail' component={Cocktail}/>
      <stack.Screen name='OrderComplete' component={OrderComplete}/>
      <stack.Screen name='Account' component={LoginAccount}/>
      <stack.Screen name='Signup' component={Signup}/>
      <stack.Screen name='Logout' component={Logout}/>
      <stack.Screen name='Recipes' component={Recipes}/>
      <stack.Screen name='Cocktaildetail' component={Cocktaildetails}/>
      <stack.Screen name='Recipesdetails' component={Recipesdetails}/>
      <stack.Screen name='Grocery' component={Grocery}/>
      <stack.Screen name='forget' component={Forgetpass}/>
      <stack.Screen name='Grocery1' component={Grocery1}/>
    </stack.Navigator>
   </NavigationContainer>
   </Provider>


  )
}

export default Navigation