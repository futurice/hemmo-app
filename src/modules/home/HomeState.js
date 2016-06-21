import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';

// Initial state
const initialState = Map({
  loading: false,
  kids: null,
});

const CREATEKID = 'HomeState/CREATEKID';

// Action creators
export function createKid(kid) {
  return {
    type: CREATEKID,
    payload: kid
  }
}


// Reducer
export default function HomeStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case CREATEKID:

      var newArray;

      console.log("State Kids sisältö " + state.get('kids'));

      console.log("Täällä kotona  ollaan lisäämässä lasta");

      if ( state.get('kids') == null )
      {
        console.log("Lisätään ensimmäinen lapsi");
        newArray = [];
        newArray.push(action.payload);
      }
      else
      {
        console.log("Taulukossa on jo lapsia, lisätään perään");
        newArray = state.get('kids').slice();
        console.log("New Array ensin " + newArray);
        newArray.push(action.payload)
      }

      return state
        .set('kids', newArray)
    default:
      return state;
  }
}
