import axios from 'axios';
import {React, useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const AppliedJobs = () => {
    const [ AppliedJob, setAppliedJob] = useState([]);
    useEffect(() => {
        var config = {
            method: 'get',
            url: 'http://localhost:5000/api/freelancer/viewAppliedJobs',
            headers: { 
              'Authorization': localStorage.getItem('jwtToken')
            }
          };
          axios(config)
          .then(function (response) {
              const data = response.data;
              console.log(response.data.appliedJobs.appliedJobs);
              setAppliedJob(data.appliedJobs.appliedJobs);
          })
          .catch(function (error) {
            console.log(error);
          });
    }, [])

    return (
        <div>
            {AppliedJob.map((job, index) => {
                const category = job.category;
                return(
                    <div className="col d-flex justify-content-center" style={{display:"flex"}}>
                        <Card style={{width:"30%", margin:"0 auto", marginBottom:"20px"}}  className="shadow p-3 mb-5 bg-white rounded">
                            <Card.Title  style={{textAlign:"center"}}>
                                Job {index + 1}
                                <div> Employer : {job.name}</div>
                                <div>Employer Email : {job.email}</div>
                            </Card.Title>
                            <Card.Header style={{textAlign:"center"}}><div>{category}</div></Card.Header>
                            <Card.Body style={{textAlign:"center"}}>
                                
                                <div>Description  : {job.description}</div>
                                <div>Country : {job.country}</div>
                                <div>Budget : {job.budget}</div>
                                <div>Period : {job.period}</div>
                            {/* <Button variant="primary"></Button> */}
                            </Card.Body>
                        </Card>
                    </div>
                );
            })}
        </div>
        
    );
}

export default AppliedJobs
