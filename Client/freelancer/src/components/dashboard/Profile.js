import axios from 'axios';
import {React, Fragment, useState} from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const ApplyJobs = () => {
    const [ ApplyJob, setApplyJob] = useState({
        bio:'',
        jobTitle:'',
        skills:'',
        location:'',
        education:'',
        services:'',
        experience:'',
        hourlyRate:'',
        dailyRate:'',
    });
    
    const {
        bio,
        jobTitle,
        skills,
        location,
        education,
        services,
        experience,
        hourlyRate,
        dailyRate,
    } = ApplyJob;
    const onChange = (e) =>
    setApplyJob({ ...ApplyJob, [e.target.name]: e.target.value });
    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/jobs/add', ApplyJob)
        .then(response => {
            if(response.data){
                alert('job added successfully!');
                window.location.href="/dashboard";
            }
        })
        .catch(err => {
            console.log(err);
        });
    };
    return (
        <Fragment>
      <h1 className="large text-primary">apply Job</h1>
      <p className="lead">
        <i className="fas fa-user"></i> heading 
      </p>
      <small># </small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter Bio"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            #
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter job Title"
            name="jobTitle"
            value={jobTitle}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            #
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter skills"
            name="skills"
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            #
          </small>
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Enter location"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            #
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter Education"
            name="education"
            value={education}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
           #
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter services"
            name="services"
            value={services}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
           #
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter experience"
            name="experience"
            value={experience}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
           #
          </small>
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Enter hourlyRate"
            name="hourlyRate"
            value={hourlyRate}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
           #
          </small>
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Enter dailyRate"
            name="dailyRate"
            value={dailyRate}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
           #
          </small>
        </div>
        <input type="submit" value="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
        
    );
}
export default ApplyJobs
