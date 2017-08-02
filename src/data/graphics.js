/*
  Includes all the needed graphics together with their width-height ratio.
  Backgrounds, speech bubbles, buttons, moods, activities and others.
*/

import { Map } from 'immutable';

const graphics = {
  default_image: {
    normal: require('../../assets/graphics/others/default-icon.png'),
  },

  /* backgrounds */
  tausta_perus: {
    normal: require('../../assets/graphics/backgrounds/tausta_perus.png'),
    ratio: 1.7777,
  },
  tausta_perus2: {
    normal: require('../../assets/graphics/backgrounds/tausta_perus2.png'),
    ratio: 1.7777,
  },
  tausta_perus3: {
    normal: require('../../assets/graphics/backgrounds/tausta_perus3.png'),
    ratio: 1.7777,
  },
  tausta_kirjoitus: {
    normal: require('../../assets/graphics/backgrounds/tausta_kirjoitus.png'),
    ratio: 1.9621,
  },
  kirjoituskentta: {
    normal: require('../../assets/graphics/backgrounds/kirjoituskentta.png'),
    ratio: 1.9638,
  },
  kehys_iso: {
    normal: require('../../assets/graphics/backgrounds/kehys_iso.png'),
    ratio: 0.798,
  },
  kehys_keski: {
    normal: require('../../assets/graphics/backgrounds/kehys_keski.png'),
    ratio: 0.7983,
  },
  kehys_pieni: {
    normal: require('../../assets/graphics/backgrounds/kehys_pieni.png'),
    ratio: 0.797,
  },
  kehys_palkki: {
    normal: require('../../assets/graphics/backgrounds/kehys_palkki.png'),
    ratio: 4.207,
  },
  nelio: {
    normal: require('../../assets/graphics/backgrounds/nelio.png'),
    ratio: 1.2484,
  },
  tausta_asetukset: {
    normal: require('../../assets/graphics/backgrounds/tausta_asetukset.png'),
    ratio: 2.409,
  },
  tausta_hemmolla: {
    normal: require('../../assets/graphics/backgrounds/tausta_hemmolla.png'),
    ratio: 1.7777,
  },
  tausta_kapea: {
    normal: require('../../assets/graphics/backgrounds/tausta_kapea.png'),
    ratio: 1.1415,
  },
  tausta_levea: {
    normal: require('../../assets/graphics/backgrounds/tausta_levea.png'),
    ratio: 1.7872,
  },
  modal: {
    normal: require('../../assets/graphics/buttons/modal.png'),
    shadow: require('../../assets/graphics/buttons/modal_s4dp.png'),
    ratio: 1.083,
  },

  /* speech bubbles */
  puhekupla: {
    normal: require('../../assets/graphics/bubbles/up_small.png'),
    shadow: require('../../assets/graphics/bubbles/up_small_s2dp.png'),
    ratio: 1.56,
  },

  /* buttons */
  button_small: {
    normal: require('../../assets/graphics/buttons/button_small.png'),
    shadow: require('../../assets/graphics/buttons/button_small_s2dp.png'),
  },
  volume_is_off: {
    normal: require('../../assets/graphics/buttons/volume_is_off.png'),
    shadow: require('../../assets/graphics/buttons/volume_is_off_s2dp.png'),
    ratio: 1,
  },
  volume_is_on: {
    normal: require('../../assets/graphics/buttons/volume_is_on.png'),
    shadow: require('../../assets/graphics/buttons/volume_is_on_s2dp.png'),
    ratio: 1,
  },
  whatdoned: {
    normal: require('../../assets/graphics/buttons/whatdoned.png'),
    shadow: require('../../assets/graphics/buttons/whatdoned_s2dp.png'),
  },
  howfelt: {
    normal: require('../../assets/graphics/buttons/howfelt.png'),
    shadow: require('../../assets/graphics/buttons/howfelt_s2dp.png'),
  },
  tellfreely: {
    normal: require('../../assets/graphics/buttons/tellfreely.png'),
    shadow: require('../../assets/graphics/buttons/tellfreely_s2dp.png'),
  },
  envelope_closed: {
    normal: require('../../assets/graphics/others/envelope_closed.png'),
    shadow: require('../../assets/graphics/others/envelope_closed_s2dp.png'),
  },

  nappula_aset: {
    normal: require('../../assets/graphics/buttons/nappula_aset.png'),
    ratio: 1,
  },
  nappula_kirjoita: {
    normal: require('../../assets/graphics/buttons/nappula_kirjoita.png'),
    ratio: 4.2068,
  },
  nappula_ohita: {
    normal: require('../../assets/graphics/buttons/nappula_ohita.png'),
    ratio: 1.9433,
  },
  close_small: {
    normal: require('../../assets/graphics/buttons/close_small.png'),
    ratio: 1,
  },
  nappula_rec: {
    normal: require('../../assets/graphics/buttons/nappula_rec.png'),
    ratio: 1,
  },
  nappula_seuraava: {
    normal: require('../../assets/graphics/buttons/nappula_seuraava.png'),
    ratio: 3.6896,
  },
  nappula_seuraava2: {
    normal: require('../../assets/graphics/buttons/nappula_seuraava2.png'),
    ratio: 1,
  },
  nappula_stop: {
    normal: require('../../assets/graphics/buttons/nappula_stop.png'),
    ratio: 1,
  },
  nappula_takaisin: {
    normal: require('../../assets/graphics/buttons/nappula_takaisin.png'),
    ratio: 0.6301,
  },
  nappula_tallenna: {
    normal: require('../../assets/graphics/buttons/nappula_tallenna.png'),
    ratio: 4.2068,
  },
  nappula_uudestaan: {
    normal: require('../../assets/graphics/buttons/nappula_uudestaan.png'),
    ratio: 1,
  },
  nappula_uusikuva: {
    normal: require('../../assets/graphics/buttons/nappula_uusikuva.png'),
    ratio: 2.6111,
  },
  thumb_up: {
    normal: require('../../assets/graphics/buttons/thumb_up.png'),
    shadow: require('../../assets/graphics/buttons/thumb_up_s2dp.png'),
    ratio: 1,
  },
  thumb_middle: {
    normal: require('../../assets/graphics/buttons/thumb_middle.png'),
    shadow: require('../../assets/graphics/buttons/thumb_middle_s2dp.png'),
    ratio: 1,
  },
  thumb_down: {
    normal: require('../../assets/graphics/buttons/thumb_down.png'),
    shadow: require('../../assets/graphics/buttons/thumb_down_s2dp.png'),
    ratio: 1,
  },

  /* moods */
  iloinen: {
    normal: require('../../assets/graphics/moods/iloinen.png'),
    shadow: require('../../assets/graphics/moods/iloinen_s2dp.png'),
    ratio: 1,
  },
  innostunut: {
    normal: require('../../assets/graphics/moods/innostunut.png'),
    shadow: require('../../assets/graphics/moods/innostunut_s2dp.png'),
    ratio: 1,
  },
  jannittynyt: {
    normal: require('../../assets/graphics/moods/jannittynyt.png'),
    shadow: require('../../assets/graphics/moods/jannittynyt_s2dp.png'),
    ratio: 1,
  },
  surullinen: {
    normal: require('../../assets/graphics/moods/surullinen.png'),
    shadow: require('../../assets/graphics/moods/surullinen_s2dp.png'),
    ratio: 1,
  },
  vihainen: {
    normal: require('../../assets/graphics/moods/vihainen.png'),
    shadow: require('../../assets/graphics/moods/vihainen_s2dp.png'),
    ratio: 1,
  },
  yksinainen: {
    normal: require('../../assets/graphics/moods/yksinainen.png'),
    shadow: require('../../assets/graphics/moods/yksinainen_s2dp.png'),
    ratio: 1,
  },

  /* Activities */
  leikimme: {
    normal: require('../../assets/graphics/activities/leikimme/leikimme.png'),
    shadow: require('../../assets/graphics/activities/leikimme/leikimme_s2dp.png'),
    ratio: 1.33,
  },

  leikkiminen: {
    normal: require('../../assets/graphics/activities/leikimme/leikkiminen.png'),
    shadow: require('../../assets/graphics/activities/leikimme/leikkiminen_s2dp.png'),
    ratio: 1,
  },
  lautapelit: {
    normal: require('../../assets/graphics/activities/leikimme/lautapelit.png'),
    shadow: require('../../assets/graphics/activities/leikimme/lautapelit_s2dp.png'),
    ratio: 1,
  },
  videopelit: {
    normal: require('../../assets/graphics/activities/leikimme/videopelit.png'),
    shadow: require('../../assets/graphics/activities/leikimme/videopelit_s2dp.png'),
    ratio: 1,
  },
  liikunta: {
    normal: require('../../assets/graphics/activities/leikimme/liikunta.png'),
    shadow: require('../../assets/graphics/activities/leikimme/liikunta_s2dp.png'),
    ratio: 1,
  },
  uiminen: {
    normal: require('../../assets/graphics/activities/leikimme/uiminen.png'),
    shadow: require('../../assets/graphics/activities/leikimme/uiminen_s2dp.png'),
    ratio: 1,
  },

  vietimme: {
    normal: require('../../assets/graphics/activities/vietimme/vietimme.png'),
    shadow: require('../../assets/graphics/activities/vietimme/vietimme_s2dp.png'),
    ratio: 1.33,
  },

  saunominen: {
    normal: require('../../assets/graphics/activities/vietimme/saunominen.png'),
    shadow: require('../../assets/graphics/activities/vietimme/saunominen_s2dp.png'),
    ratio: 1,
  },
  juttelu: {
    normal: require('../../assets/graphics/activities/vietimme/juttelu.png'),
    shadow: require('../../assets/graphics/activities/vietimme/juttelu_s2dp.png'),
    ratio: 1,
  },
  kylaily: {
    normal: require('../../assets/graphics/activities/vietimme/kylaily.png'),
    shadow: require('../../assets/graphics/activities/vietimme/kylaily_s2dp.png'),
    ratio: 1,
  },
  elokuva: {
    normal: require('../../assets/graphics/activities/vietimme/elokuva.png'),
    shadow: require('../../assets/graphics/activities/vietimme/elokuva_s2dp.png'),
    ratio: 1,
  },
  kirjat: {
    normal: require('../../assets/graphics/activities/vietimme/kirjat.png'),
    shadow: require('../../assets/graphics/activities/vietimme/kirjat_s2dp.png'),
    ratio: 1,
  },

  lemmikit: {
    normal: require('../../assets/graphics/activities/lemmikit/lemmikit.png'),
    shadow: require('../../assets/graphics/activities/lemmikit/lemmikit_s2dp.png'),
    ratio: 1.33,
  },

  kissa: {
    normal: require('../../assets/graphics/activities/lemmikit/kissa.png'),
    shadow: require('../../assets/graphics/activities/lemmikit/kissa_s2dp.png'),
    ratio: 1,
  },
  koira: {
    normal: require('../../assets/graphics/activities/lemmikit/koira.png'),
    shadow: require('../../assets/graphics/activities/lemmikit/koira_s2dp.png'),
    ratio: 1,
  },
  hevonen: {
    normal: require('../../assets/graphics/activities/lemmikit/hevonen.png'),
    shadow: require('../../assets/graphics/activities/lemmikit/hevonen_s2dp.png'),
    ratio: 1,
  },

  puuhasimme: {
    normal: require('../../assets/graphics/activities/puuhasimme/puuhasimme.png'),
    shadow: require('../../assets/graphics/activities/puuhasimme/puuhasimme_s2dp.png'),
    ratio: 1.33,
  },

  leipominen: {
    normal: require('../../assets/graphics/activities/puuhasimme/leipominen.png'),
    shadow: require('../../assets/graphics/activities/puuhasimme/leipominen_s2dp.png'),
    ratio: 1,
  },
  piirtaminen: {
    normal: require('../../assets/graphics/activities/puuhasimme/piirtaminen.png'),
    shadow: require('../../assets/graphics/activities/puuhasimme/piirtaminen_s2dp.png'),
    ratio: 1,
  },
  kotihommia: {
    normal: require('../../assets/graphics/activities/puuhasimme/kotihommia.png'),
    shadow: require('../../assets/graphics/activities/puuhasimme/kotihommia_s2dp.png'),
    ratio: 1,
  },
  lukeminen: {
    normal: require('../../assets/graphics/activities/puuhasimme/lukeminen.png'),
    shadow: require('../../assets/graphics/activities/puuhasimme/lukeminen_s2dp.png'),
    ratio: 1,
  },
  rakentaminen: {
    normal: require('../../assets/graphics/activities/puuhasimme/rakentaminen.png'),
    shadow: require('../../assets/graphics/activities/puuhasimme/rakentaminen_s2dp.png'),
    ratio: 1,
  },

  ulkoilimme: {
    normal: require('../../assets/graphics/activities/ulkoilimme/ulkoilimme.png'),
    shadow: require('../../assets/graphics/activities/ulkoilimme/ulkoilimme_s2dp.png'),
    ratio: 1.33,
  },

  ulkoilu: {
    normal: require('../../assets/graphics/activities/ulkoilimme/ulkoilu.png'),
    shadow: require('../../assets/graphics/activities/ulkoilimme/ulkoilu_s2dp.png'),
    ratio: 1,
  },
  makkaranpaisto: {
    normal: require('../../assets/graphics/activities/ulkoilimme/makkaranpaisto.png'),
    shadow: require('../../assets/graphics/activities/ulkoilimme/makkaranpaisto_s2dp.png'),
    ratio: 1,
  },
  retkeily: {
    normal: require('../../assets/graphics/activities/ulkoilimme/retkeily.png'),
    shadow: require('../../assets/graphics/activities/ulkoilimme/retkeily_s2dp.png'),
    ratio: 1,
  },
  pihahommat: {
    normal: require('../../assets/graphics/activities/ulkoilimme/pihahommat.png'),
    shadow: require('../../assets/graphics/activities/ulkoilimme/pihahommat_s2dp.png'),
    ratio: 1,
  },
  leikkipuisto: {
    normal: require('../../assets/graphics/activities/ulkoilimme/leikkipuisto.png'),
    shadow: require('../../assets/graphics/activities/ulkoilimme/leikkipuisto_s2dp.png'),
    ratio: 1,
  },
  kalastaminen: {
    normal: require('../../assets/graphics/activities/ulkoilimme/kalastaminen.png'),
    shadow: require('../../assets/graphics/activities/ulkoilimme/kalastaminen_s2dp.png'),
    ratio: 1,
  },
  mokkeily: {
    normal: require('../../assets/graphics/activities/ulkoilimme/mokkeily.png'),
    shadow: require('../../assets/graphics/activities/ulkoilimme/mokkeily_s2dp.png'),
    ratio: 1,
  },
  write: {
    normal: require('../../assets/graphics/buttons/write.png'),
    shadow: require('../../assets/graphics/buttons/write_s2dp.png'),
  },
  record: {
    normal: require('../../assets/graphics/buttons/record.png'),
    shadow: require('../../assets/graphics/buttons/record_s2dp.png'),
  },
  record_expanded: {
    normal: require('../../assets/graphics/buttons/record_expanded.png'),
    shadow: require('../../assets/graphics/buttons/record_expanded_s2dp.png'),
  },
  stop_expanded: {
    normal: require('../../assets/graphics/buttons/stop_expanded.png'),
    shadow: require('../../assets/graphics/buttons/stop_expanded_s2dp.png'),
  },
  textbox: {
    normal: require('../../assets/graphics/others/textbox.png'),
  },

  /* Muuta */
  hemmo: {
    normal: require('../../assets/graphics/buttons/hemmo.png'),
    shadow: require('../../assets/graphics/buttons/hemmo_s2dp.png'),
    ratio: 1.1538,
  },
  asetukset: {
    normal: require('../../assets/graphics/others/asetukset.png'),
    ratio: 6.7903,
  },
  lopetusteksti: {
    normal: require('../../assets/graphics/others/lopetusteksti.png'),
    ratio: 1.0958,
  },
  otsake_aset: {
    normal: require('../../assets/graphics/others/otsake_aset.png'),
    ratio: 5.1164,
  },
  valittu: {
    normal: require('../../assets/graphics/others/checkmark_small.png'),
    shadow: require('../../assets/graphics/others/checkmark_small_s2dp.png'),
    ratio: 1.0377,
  },
  valittu_harmaa: {
    normal: require('../../assets/graphics/others/checkmark_small_grey.png'),
    shadow: require('../../assets/graphics/others/checkmark_small_grey_s2dp.png'),
    ratio: 1.0377,
  },
  valittu_iso: {
    normal: require('../../assets/graphics/others/checkmark_big.png'),
    shadow: require('../../assets/graphics/others/checkmark_big_s2dp.png'),
    ratio: 1.0377,
  },
  ratas: {
    normal: require('../../assets/graphics/others/ratas.png'),
    ratio: 1,
  },
  ikoni_kyna: {
    normal: require('../../assets/graphics/others/ikoni_kyna.png'),
    ratio: 1,
  },
  ikoni_tallenna: {
    normal: require('../../assets/graphics/others/ikoni_tallenna.png'),
    ratio: 1,
  },
};

module.exports = graphics;
