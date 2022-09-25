import { ActionType } from '../action-types';
import { Action } from '../actions';

const initialState = {
  listJob: [],
  searchBy: '',
  searchHistory:
    JSON.parse(String(localStorage.getItem(ActionType.SEARCH_History))) ?? [],
  loadMore: false,
};

const reducer = (state: any = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_JOBS:
      state.listJob.push(...action.payload);
      return { ...state };
    case ActionType.REST_JOBS:
      state.listJob = [];
      return { ...state };
    case ActionType.SEARCH_BY:
      return { ...state, searchBy: action.payload };
    case ActionType.SEARCH_History:
      localStorage.setItem(
        ActionType.SEARCH_History,
        JSON.stringify(action.payload)
      );
      return { ...state, searchHistory: action.payload };
    case ActionType.LOAD_MORE:
      return { ...state, loadMore: action.payload };
    default:
      return state;
  }
};
export default reducer;
