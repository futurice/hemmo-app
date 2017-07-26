import { Map } from 'immutable';

export const SET_AUDIO = 'HemmoState/SET_AUDIO';
export const SET_TEXT = 'HemmoState/SET_TEXT';
export const TOGGLE_MUTE = 'HemmoState/TOGGLE_MUTE';

// Initial state
const initialState = Map({
  text: '',
  audio: '',
  muted: false,
});

export function setText(text) {
  return {
    type: SET_TEXT,
    payload: text,
  };
}

export function setAudio(audio) {
  return {
    type: SET_AUDIO,
    payload: audio,
  };
}

export function toggleMute() {
  return {
    type: TOGGLE_MUTE,
  };
}

export default function HemmoStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_AUDIO:
      return state.set('audio', action.payload);

    case SET_TEXT:
      return state.set('text', action.payload);

    case TOGGLE_MUTE:
      return state.set('muted', !state.get('muted'));

    default:
      return state;
  }
}
