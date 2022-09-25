import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSkill } from '../../../services/job';
import Skill from './Skill';

export interface Id {
  id: string;
  type: string;
}

const Index: React.FC<any> = () => {
  const [item, setItem] = useState<any>({});
  const [error, setError] = useState(false);
  const { id } = useParams<Id>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      const data = await fetchSkill(id);
      if (data) setItem(data.data.skill);
      else setError(true);
      setLoading(false);
    };

    fetchSkills();
  }, [id]);

  return (
    <>
      <Skill item={item} loading={loading} error={error} />
    </>
  );
};
export default Index;
