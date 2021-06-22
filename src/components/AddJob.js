import React, { useState } from "react";
import JobDataService from "../services/JobService";

const AddJob = () => {
  const initialJobState = {
    id: null,
    company: "",
    job_title: "",
    job_level: "N",
    min_years: 0,
    date_posted: null,
    date_applied: null,
    cover_letter: "",
    response: "N",
    response_date: null
  };
  const [job, setJob] = useState(initialJobState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setJob({ ...job, [name]: value });
  };

  const saveJob = () => {
    console.log(job);
    var data = {
      company: job.company,
      job_title: job.job_title,
      job_level: job.job_level,
      min_years: job.min_years,
      date_posted: job.date_posted,
      date_applied: job.date_applied,
      cover_letter: job.cover_letter,
      response: job.response,
      response_date: (job.response_date === "" ? null : job.response_date)
    };

    JobDataService.create(data)
      .then(response => {
        setJob({
          id: response.data.id,
          company: response.data.company,
          job_title: response.data.job_title,
          job_level: response.data.job_level,
          min_years: response.data.min_years,
          date_posted: response.data.date_posted,
          date_applied: response.data.date_applied,
          cover_letter: response.data.cover_letter,
          response: response.data.response,
          response_date: response.data.response_date
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newJob = () => {
    setJob(initialJobState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newJob}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              className="form-control"
              id="company"
              required
              value={job.company}
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
              value={job.job_title}
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
              value={job.job_level}
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
              value={job.min_years}
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
              value={job.date_posted}
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
              value={job.date_applied}
              onChange={handleInputChange}
              name="date_applied"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cover_letter">Cover Letter</label>
            <input
              type="text"
              className="form-control"
              id="cover_letter"
              required
              value={job.cover_letter}
              onChange={handleInputChange}
              name="cover_letter"
            />
          </div>

          <div className="form-group">
            <label htmlFor="response">Response</label>
            <select
              type="text"
              className="form-control"
              id="response"
              required
              value={job.response}
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
              value={job.response_date}
              onChange={handleInputChange}
              name="response_date"
            />
          </div>

          <button onClick={saveJob} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddJob;