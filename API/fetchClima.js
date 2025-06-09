import { API_KEYS } from '../config';
import { localizacaoAtual } from '../services/getLocationPermission';

export const fetchClima = async () => {
  try {
    const coordenadas = await localizacaoAtual();

    if (!coordenadas) {
      console.error('FetchClima: Erro de permissão.');
      return null;
    }

    let data;
    let toggle = false;

    if (toggle) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordenadas.latitude}&lon=${coordenadas.longitude}&units=metric&lang=pt_br&appid=${API_KEYS.CLIMA_API}`;
      const response = await fetch(url);
      data = await response.json();

    } else {
      data = {
        "coord": {
          "lon": -43.2425,
          "lat": -22.9322
        },
        "weather": [
          {
            "id": 803,
            "main": "Clouds",
            "description": "nublado",
            "icon": "04d"
          }
        ],
        "base": "stations",
        "main": {
          "temp": 23.93,
          "feels_like": 24.34,
          "temp_min": 23.7,
          "temp_max": 25.95,
          "pressure": 1010,
          "humidity": 75,
          "sea_level": 1010,
          "grnd_level": 1009
        },
        "visibility": 10000,
        "wind": {
          "speed": 4.12,
          "deg": 170
        },
        "clouds": {
          "all": 75
        },
        "dt": 1749412229,
        "sys": {
          "type": 2,
          "id": 2098643,
          "country": "BR",
          "sunrise": 1749374961,
          "sunset": 1749413702
        },
        "timezone": -10800,
        "id": 3473640,
        "name": "São Cristóvão",
        "cod": 200
      };
    }

    return {
      temperatura: data.main.temp,
      icone: data.weather[0].icon,
      climaDescricao: titleCase(data.weather[0].description),
    }

  } catch (error) {
    console.error('FetchClima: Erro ao buscar clima: ', error);
    return {
      temperatura: '-',
      icone: false,
      climaDescricao: 'Sem conexão',
    };
  }
}

const titleCase = (string) => {
  const palavras = string.split(' ');

  for (let i = 0; i < palavras.length; i++) {
    palavras[i] = palavras[i][0].toUpperCase() + palavras[i].substr(1);
  }

  return palavras.join(' ');
}

//https://pgeo3.rio.rj.gov.br/arcgis/rest/services/Cartografia/Limites_administrativos/FeatureServer/4/query?where=1=1&geometry=-43.242469,-22.932227&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=nome&returnGeometry=false&f=json