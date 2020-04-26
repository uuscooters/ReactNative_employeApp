import React, { createContext, useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Contants from 'expo-constants';
import Home from './screens/Home';
import CreateEmployee from './screens/CreateEmployee';
import Profile from './screens/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer, initState } from './reducers/reducer'

// const store = createStore(reducer);
export const myContext = createContext();
const Stack = createStackNavigator();

const myOptions = {
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#006aff"

  }
}

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ ...myOptions, title: "Data Employe" }} />
        <Stack.Screen name="Create" component={CreateEmployee} options={{ ...myOptions, title: "Create Employe" }} />
        <Stack.Screen name="Profile" component={Profile} options={{ ...myOptions, title: "Profile" }} />
      </Stack.Navigator>
    </View>
  );
}

export default () => {

  const [state, dispatch] = useReducer(reducer, initState)

  return (
    // <SafeAreaProvider>
    <myContext.Provider value={
      { state, dispatch }
    }>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </myContext.Provider>
    // </SafeAreaProvider>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee'
  },
});
