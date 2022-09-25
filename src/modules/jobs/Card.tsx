import React from 'react';
import { Link } from 'react-router-dom';
import { Skills as SkillModel } from './model';

const Card: React.FC<any> = ({ item }) => {

  
  const Skills = item.relationships.skills.map(
    (item: SkillModel, index: number) => (
      <Link key={index} to={{ pathname: `/skills/${item.id}` }}>
        <li>{item.id}</li>
      </Link>
    )
  );

  return (
    <>
      <div className="job-card" data-testid="job_card">
        <h4 className="job-title">{item.attributes.title}</h4>
        <p>Related Skills</p>
        <ul className="job-skills">{Skills}</ul>
        <Link to={{ pathname: `/jobs/${item.id}` }}>
          <p className="job-link">View Job Details</p>
        </Link>
      </div>
    </>
  );
};

export default Card;
