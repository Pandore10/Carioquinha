import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useState } from 'react';
import WeatherList from './WeatherList';

export default function Header() {
  //temp values
  const tempo = {
    icone: null,
    temperatura: '-',
    descricao: 'Ta bão'
  };

  const bairro = {
    bairro: 'Nada ainda',
  };
  //Fim dos temps
  const [expandido, setExpandido] = useState(false);

  //Animações

  //Expansão do Header
  const expansaoHeader = useAnimatedStyle(() => {
    return {
      height: withTiming(expandido ? 250 : 0, { duration: 500 }),
    };
  });

  //Rotação do botão ao colapsar o header
  const rotation = useSharedValue(0);
  const collapseBotaoHeader = useAnimatedStyle(() => {
    return {
      opacity: withTiming(expandido ? 1 : 0, { duration: 400 }),
      marginTop: withTiming(expandido ? -15 : -25, { duration: 500 }),
      marginBottom: withTiming(expandido ? 5 : -25, { duration: 500}),
      transform: [{ rotate: `${rotation.value}deg`}],
    };
  });

  //Fim das animações

  //Mudança de estado ao expandir o header, e chamada da animação do botão de colapso.
  const onHeaderPress = () => {
    setExpandido(!expandido);
    toggleRotacao();
  };

  //Rotação do botão de colapso
  const toggleRotacao = () => {
    rotation.value = withTiming(expandido ? 0 : 180, { duration: 500 });
  };

  return (
    <View style={styles.header}>

      {/* Logo + nome + menu */}
      <View style={styles.headerSuperior}>
        <View style={styles.logoBox}>
          <Image style={styles.appIcon} source={require('../assets/icon.png')} />
          <Text style={styles.appName}>Carioquinha</Text>
        </View>

        <TouchableOpacity>
          <Ionicons name={'menu'} size={20} color={'#000'} />
        </TouchableOpacity>
      </View>

      {/* Localização + Temperatura Atual + botão de expansão do header */}
      <TouchableOpacity style={styles.headerInferior} onPress={onHeaderPress}>
        <View style={styles.headerItem}>
          <Ionicons name={'location-sharp'} color={'#000000'} size={20} />
          <Text>{bairro.bairro}</Text>
        </View>

        <View style={styles.headerItem}>
          <Ionicons name={'thermometer'} color={'#ff2424ff'} size={20} />
          <Text>{tempo.temperatura === '-' ? tempo.temperatura : Math.trunc(tempo.temperatura)} ºC</Text>
        </View>

        <View style={styles.headerItem}>
          <Image style={styles.climaIcon} source={ tempo.icone ? {} : require('../assets/no-connection.png')} />
          <Text>{tempo.descricao}</Text>
        </View>
      </TouchableOpacity>

      {/* Header expandido */}
      <Animated.View style={expansaoHeader}>
        <WeatherList />
      </Animated.View>

      {/* Botão de colapso */}
      <Animated.View style={collapseBotaoHeader}>
        <TouchableOpacity style={styles.botaoColapso} onPress={onHeaderPress}>
          <Ionicons name='chevron-down-outline' color={'#000'} size={30} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  appIcon: {
    height: 20,
    width: 20,
  },
  appName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  logoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  header: {
    backgroundColor: '#FFDB15',
    paddingTop: 45,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 15, 
    borderBottomRightRadius: 15,
    gap: 15,
  },
  headerSuperior: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerInferior: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  climaIcon: {
    height: 20,
    width: 20,
  },
  botaoColapso: {
    alignItems: 'center',
  },
  teste: {
    backgroundColor: '#ffffff',
  }
});