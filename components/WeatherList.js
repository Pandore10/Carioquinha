import { View, Text, StyleSheet } from 'react-native';

export default function WeatherList ({ dados }) {
  return (

    <View style={styles.card}>
      <Text>Vai ter um card bem legal aqui</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: '#ffe970',
    marginVertical: 5,
    borderRadius: 10,
    gap: 10,
  }
});