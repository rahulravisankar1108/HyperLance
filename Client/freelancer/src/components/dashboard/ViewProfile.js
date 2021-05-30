import axios from "axios";
import { React, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";

const ViewProfile = (props) => {
  const handleEditProfile = () => {
    // window.location.href="/editProfile";
    props.history.push("/editProfile");
  };
  const [ProfileDetails, setProfileDetails] = useState([]);
  const [Loading, setLoading] = useState(false);

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
    axios
      .get("http://localhost:5000/api/freelancer/view-profile")
      .then((response) => {
        const data = response.data;
        console.log(data.userProfile);
        setProfileDetails(data.userProfile);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (Loading && ProfileDetails !== null) {
    return (
      <>
        <Button
          onClick={() => {
            handleEditProfile();
          }}
        >
          Edit Profile
        </Button>
        <Card style={{ width: "100%" }}>
          <CardColumns>
            <Card.Title className="col d-flex justify-content-center">
              Profile Details
            </Card.Title>
            <Card.Header>
              <div>Name - {ProfileDetails.postedBy.name}</div>
            </Card.Header>
            <Card.Body
              style={{
                display: " grid",
                padding: " 5%",
                marginRight: "10%",
                gridTemplateColumns: "repeat(3, 1fr)",
              }}
            >
              <div>Email- {ProfileDetails.postedBy.email}</div>
              <div>Bio - {ProfileDetails.bio}</div>
              <div>Job Title -{ProfileDetails.jobTitle}</div>
              <div>Skills - {ProfileDetails.skills}</div>
              <div>Location - {ProfileDetails.location}</div>
              <div>Education - {ProfileDetails.education}</div>
              <div>Services - {ProfileDetails.services}</div>
              <div>Experience - {ProfileDetails.experience}</div>
              <div>HourlyRate - {ProfileDetails.hourlyRate}</div>
              <div>DailyRate - {ProfileDetails.dailyRate}</div>
            </Card.Body>
          </CardColumns>
        </Card>
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </>
    );
  }
  return <div>Error</div>;
};
export default ViewProfile;
