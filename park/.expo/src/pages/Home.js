import { StyleSheet, Text, View, Image } from 'react-native';
import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import carbg from '../assets/car-bg.png';
import styles from './Home.scss';  // Importing styles

export default function App() {
  const [address, setAddress] = useState(null);
  const [price, setPrice] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    let intervalId;

    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        const { street, city } = reverseGeocode[0];
        setAddress(`${street}, ${city}`);
        setPrice('30');
      }
    };

    fetchLocation();
    intervalId = setInterval(fetchLocation, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const displayText = errorMsg || address || 'Waiting for location...';

  return (
    <View style={styles.container}>
      <View style={styles.upperPart}>
       <Image 
        source={carbg}
        style={styles.image}
        />
      </View>
      <View style={styles.lowerPart}>
        <Text style={styles.address}>{displayText}</Text>
        <Text style={styles.price}>Price: {price} mdl/h</Text>
        <View style={styles.button}>
        </View>
      </View>
    </View>
  );
}
