import React,{useEffect, useState, useContext} from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import {GlobalContext} from './Context/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({navigation}) {

  const {savedCity, setSavedCity} = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);

  const fetchWeatherData = async (cities) =>{
    try{
       const updatedCities = await Promise.all(
        cities.map(async (city) =>{
          const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=02a4c8083ef436ed158568f05217cabd&units=metric`);
          const data = await res.json();
          return data;
        })
       );
       setSavedCity(updatedCities);
       await AsyncStorage.setItem('savedCity', JSON.stringify(updatedCities));
    }
    catch(error){
      console.error('Error fetching weather data:', error);
    }
    finally{
      setLoading(false);
    }
  };

  const loadCities = async () => {
    try{
    const storedCities = await AsyncStorage.getItem('savedCity');
    if(storedCities){
      const cityName = JSON.parse(storedCities)
      .filter((item) => item && item.name)
      .map((item)=>item.name);

      if(cityName.length > 0)
      fetchWeatherData(cityName)
      else
      {
        console.warn("No valid city names found in stored data.");
        setLoading(false);
      }
    }
   }
  catch(error){
    console.error("Error loading cities on focus:", error);
  }
}

  useEffect(() => {
   loadCities();
  },[]);

  useFocusEffect(
    React.useCallback(() => {
      loadCities();
    }, [])
  );
  return (
    <View style={{flex:1,backgroundColor:'black'}}>
    
    <Icon name='city' size={30} color='white' style={styles.addCity} onPress={() => navigation.navigate("Search")}/>
      <View>
      {loading ? (
          <Text style={{ color: 'white', textAlign: 'center', marginTop: 50 }}>Loading...</Text>
        ) : (
        <FlatList
        data={savedCity}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.cityBox} onPress={() => navigation.navigate("City", {item})}>
                  <Image
                    source={{
                      uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
                    }}
                    style={styles.weatherIcon}
                  />
                  <View style={{ flex: 1, marginTop:10 }}>
                    <Text style={styles.cityName}>{item.name}</Text>
                    <Text style={{ color: 'white' }}>{item.main.feels_like}</Text>
                  </View>
                  <Text style={styles.tempText}>{item.main.temp}°</Text>
                </TouchableOpacity>
  )}
        />
)}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  addCity:{
    top:20,
    marginLeft:'90%'
  },
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
   cityName:{
    color:'white',
    fontSize:20
   },
   tempText:{
    top:15,
    color:'white',
    fontSize:20
   }
})