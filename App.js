import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './components/Home.js';
import Search from './components/Search.js';
import City from './components/City.js';
import GlobalState from './components/Context/index.js';

export default function App() {
  const stack = createNativeStackNavigator();
  return (
    <GlobalState>
    <NavigationContainer>
      <StatusBar hidden={true} />
      <stack.Navigator screenOptions={{headerShown:false}} >
        <stack.Screen name='Home' component={Home} />
        <stack.Screen name='Search' component={Search} />
        <stack.Screen name='City' component={City} />
      </stack.Navigator>
    </NavigationContainer>
    </GlobalState>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
