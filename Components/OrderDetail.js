import React  , {useState , useEffect} from 'react'
import { StyleSheet, Text, View  , ToastAndroid,
    SafeAreaView  ,ScrollView, TextInput , Image  , TouchableHighlight , Button}  from 'react-native';
import AsyncStorage  from '@react-native-async-storage/async-storage'


const OrderDetail = ({navigation}) => {
    const [data , setdata]  = useState({
        email : "",
        phone : "",
        name : "",
        address : "",
        state : "",
        city : "",
        pincode : "",
        landmark : ""
    })

    const [cartitem, setcartitem] = useState([])
    const getUserProfile = async()=>{
      const token = await  AsyncStorage.getItem("token")
      const response = await fetch(`http://192.168.1.7:8000/api/auth/MyData/${token}`)
      const responseData = await response.json()
      console.log(responseData)
      // setdata({...data , email : responseData.data.email})
  }

    const orderNow = async()=>{
      if(data.phone.length < 10 || data.pincode.length < 6   || data.address.length < 10 ){
        ToastAndroid.show('Please enter all the fields correctly ', ToastAndroid.LONG);
        return 

      }else{

      
      
        let  totalamount  = 0 
        cartitem.map((e)=>{
            totalamount+=e.amount* e.qty
        })
        const body = {
            details : data , 
            items : cartitem,
            bill : totalamount
        }
        const reponseData = await  fetch(`http://192.168.1.7:8000/api/order/takeorder`  , {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(body)
        })
        const successorNot  = await  reponseData.json()
        console.log(successorNot)
        if(successorNot.success == true ){
            clearCart()
            ToastAndroid.show('Order Placed  !', ToastAndroid.SHORT)
            navigation.navigate('MyOrder')
        }
      }
    }

    const getData = async()=>{
        const token = await  AsyncStorage.getItem("token")
        const response = await fetch(`http://192.168.1.7:8000/api/order/Myprofile/${token}`)
        const responsedata = await response.json()
        if(responsedata.data !== null ){
            setdata(responsedata.data)

        }
   
    }


    const getItem = async()=>{
        try {
          const value = await AsyncStorage.getItem('items');
          const jsonData = await JSON.parse(value)
          setcartitem(jsonData)
      
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
    

    useEffect(()=>{
        navigation.addListener("focus"  , ()=>{
            getData()
            getItem()
            getUserProfile()
    })
    },[])
  return (
    <ScrollView>
    <TextInput
       onChangeText={(e)=> setdata({...data , email : e})}
       value={data.email}
       style={{padding : 10 ,  borderWidth : 1  , margin : 10 }}
       placeholder="Email"
       editable={false}
    />

<TextInput
       onChangeText={(e)=> setdata({...data , phone : e})}
       value={data.phone}
       style={{padding : 10 ,  borderWidth : 1  , margin : 10 }}
       placeholder="Phone"

       keyboardType="numeric"
    />

<TextInput
       onChangeText={(e)=> setdata({...data , name : e})}
       value={data.name}
       placeholder="Name"

       style={{padding : 10 ,  borderWidth : 1  , margin : 10 }}
    />


 <TextInput
       onChangeText={(e)=> setdata({...data , address : e})}
       value={data.address}
       placeholder="Address"

       style={{padding : 10 ,  borderWidth : 1  , margin : 10 }}
     
    />


<TextInput
       onChangeText={(e)=> setdata({...data , state : e})}
       value={data.state}
       placeholder="State"
       style={{padding : 10 ,  borderWidth : 1  , margin : 10 }}
    />


     <TextInput
       onChangeText={(e)=> setdata({...data , city : e})}
       value={data.city }
       placeholder="City"
       style={{padding : 10 ,  borderWidth : 1  , margin : 10 }}
  
    />

<TextInput
       onChangeText={(e)=> setdata({...data , pincode : e})}
       value={data.pincode }
       placeholder="PinCode"
       style={{padding : 10 ,  borderWidth : 1  , margin : 10 }}
  
    />

<TextInput
       onChangeText={(e)=> setdata({...data , landmark : e})}
       value={data.landmark }
       placeholder="LandMark"
       style={{padding : 10 ,  borderWidth : 1  , margin : 10 }}
  
    />

     <TouchableHighlight style={{margin : 10  , padding : 10   , backgroundColor : "#0d6aff"  }}  onPress={orderNow}> 
         
         
         
             <Text style={{color : "white"  , textAlign : "center"}}> Order Now  </Text>
          </TouchableHighlight>
    

 </ScrollView>
  )
}

export default OrderDetail