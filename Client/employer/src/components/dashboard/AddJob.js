import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Select from 'react-select';

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ]

const AddJob = () => {
  const [formData, setFormData] = useState({
    category:'',
    description:'',
    country:'',
    budget:'',
    period:'',
  });
  const {
    category,
    description,
    country,
    budget,
    period,
  } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/jobs/add', formData)
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
  // const handleChange = category => {
  //   setCategory(category);
  //   console.log(`Option selected:`, category);
  // };

// const handleChange = (e) => { 
//   // {[e.target.checked] : e.target.value}
//    setCategory(e.target.value);}
  
  return (
    <Fragment>
      <h1 className="large text-primary">Add Job</h1>
      <p className="lead">
        <i className="fas fa-user"></i> heading 
      </p>
      <small># </small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          {/* <Select>
              value={category}
              options={options}
              onChange={handleChange}
          </Select> */}

          {/* <Select name="category" value={category} onChange={(e) => onChange(e)}>
            <option value="0" selected>-- Select category --</option>
            <option value="Design">Design</option>
            <option value="Website Dev">Website Dev</option>
            <option value="Mobile Dev">Mobile Dev</option>
            <option value="Writing">Writing</option>
            <option value="Marketing">Marketing</option>
            <option value="Accounting">Accounting</option>
            <option value="Data entry">Data Entry</option>
            <option value="Customer Service">Customer Service</option>
            <option value="Other">Other</option>
          </Select> */}
          <small className="form-text">
            #
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter category"
            name="category"
            value={category}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            #
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter Description"
            name="description"
            value={description}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            #
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="country"
            name="country"
            value={country}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            #
          </small>
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="budget"
            name="budget"
            value={budget}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            #
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="period"
            name="period"
            value={period}
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
};

export default AddJob;
