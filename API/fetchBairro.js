import { localizacaoAtual } from "../services/getLocationPermission";

export const fetchBairro = async () => { 
  try {
    const coordenadas = await localizacaoAtual();

    if (!coordenadas) {
      console.error('FetchBairro: Erro de permissão.');
      return null;
    }

    let data;
    let toggle = false;

    if (toggle) {
      const url = `https://pgeo3.rio.rj.gov.br/arcgis/rest/services/Cartografia/Limites_administrativos/FeatureServer/4/query?where=1=1&geometry=${coordenadas.longitude},${coordenadas.latitude}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=nome&returnGeometry=false&f=json`
      const response = await fetch(url);
      data = await response.json();

    } else {
      data = {
        "objectIdFieldName": "objectid",
        "globalIdFieldName": "",
        "geometryType": "esriGeometryPolygon",
        "spatialReference": {
          "wkid": 31983,
          "latestWkid": 31983
        },
        "fields": [
          {
            "name": "nome",
            "alias": "NOME",
            "type": "esriFieldTypeString",
            "length": 50
          }
        ],
        "features": [
          {
            "attributes": {
              "nome": "Tijuca"
            }
          }
        ]
      };
    }

    return {
      bairro: data.features[0].attributes.nome,
    };

  } catch (error) {
    console.error("FetchBairro: Erro ao buscar bairro: ", error);
    return {bairro: '-'};
  }
};