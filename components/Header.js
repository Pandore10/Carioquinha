import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { fetchClima } from '../API/fetchClima';
import { fetchBairro } from '../API/fetchBairro';

//Botar Touchable capacity nas partes de clima para dps criar uma tela de clima bacana.
//Botar variaveis nas cores para mudança de tema dps

export default function Header() {
  const [tempo, setTempo] = useState({ temperatura: '-' });
  const [bairro, setBairro] = useState({ bairro: '-' });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clima = await fetchClima();
        const lugar = await fetchBairro();

        setTempo(clima);
        setBairro(lugar);
      } catch (error) {
        console.error('Header FetchData: Erro ao pegar informações: ', error);
      }
    };

    fetchData()

    const intervalo = setInterval(() => {
      fetchData();
    }, 300000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <View style={styles.header}>

      <View style={styles.headerCima}>
        <View style={styles.logo}>
          <Image style={styles.appIcon} source={require('../assets/icon.png')} />
          <Text style={styles.headerText}>Carioquinha</Text>
        </View>
        
        <TouchableOpacity>
          <Ionicons name='menu' size={28} color='#FFF' />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.headerBaixo}>
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

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFDB15',
    paddingTop: 45,
    paddingHorizontal: 16,
    paddingBottom: 15,
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
  }
});