import { useState, useEffect, } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, } from 'react-native';

export default function App() {
  //loading is a variable, with initial value true
  // setloading is a function to set the value for loading variable to any boolean value
  // useState(true) is a function that initialise state of the loading variable to true
  const [loading, setloading] = useState(true);
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";

  function loadBusStopData() {
    fetch(BUSSTOP_URL)
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      console.log(responseData);
    })
  }

  useEffect(() => {
    loadBusStopData();
  }, []);
  
  return (
    <View style={styles.container}>
      <Text>Bus Arrival Time:</Text>
      <Text style={styles.arrivalTime}>{loading ? <ActivityIndicator size="large" /> : 'loaded'}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
    
    </View>
  );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  
});
