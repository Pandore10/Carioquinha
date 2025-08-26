import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { MOCK_NEWS } from '../mock-data';

export default function NewsScreen() {
  
  //Temp
  const dados = MOCK_NEWS.articles;

  if (!dados) {
    return (
      <View style={{ margin: 10 }}>
        <View style={styles.noNews}>
          <Text>Sem notícias disponíveis no momento.</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.listaNoticias}>
      <FlatList 
        style={{ borderRadius: 8 }}
        showsVerticalScrollIndicator={false}
        data={dados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.imagemNoticia}/>
            <Text style={styles.tituloNoticia}>{item.title}</Text>
            <View style={styles.lowerCardBox}>
              <TouchableOpacity style={styles.lerMais} onPress={() => Linking.openURL(item.url)}>
                <Text>Ler mais</Text>
              </TouchableOpacity>
              <Text style={styles.textoFonte}>{item.source.name}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listaNoticias: {
    padding: 20,
  },
  card: {
    backgroundColor: '#f3f5f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  lowerCardBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  imagemNoticia: {
    height: 180,
    aspectRatio: 1.7,
    marginBottom: 10,
    borderRadius: 8,
  },
  tituloNoticia: {
    textAlign: 'justify'
  },
  lerMais: {
    alignSelf: 'flex-start',
    backgroundColor: '#f3f5f9',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 8,
    elevation: 5,
  },
  textoFonte: {
    color: '#888'
  },
  noNews: {
    padding: 20,
    alignItems: 'center',
    opacity: 0.8,
    backgroundColor: '#fff'
  }
})