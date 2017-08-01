import { Map } from 'immutable';
import { getImage } from '../services/graphics';

const moods = [
  Map({
    id: 0,
    name: 'Innostunut',
    key: 'innostunut',
  }),
  Map({
    id: 1,
    name: 'Iloinen',
    key: 'iloinen',
  }),
  Map({
    id: 3,
    name: 'Jännittynyt',
    key: 'jannittynyt',
  }),
  Map({
    id: 4,
    name: 'Yksinäinen',
    key: 'yksinainen',
  }),
  Map({
    id: 5,
    name: 'Surullinen',
    key: 'surullinen',
  }),
  Map({
    id: 6,
    name: 'Vihainen',
    key: 'vihainen',
  }),
];

module.exports = moods;
