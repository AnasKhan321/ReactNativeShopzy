import React from 'react'
import { StyleSheet, Text, View  , Image, SafeAreaView  , TextInput  , TouchableHighlight , Button}  from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Components/Home';
import MyCart from './Components/MyCart';
import Myorder from './Components/Myorder';
import MyProfile from './Components/MyProfile.js'
const Tab = createBottomTabNavigator();

const Shopzy = () => {
  return (
    <Tab.Navigator   screenOptions={{
      headerStyle: {
        backgroundColor: '#0d6aff', // Change the background color to your desired color
      },
      headerTintColor: '#fff', // Change the text color of the header
      headerTitleStyle: {
          
      },
     
    }}  >
    <Tab.Screen name="Home" component={Home}  
    
    
    options={{
      tabBarIcon: ({ focused, color, size }) => (
        <Image
          source={require('./assets/home.png')} // Replace './path/to/your/image.png' with the actual path to your image
          style={{ width: size, height: size, tintColor: color }} // Adjust the width, height, and tint color as needed
        />
      ),

      
    }}
    />
    <Tab.Screen name="MyOrder" component={Myorder} 
    
    options={{
      tabBarIcon: ({ focused, color, size }) => (
       
        <Image
          source={require('./assets/order.png')} // Replace './path/to/your/image.png' with the actual path to your image
          style={{ width: size, height: size, tintColor: color }} // Adjust the width, height, and tint color as needed
        />
      ),
    }}
    />

    
    <Tab.Screen name="MyCart" component={MyCart}  
    
    options={{
      tabBarIcon: ({ focused, color, size }) => (
        <Image
          source={require('./assets/cart.png')} // Replace './path/to/your/image.png' with the actual path to your image
          style={{ width: size, height: size, tintColor: color }} // Adjust the width, height, and tint color as needed
        />
      ),
    }}
    
    />
    <Tab.Screen name="MyProfile" component={MyProfile}  
    
    
    options={{
      tabBarIcon: ({ focused, color, size }) => (
        <Image
          source={require('./assets/profile2.png')} // Replace './path/to/your/image.png' with the actual path to your image
          style={{ width: size, height: size, tintColor: color }} // Adjust the width, height, and tint color as needed
        />
      ),
    }}
    />



  </Tab.Navigator>
  )
}

export default Shopzy