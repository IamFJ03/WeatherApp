import React,{useContext} from 'react'
import {View,Text, StyleSheet, Image} from 'react-native';

export default function City({ route }) {
    const {item} = route.params
  return (
    <View style={{flex:1,backgroundColor:'black'}}>
        <View style={styles.weatherFrame}>
        <Text style={{color:'white', fontSize:25,marginTop:15,marginLeft:20}}>{item.name}</Text>
        <View style={{flexDirection:'row'}}>
        <View>
        <Text style={{color:'white', fontSize:40,marginTop:100,marginLeft:20}}>{item.main.temp}</Text>
        <Text style={{color:'white', marginLeft:20}}>{item.main.temp_max}/ {item.main.temp_min}</Text>
        </View>
        <Image source={{
          uri:`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        }} 
        style={{width:150,height:150,marginTop:80,left:40}}
        />
        </View>
        </View>
        <View>
          <Text style={{color:'white', marginTop:30, marginLeft:25, fontSize: 20}}>Weather Details:</Text>
          <View style={styles.details}>
            <View>
            <Text style={{color:'grey'}}>Feels like:</Text>
            <Text style={{color:'white', fontSize:30}}> {item.main.feels_like}</Text>
            </View>
            <View style={{marginLeft:125}}>
            <Text style={{color:'grey'}}>Humidity</Text>
            <Text style={{color:'white', fontSize:30}}>{item.main.humidity}</Text>
            </View>
          </View>
          <View style={styles.details}>
            <View>
            <Text style={{color:'grey'}}>E Wind</Text>
            <Text style={{color:'white', fontSize:30}}>{item.wind.speed}</Text>
            </View>
            <View style={{marginLeft:125}}>
            <Text style={{color:'grey'}}>Visibility</Text>
            <Text style={{color:'white', fontSize:30}}>{item.visibility}</Text>
            </View>
          </View>
          <View style={styles.details}>
            <View>
            <Text style={{color:'grey'}}>Air pressure:</Text>
            <Text style={{color:'white',fontSize:30}}>{item.main.pressure}</Text>
            </View>
            <View>
            <Text></Text>
            </View>
          </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    weatherFrame:{
        marginTop:50,
        marginLeft:'5%',
        height: 300,
        width:'90%',
        borderRadius:30,
        backgroundColor:'#36454F'
    },
    details:{
      flexDirection:'row',
      marginTop:15,
      marginBottom:50,
      marginLeft:30,
    }
})