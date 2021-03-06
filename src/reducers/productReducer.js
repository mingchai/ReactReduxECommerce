import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE, ORDER_PRODUCTS_BY_PRICE } from "../actions/types";

//  reducers evaluate the action and returns a new state
const initialState = { items: [], filteredItems:[], size: '', sort: '' };
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, items: action.payload, filteredItems: action.payload };
    case FILTER_PRODUCTS_BY_SIZE:
      return { ...state, size: action.payload.size, filteredItems: action.payload.items  };
    case ORDER_PRODUCTS_BY_PRICE:
      return { ...state, sort: action.payload.price, filteredItems: action.payload.items  };
    default:
      return state;
  }
}
