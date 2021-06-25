import React, { useState, useEffect } from "react";
import JobDataService from "../services/JobService";

const Job = props => {
  const initialJobState = {
    id: null,
    company: "",
    job_title: "",
    job_level: "N",
    min_years: 0,
    date_posted: null,
    date_applied: null,
    cover_letter: "No",
    response: "N",
    response_date: null
  };
  const [currentJob, setCurrentJob] = useState(initialJobState);
  const [message, setMessage] = useState("");

  const getJob = id => {
    JobDataService.get(id)
      .then(response => {
        setCurrentJob(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getJob(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentJob({ ...currentJob, [name]: value });
  };

  const updateJob = () => {
    JobDataService.update(currentJob.id, currentJob)
      .then(response => {
        console.log(response.data);
        setMessage("The job was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteJob = () => {
    JobDataService.remove(currentJob.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/jobs");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentJob ? (
        <div className="edit-form">
          <h4>Job</h4>
          <form>
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                className="form-control"
                id="company"
                required
                value={currentJob.company}
                onChange={handleInputChange}
                name="company"
              />
            </div>

            <div className="form-group">
              <label htmlFor="job_title">Job Title</label>
              <input
                type="text"
                className="form-control"
                id="job_title"
                required
                value={currentJob.job_title}
                onChange={handleInputChange}
                name="job_title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="job_level">Job Level</label>
              <select
              type="text"
              className="form-control"
              id="job_level"
              required
              value={currentJob.job_level}
              onChange={handleInputChange}
              name="job_level"
              >
                <option value="N">Not Specified</option>
                <option value="I">Internship</option>
                <option value="E">Entry Level</option>
                <option value="A">Associate</option>
                <option value="M">Mid-Senior</option>
                <option vlue="D">Director</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="min_years">Minimum Years</label>
              <input
                type="number"
                className="form-control"
                id="min_years"
                required
                value={currentJob.min_years}
                onChange={handleInputChange}
                name="min_years"
              />
            </div>

            <div className="form-group">
              <label htmlFor="date_posted">Date Posted</label>
              <input
                type="date"
                className="form-control"
                id="date_posted"
                required
                value={currentJob.date_posted}
                onChange={handleInputChange}
                name="date_posted"
              />
            </div>

            <div className="form-group">
              <label htmlFor="date_applied">Date Applied</label>
              <input
                type="date"
                className="form-control"
                id="date_applied"
                required
                value={currentJob.date_applied}
                onChange={handleInputChange}
                name="date_applied"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cover_letter">Cover Letter</label>
              <select
                type="text"
                className="form-control"
                id="cover_letter"
                required
                value={currentJob.cover_letter}
                onChange={handleInputChange}
                name="cover_letter"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="response">Response</label>
              <select
              type="text"
              className="form-control"
              id="response"
              required
              value={currentJob.response}
              onChange={handleInputChange}
              name="response"
              >
                <option value="N">No Response</option>
                <option value="R">Rejection</option>
                <option value="F">Follow Up</option>
                <option value="I">Interview</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="response_date">Response Date</label>
              <input
                type="date"
                className="form-control"
                id="response_date"
                required
                value={currentJob.response_date}
                onChange={handleInputChange}
                name="response_date"
              />
            </div>
          </form>

          <button type="delete"
            className="btn btn-danger mt-2"
            onClick={deleteJob}
          >
            Delete
          </button>

          <button
            type="submit"
            className="btn btn-success mx-2 mt-2"
            onClick={updateJob}
          >
            Update
          </button>

          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Job...</p>
        </div>
      )}
    </div>
  );
};

export default Job;