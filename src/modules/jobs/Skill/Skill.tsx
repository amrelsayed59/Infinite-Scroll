import React from 'react';
import { InnerLoader } from '../../../components/Loader';
import NotFound from '../../../components/NotFound';

// UI Component
const Skill: React.FC<any> = ({ loading, error, item }) => {
  const AllJobsInSkillScreen = item?.relationships?.jobs?.map(
    (item: any, index: number) => (
      <ul className="skill-list" key={index}>
        <li>
          <h5>Ariline Pilots, Copilots, and Flight Engineers</h5>
          <div className="info">
            <div>
              <span className="font-weight-bold">Importance:</span>{' '}
              <span>Knowledge</span>
            </div>
            <div>
              <span className="font-weight-bold">Level:</span> <span>2.3</span>
            </div>
          </div>
        </li>
      </ul>
    )
  );

  const AllSkillsInSkillScreen = item?.relationships?.jobs?.map(
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
        <h4 className="title-details">
          {item?.type === 'job'
            ? item?.attributes?.title
            : item?.attributes?.name}
        </h4>
        <div className="jobs-details">
          <div className="related-jobs">
            <h4>Related Skills:</h4>
            {AllSkillsInSkillScreen ?? skillsNotFound}
          </div>
          <div className="related-skills">
            <div className="description">
              <h6>Description</h6>
              <p>
                Knowledge of principles and methods for moving people or goods
                by air, rail, sea of road, including the relative costs and
                benefits
              </p>
            </div>
            <h4 className="font-weight-bold">Related Jobs:</h4>

            {AllJobsInSkillScreen ?? jobsNotFound}
          </div>
        </div>
      </div>
    </>
  );
};
export default Skill;
