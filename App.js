import { useState, useEffect, } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, } from 'react-native';

export default function App() {
  //loading is a variable, with initial value true
  // setloading is a function to set the value for loading variable to any boolean value
  // useState(true) is a function that initialise state of the loading variable to true
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";
  const PSI_URL = "https://api.data.gov.sg/v1/environment/psi";
  const [Refreshing, setRefreshing] = useState("");
  const [duration, setDuration] = useState("");

  function loadBusStopData() {
    setLoading(true);
    fetch(BUSSTOP_URL)
    .then((response) => {
      return response.json()
    })
    .then((responseData) => {
      console.log("Original data:");
      console.log(responseData);

      const myBus = responseData.services.filter(
        (bus) => bus.no === "15"
        ) [0];
        console.log("My bus:");
        setArrival(myBus.next.time);
        setDuration(myBus.next2.time);
        setLoading(false);
        
        const date = new Date(myBus.next.time);
        const [hour, minutes, seconds] = [
          ("0", + date.getHours()).slice(-2),
          ("0", + date.getMinute()).slice(-2),
          ("0", + date.getSeconds()).slice(-2),
        ];
        setArrivalTime([hour, ":", minutes, ":", seconds]);

    })
  }

  

  const millistoMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    //return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
  };

 
const BusNo = "15"

useEffect(() => {
  const interval = setInterval(loadBusStopData, 10000);
  return () => clearInterval(interval);
}, []);

  useEffect(() => {
    loadBusStopData();
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.info}>Bus No : 15 </Text>
      <Text style={styles.info}>Bus Stop : 83139</Text>
      <Text style={styles.info}>Bus Arrival Time:</Text>
      <Text style={styles.arrivalTime}>
        {loading ? <ActivityIndicator size="large" color= "blue"/> : arrival}</Text>
        <Text style={styles.info}>Next Bus:</Text>  
        <Text style={styles.arrivalTime}>
        {loading ? <ActivityIndicator size="large" color= "blue"/> : duration}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Refresh!</Text>
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
  arrivalTime: {
    color: 'orange',
    fontSize: 25,
    margin: 20,
  },
  info: {
    color: 'blue',
    fontSize: 30,
    margin: 10,
  },
  
  
});
