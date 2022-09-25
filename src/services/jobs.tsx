import { useEffect, useState } from 'react';
import Axios from 'axios';
import {
  fetchDataRequest,
  resetDataRequest,
  setLoadMore,
} from '../redux/action-creators';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../redux';
import throttle from 'lodash.throttle';

const API_KEY: string = process.env.REACT_APP_API_KEY as string;

const useFetchJobs = () => {
  const dispatch = useDispatch();
  const [result, setResult] = useState([]);

  const [jobsState, setJobsState] = useState<any>({
    cursor: 0,
    count: 0,
    nextCursor: 0,
  });

  const useMain = useSelector((state: State) => state.job);

  const fetchJobs = async (cursor: number) => {
    dispatch(setLoadMore(true));
    const res = await Axios.get(`${API_KEY}/jobs?cursor=${cursor}&limit=12`);
    const data = await res.data.data;
    dispatch(fetchDataRequest(data.jobs));
    setJobsState({
      ...jobsState,
      count: data.meta.count,
      nextCursor: data.meta.next || 0,
    });
  };

  const handleScroll = (e: any) => {
    if (jobsState.cursor > jobsState.count || jobsState.nextCursor < 12) return;
    let scrollTop = e.target.documentElement.scrollTop;
    let innerHeight = window.innerHeight;
    let scrollHeight = e.target.documentElement.scrollHeight;
    if (innerHeight + scrollTop + 1 >= scrollHeight) {
      loadMore();
    }
  };

  const loadMore = () => {
    setJobsState({
      ...jobsState,
      cursor: jobsState.cursor + jobsState.nextCursor,
    });
    dispatch(setLoadMore(false));
  };

  useEffect(() => {
    dispatch(resetDataRequest());
    fetchJobs(0);
    setResult(useMain.listJob);
  }, []);

  useEffect(() => {
    const throttledCount = throttle(handleScroll, 500);
    if (jobsState.cursor !== 0 && jobsState.cursor < jobsState.count) {
      fetchJobs(jobsState.cursor);
      setResult(useMain.listJob);
    }
    window.addEventListener('scroll', throttledCount);
    return () => window.removeEventListener('scroll', throttledCount);
  }, [jobsState.cursor, jobsState.count]);
  return result;
};

export default useFetchJobs;
