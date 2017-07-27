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
    text:
      'Kerro minulle vielä hieman tarkemmin? Leivoitteko tai kokkailitteko, puuhasitteko tai askartelitteko, luitko itseksesi, teittekö kotihommia tai rakentelitteko, nikkaroitteko tai korjailitte?',
    audio: 'hemmo_05',
    subActivities: List([
      Map({
        id: 0,
        key: 'leipominen',
        name: 'Leipominen',
        text: 'Millaista oli leipoa tai kokkailla?',
        audio: 'hemmo_14',
      }),
      Map({
        id: 1,
        key: 'piirtaminen',
        name: 'Piirtäminen',
        text: 'Millaista oli piirtää tai askarrella?',
        audio: 'hemmo_16',
      }),
      Map({
        id: 2,
        key: 'kotihommia',
        name: 'Kotihommia',
        text: 'Millaista oli tehdä kotihommia?',
        audio: 'hemmo_15',
      }),
      Map({
        id: 3,
        key: 'lukeminen',
        name: 'Lukeminen',
        text: 'Millaista oli lukea?',
        audio: 'hemmo_17',
      }),
      Map({
        id: 4,
        key: 'rakentaminen',
        name: 'Rakentaminen',
        text: 'Millaista oli rakennella, nikkaroida tai korjailla?',
        audio: 'hemmo_18',
      }),
      Map({
        id: 5,
        key: 'puuhasimme_muuta',
        name: 'Muuta',
        text: '',
        audio: '',
      }),
    ]),
  }),
  Map({
    id: 1,
    key: 'Ulkoilimme, retkeilimme',
    imageRoute: getImage('ulkoilimme'),
    text:
      'Kerro minulle vielä hieman tarkemmin? Ulkoilitteko, paistoitteko makkaraa, retkeilittekö, teittekö pihahommia, kävittekö leikkipuistossa, kalastitteko tai mökkeilittekö?',
    audio: 'hemmo_06',
    subActivities: List([
      Map({
        id: 0,
        key: 'ulkoilu',
        name: 'Ulkoilu',
        text: 'Millaista oli ulkoilla?',
        audio: 'hemmo_19',
      }),
      Map({
        id: 1,
        key: 'makkaranpaisto',
        name: 'Makkaranpaisto',
        text: 'Millaista oli paistaa makkaraa?',
        audio: 'hemmo_20',
      }),
      Map({
        id: 2,
        key: 'retkeily',
        name: 'Retkeily',
        text: 'Millaista oli retkeillä?',
        audio: 'hemmo_21',
      }),
      Map({
        id: 3,
        key: 'pihahommat',
        name: 'Pihahommat',
        text: 'Millaista oli tehdä pihahommia?',
        audio: 'hemmo_22',
      }),
      Map({
        id: 4,
        key: 'leikkipuisto',
        name: 'Leikkipuisto',
        text: 'Millaista oli käydä leikkipuistossa?',
        audio: 'hemmo_23',
      }),
      Map({
        id: 5,
        key: 'kalastaminen',
        name: 'Kalastaminen',
        text: 'Millaista oli kalastaa?',
        audio: 'hemmo_24',
      }),
      Map({
        id: 6,
        key: 'mokkeily',
        name: 'Mökkeily',
        text: 'Millaista oli mökkeillä?',
        audio: 'hemmo_25',
      }),
      Map({
        id: 7,
        key: 'ulkoilimme_muuta',
        name: 'Muuta',
        text: '',
        audio: '',
      }),
    ]),
  }),
  Map({
    id: 2,
    key: 'Leikimme, pelasimme',
    imageRoute: getImage('leikimme'),
    text:
      'Kerro minulle vielä hieman tarkemmin? Leikittekö, pelasitteko lautapelejä, pelasitteko videopelejä, liikuitteko tai uitteko?',
    audio: 'hemmo_07',
    subActivities: List([
      Map({
        id: 0,
        key: 'leikkiminen',
        name: 'Leikkiminen',
        text: 'Millaista oli leikkiä?',
        audio: 'hemmo_26',
      }),
      Map({
        id: 1,
        key: 'lautapelit',
        name: 'Lautapelit',
        text: 'Millaista oli pelata lautapelejä?',
        audio: 'hemmo_27',
      }),
      Map({
        id: 2,
        key: 'videopelit',
        name: 'Videopelit',
        text: 'Millaista oli pelata videopelejä',
        audio: 'hemmo_28',
      }),
      Map({
        id: 3,
        key: 'liikunta',
        name: 'Liikunta',
        text: 'Millaista oli liikkua?',
        audio: 'hemmo_29',
      }),
      Map({
        id: 4,
        key: 'uiminen',
        name: 'Uiminen',
        text: 'Millaista oli uida?',
        audio: 'hemmo_30',
      }),
      Map({ id: 5, key: 'leikimme_muuta', name: 'Muuta', text: '', audio: '' }),
    ]),
  }),
  Map({
    id: 3,
    key: 'Vietimme aikaa yhdessä',
    imageRoute: getImage('vietimme'),
    text:
      'Kerro minulle vielä hieman tarkemmin? Saunoitteko, juttelitteko, kyläilittekö, katselitteko elokuvaa tai luitteko yhdessä?',
    audio: 'hemmo_04',
    subActivities: List([
      Map({
        id: 0,
        key: 'saunominen',
        name: 'Saunominen',
        text: 'Millaista oli saunoa?',
        audio: 'hemmo_09',
      }),
      Map({
        id: 1,
        key: 'juttelu',
        name: 'Juttelu',
        text: 'Millaista oli jutella?',
        audio: 'hemmo_10',
      }),
      Map({
        id: 2,
        key: 'kylaily',
        name: 'Kyläily',
        text: 'Millaista oli kyläillä?',
        audio: 'hemmo_11',
      }),
      Map({
        id: 3,
        key: 'elokuva',
        name: 'Elokuvien katselu',
        text: 'Millaista oli katsella elokuvia',
        audio: 'hemmo_12',
      }),
      Map({
        id: 4,
        key: 'kirjat',
        name: 'Kirjat',
        text: 'Millaista oli lukea yhdessä?',
        audio: 'hemmo_13',
      }),
      Map({ id: 5, key: 'vietimme_muuta', name: 'Muuta', text: '', audio: '' }),
    ]),
  }),
  Map({
    id: 4,
    key: 'Lemmikit, kotieläimet',
    imageRoute: getImage('lemmikit'),
    text:
      'Kerro minulle vielä hieman tarkemmin? Koira, kissa, hevonen vai muita eläimiä?',
    audio: 'hemmo_08',
    subActivities: List([
      Map({
        id: 0,
        key: 'koira',
        name: 'Koira',
        text: 'Millaista oli hoitaa koiraa?',
        audio: 'hemmo_31',
      }),
      Map({
        id: 1,
        key: 'kissa',
        name: 'Kissa',
        text: 'Millaista oli hoitaa kissaa?',
        audio: 'hemmo_32',
      }),
      Map({
        id: 2,
        key: 'hevonen',
        name: 'Hevonen',
        text: 'Millaista oli hoitaa hevosta?',
        audio: 'hemmo_33',
      }),
      Map({
        id: 3,
        key: 'elaimet_muuta',
        name: 'Muut eläimet',
        text: '',
        audio: '',
      }),
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
