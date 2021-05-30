import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AllJobs from './AllJobs';
class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  handleAppliedJob = () => {
    this.props.history.push('/appliedJobs');
  }
  handleAppliedJob = () => {
    window.location.href="/appliedJobs";
    // props.history.push('/appliedJobs');
  }
  handleProfile = () => {
    window.location.href="/viewProfile";
    // props.history.push('/appliedJobs');
  }
  
  render() {
    return (
      <div className="container">
        <Button onClick = {this.handleProfile}>View Profile</Button>
        <Button onClick = {this.handleAppliedJob}>Applied Jobs</Button>
        <AllJobs />
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
