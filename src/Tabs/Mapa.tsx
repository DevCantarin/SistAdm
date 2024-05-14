import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject } from 'expo-location';

const estilos= StyleSheet.create({
    mapa:{
       flex:1,
       width: '50%'
        
    }
})

export default function Mapa() {
  const [localizacao, setLocalizacao] = useState<LocationObject | null>(null);
  const [endereco, setEndereco] = useState<string>('');

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocalizacao(currentPosition);

      // Obter nome de rua usando API de geocodificação do OpenStreetMap (Nominatim)
      const { latitude, longitude } = currentPosition.coords;
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
      const data = await response.json();

      if (data && data.address && data.address.road) {
        setEndereco(data.address.road);
      }
    }
  }

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  return (
    <View>
      {localizacao && (
        <View>
          <Text>Latitude: {localizacao.coords.latitude}</Text>
          <Text>Longitude: {localizacao.coords.longitude}</Text>
          <Text>Endereço: {endereco}</Text>
          <MapView
            style= {estilos.mapa}
          />
        </View>
      )}
    </View>
  );
}
