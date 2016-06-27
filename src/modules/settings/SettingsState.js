import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';

// Initial state
const initialState = Map({
  loading: false,
  userImage: '../../../assets/default-icon.png',
});

const UPDATEIMAGE = 'SettingsState/UPDATEIMAGE';

// Action creators
export function updateImage(image) {
  console.log("IMAGE ON " + image);

  return {
    type: UPDATEIMAGE,
    payload: image,
  }
}

// Reducer
export default function SettingsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATEIMAGE:
      return state.set('userImage', action.payload);

    default:
      return state;
  }
}
