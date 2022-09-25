import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { searchJob } from '../../services/job';
import debounce from 'lodash.debounce';
import Card from './Card';
import TextField from '../../components/TextField';
import { Attributes, JobsItem } from './model';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../redux';
import { setSearchHistory } from '../../redux/action-creators';

const Search: React.FC<any> = () => {
  const useMain = useSelector((state: State) => state.job);
  const dispatch = useDispatch();

  const history = useHistory();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputSearch, setInputSearch] = useState(useMain.searchBy ?? '');
  const [fetchJob, setFetchJob] = useState([]);
  const [autocomplete, setAutocomplete] = useState<any>([]);
  const [showAutocomplete, setShowAutoComplete] = useState<Boolean>(false);
  const [historySearch, setHistorySearch] = useState(useMain.searchHistory);
  const wrapperRef = useRef<HTMLInputElement>(null);
  const [isLoad, setIsLoad] = useState(false);

  const autoComplete = () => {
    let data = fetchJob?.map((item: JobsItem) => item.attributes);
    setAutocomplete(data);
  };

  const AutoCompleteList = autocomplete?.map(
    (item: Attributes, index: number) => (
      <li key={index} onClick={() => handleClickAutocomplete(item)}>
        {item?.title}
      </li>
    )
  );

  const handleSearchChange = (event: string) => {
    setIsLoad(true);
    setInputSearch(event);
    if (event === '') history.push('/');
  };

  const handleClickAutocomplete = (item: any) => {
    let title: string = item.title.toLowerCase();
    setInputSearch(title);
    searchHistory(item.title);
    setShowAutoComplete(false);
  };

  const searchHistory = (title: string) => {
    const history = useMain.searchHistory;
    if (!history.includes(title)) history.push(title);
    setHistorySearch(history);
    dispatch(setSearchHistory(history));
  };

  const HistoryList = historySearch.map((item: string, index: number) => (
    <li
      key={index}
      className="pointer"
      onClick={() => handleClickHistory(item)}
    >
      {item}
    </li>
  ));

  const handleClickHistory = (item: string) => {
    let result = item.toLowerCase();
    setInputSearch(result);
  };

  const getJobs = async (data: string) => {
    const response = await searchJob(data);
    let result = response?.data?.jobs;
    setFetchJob(result);
    setIsLoad(false);
  };

  const debounceLoadData = useCallback(debounce(getJobs, 300), []);

  useEffect(() => {
    //focus to input search
    inputRef.current?.focus();
    if (inputSearch) {
      debounceLoadData(inputSearch);
      if (autocomplete?.length > 0) setShowAutoComplete(true);
      autoComplete();
      if (inputSearch?.length === 0) history.push('/');
    }
  }, [inputSearch]);

  //checkIfClickedOutside
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the autocomplete is open and the clicked target is not within the autocomplete,
      // then close the autocomplete
      if (
        showAutocomplete &&
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        setShowAutoComplete(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [showAutocomplete]);

  //All Jobs
  const AllJobs = fetchJob?.map((item: JobsItem, index) => (
    <Card item={item} key={index} />
  ));

  return (
    <>
      <section
        className="d-flex justify-content-center py-3 bg-white"
        ref={wrapperRef}
      >
        <div className="form-group input-search">
          <TextField
            type="text"
            placeholder="Search Keyword"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSearchChange(e.target.value)
            }
            innerref={inputRef}
            value={inputSearch}
          />
          <i className="fa fa-search" aria-hidden="true"></i>
          <ul
            className={`autocomplete-ul ${
              showAutocomplete && autocomplete.length > 0 ? 'd-block' : 'd-none'
            }`}
          >
            {AutoCompleteList}
          </ul>
        </div>
      </section>

      <div className="container-fluid">
        <h2 className="all-jobs">
          <span className="text-capitalize">
            {inputSearch ? `“${inputSearch}”` : null}
          </span>{' '}
          All Jobs ({AllJobs?.length})
        </h2>
        <div className="search-section">
          <div className="search-history-box">
            <div className="search-history">
              <h4>Search History</h4>
              <ul>{HistoryList}</ul>
            </div>
          </div>
          {AllJobs?.length > 0 ? (
            <div className="job-section">{AllJobs}</div>
          ) : (
            <div className="job-section">No Results Found</div>
          )}
        </div>
      </div>

      {isLoad ? (
        <div className="text-center">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
      ) : null}
    </>
  );
};
export default Search;
