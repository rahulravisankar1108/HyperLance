import axios from 'axios';
import {React, useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ViewProfile = (props) => {
    const handleEditProfile = () => {
        // window.location.href="/editProfile";
        props.history.push('/editProfile');
      }
    const [ ProfileDetails, setProfileDetails] = useState([]);
    const [ Loading, setLoading] = useState(false);
    
    useEffect(() => {
        // var config = {
        //     method: 'get',
        //     url: ,
        //     headers: { 
        //         'Authorization': localStorage.getItem('jwtToken')
        //       }
        //   };
        //   console.log('useefect')
        //   console.log(config);
          axios.get('http://localhost:5000/api/freelancer/view-profile')
          .then(response => {
            const data = response.data;
            console.log(data.userProfile);
            setProfileDetails(data.userProfile.userProfile);
            setLoading(true);
          })
          .catch(error => {
            console.log(error);
          });
    }, []);

    if(Loading) {
        return (
            <div>
                <Button onClick = {() => {handleEditProfile()}}>Edit Profile</Button>
                <Card style={{ width: "100%" }}>
                    <Card.Title className="col d-flex justify-content-center">
                        Profile Details
                    </Card.Title>
                    <Card.Header><div>{ProfileDetails.postedBy.name}</div></Card.Header>
                    <Card.Body>
                        <div>{ProfileDetails.postedBy.email}</div>
                        <div>{ProfileDetails.bio}</div>
                        <div>{ProfileDetails.jobTitle}</div>
                        <div>{ProfileDetails.skills}</div>
                        <div>{ProfileDetails.location}</div>
                        <div>{ProfileDetails.education}</div>
                        <div>{ProfileDetails.services}</div>
                        <div>{ProfileDetails.experience}</div>
                        <div>{ProfileDetails.hourlyRate}</div>
                        <div>{ProfileDetails.dailyRate}</div>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
export default ViewProfile
