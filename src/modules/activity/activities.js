import {List, Map} from 'immutable';
import {getImage} from '../../services/graphics';

var activities = [
  Map({
    id: 0,
    key: 'Puuhasimme',
    imageRoute: getImage('puuhasimme'),
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
    imageRoute: getImage('ulkoilimme'),
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
    imageRoute: getImage('leikimme'),
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
    imageRoute: getImage('vietimme'),
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
    imageRoute: getImage('lemmikit'),
    subActivities: List([
      'Koira',
      'Kissa',
      'Hevonen',
      'Muut eläimet'])})
];

module.exports = activities;
