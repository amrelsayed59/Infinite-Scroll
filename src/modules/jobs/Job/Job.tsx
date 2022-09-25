import React from 'react';
import { InnerLoader } from '../../../components/Loader';
import NotFound from '../../../components/NotFound';

// UI Component
const Job: React.FC<any> = ({ loading, error, item }) => {
  const AllSkillsInJobScreen = item?.relationships?.skills?.map(
    (item: any, index: number) => (
      <ul className="skill-list" key={index}>
        <li>
          <h5>Operation and control</h5>
          <p>
            The Ability to communicate information and ideas in speaking so
            others will understand.
          </p>
          <div className="info">
            <div>
              <span className="font-weight-bold">Type:</span>{' '}
              <span>Knowledge</span>
            </div>
            <div>
              <span className="font-weight-bold">Importance:</span>{' '}
              <span>3.7</span>
            </div>
            <div>
              <span className="font-weight-bold">Level:</span> <span>2.3</span>
            </div>
          </div>
        </li>
      </ul>
    )
  );

  const AllJobsInJobScreen = item?.relationships?.jobs?.map(
    (item: any, index: number) => (
      <ul key={index}>
        <li>Bentley transportation manager</li>
      </ul>
    )
  );

  let jobsNotFound = 'No Related Jobs Found';
  let skillsNotFound = 'No Related Skills Found';

  return loading ? (
    <InnerLoader />
  ) : error ? (
    <NotFound />
  ) : (
    <>
      <div className="container-fluid">
        <h4 className="title-details">{item?.attributes?.title}</h4>
        <div className="jobs-details">
          <div className="related-jobs">
            <h4>Related Jobs:</h4>
            {AllJobsInJobScreen ?? jobsNotFound}
          </div>
          <div className="related-skills">
            <h4 className="font-weight-bold">Related Skills</h4>

            {AllSkillsInJobScreen ?? skillsNotFound}
          </div>
        </div>
      </div>
    </>
  );
};

export default Job;
