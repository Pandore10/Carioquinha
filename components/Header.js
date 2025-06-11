import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { fetchClima } from '../API/fetchClima';
import { fetchBairro } from '../API/fetchBairro';

import WeatherList from './WeatherList';

//Botar Touchable capacity nas partes de clima para dps criar uma tela de clima bacana.
//Botar variaveis nas cores para mudança de tema dps

export default function Header() {
  const [tempo, setTempo] = useState({ temperatura: '-' });
  const [bairro, setBairro] = useState({ bairro: '-' });
  const [expandido, setExpandido] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clima = await fetchClima();

        if (clima) {
          setTempo(clima);
        }
      } catch (error) {
        console.error('Header FetchData: Erro ao pegar informações de clima: ', error);
      }

      try {
        const lugar = await fetchBairro();
  
        if (lugar) {
          setBairro(lugar);
        }
      } catch (error) {
        console.error('Header FetchData: Erro ao pegar informações de bairro: ', error);
      }
    };

    fetchData()

    const intervalo = setInterval(() => {
      fetchData();
    }, 300000);

    return () => clearInterval(intervalo);
  }, []);

  //Animação para expandir o Header
  const onHeaderPress = () => {
    setExpandido(!expandido);
    toggleRotation();
  };

  const expansaoHeader = useAnimatedStyle(() => {
    return {
      height: withTiming(expandido ? 250 : 0, { duration: 500 }),
    };
  });

  //Animação do botão de colapsar o Header.
  const rotation = useSharedValue(0);
  const collapseHeaderButton = useAnimatedStyle(() => {
    return {
      opacity: withTiming(expandido ? 1 : 0, { duration: 400 }),
      marginTop: withTiming(expandido ? -15 : -25, { duration: 500 }),
      marginBottom: withTiming(expandido ? -5 : -25, { duration: 500 }),
      transform: [{ rotate: `${rotation.value}deg`}],
    };
  });

  const toggleRotation = () => {
    rotation.value = withTiming(expandido ? 0 : 180, { duration: 500 });
  };

  return (
    <View style={styles.header}>

      <View style={styles.headerCima}>
        <View style={styles.logo}>
          <Image style={styles.appIcon} source={require('../assets/icon.png')} />
          <Text style={styles.headerText}>Carioquinha</Text>
        </View>
        
        <TouchableOpacity>
          <Ionicons name='menu' size={28} color='#000' />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.headerBaixo} onPress={onHeaderPress}>
        <View style={styles.climaObject}>
          <Ionicons name='location-sharp' size={18} color='#000' />
          <Text>{bairro.bairro}</Text>
        </View>

        <View style={styles.climaObject}>
          <Ionicons name='thermometer' size={18} color='#F51720' />
          <Text>{tempo.temperatura === '-' ? tempo.temperatura : Math.trunc(tempo.temperatura)}º</Text>
        </View>

        <View style={styles.climaObject}> 
          <Image style={styles.climaIcon} source={ tempo.icone ? { uri: `https://openweathermap.org/img/wn/${tempo.icone}@2x.png` } : require('../assets/no-connection.png') } />
          <Text>{tempo.climaDescricao}</Text>
        </View>
      </TouchableOpacity>
      
      <Animated.View style={expansaoHeader}>
        <WeatherList />
      </Animated.View>

      <Animated.View style={collapseHeaderButton}>
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={onHeaderPress}>
          <Ionicons name='chevron-down-outline' size={30} color='#000' />
        </TouchableOpacity>
      </Animated.View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFDB15',
    paddingTop: 45,
    paddingHorizontal: 20,
    paddingBottom: 5,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    gap: 15,
  },
  headerCima: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerBaixo: {
    flexDirection: 'row',
    gap: 15,
  },
  climaObject: {
    flexDirection: 'row',
    gap: 4,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  climaIcon: {
    height: 20,
    width: 20,
  },
  logo: {
    flexDirection: 'row',
    gap: 8,
  },
  appIcon: {
    height: 25,
    width: 32,
  },
});