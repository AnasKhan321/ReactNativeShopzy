import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useState , useEffect}  from 'react'
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './Components/Login'
import SignUp from './Components/Signup'
import Home from './Components/Home'
import Shopzy from './Shopzy';
import ProductDetail from './Components/ProductDetail';
import OrderDetail from './Components/OrderDetail.js'

const Stack = createNativeStackNavigator ();
export default function App() {
  const [list , setlist ] = useState([])



  // useEffect(()=>{
  //   fetchData()

  // },[])
  return (
 

      <NavigationContainer> 


      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="Shopzy"  component={Shopzy}   options={{ headerShown: false }}/>
        <Stack.Screen name="ProductDetail"  component={ProductDetail}   options={{ headerShown: false }}/>
        <Stack.Screen name="OrderDetail"  component={OrderDetail} />

      </Stack.Navigator>
      </NavigationContainer>



   

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
