import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchJob } from '../../../services/job';
import Job from './Job';

export interface Id {
  id: string;
  type: string;
}

const Index: React.FC<any> = () => {
  const [item, setItem] = useState({});
  const [error, setError] = useState(false);
  const { id } = useParams<Id>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const data = await fetchJob(id);
      if (data) setItem(data.data.job);
      else setError(true);
      setLoading(false);
    };

    fetchJobs();
  }, [id]);

  return (
    <>
      <Job item={item} loading={loading} error={error} />
    </>
  );
};

export default Index;
