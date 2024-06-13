import React, {useState  , useEffect} from 'react'
import { StyleSheet, Text, View  , SafeAreaView  ,ScrollView, TextInput , Image  , TouchableHighlight , Button}  from 'react-native';
import AsyncStorage  from '@react-native-async-storage/async-storage'
import {DevSettings} from 'react-native';


const MyCart = ({navigation}) => {
  const [cartitem, setcartitem] = useState([])
  const getData = async()=>{
    try {
      const value = await AsyncStorage.getItem('items');
      if(value!== null ){
        const jsonData = await JSON.parse(value)
        setcartitem(jsonData)
      }
    
  
    } catch (e) {
      console.warn(e);
      
    }
  }

  const clearCart = async()=>{
    try {
      const value = await AsyncStorage.removeItem('items');
      
    } catch (e) {
      console.warn(e);
      
    }
  }

  const placeOrder = ()=>{
    navigation.navigate("OrderDetail")
  }

  const addItem = async(id)=>{
      const item = cartitem.filter(item=> item.item._id == id )
      const addedItem = cartitem.filter(item=> item.item._id !== id )
      item[0].qty+=1 
      addedItem.push(item[0])
 
      setcartitem(addedItem)

      const value = await AsyncStorage.setItem('items'  , JSON.stringify(addedItem));
      getData()

   

  }

  const removeItem = async(id)=>{
    const item = cartitem.filter(item=> item.item._id == id )
    const addedItem = cartitem.filter(item=> item.item._id !== id )
    if(item[0].qty >= 2  ){
      item[0].qty-=1 
      addedItem.push(item[0])
    }
   

    setcartitem(addedItem)

    const value = await AsyncStorage.setItem('items'  , JSON.stringify(addedItem));
    getData()
  }
  useEffect(()=>{
    navigation.addListener('focus'  , ()=>{
      getData()

    })
 
  },[])
  return (
    <View> 


      

             
            {cartitem?.map((item)=>{
                            return(
                                  <View  style={{flexDirection : 'row'  , alignItems : 'center'  , 
                                  backgroundColor : 'white'  ,margin : 10  , elevation : 40 }}  key={item.item._id}>
                                    
                                    <View style={{padding : 10 }}> 

                <Image source={{uri : `http://192.168.1.7:8000/${item.item.imageurl}`}}   style={{width : 100 , height : 100 }}/>
                                      

                                    </View>

                                    <View > 
                                      <Text style={{fontWeight : 'bold'  , fontSize : 20   }}> {item.item.Name} </Text>

                                      <Text style={{color : "#595959"}}> {item.amount}x{item.qty} </Text>

                                      <View style={{flexDirection : 'row'  , alignItems : 'center'  , 
                                    marginVertical : 10 }}>
                                          <TouchableHighlight style={{backgroundColor : "#0d6aff"  , paddingHorizontal  : 10 , 
                                        textAlign  :  'center'  , paddingVertical : 5 }}  onPress={()=>{removeItem(item.item._id )}}> 
                                            
                                              <Text style={{fontSize : 20   , color : "white"}}> -  </Text>
                                             </TouchableHighlight>


                                             <Text style={{fontSize : 20 , marginHorizontal : 10 }} > {item.qty} </Text>


                                             <TouchableHighlight style={{backgroundColor : "#0d6aff"  , paddingHorizontal  : 10 , 
                                        textAlign  :  'center'  , paddingVertical : 5 }}  onPress={()=>{addItem(item.item._id )}}> 
                                            
                                              <Text style={{fontSize : 18    , color : "white"}}> +  </Text>
                                             </TouchableHighlight>
                                        
                                        
                                        
                                      </View>

                                    </View>




                                    
                                    </View>

                            )
                         })}

                         {cartitem.length > 0  && 

                         <View style={{ justifyContent : 'space-between'  ,  flexDirection  : 'row', alignItems : 'center'  , marginTop : 10   , marginHorizontal : 20 }}>
                          
                          
                         <TouchableHighlight onPress={clearCart}>
                            <View style={{ backgroundColor : "#0d6aff"  ,  borderWidth : 1 ,borderRadius : 5  , padding : 10   , color : "white"  }}>
                              <Text style={{color : "white" }}>Clear Cart  </Text>
                            </View>
                      </TouchableHighlight>


                      <TouchableHighlight onPress={placeOrder} style={{, }}>
                            <View style={{ backgroundColor : "#ffd000"  , padding : 10     , textAlign : 'center', color : "white" , shadowColor: 'black', elevation : 10   }}>
                              <Text style={{color : "black"  , textAlign : "center"   ,borderRadius : 10 ,  fontWeight  : "bold"}}>Place Order   </Text>
                            </View>
                      </TouchableHighlight>
                           </View> 
}

{cartitem.length == 0  && <View style={{marginTop : 10 }}>
  
  <Text style={{fontWeight : "bold"  , fontSize : 16  , textAlign  : "center"}}> You don't have any item Add item in Your Cart !  </Text> 
   </View> }


    </View>
  )
}


const styles= StyleSheet.create({
  imagecontainer : {
    flex : 1 ,
    height : 150 ,
    padding: 10 
},
textxl : {
  fontWeight : 'bold'  , 
  fontSize : 18, 
},
price : {
  fontSize  : 16 , 

},
})

export default MyCart