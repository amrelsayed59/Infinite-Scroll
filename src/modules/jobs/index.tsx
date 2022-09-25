import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import useFetchJobs from '../../services/jobs';
import Card from './Card';
import TextField from '../../components/TextField';
import { JobsItem } from './model';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchBy } from '../../redux/action-creators';
import { State } from '../../redux';

const Jobs: React.FC<any> = () => {
  const { loadMore } = useSelector((state: State) => state.job);
  const history = useHistory();
  const inputRef = useRef<HTMLInputElement>(null);
  const fetchJobs = useFetchJobs();
  const reduxDispatch = useDispatch();

  //All Jobs
  const AllJobs = fetchJobs.map((item: JobsItem, index: number) => (
    <Card item={item} key={index} />
  ));

  const search = (data: string) => {
    reduxDispatch(setSearchBy(data));
    if (data && data.length >= 3) {
      history.push('/search');
    }
  };

  useEffect(() => {
    reduxDispatch(setSearchBy(''));
    inputRef.current?.focus();
  }, []);


  return (
    <>
      <section
        className="d-flex justify-content-center py-3 bg-white"
        data-testid="job-section"
      >
        <div className="form-group input-search">
          <TextField
            type="text"
            placeholder="Search Keyword"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              search(e.target.value)
            }
            innerref={inputRef}
          />
          <i className="fa fa-search" aria-hidden="true"></i>
        </div>
      </section>
      <div className="container-fluid">
        <h2 className="all-jobs" role="contentinfo">
          All Jobs ({AllJobs.length})
        </h2>
        {AllJobs.length > 0 ? (
          <div className="job-section">{AllJobs}</div>
        ) : (
          <div className="job-section">No Results Found</div>
        )}
        {loadMore ? (
          <div className="text-center py-3">
            <i className="fas fa-spinner fa-spin"></i>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Jobs;
