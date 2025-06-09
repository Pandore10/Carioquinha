import * as Location from 'expo-location';

export const localizacaoAtual = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      console.error('Permissão de localização negada.');
      return null;
    }

    const location = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = location.coords;

    return { latitude, longitude };
  
  } catch (error) {
    console.error('Erro de permissão de localização: ', error);
    return null;
  }
}