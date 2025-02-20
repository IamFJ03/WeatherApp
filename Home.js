import React,{useEffect, useState, useContext, useRef} from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import {GlobalContext} from './Context/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Card from '../utils/Card';
import { SwipeListView } from 'react-native-swipe-list-view';

export default function Home({navigation}) {
  const swipeableRef = useRef(null);
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
  const deleteCity = async (name) => {
    const updatedCity = savedCity.filter((city)=> city.name !== name)
    setSavedCity(updatedCity);
    await AsyncStorage.setItem('savedCity', JSON.stringify(savedCity.filter((city)=> city.name !== name)))
  }
  return (
    <View style={{flex:1,backgroundColor:'black'}}>
      <View style={{flexDirection:'row',marginBottom:40}}>
    <Text style={{color:'white', fontSize:25,top:30,left:20}}>Weather</Text>
    <Icon name='city' size={30} color='white' style={styles.addCity} onPress={() => navigation.navigate("Search")}/>
    </View>
    <GestureHandlerRootView>

      <View>
      {loading ? (
          <Text style={{ color: 'white', textAlign: 'center', marginTop: 50 }}>Loading...</Text>
        ) : (
        <SwipeListView
        data={savedCity}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Card item={item} navigation={navigation}/>
  )}
        renderHiddenItem={({item}) => (
          <TouchableOpacity style={styles.deleteButton} onPress={() => deleteCity(item.name)}>
            <Text style={styles.ButtonText}>Delete</Text>
          </TouchableOpacity>
        )}
        leftOpenValue={90}
        
        
        />
)}
      </View>
      </GestureHandlerRootView>
    </View>
  )
}

const styles = StyleSheet.create({
  deleteButton:{
    marginTop:35,
    height:'70%',
    width:'25%',
    marginLeft:20,
    paddingVertical:35,
    paddingHorizontal:15,
    borderRadius:20,
    backgroundColor:'red'
  },
  ButtonText:{
    color:'white',
    fontSize:15,
    fontWeight:'bold',
  },
  addCity:{
    top:35,
    marginLeft:'55%'
  },
  
})