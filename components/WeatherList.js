import { useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, FlatList } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function WeatherList ({ dados }) {
  const [cardsAbertos, setCardsAbertos] = useState(new Set());
  const flatListRef = useRef(null);

  let previsoes = dados?.list || null;

  if (!previsoes) {
    return (
      <View style={{ opacity: 0.8, backgroundColor: '#fff', borderRadius: 8, padding: 10, alignItems: 'center'}}>
        <Text>Sem conexão no momento. {dados}</Text>
      </View>
    );
  }

  const previsoesFiltrado = previsoes.filter((item) => {
    const [data, hora] = item.dt_txt.split(' ');
    const hoje = new Date().toISOString().split('T')[0];
    const horariosPermitidos = ['09:00:00', '12:00:00'];

    return data !== hoje && horariosPermitidos.includes(hora);
  });

  const previsoesUnicas = [];
  const diasUnicos = new Set();

  for (let item of previsoesFiltrado) {
    const dia = item.dt_txt.split(' ')[0];

    if (!diasUnicos.has(dia)) {
      diasUnicos.add(dia);
      previsoesUnicas.push(item);
    }

    if (previsoesUnicas.length === 5) break;
  }

  //Controle da animação do card
  const toggleExpansao = (id, index) => {
    setCardsAbertos((prev) => {
      const novoSet = new Set(prev);

      if (novoSet.has(id)) {
        novoSet.delete(id);
      } else {
        novoSet.clear();
        novoSet.add(id);
        flatListRef.current?.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.085,
        });
      }

      return novoSet;
    });
  };
  
  return (
    <View>
      <FlatList
        style={{ borderRadius: 10, marginHorizontal: 5 }}
        data={previsoesUnicas}
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.dt.toString()}
        renderItem={({ item, index }) => (
          <PrevisaoCard
            item={item}
            taAberto={cardsAbertos.has(item.dt)}
            toggle={() => toggleExpansao(item.dt, index)}
          />
        )}
      />
    </View>
  );
}

function PrevisaoCard ({ item, taAberto, toggle }) {
  const unix = new Date(item.dt * 1000);
  const semana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  const diaSemana = semana[unix.getDay()];
  const dataISO = unix.toISOString().split('T')[0];
  const [ano, mes, dia] = dataISO.split('-');

  //Animação do card
  const expansaoCard = useAnimatedStyle(() => ({
    height: withTiming(taAberto ? 100 : 0, { duration: 300 }),
  }));
  
  //Opacidade da parte extra do card
  const opacidadeCard = useAnimatedStyle(() => ({
    opacity: withTiming(taAberto ? 1 : 0, { duration: 350 }),
  }));

  //Seletor do icone de vento
  const iconeVento = (item) => {
    const rajada = item.wind.gust ?? 0;
    if (rajada <= 7) return require('../assets/low-wind.png');
    if (rajada <= 17) return require('../assets/medium-wind.png');
    return require('../assets/Extreme-wind.png');
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: pressed ? '#fff5bd' : styles.card.backgroundColor,
          opacity: pressed ? 0.5 : 1,
        }
      ]}
      onPress={() => toggle(item.dt)}
    >
      <View style={styles.weatherTitle}>
        <Text>{diaSemana}</Text>
        <Text>{dia}/{mes}</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Image style={[styles.weatherImage, { backgroundColor: weatherImageBackground(item.weather[0].id)}]} source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0]}@2x.png`}} />
        <View style={{ flexDirection: 'column' }}>
          <Text>Tempo: {item.weather[0].description[0].toUpperCase() + item.weather[0].description.slice(1)}</Text>
          <Text>Temperatura: {Math.trunc(item.main.temp)}</Text>
          <Text>Sensação Termica: {Math.trunc(item.main.feels_like)} ºC</Text>
        </View>
      </View>

      <Animated.View style={expansaoCard}>
        <Animated.View style={[styles.weatherExtra, opacidadeCard, { flexDirection: 'row' }]}>
          <Image style={[styles.weatherImage, { backgroundColor: '#F3F5F9' }]} source={iconeVento(item)} />

          <View>
            <Text>Rajada de vento: {item.wind.gust ? Math.trunc((item.wind.gust * 3.6) * 100) / 100 : 0} km/h</Text>
            <Text>Chance de chuva: {item.pop ? item.pop * 100 : 0}</Text>
            <Text>Umidade: {item.main.humidity}%</Text>
          </View>
        </Animated.View>
      </Animated.View>
    </Pressable>
  ); 
}

const weatherImageBackground = (code) => {
  if (code >= 800 && code <= 802) {
    return '#69c5ff';
  } else if ((code >= 500 && code <= 531) || (code >= 803 && code <= 804)) {
    return '#b5b5b5';
  } else if (code >= 200 && code <= 232) {
    return '#5c5c5c';
  }

  return '#ccc';
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: '#ffe970',
    marginVertical: 5,
    borderRadius: 10,
    gap: 10,
  },
  weatherTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 3,
  },
  weatherImage: {
    padding: 20,
    borderRadius: 10,
    height: 60,
    width: 60,
    marginRight: 10,
  },
  weatherExtra: {
    marginTop: 20,
  }
});