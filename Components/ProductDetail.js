
import { StyleSheet,ActivityIndicator, Text, View ,ScrollView ,    ToastAndroid, StatusBar,   Image,  TextInput  , FlatList,TouchableHighlight , Button} from'react-native';
import {useState ,useEffect}  from 'react'
import AsyncStorage  from '@react-native-async-storage/async-storage'
import {DevSettings} from 'react-native';
function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ProductDetail = ({route  , navigation}) => {
    const [data , setdata]  = useState(null)
    const { id  } = route.params;
    const [cartitem , setcartitem]  = useState([])
    const [itemAdded , setitemAdded]  = useState(false)
    const [review , setreview]  = useState([])
    const [reviewText , setreviewText]  = useState("")

    
    const fetchData = async ()=>{
      const response = await  fetch(`http://192.168.1.7:8000/api/product/product/${id}`)
      const jsonData = await response.json()
      setdata(jsonData.data)
      setreview(jsonData.review)
   
    }

    const cartDetail = async()=>{
      try {
        const value = await AsyncStorage.getItem('items');
        const jsonData = await JSON.parse(value)
        if(jsonData !== null ){
          const item = jsonData.filter(cartitem=> cartitem.item._id == id)
          if(item.length !==0){
            setitemAdded(true )
          }
        }
       
        setcartitem(jsonData)
      } catch (e) {
        console.warn(e);
        
      }
    }

    const checkData = ()=>{
  
      
    }
    useEffect(()=>{
      navigation.addListener('focus'  , ()=>{
        fetchData()
        cartDetail()
        checkData()
  
      })
       
    },[])

    const onPress = ()=>{

    }
    const addtoCart = async()=>{


      const datatoAdd = [{amount : data.price , qty : 1 , item : data}]
      if(cartitem  == null){
        try {
          await AsyncStorage.setItem('items' , JSON.stringify(datatoAdd))
          navigation.navigate("MyCart")
        } catch (e) {
          console.warn(e);
          
        }
      }else{
        try {
          await AsyncStorage.setItem('items' , JSON.stringify( [...cartitem , {amount : data.price , qty : 1 , item : data}]))
          navigation.navigate("MyCart")
        } catch (e) {
          console.warn(e);
          
        }
      }
      
    }

    const addReview = async()=>{
      const token = await  AsyncStorage.getItem("token")
      const sendData = {
        Id : data._id ,
        review : reviewText , 
        token : token 
      }
      console.log(sendData)

      fetch("http://192.168.1.7:8000/api/review/addReview", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(sendData)
      }).then(res => {
        return res.json()
      }).then(data=>{
        setreviewText("")
        ToastAndroid.show("Review Added Successfully "  , ToastAndroid.LONG)
        
    
      });
    }
    if(data ==null  ){
        <View> 


<ActivityIndicator size="large" color="#00ff00" />
        </View>
    }else{
      return (
    
        <ScrollView  style={styles.container }>
          
                <View style={styles.imageStyle}> 
                  <Image source={{uri : `http://192.168.1.7:8000/${data.imageurl}`}}   style={styles.image}/>
                </View>
      
                
                <View
                    style={{
                      borderBottomColor: '#b0b0b0',
                      borderBottomWidth: 1,
                      width : '100%'
                    }}
                    />
                    <View  style={{marginBottom : 10 }}>
      
                  
                    <Text style={styles.textxl}> {data.Name } </Text>
                  
                   </View> 
      
      
                   <View
                    style={{
                      borderBottomColor: '#b0b0b0',
                      borderBottomWidth: 1,
                      width : '100%'
                    }}
                    />
      
      
           
                    <View  style={{marginVertical : 10 }}> 
      
      
                      <Text style={{fontSize : 18 , fontWeight : "bold"  , paddingHorizontal : 3 , 
                    paddingVertical : 5 , }} >  ₹{data.price } </Text>
                    </View>
      
                    <View
                    style={{
                      borderBottomColor: '#b0b0b0',
                      borderBottomWidth: 1,
                      width : '100%'
                    }}
                    />
                     
      
             <View> 
      
             <Text style={{
                  paddingHorizontal : 5  , 
                  paddingTop : 5 , 
                  fontSize : 18 , 
                  color : '#757575'
      
      
                 }}> {data.Category } </Text> 
                     <Text style={{
                  paddingHorizontal : 5  , 
                  paddingTop : 2 , 
                  fontSize : 18 , 
                  paddingBottom : 10 , 
                  color : '#595959'
      
      
                 }}> {data.desc } </Text>
      
      
             </View>
      
      
                
      
                     
                <View
                    style={{
                      borderBottomColor: '#b0b0b0',
                      borderBottomWidth: 1,
                      width : '100%'
                    }}
                    />
      
      
                <View>
                  
                {data?.other?.map((e)=>{
                                  return(
                                      <View  style={{marginVertical : 10 , paddingHorizontal : 5 }}> 
                                          <Text style={{color : "#595959"}}  > {e}</Text>
                                      </View>
      
                                  )
                               })}
                   </View> 
      
      
                   <View
                    style={{
                      borderBottomColor: '#b0b0b0',
                      borderBottomWidth: 1,
                      width : '100%'
                    }}
                    />
      
                    <View style={{flex : 1 , flexDirection : 'row'  , width : '100% '   , paddingHorizontal : 5  , 
                  justifyContent :'space-between', alignItems : 'center'  ,marginVertical : 30 }}>
                    {itemAdded? <TouchableHighlight >
                        <View style={{ flex : 1  , backgroundColor : "#b0b0b0"  , padding : 10   , color : "white" }}>
                          <Text style={{color : "white"}}>Already 
                          Added  </Text>
                        </View>
                      </TouchableHighlight> : <TouchableHighlight onPress={addtoCart}>
                        <View style={{ flex : 1  , backgroundColor : "#0d6aff"  , padding : 10   , color : "white" }}>
                          <Text style={{color : "white"}}>Add to Cart </Text>
                        </View>
                      </TouchableHighlight> }
               
                   
      
                      <TouchableHighlight onPress={onPress} style={{elevation : 100}}>
                        <View style={{ flex : 1  , backgroundColor :"#d4ae08" , padding : 10   , color : "white" , 
                      border : 5  , borderColor : "black"     }}>
                          <Text style={{color : "black"}}>Buy Now  </Text>
                        </View>
                      </TouchableHighlight>
                      
                       </View>

                       <View style={{flexDirection : "row"  , alignItems : "center"  , justifyContent : "center"}}> 

                            <TextInput
                                onChangeText={(e)=> setreviewText(e)}
                                placeholder= "Review"
                                value={reviewText}
                                style={{padding : 10 ,  borderWidth : 1  , margin : 10   , flex : 1 }}
                              
                            />

              <TouchableHighlight onPress={addReview} >
                        <Text style={{backgroundColor : "yellow"  , padding : 10   , margin : 5 }}> Add  </Text>
                      </TouchableHighlight>


                       </View>

                       {review.map((e)=>{
                        return(
                          <View style={{flexDirection : "row"  , margin : 10  , padding : 5  , backgroundColor : "white"  , 
                          alignItems  : "center" , elevation : 5 }}>
                            <Image source={require("../assets/user.png")}  style={{width  : 40 , height : 40 ,
                        marginVertical : 10   
                    }}/>
                              <View style={{marginHorizontal : 10 }}> 
                              <Text style={{fontWeight : "bold"}}> @{e.User.username} </Text>

                                <Text> {e.review} </Text>

                              
                              </View>


                            
                             </View>
                        )
                       })}


      
            
          
           </ScrollView>
        )
    }
 
}


const styles = StyleSheet.create({
  container : {
  
  },
  normalpadding : {
    margin : 10 , 
    padding : 10 
  },
  imageStyle : {
    margin : 10 , 
    padding : 10 
  }, 
  image : {
    width : '100%' , 
    height : 300 ,
    resizeMode: 'contain',


  },
  button: {
    alignItems: 'center',
    backgroundColor: '#0d6aff',
  
    padding : 10 
  },
  textxl : {
    fontWeight : 'bold'  , 
    fontSize : 24, 
    paddingTop  : 30 , 
    paddingHorizontal : 5  

},

border : {
  width : '100%',
  height : 12 , 
  backgroundColor : 'black'
} , 
button : {

}
})

export default ProductDetail