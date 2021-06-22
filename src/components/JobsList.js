import React, { useState, useEffect } from "react";
import JobDataService from "../services/JobService";
import { Link } from "react-router-dom";

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchCompany, setSearchCompany] = useState("");

  useEffect(() => {
    retrieveJobs();
  }, []);

  const onChangeSearchCompany = e => {
    const searchCompany = e.target.value;
    setSearchCompany(searchCompany);
  };

  const retrieveJobs = () => {
    JobDataService.getAll()
      .then(response => {
        setJobs(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const setActiveJob = (job, index) => {
    setCurrentJob(job);
    setCurrentIndex(index);
  };

  const findByCompany = () => {
    JobDataService.findByCompany(searchCompany)
      .then(response => {
        setJobs(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by company"
            value={searchCompany}
            onChange={onChangeSearchCompany}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCompany}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Jobs List</h4>

        <ul className="list-group">
          {jobs &&
            jobs.map((job, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveJob(job, index)}
                key={index}
              >
                {job.company}
              </li>
            ))}
        </ul>

      </div>
      <div className="col-md-6">
        {currentJob ? (
          <div>
            <h4>Job</h4>
            <div>
              <label>
                <strong>Company:</strong>
              </label>{" "}
              {currentJob.company}
            </div>
            <div>
              <label>
                <strong>Job Title:</strong>
              </label>{" "}
              {currentJob.job_title}
            </div>
            <div>
              <label>
                <strong>Job Level:</strong>
              </label>{" "}
              {currentJob.job_level}
            </div>
            <div>
              <label>
                <strong>Minimum Years:</strong>
              </label>{" "}
              {currentJob.min_years}
            </div>
            <div>
              <label>
                <strong>Date Posted:</strong>
              </label>{" "}
              {currentJob.date_posted}
            </div>
            <div>
              <label>
                <strong>Date Applied:</strong>
              </label>{" "}
              {currentJob.date_applied}
            </div>
            <div>
              <label>
                <strong>Cover Letter:</strong>
              </label>{" "}
              {currentJob.cover_letter}
            </div>
            <div>
              <label>
                <strong>Response:</strong>
              </label>{" "}
              {currentJob.response}
            </div>
            <div>
              <label>
                <strong>Response Date:</strong>
              </label>{" "}
              {currentJob.response_date}
            </div>

            <Link
            to={"/jobs/" + currentJob.id}
            className="btn btn-warning"
            role="button"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Job...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsList;