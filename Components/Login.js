import { StyleSheet, Text, View  , SafeAreaView  , TextInput  , TouchableHighlight , Button}  from 'react-native';
import {useState  , useEffect}  from 'react'; 
import AsyncStorage  from '@react-native-async-storage/async-storage'



const Login = ({navigation})=>{

    const [email ,setemail] = useState("")
    const [password , setpassword]   = useState("")

    const saveData = async(data)=>{
        try {
          await AsyncStorage.setItem('token' , data)
          
        } catch (e) {
          console.warn(e);
          
        }
      }

      const getData = async()=>{
        try {
          const value = await AsyncStorage.getItem('token');
          if (value !== null) {
            navigation.navigate('Shopzy')
            
          }
          
        } catch (e) {
          console.warn(e);
          
        }
      }

      useEffect(() => {
        getData()
      }, [])
      

    
 
    const onPress = async()=>{
        const sendData = {
            email : email , 
            password : password
        }
      


          fetch("http://192.168.1.7:8000/api/auth/login", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(sendData)
          }).then(res => {
            return res.json()
          }).then(data=>{
            setemail("")
            setpassword("")
            if(data.success){
                saveData(data.token)
        
                navigation.navigate('Shopzy')
            }
        
          });
     

         
    }

    return(
        <View  style={styles.bigContainer}> 

            <View style={styles.container }> 

                    

            <TextInput 
            value={email}
            placeholder="Email"
            onChangeText={(e)=>{setemail(e)
            
            }}
            style={styles.inputStyle}
            autoComplete = 'email'
    



            />


            <TextInput 
            autoComplete="new-password"
            value={password}
            placeholder="Password "
            onChangeText={(e)=>{setpassword(e)}}
            style={styles.inputStyle}/>

           



            <TouchableHighlight onPress={onPress} style={styles.buttonContainer}>
                    <View style={styles.button}>
                    <Text  style={styles.buttonText }>Log In </Text>
                    </View>
                </TouchableHighlight>


            <Text style={styles.smalltext}  > Didn't Have account ?  <Text style={{  fontWeight: 'bold'}}   onPress={()=>{
                 navigation.navigate('Signup')
            }}  > Signup   </Text>   </Text>



            </View>


        </View>
      
    )
}


const styles = StyleSheet.create({
    inputStyle : {
        margin : 10 ,
        borderWidth : 2  , 
        borderColor : '#0d6aff',
        padding : 10 

    },
    container : {
        backgroundColor : 'white',
        padding : 10 ,

    },
    bigContainer : {
        flex : 1 , 
        padding : 10 ,
        justifyContent : 'center'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#0d6aff',
       
        padding : 10 
      },
      linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
      },
      buttonText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#ffffff',
        backgroundColor: 'transparent',
      },

      buttonContainer : {
        margin  : 10 
      },
      smalltext : {
            width : '100%', 
            textAlign : 'center',
            color: '#0d6aff',
            fontSize : 16 ,
            margin : 10  
      }

     
})

export default Login ; 