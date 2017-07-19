/*
  All the needed information (key, name) about the activities shown in feedback section
*/

import { List, Map } from 'immutable';
import { getImage } from '../services/graphics';

const activities = [
  Map({
    id: 0,
    key: 'Puuhasimme',
    imageRoute: getImage('puuhasimme'),
    subActivities: List([
      Map({ id: 0, key: 'leipominen', name: 'Leipominen' }),
      Map({ id: 1, key: 'piirtaminen', name: 'Piirtäminen' }),
      Map({ id: 2, key: 'kotihommia', name: 'Kotihommia' }),
      Map({ id: 3, key: 'lukeminen', name: 'Lukeminen' }),
      Map({ id: 4, key: 'rakentaminen', name: 'Rakentaminen' }),
      Map({ id: 5, key: 'puuhasimme_muuta', name: 'Muuta' }),
    ]),
  }),
  Map({
    id: 1,
    key: 'Ulkoilimme, retkeilimme',
    imageRoute: getImage('ulkoilimme'),
    subActivities: List([
      Map({ id: 0, key: 'ulkoilu', name: 'Ulkoilu' }),
      Map({ id: 1, key: 'makkaranpaisto', name: 'Makkaranpaisto' }),
      Map({ id: 2, key: 'retkeily', name: 'Retkeily' }),
      Map({ id: 3, key: 'pihahommat', name: 'Pihahommat' }),
      Map({ id: 4, key: 'leikkipuisto', name: 'Leikkipuisto' }),
      Map({ id: 5, key: 'kalastaminen', name: 'Kalastaminen' }),
      Map({ id: 6, key: 'mokkeily', name: 'Mökkeily' }),
      Map({ id: 7, key: 'ulkoilimme_muuta', name: 'Muuta' }),
    ]),
  }),
  Map({
    id: 2,
    key: 'Leikimme, pelasimme',
    imageRoute: getImage('leikimme'),
    subActivities: List([
      Map({ id: 0, key: 'leikkiminen', name: 'Leikkiminen' }),
      Map({ id: 1, key: 'lautapelit', name: 'Lautapelit' }),
      Map({ id: 2, key: 'videopelit', name: 'Videopelit' }),
      Map({ id: 3, key: 'liikunta', name: 'Liikunta' }),
      Map({ id: 4, key: 'uiminen', name: 'Uiminen' }),
      Map({ id: 5, key: 'leikimme_muuta', name: 'Muuta' }),
    ]),
  }),
  Map({
    id: 3,
    key: 'Vietimme aikaa yhdessä',
    imageRoute: getImage('vietimme'),
    subActivities: List([
      Map({ id: 0, key: 'saunominen', name: 'Saunominen' }),
      Map({ id: 1, key: 'juttelu', name: 'Juttelu' }),
      Map({ id: 2, key: 'kylaily', name: 'Kyläily' }),
      Map({ id: 3, key: 'elokuva', name: 'Elokuvien katselu' }),
      Map({ id: 4, key: 'kirjat', name: 'Kirjat' }),
      Map({ id: 5, key: 'vietimme_muuta', name: 'Muuta' }),
    ]),
  }),
  Map({
    id: 4,
    key: 'Lemmikit, kotieläimet',
    imageRoute: getImage('lemmikit'),
    subActivities: List([
      Map({ id: 0, key: 'koira', name: 'Koira' }),
      Map({ id: 1, key: 'kissa', name: 'Kissa' }),
      Map({ id: 2, key: 'hevonen', name: 'Hevonen' }),
      Map({ id: 3, key: 'elaimet_muuta', name: 'Muut eläimet' }),
    ]),
  }),
  /*
  Map({
    id: 5,
    key: 'Muuta',
    imageRoute: getImage('muuta'),
    subActivities: List() }),
    */
];

module.exports = activities;
