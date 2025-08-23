import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
  return (
    <View style={styles.headerBox}>
      <View style={styles.iconName}>
        <Image style={styles.logo} source={require('../assets/icon.png')} />
        <Text style={{fontWeight: 'bold', fontSize: 18}}>Carioquinha</Text>
      </View>

      <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.iconName}>
          <Ionicons name={'location'} color={'#000000'} size={20} />
          <Text>To aqui</Text>
        </View>

        <View style={styles.iconName}>
          <Ionicons name={'thermometer'} color={'#ff2424ff'} size={20} />
          <Text>0 ºC</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 20,
    width: 20,
  },
  headerBox: {
    backgroundColor: '#FFDB15',
    paddingTop: 45,
    paddingBottom: 15,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 15, 
    borderBottomRightRadius: 15,
    gap: 20,
  },
  iconName: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  }
});