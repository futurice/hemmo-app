import {Map, List} from 'immutable';
import {loop, Effects} from 'redux-loop';

// Initial state
const initialState = Map({
  loading: false,
  kids: null,
});

const ADDKID = 'HomeState/ADDKID';

// Action creators
export function addKid(kid) {
  return {
    type: ADDKID,
    payload: kid
  }
}

// Reducer
export default function HomeStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case ADDKID:

      var newArray;

      console.log("State Kids sisältö " + state.get('kids'));

      if ( state.get('kids') == null )
      {
        console.log("Lisätään ensimmäinen lapsi");
        return state
          .set('kids', Array(Object(action.payload)));
        /*newArray = [];
        newArray.push(action.payload);*/
      }
      else
      {
        console.log("Taulukossa on jo lapsia, lisätään perään");
        return state
          .set('kids', state.get('kids').push(action.payload));
        /*newArray = state.get('kids').slice();
        console.log("Lisäystä ennen " + newArray);
        console.log("ACTION PAYLOAD " + action.payload.name);
        newArray.push(action.payload);
        console.log("Lisäyksen jälkeen" + newArray);*/
      }

    default:
      return state;
  }
}
