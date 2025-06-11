import { View, FlatList, StyleSheet, Text, Image, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useState, useRef } from 'react';

const MOCK_DADOS = {"cod":"200","message":0,"cnt":40,"list":[{"dt":1749610800,"main":{"temp":8.77,"feels_like":7.07,"temp_min":8.77,"temp_max":10.33,"pressure":1020,"sea_level":1020,"grnd_level":1012,"humidity":94,"temp_kf":-1.56},"weather":[{"id":804,"main":"Clouds","description":"nublado","icon":"04n"}],"clouds":{"all":85},"wind":{"speed":2.95,"deg":162,"gust":4.9},"visibility":10000,"pop":0,"sys":{"pod":"n"},"dt_txt":"2025-06-11 03:00:00"},{"dt":1749621600,"main":{"temp":9.78,"feels_like":7.88,"temp_min":9.78,"temp_max":10.68,"pressure":1019,"sea_level":1019,"grnd_level":1011,"humidity":91,"temp_kf":-0.9},"weather":[{"id":804,"main":"Clouds","description":"nublado","icon":"04d"}],"clouds":{"all":92},"wind":{"speed":3.68,"deg":182,"gust":4.87},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2025-06-11 06:00:00"},{"dt":1749632400,"main":{"temp":12.16,"feels_like":11.62,"temp_min":12.16,"temp_max":12.16,"pressure":1019,"sea_level":1019,"grnd_level":1012,"humidity":84,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"nublado","icon":"04d"}],"clouds":{"all":100},"wind":{"speed":3.55,"deg":193,"gust":5.38},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2025-06-11 09:00:00"},{"dt":1749643200,"main":{"temp":15.16,"feels_like":14.45,"temp_min":15.16,"temp_max":15.16,"pressure":1019,"sea_level":1019,"grnd_level":1011,"humidity":66,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"nublado","icon":"04d"}],"clouds":{"all":88},"wind":{"speed":5.07,"deg":176,"gust":6.57},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2025-06-11 12:00:00"},{"dt":1749654000,"main":{"temp":14.26,"feels_like":13.46,"temp_min":14.26,"temp_max":14.26,"pressure":1019,"sea_level":1019,"grnd_level":1012,"humidity":66,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"nuvens dispersas","icon":"03d"}],"clouds":{"all":50},"wind":{"speed":5.24,"deg":171,"gust":7.77},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2025-06-11 15:00:00"},{"dt":1749664800,"main":{"temp":13.38,"feels_like":12.78,"temp_min":13.38,"temp_max":13.38,"pressure":1018,"sea_level":1018,"grnd_level":1011,"humidity":77,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"nublado","icon":"04d"}],"clouds":{"all":57},"wind":{"speed":3.99,"deg":170,"gust":6.05},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2025-06-11 18:00:00"},{"dt":1749675600,"main":{"temp":11.06,"feels_like":10.65,"temp_min":11.06,"temp_max":11.06,"pressure":1019,"sea_level":1019,"grnd_level":1011,"humidity":93,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"algumas nuvens","icon":"02d"}],"clouds":{"all":16},"wind":{"speed":3.37,"deg":169,"gust":4.1},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2025-06-11 21:00:00"},{"dt":1749686400,"main":{"temp":11.2,"feels_like":10.83,"temp_min":11.2,"temp_max":11.2,"pressure":1018,"sea_level":1018,"grnd_level":1011,"humidity":94,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"nublado","icon":"04n"}],"clouds":{"all":58},"wind":{"speed":3.74,"deg":166,"gust":5.24},"visibility":10000,"pop":0,"sys":{"pod":"n"},"dt_txt":"2025-06-12 00:00:00"},{"dt":1749697200,"main":{"temp":10.95,"feels_like":10.53,"temp_min":10.95,"temp_max":10.95,"pressure":1017,"sea_level":1017,"grnd_level":1010,"humidity":93,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"nublado","icon":"04n"}],"clouds":{"all":95},"wind":{"speed":4.27,"deg":183,"gust":10.83},"visibility":10000,"pop":0,"sys":{"pod":"n"},"dt_txt":"2025-06-12 03:00:00"},{"dt":1749708000,"main":{"temp":12.1,"feels_like":11.56,"temp_min":12.1,"temp_max":12.1,"pressure":1017,"sea_level":1017,"grnd_level":1010,"humidity":84,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"nublado","icon":"04d"}],"clouds":{"all":87},"wind":{"speed":6,"deg":172,"gust":13.24},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2025-06-12 06:00:00"},{"dt":1749718800,"main":{"temp":12.78,"feels_like":12.28,"temp_min":12.78,"temp_max":12.78,"pressure":1017,"sea_level":1017,"grnd_level":1010,"humidity":83,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"nublado","icon":"04d"}],"clouds":{"all":98},"wind":{"speed":7.19,"deg":162,"gust":13.37},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2025-06-12 09:00:00"},{"dt":1749729600,"main":{"temp":13.47,"feels_like":12.94,"temp_min":13.47,"temp_max":13.47,"pressure":1017,"sea_level":1017,"grnd_level":1009,"humidity":79,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"nublado","icon":"04d"}],"clouds":{"all":99},"wind":{"speed":6.65,"deg":149,"gust":13.3},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2025-06-12 12:00:00"},{"dt":1749740400,"main":{"temp":13.36,"feels_like":12.76,"temp_min":13.36,"temp_max":13.36,"pressure":1016,"sea_level":1016,"grnd_level":1009,"humidity":77,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"nublado","icon":"04d"}],"clouds":{"all":100},"wind":{"speed":7.46,"deg":142,"gust":14.45},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2025-06-12 15:00:00"},{"dt":1749751200,"main":{"temp":12.57,"feels_like":12.05,"temp_min":12.57,"temp_max":12.57,"pressure":1015,"sea_level":1015,"grnd_level":1008,"humidity":83,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"nublado","icon":"04d"}],"clouds":{"all":90},"wind":{"speed":6.8,"deg":142,"gust":13.43},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2025-06-12 18:00:00"},{"dt":1749762000,"main":{"temp":11.64,"feels_like":11.31,"temp_min":11.64,"temp_max":11.64,"pressure":1014,"sea_level":1014,"grnd_level":1007,"humidity":94,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"chuva leve","icon":"10d"}],"clouds":{"all":75},"wind":{"speed":6.03,"deg":157,"gust":12.26},"visibility":10000,"pop":0.39,"rain":{"3h":0.23},"sys":{"pod":"d"},"dt_txt":"2025-06-12 21:00:00"},{"dt":1749772800,"main":{"temp":11.8,"feels_like":11.52,"temp_min":11.8,"temp_max":11.8,"pressure":1014,"sea_level":1014,"grnd_level":1007,"humidity":95,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"nublado","icon":"04n"}],"clouds":{"all":77},"wind":{"speed":3.91,"deg":180,"gust":7.58},"visibility":10000,"pop":0,"sys":{"pod":"n"},"dt_txt":"2025-06-13 00:00:00"},{"dt":1749783600,"main":{"temp":11.56,"feels_like":11.3,"temp_min":11.56,"temp_max":11.56,"pressure":1014,"sea_level":1014,"grnd_level":1006,"humidity":97,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"nublado","icon":"04n"}],"clouds":{"all":59},"wind":{"speed":2.47,"deg":203,"gust":2.81},"visibility":10000,"pop":0,"sys":{"pod":"n"},"dt_txt":"2025-06-13 03:00:00"},{"dt":1749794400,"main":{"temp":13.59,"feels_like":13.41,"temp_min":13.59,"temp_max":13.59,"pressure":1014,"sea_level":1014,"grnd_level":1007,"humidity":92,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"nuvens dispersas","icon":"03d"}],"clouds":{"all":38},"wind":{"speed":2.44,"deg":188,"gust":3.01},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2025-06-13 06:00:00"},{"dt":1749805200,"main":{"temp":16.19,"feels_like":15.95,"temp_min":16.19,"temp_max":16.19,"pressure":1016,"sea_level":1016,"grnd_level":1009,"humidity":80,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"céu limpo","icon":"01d"}],"clouds":{"all":7},"wind":{"speed":4.09,"deg":178,"gust":6.2},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2025-06-13 09:00:00"},{"dt":1749816000,"main":{"temp":16.56,"feels_like":16.36,"temp_min":16.56,"temp_max":16.56,"pressure":1016,"sea_level":1016,"grnd_level":1009,"humidity":80,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"nuvens dispersas","icon":"03d"}],"clouds":{"all":36},"wind":{"speed":4.24,"deg":174,"gust":5.52},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2025-06-13 12:00:00"},{"dt":1749826800,"main":{"temp":17.48,"feels_like":17.27,"temp_min":17.48,"temp_max":17.48,"pressure":1017,"sea_level":1017,"grnd_level":1010,"humidity":76,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"nublado","icon":"04d"}],"clouds":{"all":100},"wind":{"speed":4.23,"deg":182,"gust":5.52},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2025-06-13 15:00:00"},{"dt":1749837600,"main":{"temp":16.17,"feels_like":16.04,"temp_min":16.17,"temp_max":16.17,"pressure":1017,"sea_level":1017,"grnd_level":1010,"humidity":84,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"nublado","icon":"04d"}],"clouds":{"all":97},"wind":{"speed":3.64,"deg":183,"gust":5.54},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2025-06-13 18:00:00"},{"dt":1749848400,"main":{"temp":13.78,"feels_like":13.69,"temp_min":13.78,"temp_max":13.78,"pressure":1017,"sea_level":1017,"grnd_level":1010,"humidity":95,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"nublado","icon":"04d"}],"clouds":{"all":100},"wind":{"speed":1.96,"deg":171,"gust":1.66},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2025-06-13 21:00:00"},{"dt":1749859200,"main":{"temp":13.8,"feels_like":13.77,"temp_min":13.8,"temp_max":13.8,"pressure":1017,"sea_level":1017,"grnd_level":1009,"humidity":97,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"chuva leve","icon":"10n"}],"clouds":{"all":100},"wind":{"speed":2.39,"deg":114,"gust":2.35},"visibility":10000,"pop":0.25,"rain":{"3h":0.41},"sys":{"pod":"n"},"dt_txt":"2025-06-14 00:00:00"},{"dt":1749870000,"main":{"temp":12.62,"feels_like":12.52,"temp_min":12.62,"temp_max":12.62,"pressure":1016,"sea_level":1016,"grnd_level":1009,"humidity":99,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"nublado","icon":"04n"}],"clouds":{"all":99},"wind":{"speed":0.98,"deg":144,"gust":0.88},"visibility":2239,"pop":0.04,"sys":{"pod":"n"},"dt_txt":"2025-06-14 03:00:00"},{"dt":1749880800,"main":{"temp":13.29,"feels_like":13.29,"temp_min":13.29,"temp_max":13.29,"pressure":1016,"sea_level":1016,"grnd_level":1008,"humidity":100,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"chuva leve","icon":"10d"}],"clouds":{"all":100},"wind":{"speed":3.46,"deg":169,"gust":5.76},"pop":1,"rain":{"3h":1.11},"sys":{"pod":"d"},"dt_txt":"2025-06-14 06:00:00"},{"dt":1749891600,"main":{"temp":13.82,"feels_like":13.87,"temp_min":13.82,"temp_max":13.82,"pressure":1015,"sea_level":1015,"grnd_level":1008,"humidity":100,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"chuva leve","icon":"10d"}],"clouds":{"all":100},"wind":{"speed":2.69,"deg":124,"gust":2.74},"pop":1,"rain":{"3h":1.39},"sys":{"pod":"d"},"dt_txt":"2025-06-14 09:00:00"},{"dt":1749902400,"main":{"temp":13.64,"feels_like":13.64,"temp_min":13.64,"temp_max":13.64,"pressure":1015,"sea_level":1015,"grnd_level":1008,"humidity":99,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"chuva leve","icon":"10d"}],"clouds":{"all":100},"wind":{"speed":3.09,"deg":155,"gust":4.58},"pop":1,"rain":{"3h":0.78},"sys":{"pod":"d"},"dt_txt":"2025-06-14 12:00:00"},{"dt":1749913200,"main":{"temp":13.58,"feels_like":13.55,"temp_min":13.58,"temp_max":13.58,"pressure":1014,"sea_level":1014,"grnd_level":1007,"humidity":98,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"chuva leve","icon":"10d"}],"clouds":{"all":100},"wind":{"speed":3.04,"deg":175,"gust":3.79},"visibility":2676,"pop":0.2,"rain":{"3h":0.2},"sys":{"pod":"d"},"dt_txt":"2025-06-14 15:00:00"},{"dt":1749924000,"main":{"temp":15.75,"feels_like":15.52,"temp_min":15.75,"temp_max":15.75,"pressure":1013,"sea_level":1013,"grnd_level":1006,"humidity":82,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"nublado","icon":"04d"}],"clouds":{"all":67},"wind":{"speed":4.65,"deg":189,"gust":7.22},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2025-06-14 18:00:00"},{"dt":1749934800,"main":{"temp":13.93,"feels_like":13.7,"temp_min":13.93,"temp_max":13.93,"pressure":1014,"sea_level":1014,"grnd_level":1007,"humidity":89,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"céu limpo","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":3.74,"deg":240,"gust":4.27},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2025-06-14 21:00:00"},{"dt":1749945600,"main":{"temp":13.35,"feels_like":13.09,"temp_min":13.35,"temp_max":13.35,"pressure":1015,"sea_level":1015,"grnd_level":1008,"humidity":90,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"nuvens dispersas","icon":"03n"}],"clouds":{"all":30},"wind":{"speed":1.23,"deg":348,"gust":1.33},"visibility":10000,"pop":0,"sys":{"pod":"n"},"dt_txt":"2025-06-15 00:00:00"},{"dt":1749956400,"main":{"temp":12.5,"feels_like":12.18,"temp_min":12.5,"temp_max":12.5,"pressure":1016,"sea_level":1016,"grnd_level":1009,"humidity":91,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"nublado","icon":"04n"}],"clouds":{"all":100},"wind":{"speed":1.58,"deg":57,"gust":1.52},"visibility":10000,"pop":0,"sys":{"pod":"n"},"dt_txt":"2025-06-15 03:00:00"},{"dt":1749967200,"main":{"temp":13.08,"feels_like":12.66,"temp_min":13.08,"temp_max":13.08,"pressure":1017,"sea_level":1017,"grnd_level":1009,"humidity":85,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"nublado","icon":"04d"}],"clouds":{"all":100},"wind":{"speed":0.81,"deg":132,"gust":1.35},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2025-06-15 06:00:00"},{"dt":1749978000,"main":{"temp":13.72,"feels_like":13.18,"temp_min":13.72,"temp_max":13.72,"pressure":1017,"sea_level":1017,"grnd_level":1010,"humidity":78,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"nublado","icon":"04d"}],"clouds":{"all":100},"wind":{"speed":2.41,"deg":161,"gust":2.56},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2025-06-15 09:00:00"},{"dt":1749988800,"main":{"temp":14.44,"feels_like":13.87,"temp_min":14.44,"temp_max":14.44,"pressure":1018,"sea_level":1018,"grnd_level":1011,"humidity":74,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"nublado","icon":"04d"}],"clouds":{"all":67},"wind":{"speed":3.66,"deg":151,"gust":4.17},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2025-06-15 12:00:00"},{"dt":1749999600,"main":{"temp":14.55,"feels_like":14.02,"temp_min":14.55,"temp_max":14.55,"pressure":1018,"sea_level":1018,"grnd_level":1010,"humidity":75,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"algumas nuvens","icon":"02d"}],"clouds":{"all":11},"wind":{"speed":4.41,"deg":155,"gust":5.47},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2025-06-15 15:00:00"},{"dt":1750010400,"main":{"temp":13.82,"feels_like":13.45,"temp_min":13.82,"temp_max":13.82,"pressure":1017,"sea_level":1017,"grnd_level":1010,"humidity":84,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"céu limpo","icon":"01d"}],"clouds":{"all":10},"wind":{"speed":4.2,"deg":170,"gust":5.51},"visibility":10000,"pop":0.05,"sys":{"pod":"d"},"dt_txt":"2025-06-15 18:00:00"},{"dt":1750021200,"main":{"temp":11.72,"feels_like":11.43,"temp_min":11.72,"temp_max":11.72,"pressure":1018,"sea_level":1018,"grnd_level":1010,"humidity":95,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"céu limpo","icon":"01d"}],"clouds":{"all":9},"wind":{"speed":3.74,"deg":198,"gust":5.06},"visibility":10000,"pop":0.01,"sys":{"pod":"d"},"dt_txt":"2025-06-15 21:00:00"},{"dt":1750032000,"main":{"temp":11.45,"feels_like":10.87,"temp_min":11.45,"temp_max":11.45,"pressure":1018,"sea_level":1018,"grnd_level":1011,"humidity":85,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"algumas nuvens","icon":"02n"}],"clouds":{"all":13},"wind":{"speed":3.03,"deg":275,"gust":2.8},"visibility":10000,"pop":0,"sys":{"pod":"n"},"dt_txt":"2025-06-16 00:00:00"}],"city":{"id":2641549,"name":"Newtonhill","coord":{"lat":57,"lon":-2.15},"country":"GB","population":3284,"timezone":3600,"sunrise":1749611713,"sunset":1749675691}}

