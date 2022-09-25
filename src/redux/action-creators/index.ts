import { ActionType } from '../action-types';
import { JobsItem } from '../../modules/jobs/model';

export const fetchDataRequest = (listJob: JobsItem) => ({
  type: ActionType.SET_JOBS,
  payload: listJob,
});

export const resetDataRequest = () => ({
  type: ActionType.REST_JOBS,
  payload: [],
});

export const setSearchBy = (searchBy: string) => ({
  type: ActionType.SEARCH_BY,
  payload: searchBy,
});

export const setSearchHistory = (searchHistory: string) => ({
  type: ActionType.SEARCH_History,
  payload: searchHistory,
});

export const setLoadMore = (load: boolean) => ({
  type: ActionType.LOAD_MORE,
  payload: load,
});
