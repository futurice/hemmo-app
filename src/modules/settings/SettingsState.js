import {Map} from 'immutable';

// Initial state
const initialState = Map({
  loading: false,
  userImage: '../../../assets/default-icon.png'
});

const UPDATEIMAGE = 'SettingsState/UPDATEIMAGE';

// Action creators
export function loadImage(image) {
  console.log('IMAGE ON ' + image);
  return {
    type: UPDATEIMAGE,
    payload: image
  };
}

export function removeImage() {
  return {
    type: UPDATEIMAGE,
    payload: '../../../assets/default-icon.png'
  };
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
