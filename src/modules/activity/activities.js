import {List, Map} from 'immutable';

var activities = [
  Map({
    id: 0,
    key: 'Puuhasimme',
    imageRoute: require('../../../assets/Puuhailu.jpg'),
    subActivities: List([
      'Leipominen, kokkailu',
      'Piirtäminen, askartelu',
      'Kotihommia',
      'Lukeminen',
      'Rakentaminen, nikkarointi, korjaaminen',
      'Muuta'])}),
  Map({
    id: 1,
    key: 'Ulkoilimme, retkeilimme',
    imageRoute: require('../../../assets/Ulkoilu.jpg'),
    subActivities: List([
      'Ulkoilu',
      'Makkaranpaisto',
      'Retkeily',
      'Pihahommat',
      'Leikkipuisto',
      'Kalastaminen',
      'Mökkeily',
      'Muuta'])}),
  Map({
    id: 2,
    key: 'Leikimme, pelasimme',
    imageRoute: require('../../../assets/Leikkiminen.jpg'),
    subActivities: List([
      'Leikkiminen',
      'Lautapelit',
      'Videopelit',
      'Liikunta',
      'Uiminen',
      'Muuta'])}),
  Map({
    id: 3,
    key: 'Vietimme aikaa yhdessä',
    imageRoute: require('../../../assets/Yhdessa.jpg'),
    subActivities: List([
      'Saunominen',
      'Juttelu',
      'Kyläily',
      'Elokuvan katselu',
      'Kirjat',
      'Muuta'])}),
  Map({
    id: 4,
    key: 'Lemmikit, kotieläimet',
    imageRoute: require('../../../assets/Lemmikit.jpg'),
    subActivities: List([
      'Koira',
      'Kissa',
      'Hevonen',
      'Muut eläimet'])})
];

module.exports = activities;
