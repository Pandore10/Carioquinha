import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function OTTScreen() {
  const [ocorrencias, setOcorrencias] = useState([]);

  useEffect(() => {
    fetchDados();
  }, []);

  const fetchDados = async () => {
    try {
      const response = await fetch('https://ondetemtiroteio.com/reportview.php');
      const html = await response.text();

      const parsedData = parseHTMLTable(html);
      setOcorrencias(parsedData);
    
    } catch (error) {
      console.error('Erro ao buscar dados do OTT: ', error);
    }
  };

  return (
    <View>
      <FlatList 
        data={ocorrencias}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `${item.data}_${item.ocorrencia}_${item.bairro}`}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.data}>{item.data}</Text>
            <Text style={styles.bairro}>
              {item.bairro} - {item.municipio}
            </Text>
            <Text style={styles.ocorrencia}>{item.ocorrencia}</Text>
          </View>
        )}
      />
    </View>
  );
}

const parseHTMLTable = (html) => {
  const linhas = html.split('<tr>').slice(2);
  const ocorrencias = [];

  linhas.forEach(linha => {
    const colunas = linha.split('<td');

    if (colunas.length >= 6) {
      const extrairInfo = (coluna) => {
        const match = coluna.match(/>(.*?)<\/td>/);
        return match ? match[1].trim() : '';
      };

      const data = extrairInfo(colunas[1]);
      const ocorrencia = extrairInfo(colunas[2]);
      const bairro = extrairInfo(colunas[3]);
      const municipio = extrairInfo(colunas[4]);

      if (data) {
        ocorrencias.push({
          data,
          ocorrencia,
          bairro,
          municipio
        });
      }
    }
  });

  return ocorrencias;
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    elevation: 3,
    backgroundColor: '#f3f5f9',
    marginHorizontal: 8,
    marginVertical: 5,
    borderRadius: 8,
    gap: 5,
  },
  data: {
    fontWeight: 'bold',
    color: '#333',
  },
  bairro: {
    color: '#B5A197'
  },
  ocorrencia: {
    color: '#555',
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})