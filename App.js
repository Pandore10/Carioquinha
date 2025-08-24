import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import NewsScreen from './screens/NewsScreen';
import BusScreen from './screens/BusScreen';
import OTTScreen from './screens/OTTScreen';

import Header from './components/Header';

/*
 Palette:
 -- #FFDB15 - Yellow
 -- #020301 - Black
 -- #B5A197 - Khaki
 -- #F3F5F9 - White
 */

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Header />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Notícias") {
                iconName = focused ? 'newspaper' : 'newspaper-outline';
              } else if (route.name === "Onibus") {
                iconName = focused ? 'bus' : 'bus-outline';
              } else if (route.name === "Ocorrências") {
                iconName = focused ? 'alert-circle' : 'alert-circle-outline';
              }

              return <Ionicons name={iconName} color={color} size={size} />
            },
            tabBarActiveTintColor: '#020301',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name='Notícias' component={NewsScreen} />
          <Tab.Screen name='Onibus' component={BusScreen} />
          <Tab.Screen name='Ocorrências' component={OTTScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
})