import { StyleSheet, Text, View  ,   StatusBar,   Image,  TextInput  , FlatList,TouchableHighlight , Button} from'react-native';
import {useState  , useEffect}  from 'react'

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
const Card = ({data})=>{
    <Text> {data.Name } </Text>
}

const Home = ({navigation}) => {

    const [data, setdata] = useState([])
    
    const fetchData = ()=>{
        fetch("http://192.168.1.7:8000/api/product/allproduct").then((res)=>{
            return res.json()
        }).then((data)=>{
            setdata(data.data)
        })
    }

    useEffect(() => {
        fetchData()
    
    }, [])
    

  return (
    <> 
     <StatusBar
        backgroundColor="#0255c9"
        hidden={false}
      />

<View  style={styles.MainContainer}>
        
        <FlatList
        data={data}
        renderItem={({item}) =>
        <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() =>   navigation.navigate("ProductDetail"  , {id : item._id })} 
        > 
        <View style={styles.container}  onPress={()=>{
          
        }} > 
                <View style={styles.imagecontainer} >
                <Image source={{uri : `http://192.168.1.7:8000/${item.imageurl}`}}   style={styles.image}/>
    
                     </View>

                     <View style={styles.namecontainer} >
                        <Text  style={styles.textxl }> {item.Name }</Text> 
                        <Text  style={styles.textGray }> #{item.Category }</Text> 

                        <Text  style={styles.price}> ₹ {formatNumberWithCommas(item.price)} </Text>
                        <View style={styles.other}>
                            
                        {item.other.map((e)=>{
                            return(
                                <View style={styles.textshow}  key={e.split(0,9)}> 
                                    <Text > {e}</Text>
                                </View>

                            )
                         })}
                             </View>
                   
                         </View> 
        </View>
        </TouchableHighlight>

     
        
    }
        keyExtractor={item => item._id}
      />
         </View>
    </>

  )
}

const styles = StyleSheet.create({
    MainContainer : {
       backgroundColor : '#ffffff',
       flex : 1 
            
    },
    container : {
        borderWidth : 1 , 
        borderColor : "#b0b0b0",
       flexDirection: 'row', 
       backgroundColor : '#ffffff',
       alignItems : 'center'
    
    },
    image : {
       flex : 1 
    },
    imagecontainer : {
        flex : 1 ,
        height : 150 ,
        padding: 10 
    },
    namecontainer : {
        flex: 2,
        borderLeftWidth  : 1 , 
        borderColor : "#b0b0b0"  ,
        padding : 5 ,
        height: '100%',
        
    },
    textxl : {
        fontWeight : 'bold'  , 
        fontSize : 18, 
    },
    price : {
        fontSize  : 16 , 

    },
    textGray : {
        fontSize : 14 , 
        color : "#b0b0b0"  ,
        marginTop : 5 , 
        fontWeight : 'bold'


    },
    other : {
        flexDirection : 'row'
    },
    textshow : {
        marginTop : 20 , 
        borderWidth : 1 , 
        borderColor : "#e3e3e3" , 
        margin : 2 , 
        padding : 5 , 
        color : '#b0b0b0' 
    }
})




export default Home