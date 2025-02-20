import React,{useState, useEffect, useContext} from 'react';
import { GlobalContext } from './Context';
import {View,Text, TextInput, StyleSheet, TouchableOpacity, Keyboard,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Search() {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState();
  const {savedCity, setSavedCity} = useContext(GlobalContext);
  
  const addCity = async () => {
    const updatedCity = [...savedCity, cities]
    setSavedCity(updatedCity);
    await AsyncStorage.setItem('savedCity',JSON.stringify(updatedCity));
    console.log("City Added:", updatedCity);
  }
  const handleSearch = (val) => {
    setCity(val.trimStart());
    console.log(city);
    if(val.length > 1){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=02a4c8083ef436ed158568f05217cabd&units=metric`)
    .then(item=>item.json())
    .then(cities => {setCities(cities)
      console.log(cities.main);
    })
  }
}
  return (
    <View style={{flex:1, backgroundColor:'black'}}>
      <View>
        <Text style={{color:'white', top:35,left:30, fontSize:20}}>Add City</Text>
      </View>
        <View style={{flexDirection:'row'}}>
          <TextInput 
          style={styles.searchBox}
          placeholder='Enter city'
          value={city}
          onChangeText={(text) => handleSearch(text)}
          />
          <TouchableOpacity style={styles.button} onPress={() => {
            setCity("");
            Keyboard.dismiss();
          }}>
          <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          
        </View>
        {cities && cities.sys && cities.main && (
        <TouchableOpacity style={styles.cityBox} onPress={addCity}>
        <Image
          source={{
            uri: `https://openweathermap.org/img/wn/${cities.weather[0].icon}@2x.png`,
          }}
          style={styles.weatherIcon}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.cityName}>{cities.name}</Text>
          <Text style={{ color: 'white' }}>{cities.main.feels_like}</Text>
        </View>
        <Text style={styles.tempText}>{cities.main.temp}°</Text>
      </TouchableOpacity>
      
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  weatherIcon: {
   bottom:10,
   width: 100,
   height: 100 
  },
  cityBox:{
    height:110,
    flexDirection:'row',
   color:'white',
   borderRadius:10,
   marginTop:40,
   paddingVertical:15,
   paddingHorizontal:10,
   backgroundColor:'#36454F',
   width:'90%',
   left:'5%'
  },
 searchBox:{
  color:'white',
  borderRadius:10,
  borderWidth:1,
  width:'70%',
  left:'5%',
  marginTop:70,
  backgroundColor:'#36454F'
 },
 button:{
  height:40,
  marginTop:73,
  left:25,
  width:'20%',
  borderRadius:10,
  paddingVertical:7,
  paddingHorizontal:10,
  
 },
 buttonText:{
  color:'white'
 },
 cityName:{
  color:'white',
  fontSize:25
 },
 tempText:{
  top:15,
  color:'white',
  fontSize:20
 }
});