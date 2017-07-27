import { Map } from 'immutable';
import { getImage } from '../services/graphics';

const moods = [
  Map({
    id: 0,
    name: 'Innostunut',
    key: 'innostunut',
    imageRoute: getImage('innostunut'),
  }),
  Map({
    id: 1,
    name: 'Iloinen',
    key: 'iloinen',
    imageRoute: getImage('iloinen'),
  }),
  Map({
    id: 3,
    name: 'Jännittynyt',
    key: 'jannittynyt',
    imageRoute: getImage('jannittynyt'),
  }),
  Map({
    id: 4,
    name: 'Yksinäinen',
    key: 'yksinainen',
    imageRoute: getImage('yksinainen'),
  }),
  Map({
    id: 5,
    name: 'Surullinen',
    key: 'surullinen',
    imageRoute: getImage('surullinen'),
  }),
  Map({
    id: 6,
    name: 'Vihainen',
    key: 'vihainen',
    imageRoute: getImage('vihainen'),
  }),
];

module.exports = moods;
