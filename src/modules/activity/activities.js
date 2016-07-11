import {List} from 'immutable';

var activities = [
  {
    id: 0,
    key: 'Puuhailu',
    route: require('../../../assets/Puuhailu.jpg'),
    subActivities: List([
      'Leipominen, kokkailu',
      'Piirtäminen, askartelu',
      'Kotihommia',
      'Lukeminen',
      'Rakentaminen, nikkarointi, korjaaminen'])},
  {
    id: 1,
    key: 'Ulkoilu',
    route: require('../../../assets/Ulkoilu.jpg'),
    subActivities: List([
      'Ulkoilu',
      'Makkaranpaisto',
      'Retkeily',
      'Pihahommat',
      'Leikkipuisto',
      'Kalastaminen',
      'Mökkeily'])},
  {
    id: 2,
    key: 'Leikkiminen',
    route: require('../../../assets/Leikkiminen.jpg'),
    subActivities: List([
      'Leikkiminen',
      'Lautapelit',
      'Videopelit',
      'Liikunta',
      'Uiminen'])},
  {
    id: 3,
    key: 'Yhdessa',
    route: require('../../../assets/Yhdessa.jpg'),
    subActivities: List([
      'Saunominen',
      'Juttelu',
      'Kyläily',
      'Elokuvan katselu',
      'Kirjat'])},
  {
    id: 4,
    key: 'Lemmikit',
    route: require('../../../assets/Lemmikit.jpg'),
    subActivities: List([
      'Koira',
      'Kissa',
      'Hevonen',
      'Muut eläimet'])}
];

module.exports = activities;
