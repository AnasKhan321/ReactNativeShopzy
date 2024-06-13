import React, {useState  , useEffect} from 'react'
import { StyleSheet, Text, View  ,
     SafeAreaView  ,ScrollView, TextInput , Image   , ToastAndroid, TouchableHighlight , Button}  from 'react-native';
import AsyncStorage  from '@react-native-async-storage/async-storage'


const MyProfile = ({navigation})=>{
    const [data , setdata]  = useState({
        phone : "",
        name : "",
        address : "",
        state : "",
        city : "",
        pincode : ""
    })
    const [emailText, setemailText] = useState("")

    const [showProfile , setshowProfile]  = useState(false)

    const getData = async()=>{
        const token = await  AsyncStorage.getItem("token")
        const response = await fetch(`http://192.168.1.7:8000/api/order/Myprofile/${token}`)
        const responsedata = await response.json()
        console.log(responsedata)
        if(responsedata.data !== null ){
            setdata(responsedata.data)
        }else{
            setshowProfile(true)
        }
    }

    const getUserProfile = async()=>{
        const token = await  AsyncStorage.getItem("token")
        const response = await fetch(`http://192.168.1.7:8000/api/auth/MyData/${token}`)
        const responseData = await response.json()
        console.log(responseData)
        setemailText(responseData.data.email)
       
    }
    useEffect(()=>{
        navigation.addListener("focus"  , ()=>{
            getData()
            getUserProfile()
    })

    },[])

    const updateProfile = async()=>{
        if(data.phone.length < 10 || data.pincode.length < 6   || data.address.length  < 10 ){
            ToastAndroid.show('Please enter all the fields correctly ', ToastAndroid.LONG);
            return 
    
          }else{
            console.log(data)
          
            const reponseData = await  fetch(`http://192.168.1.7:8000/api/order/UpdateProfile`  , {
                method: "POST",
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify(data)
            })

            const responseJson =  await reponseData.json()
            console.log(responseJson)
            if(responseJson.success == true ){
                  ToastAndroid.show('Profile Updated Successfully ', ToastAndroid.LONG);

            }
          }
    }

    const logOut = async()=>{
        try {
            const value = await AsyncStorage.removeItem('token');
            navigation.navigate('Login')
          } catch (e) {
            console.warn(e);
            
          }
    }

    if(showProfile){
           return(
            <View> 


                    <View style={{justifyContent : "center"  ,alignItems : "center"}}> 
                        
                        <Image source={require("../assets/user.png")}  style={{width  : 80 , height : 80 ,
                        marginVertical : 10   
                    }}/>
                    </View>
            <Text style={{fontWeight : "bold"  , fontSize : 18 , textAlign : "center"}}> {emailText} </Text>

            <TouchableHighlight  onPress={logOut} style={{margin : 10    , padding : 10   , backgroundColor : "#0d6aff"  }}> 
                    
                    
                    
                    <Text style={{color : "white"  , textAlign : "center"}}> LogOut </Text>
                 </TouchableHighlight>

            </View>

           )



            
    }else{
        return(
            <ScrollView>
                <View style={{justifyContent : "center"  ,alignItems : "center"}}> 
    
                    <Image source={require("../assets/user.png")}  style={{width  : 80 , height : 80 ,
                    marginVertical : 10   
                }}/>
                </View>
              
    
               <Text style={{fontWeight : "bold"  , fontSize : 18 , textAlign : "center"}}> {emailText} </Text>
             
    
        <TextInput
                  onChangeText={(e)=> setdata({...data , phone : e})}
                  placeholder= "Phone"
                  value={data.phone}
                  style={{padding : 10 ,  borderWidth : 1  , margin : 10 }}
                  keyboardType="numeric"
               />
    
        <TextInput
         placeholder= "Name"
                  onChangeText={(e)=> setdata({...data , name : e})}
                  value={data.name}
                  style={{padding : 10 ,  borderWidth : 1  , margin : 10 }}
               />
    
    
            <TextInput
               placeholder= "Address"
                  onChangeText={(e)=> setdata({...data , address : e})}
                  value={data.address}
                  style={{padding : 10 ,  borderWidth : 1  , margin : 10 }}
            
               />
    
    
        <TextInput
           placeholder= "State"
                  onChangeText={(e)=> setdata({...data , state : e})}
                  value={data.state}
                  style={{padding : 10 ,  borderWidth : 1  , margin : 10 }}
        
               />
    
    
    
    <TextInput
           placeholder= "PinCode"
                  onChangeText={(e)=> setdata({...data , pincode : e})}
                  value={data.pincode}
                  style={{padding : 10 ,  borderWidth : 1  , margin : 10 }}
                  keyboardType="numeric"
               />
    
    
                <TextInput
                 placeholder= "City"
                  onChangeText={(e)=> setdata({...data , city : e})}
                  value={data.city }
                  style={{padding : 10 ,  borderWidth : 1  , margin : 10 }}
               />
    
                <TouchableHighlight style={{margin : 10  , padding : 10   , backgroundColor : "#0d6aff"  }} 
                 onPress={updateProfile}> 
                    
                    
                    
                        <Text style={{color : "white"  , textAlign : "center"}}> Update </Text>
                     </TouchableHighlight>
    
    
                     <TouchableHighlight  onPress={logOut} style={{margin : 10    , padding : 10   , backgroundColor : "#0d6aff"  }}> 
                    
                    
                    
                        <Text style={{color : "white"  , textAlign : "center"}}> LogOut </Text>
                     </TouchableHighlight>
               
    
            </ScrollView>
        )
    }

    
}

export default MyProfile ; 