export default function WeatherList({ dados }) {
  const [cardsAbertos, setCardsAbertos] = useState(new Set());
  const flatListRef = useRef(null);
  

  let previsoes = dados?.list || MOCK_DADOS.list;

  const previsoesFiltrado = previsoes.filter((item) => {
    const [data, hora] = item.dt_txt.split(' ');
    const hoje = new Date().toISOString().split('T')[0];
    const horariosPermitidos = ['09:00:00', '12:00:00', '15:00:00'];

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

  //Controle da Animação de expansão do card
  const toggleExpansao = (id, index) => {
    setCardsAbertos((prev) => {
      const novoSet = new Set(prev);

      if (novoSet.has(id)) {
        novoSet.delete(id)
      } else {
        novoSet.clear()
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
  )
}

const weatherImageBackground = (code) => {
  if (code >= 800 && code <= 802) {
    return '#69c5ff';
  
  } else if ((code >= 500 && code <= 531) || (code >= 803 && code <= 804)) {
    return '#b5b5b5';
  
  } else if (code >= 200 && code <= 232) {
    return '#5c5c5c';

  }
}

function PrevisaoCard({ item, taAberto, toggle }) {
  const unix = new Date(item.dt * 1000);
  const semana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  const diaSemana = semana[unix.getDay()];
  const dataISO = unix.toISOString().split('T')[0];
  const [ano, mes, dia] = dataISO.split('-');

  //Animação dos cards
  const expansaoCard = useAnimatedStyle(() => ({
    height: withTiming(taAberto ? 100 : 0, { duration: 300 }),
  }));

  //Opacidade da parte extra do card
  const opacidadeCard = useAnimatedStyle(() => ({
    opacity: withTiming(taAberto ? 1 : 0, { duration: 350 }),
  }));

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
        <Image style={[styles.weatherImage, { backgroundColor: weatherImageBackground(item.weather[0].id)}]} source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }} />

        <View style={{ flexDirection: 'column' }}>
          <Text>Tempo: {item.weather[0].description[0].toUpperCase() + item.weather[0].description.slice(1)}</Text>
          <Text>Temperatura: {Math.trunc(item.main.temp)} ºC</Text>
          <Text>Sensação Térmica: {Math.trunc(item.main.feels_like)} ºC</Text>
        </View>

      </View>
              
      <Animated.View style={expansaoCard}>
        <Animated.View style={[styles.weatherExtra, opacidadeCard, { flexDirection: 'row'}]}>
          <Image style={[styles.weatherImage, { backgroundColor: '#F3F5F9' }]} source={iconeVento(item)} />

          <View>
            <Text>Rajada de vento: {item.wind.gust ? Math.trunc((item.wind.gust * 3.6) * 100) / 100 : 0} km/h</Text>
            <Text>Chance de chuva: {item.pop ? item.pop * 100 : 0}%</Text>
            <Text>Umidade: {item.main.humidity}%</Text>
          </View>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: '#ffe970',
    marginVertical: 5,
    marginHorizontal: 0,
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