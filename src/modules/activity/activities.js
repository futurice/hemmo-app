import {List, Map} from 'immutable';

var activities = [
  Map({
    id: 0,
    key: 'Puuhasimme',
    route: require('../../../assets/Puuhailu.jpg'),
    subActivities: List([
      'Leipominen, kokkailu',
      'Piirtäminen, askartelu',
      'Kotihommia',
      'Lukeminen',
      'Rakentaminen, nikkarointi, korjaaminen'])}),
  Map({
    id: 1,
    key: 'Ulkoilimme, retkeilimme',
    route: require('../../../assets/Ulkoilu.jpg'),
    subActivities: List([
      'Ulkoilu',
      'Makkaranpaisto',
      'Retkeily',
      'Pihahommat',
      'Leikkipuisto',
      'Kalastaminen',
      'Mökkeily'])}),
  Map({
    id: 2,
    key: 'Leikimme, pelasimme',
    route: require('../../../assets/Leikkiminen.jpg'),
    subActivities: List([
      'Leikkiminen',
      'Lautapelit',
      'Videopelit',
      'Liikunta',
      'Uiminen'])}),
  Map({
    id: 3,
    key: 'Vietimme aikaa yhdessä',
    route: require('../../../assets/Yhdessa.jpg'),
    subActivities: List([
      'Saunominen',
      'Juttelu',
      'Kyläily',
      'Elokuvan katselu',
      'Kirjat'])}),
  Map({
    id: 4,
    key: 'Lemmikit, kotieläimet',
    route: require('../../../assets/Lemmikit.jpg'),
    subActivities: List([
      'Koira',
      'Kissa',
      'Hevonen',
      'Muut eläimet'])})
];

module.exports = activities;
