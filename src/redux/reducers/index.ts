import { combineReducers } from 'redux';
import jobReducer from './jobReducer';

const reducers = combineReducers({
  job: jobReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
