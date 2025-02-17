import React,{useEffect, useContext} from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import {GlobalContext} from './Context/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({navigation}) {

  const {savedCity, setSavedCity} = useContext(GlobalContext);
  useEffect(() => {
   const loadCities = async () => {
    try{
    const storedCities = await AsyncStorage.getItem('savedCity');
    if(storedCities){
      setSavedCity(JSON.parse(storedCities));
    }
   }
  catch(error){
    console.error("Error loading cities on focus:", error);
  }
}
   loadCities();
  },[]);

  useFocusEffect(
    React.useCallback(() => {
      const loadCities = async () => {
        try{
          const storedCities = await AsyncStorage.getItem('savedCity');
          if(storedCities){
            console.log(JSON.parse(storedCities));
            setSavedCity(JSON.parse(storedCities));
          }
         }
        catch(error){
          console.error("Error loading cities on focus:", error);
        }
      };
      loadCities();
    }, [])
  );
  return (
    <View style={{flex:1,backgroundColor:'black'}}>
    
    <Icon name='city' size={30} color='white' style={styles.addCity} onPress={() => navigation.navigate("Search")}/>
      <View>
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
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cityName}>{item.name}</Text>
                    <Text style={{ color: 'white' }}>{item.main.feels_like}</Text>
                  </View>
                  <Text style={styles.tempText}>{item.main.temp}°</Text>
                </TouchableOpacity>
  )}
        />
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
    fontSize:25
   },
   tempText:{
    top:15,
    color:'white',
    fontSize:20
   }
})