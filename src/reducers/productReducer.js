import { FETCH_PRODUCTS } from "../actions/types";

//  reducers evaluate the action and returns a new state
const initialState = { items: [] };
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, items: action.payload };
    default:
      return state;
  }
}
