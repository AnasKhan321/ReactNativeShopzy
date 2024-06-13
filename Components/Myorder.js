import React  , {useEffect ,useState} from 'react'
import { StyleSheet, Text, View  , SafeAreaView  , ScrollView  , TextInput  , TouchableHighlight , Button}  from 'react-native';
import AsyncStorage  from '@react-native-async-storage/async-storage'

const Myorder = ({navigation}) => {
  const [myorders , setmyorders]  = useState([])

  const getMyorders = async()=>{
    const token = await AsyncStorage.getItem('token')
    const response   = await fetch(`http://192.168.1.7:8000/api/order/myorder/${token}`)
    const data = await response.json()
    setmyorders(data.data)
  }

  useEffect(()=>{
    navigation.addListener('focus'  , ()=>{
      getMyorders()
    })
  })
  return (
    <ScrollView vertical={true}> 

    {myorders.length == 0  && 
   <Text style={{fontWeight : "bold"  , textAlign : "center"   , margin : 10 }}> We noticed you haven't placed an order with us yet. Don't miss out on our amazing products! Browse our latest collection and find something special just for you. If you have any questions or need assistance, please don't hesitate to reach out. We're here to help! </Text> }

      {myorders.map((item)=>{
        return(
          <ScrollView  key={item._id} style={{margin : 10 , padding : 10 , backgroundColor : "white"}}> 
                <Text> {item.status} </Text>
                <Text style={{fontWeight :"bold"  , fontSize : 18 , marginVertical : 10 }} > Total Amount :  {item.bill} </Text>
                <Text> {item.email} {item.phone} </Text>
                <Text> {item.landmark}  ,  {item.city} ,  {item.state} {item.pincode} </Text>

             </ScrollView>
        )
      })}

    </ScrollView >
  )
}

export default Myorder