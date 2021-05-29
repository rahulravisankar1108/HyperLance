import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Button from 'react-bootstrap/Button';
class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  viewJobs = () => {
    this.props.history.push('/viewJobs');
  }
  viewAllJobs = () => {
    this.props.history.push('/viewAllJobs');
    // window.location.href='/allJobs';
  }
  addJob = () => {
    this.props.history.push('/addJob');
  }
  render() {
    return (
      <div className="container">
        <Button onClick={() => this.viewJobs()}>View Jobs</Button>
        <Button onClick={() => this.viewAllJobs()}>View All jobs</Button>
        <Button onClick={() => this.addJob()}>Add job</Button>
        
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
