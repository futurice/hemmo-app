/*
  All the needed information (key, name) about the activities shown in feedback section
*/

import { List, Map } from 'immutable';
import { getImage } from '../services/graphics';

const activities = [
  Map({
    id: 0,
    name: 'Puuhasimme',
    key: 'puuhasimme',
    text:
      'Kerro minulle vielä hieman tarkemmin? Leivoitteko tai kokkailitteko, puuhasitteko tai askartelitteko, luitko itseksesi, teittekö kotihommia tai rakentelitteko, nikkaroitteko tai korjailitte?',
    audio: 'hemmo_05',
    subActivities: List([
      Map({
        id: 0,
        name: 'Leipominen',
        key: 'leipominen',
        text: 'Millaista oli leipoa tai kokkailla?',
        audio: 'hemmo_14',
      }),
      Map({
        id: 1,
        name: 'Piirtäminen',
        key: 'piirtaminen',
        text: 'Millaista oli piirtää tai askarrella?',
        audio: 'hemmo_16',
      }),
      Map({
        id: 2,
        name: 'Kotihommia',
        key: 'kotihommia',
        text: 'Millaista oli tehdä kotihommia?',
        audio: 'hemmo_15',
      }),
      Map({
        id: 3,
        name: 'Lukeminen',
        key: 'lukeminen',
        text: 'Millaista oli lukea?',
        audio: 'hemmo_17',
      }),
      Map({
        id: 4,
        name: 'Rakentaminen',
        key: 'rakentaminen',
        text: 'Millaista oli rakennella, nikkaroida tai korjailla?',
        audio: 'hemmo_18',
      }),
    ]),
  }),
  Map({
    id: 1,
    name: 'Ulkoilimme, retkeilimme',
    key: 'ulkoilimme',
    text:
      'Kerro minulle vielä hieman tarkemmin? Ulkoilitteko, paistoitteko makkaraa, retkeilittekö, teittekö pihahommia, kävittekö leikkipuistossa, kalastitteko tai mökkeilittekö?',
    audio: 'hemmo_06',
    subActivities: List([
      Map({
        id: 0,
        name: 'Ulkoilu',
        key: 'ulkoilu',
        text: 'Millaista oli ulkoilla?',
        audio: 'hemmo_19',
      }),
      Map({
        id: 1,
        name: 'Makkaranpaisto',
        key: 'makkaranpaisto',
        text: 'Millaista oli paistaa makkaraa?',
        audio: 'hemmo_20',
      }),
      Map({
        id: 2,
        name: 'Retkeily',
        key: 'retkeily',
        text: 'Millaista oli retkeillä?',
        audio: 'hemmo_21',
      }),
      Map({
        id: 3,
        name: 'Pihahommat',
        key: 'pihahommat',
        text: 'Millaista oli tehdä pihahommia?',
        audio: 'hemmo_22',
      }),
      Map({
        id: 4,
        name: 'Leikkipuisto',
        key: 'leikkipuisto',
        text: 'Millaista oli käydä leikkipuistossa?',
        audio: 'hemmo_23',
      }),
      Map({
        id: 5,
        name: 'Kalastaminen',
        key: 'kalastaminen',
        text: 'Millaista oli kalastaa?',
        audio: 'hemmo_24',
      }),
      Map({
        id: 6,
        name: 'Mökkeily',
        key: 'mokkeily',
        text: 'Millaista oli mökkeillä?',
        audio: 'hemmo_25',
      }),
    ]),
  }),
  Map({
    id: 2,
    name: 'Leikimme, pelasimme',
    key: 'leikimme',
    text:
      'Kerro minulle vielä hieman tarkemmin? Leikittekö, pelasitteko lautapelejä, pelasitteko videopelejä, liikuitteko tai uitteko?',
    audio: 'hemmo_07',
    subActivities: List([
      Map({
        id: 0,
        name: 'Leikkiminen',
        key: 'leikkiminen',
        text: 'Millaista oli leikkiä?',
        audio: 'hemmo_26',
      }),
      Map({
        id: 1,
        name: 'Lautapelit',
        key: 'lautapelit',
        text: 'Millaista oli pelata lautapelejä?',
        audio: 'hemmo_27',
      }),
      Map({
        id: 2,
        name: 'Videopelit',
        key: 'videopelit',
        text: 'Millaista oli pelata videopelejä?',
        audio: 'hemmo_28',
      }),
      Map({
        id: 3,
        name: 'Liikunta',
        key: 'liikunta',
        text: 'Millaista oli liikkua?',
        audio: 'hemmo_29',
      }),
      Map({
        id: 4,
        name: 'Uiminen',
        key: 'uiminen',
        text: 'Millaista oli uida?',
        audio: 'hemmo_30',
      }),
    ]),
  }),
  Map({
    id: 3,
    name: 'Vietimme aikaa yhdessä',
    key: 'vietimme',
    text:
      'Kerro minulle vielä hieman tarkemmin? Saunoitteko, juttelitteko, kyläilittekö, katselitteko elokuvaa tai luitteko yhdessä?',
    audio: 'hemmo_04',
    subActivities: List([
      Map({
        id: 0,
        name: 'Saunominen',
        key: 'saunominen',
        text: 'Millaista oli saunoa?',
        audio: 'hemmo_09',
      }),
      Map({
        id: 1,
        name: 'Juttelu',
        key: 'juttelu',
        text: 'Millaista oli jutella?',
        audio: 'hemmo_10',
      }),
      Map({
        id: 2,
        name: 'Kyläily',
        key: 'kylaily',
        text: 'Millaista oli kyläillä?',
        audio: 'hemmo_11',
      }),
      Map({
        id: 3,
        name: 'Elokuvien katselu',
        key: 'elokuva',
        text: 'Millaista oli katsella elokuvia?',
        audio: 'hemmo_12',
      }),
      Map({
        id: 4,
        name: 'Kirjat',
        key: 'kirjat',
        text: 'Millaista oli lukea yhdessä?',
        audio: 'hemmo_13',
      }),
    ]),
  }),
  Map({
    id: 4,
    name: 'Lemmikit, kotieläimet',
    key: 'lemmikit',
    text:
      'Kerro minulle vielä hieman tarkemmin? Koira, kissa, hevonen vai muita eläimiä?',
    audio: 'hemmo_08',
    subActivities: List([
      Map({
        id: 0,
        name: 'Koira',
        key: 'koira',
        text: 'Millaista oli hoitaa koiraa?',
        audio: 'hemmo_31',
      }),
      Map({
        id: 1,
        name: 'Kissa',
        key: 'kissa',
        text: 'Millaista oli hoitaa kissaa?',
        audio: 'hemmo_32',
      }),
      Map({
        id: 2,
        name: 'Hevonen',
        key: 'hevonen',
        text: 'Millaista oli hoitaa hevosta?',
        audio: 'hemmo_33',
      }),
    ]),
  }),
];

module.exports = activities;
