import axios from 'axios';
import {React, useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const AllJobs = () => {
    const [ AllJob, setAllJob] = useState([]);
    useEffect(() => {
        var config = {
            method: 'get',
            url: 'http://localhost:5000/api/jobs/viewAll',
            headers: { 
                'Authorization': localStorage.getItem('jwtToken')
              }
          };
          console.log(config);
          axios(config)
          .then(function (response) {
            const data = response.data;
              console.log('data');
            setAllJob(data.allJobs);
          })
          .catch(function (error) {
            console.log(error);
          });
    }, []);

    return (
        <div>
            {AllJob && AllJob.map((job, index) => {
                const category = job.category;
                return(
                    <Card style={{ width: "100%" }}>
                        <Card.Title className="col d-flex justify-content-center">
                            Job {index + 1}
                        </Card.Title>
                        <Card.Header><div>{category}</div></Card.Header>
                        <Card.Body>
                            <div>{job.postedBy.name}</div>
                            <div>{job.postedBy.email}</div>
                            <div>{job.description}</div>
                            <div>{job.country}</div>
                            <div>{job.budget}</div>
                            <div>{job.period}</div>
                        {/* <Button variant="primary"></Button> */}
                        </Card.Body>
                    </Card>
                );
            })}
        </div>
        
    );
}
export default AllJobs
