/*
  All the needed information (key, name) about the activities shown in feedback section
*/

import {List, Map} from 'immutable';
import {getImage} from '../services/graphics';

var activities = [
  Map({
    id: 0,
    key: 'Puuhasimme',
    imageRoute: getImage('puuhasimme'),
    subActivities: List([
      Map({key: 'leipominen', name: 'Leipominen'}),
      Map({key: 'piirtaminen', name: 'Piirtäminen'}),
      Map({key: 'kotihommia', name: 'Kotihommia'}),
      Map({key: 'lukeminen', name: 'Lukeminen'}),
      Map({key: 'rakentaminen', name: 'Rakentaminen'}),
      Map({key: 'puuhasimme_muuta', name: 'Muuta'})])}),
  Map({
    id: 1,
    key: 'Ulkoilimme, retkeilimme',
    imageRoute: getImage('ulkoilimme'),
    subActivities: List([
      Map({key: 'ulkoilu', name: 'Ulkoilu'}),
      Map({key: 'makkaranpaisto', name: 'Makkaranpaisto'}),
      Map({key: 'retkeily', name: 'Retkeily'}),
      Map({key: 'pihahommat', name: 'Pihahommat'}),
      Map({key: 'leikkipuisto', name: 'Leikkipuisto'}),
      Map({key: 'kalastaminen', name: 'Kalastaminen'}),
      Map({key: 'mokkeily', name: 'Mökkeily'}),
      Map({key: 'ulkoilimme_muuta', name: 'Muuta'})])}),
  Map({
    id: 2,
    key: 'Leikimme, pelasimme',
    imageRoute: getImage('leikimme'),
    subActivities: List([
      Map({key: 'leikkiminen', name: 'Leikkiminen'}),
      Map({key: 'lautapelit', name: 'Lautapelit'}),
      Map({key: 'videopelit', name: 'Videopelit'}),
      Map({key: 'liikunta', name: 'Liikunta'}),
      Map({key: 'uiminen', name: 'Uiminen'}),
      Map({key: 'leikimme_muuta', name: 'Muuta'})])}),
  Map({
    id: 3,
    key: 'Vietimme aikaa yhdessä',
    imageRoute: getImage('vietimme'),
    subActivities: List([
      Map({key: 'saunominen', name: 'Saunominen'}),
      Map({key: 'juttelu', name: 'Juttelu'}),
      Map({key: 'kylaily', name: 'Kyläily'}),
      Map({key: 'elokuva', name: 'Elokuvien katselu'}),
      Map({key: 'kirjat', name: 'Kirjat'}),
      Map({key: 'vietimme_muuta', name: 'Muuta'})])}),
  Map({
    id: 4,
    key: 'Lemmikit, kotieläimet',
    imageRoute: getImage('lemmikit'),
    subActivities: List([
      Map({key: 'koira', name: 'Koira'}),
      Map({key: 'kissa', name: 'Kissa'}),
      Map({key: 'hevonen', name: 'Hevonen'}),
      Map({key: 'elaimet_muuta', name: 'Muut eläimet'})])})
];

module.exports = activities;
