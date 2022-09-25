import { ActionType } from '../action-types';

interface SetJobAction {
  type: ActionType.SET_JOBS;
  payload: any;
}

interface RestJobAction {
  type: ActionType.REST_JOBS;
  payload: any;
}

interface SearchByAction {
  type: ActionType.SEARCH_BY;
  payload: string;
}

interface SearchHistoryAction {
  type: ActionType.SEARCH_History;
  payload: string;
}

interface loadMoreAction {
  type: ActionType.LOAD_MORE;
  payload: boolean;
}

export type Action =
  | SetJobAction
  | RestJobAction
  | SearchByAction
  | SearchHistoryAction
  | loadMoreAction;
