import { StyleSheet, ToastAndroid,  Text, View  , SafeAreaView  , TextInput  , TouchableHighlight , Button}  from 'react-native';
import {useState}  from 'react'; 
import AsyncStorage  from '@react-native-async-storage/async-storage'


const SignUp = ({navigation})=>{

    const [email ,setemail] = useState("")
    const [password , setpassword]   = useState("")
    const [username , setusername]  = useState("")

    const onPress = ()=>{
      if(password.length < 8){
        ToastAndroid.show('Password must be of 8 Character ', ToastAndroid.LONG)
      }
          const sendata = {
            email : email , 
            username : username , 
            password : password 
          }
          console.log(sendata)

          fetch("http://192.168.1.7:8000/api/auth/signup", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(sendata)
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

    const saveData = async(data)=>{
      try {
        await AsyncStorage.setItem('token' , data)
        
      } catch (e) {
        console.warn(e);
        
      }
    }

    return(
        <View  style={styles.bigContainer}> 

            <View style={styles.container }> 

            <TextInput 
            value={username}
            placeholder="UserName  "
            onChangeText={(e)=>{setusername(e)}}
            style={styles.inputStyle}
            autoComplete = 'username'
            cursorColor = 'blue '



            />
                    

            <TextInput 
            value={email}
            placeholder="Email  "
            onChangeText={(e)=>{setemail(e)}}
            style={styles.inputStyle}
            autoComplete = 'email'
            cursorColor = 'blue '



            />


            <TextInput 
            autoComplete="new-password"
            value={password}
            placeholder="Password  "
            onChangeText={(e)=>{setpassword(e)}}
            style={styles.inputStyle}/>

           



            <TouchableHighlight onPress={onPress} style={styles.buttonContainer}>
                    <View style={styles.button}>
                    <Text  style={styles.buttonText }>Sign Up  </Text>
                    </View>
                </TouchableHighlight>

                <Text style={styles.smalltext}  > Already Have Account ?  <Text style={{  fontWeight: 'bold'}}   onPress={()=>{
                 navigation.navigate('Login')
            }}  > Login    </Text>   </Text>



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
        fontFamily: 'Gill Sans',
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

export default SignUp ; 