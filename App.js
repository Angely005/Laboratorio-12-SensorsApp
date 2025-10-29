import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Accelerometer } from 'expo-sensors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [timestamp, setTimestamp] = useState('');
  const [speed, setSpeed] = useState(null);
  const [history, setHistory] = useState([]);
  const [distance, setDistance] = useState(0);
  const lastLocation = useRef(null);

  const calcularDistancia = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // metros
    const toRad = deg => (deg * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // en metros
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso denegado para acceder al GPS');
        return;
      }

      const current = await Location.getCurrentPositionAsync({});
      setLocation(current.coords);
      setSpeed(current.coords.speed);
      setTimestamp(new Date().toLocaleString());
      lastLocation.current = current.coords;

      await AsyncStorage.setItem('ultimaUbicacion', JSON.stringify(current.coords));
    })();

    const subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
      setTimestamp(new Date().toLocaleString());

      if (Math.abs(accelerometerData.x) > 1.5 || Math.abs(accelerometerData.y) > 1.5) {
        Alert.alert('¡Movimiento brusco detectado!');
      }

      setHistory(prev => {
        const updated = [accelerometerData, ...prev];
        return updated.slice(0, 5);
      });
    });

    return () => subscription && subscription.remove();
  }, []);

  const actualizarDatos = async () => {
    const current = await Location.getCurrentPositionAsync({});
    setLocation(current.coords);
    setSpeed(current.coords.speed);
    setTimestamp(new Date().toLocaleString());

    if (lastLocation.current) {
      const d = calcularDistancia(
        lastLocation.current.latitude,
        lastLocation.current.longitude,
        current.coords.latitude,
        current.coords.longitude
      );
      setDistance(prev => prev + d);
    }

    lastLocation.current = current.coords;

    await AsyncStorage.setItem('ultimaUbicacion', JSON.stringify(current.coords));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sensores del Dispositivo</Text>

      {location ? (
        <>
          <Text>Latitud: {location.latitude.toFixed(4)}</Text>
          <Text>Longitud: {location.longitude.toFixed(4)}</Text>
          <Text>Velocidad: {speed ? speed.toFixed(2) + ' m/s' : 'N/A'}</Text>
          <Text>Distancia recorrida: {(distance / 1000).toFixed(3)} km</Text>
        </>
      ) : (
        <Text>Obteniendo ubicación...</Text>
      )}

      <Text style={{ marginTop: 20 }}>
        Acelerómetro ➜ x: {data.x.toFixed(2)} | y: {data.y.toFixed(2)} | z: {data.z.toFixed(2)}
      </Text>

      <Text style={{ marginTop: 10 }}>Última lectura: {timestamp}</Text>

      <Button title="Actualizar datos GPS" onPress={actualizarDatos} />

      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Historial de movimiento:</Text>
      {history.map((item, index) => (
        <Text key={index}>
          #{index + 1} ➜ x: {item.x.toFixed(2)} | y: {item.y.toFixed(2)} | z: {item.z.toFixed(2)}
        </Text>
      ))}

      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
        </MapView>
      )}

      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  error: { color: 'red', marginTop: 10 },
  map: { width: '100%', height: 300, marginTop: 20 },
});
