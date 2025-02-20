import React,{useContext} from 'react'
import {View,Text, StyleSheet, Image, ScrollView} from 'react-native';

export default function City({ route }) {
    const {item} = route.params
  return (
    <View style={{flex:1,backgroundColor:'black'}}>
      <ScrollView contentContainerStyle={{paddingBottom:50}}>
        <View style={{marginTop:20,top:20,left:30}}>
          <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>City Info:</Text>
        </View>
        <View style={styles.weatherFrame}>
        <Text style={{color:'white', fontSize:25,marginTop:15,marginLeft:20}}>{item.name}</Text>
        <Image source={{
          uri:`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        }} 
        style={{width:200,height:200,marginTop:10,left:40}}
        />
        <View style={{flexDirection:'row'}}>
          <View style={{flexDirection:'row'}}>
        <View>
        <Text style={{color:'white', fontSize:40,marginTop:-20,marginLeft:20}}>{item.main.temp}</Text>
        <Text style={{color:'white', marginLeft:20}}>{item.main.temp_max}/ {item.main.temp_min}</Text>
        </View>
        <View style={{marginTop:-10,marginLeft:20}}>
          <Text style={{color:'white', fontSize:25}}>°C</Text>
          <Text style={{color:'white', fontSize:25}}>{item.weather[0].description}</Text>
        </View>
        </View>
        
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
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    weatherFrame:{
        marginTop:50,
        marginLeft:'5%',
        height: 370,
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