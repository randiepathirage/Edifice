import React, { Component } from "react";
import { Link } from "react-router-dom";

import UserService from "./../services/user.service";
import ProjectUserService from "../services/projectuser.service";
import AuthService from "./../services/auth.service";
import { Card } from "react-bootstrap";
import mainIcon from "././../assets/logowithborder.png";
import projectLogo from "././../assets/projectlogo.png";
import DashboardIcon from '@material-ui/icons/Dashboard';
import ProjectIcon from '@material-ui/icons/Apartment';
import FinanceIcon from '@material-ui/icons/MonetizationOn';
import ResourceIcon from '@material-ui/icons/EmojiTransportation';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import ProgressBar from 'react-bootstrap/ProgressBar';
// import Badge from 'react-bootstrap/Badge';
import ProgressBarCust from 'react-customizable-progressbar';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.retriveUserProjects = this.retriveUserProjects.bind(this);
    this.retrieveUserProjectCount = this.retrieveUserProjectCount.bind(this);
    this.showCompleted = this.showCompleted.bind(this);
    this.showProgressed = this.showProgressed.bind(this);
    this.state = {
      projects: [],
      uprojects: [],
      currentIndex: -1,
      content: "",
      currentUser: AuthService.getCurrentUser(),
      showEngineerBoard: false,
      showManagerBoard: false,
      showAdminBoard: false,
      projectcount: 0,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
  
    if (user) {
      this.setState({
        currentUser: user,
        showEngineerBoard: user.roles.includes("ROLE_USER"),
        showManagerBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
      this.retriveUserProjects(this.state.currentUser.id);
      this.retrieveUserProjectCount(this.state.currentUser.id);
    }
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }
  retrieveUserProjectCount(id) {
    ProjectUserService.getProjectUserProjectDetails(id)
      .then(response => {
        this.setState({
          projectcount: response.data.length
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  retriveUserProjects(id){
    ProjectUserService.getProjectUserProjectDetails(id)
    .then(response => {
      this.setState({
        uprojects: response.data
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }
  showCompleted(){
    this.setState({
      buttonToggle: 1
    });
  }
  showProgressed(){
    this.setState({
      buttonToggle: 0
    });
  }

  render() {
    const { currentIndex,currentUser, showEngineerBoard,showManagerBoard,showAdminBoard, uprojects, projectcount } = this.state;
    return (
      <div className="container">
        <center>
        <h2>Hi {currentUser.username}, Welcome to Edifice!</h2>
        {showAdminBoard && showManagerBoard && showEngineerBoard &&
        <h4>You are Login as <b>Admin</b></h4>
        }
        
        {!showAdminBoard && showManagerBoard && showEngineerBoard &&
        <h4>You are Login as <b>Manager</b></h4>
        }
        {!showAdminBoard && !showManagerBoard && showEngineerBoard &&
        <h4>You are Login as <b>Engineer</b></h4>
        }
          <img
              src={mainIcon}
              style={{'width' : "250px", height: "250px"}}
              alt="profile-img"
              className = "mr-1"
            />
          <h5 className="mt-3 mb-3">Construction Project Management Tool</h5>
        </center>
       
        {showAdminBoard && showManagerBoard && showEngineerBoard &&
        <div className="row">
        <div className="col-3">
            <Card border="dark" style={{ width: '14rem' }}>
                {/* <Card.Header>Admin/ Manager</Card.Header>  */}
                <Card.Body>
                  <Card.Title>
                  <center>
                  <DashboardIcon style={{ fontSize: 50 }}/>
                  
                  <h3 style={{'color': '#273f7d' }}>Dashboard & Core Tools</h3>
                  
                  </center>
                  </Card.Title>
                  <Card.Text>
                  </Card.Text>
                </Card.Body> 
            </Card>
          </div>
          <div className="col-3">
            <Card border="dark" style={{ width: '14rem' }}>
                {/* <Card.Header>Manager/ Enginner/ Architect</Card.Header>  */}
                <Card.Body>
                  <Card.Title>
                  <center>
                  <ProjectIcon style={{ fontSize: 50 }}/>
                  
                  <h3 style={{'color': '#273f7d' }}>Project Management</h3>
                  
                  </center>
                  </Card.Title>
                  <Card.Text>
                  
                  </Card.Text>
                </Card.Body> 
            </Card>
          </div>
          <div className="col-3">
            <Card border="dark" style={{ width: '14rem' }}>
                {/* <Card.Header>Manager/ Enginner/ QS</Card.Header>  */}
                <Card.Body>
                  <Card.Title>
                  <center>
                  <FinanceIcon style={{ fontSize: 50 }}/>
                  
                  <h3 style={{'color': '#273f7d' }}>Finance Management</h3>
                 
                  </center>
                  </Card.Title>
                  <Card.Text>
                  
                  </Card.Text>
                </Card.Body> 
            </Card>
          </div>
          <div className="col-3">
            <Card border="dark" style={{ width: '14rem' }}>
                {/* <Card.Header>Manager/ Enginner</Card.Header>  */}
                <Card.Body>
                  <Card.Title>
                  <center>
                  <ResourceIcon style={{ fontSize: 50 }}/>
                  
                  <h3 style={{'color': '#273f7d' }}>Resource Management</h3>
                  
                  </center>
                  </Card.Title>
                  <Card.Text>
                  
                  </Card.Text>
                </Card.Body> 
            </Card>
          </div>
        </div>
      }
      {!showAdminBoard && showManagerBoard && showEngineerBoard &&
      <center>
        <div className="row">
          <div className="col-4">
            <Card border="dark" style={{ width: '14rem' }}>
                {/* <Card.Header>Manager/Enginner/Architect</Card.Header>  */}
                <Card.Body>
                  <Card.Title>
                  <center>
                  <ProjectIcon style={{ fontSize: 50 }}/>
                  
                  <h3 style={{'color': '#273f7d' }}>Project Management</h3>
                  
                  </center>
                  </Card.Title>
                  <Card.Text>
                  
                  </Card.Text>
                </Card.Body> 
            </Card>
          </div>
          <div className="col-4">
            <Card border="dark" style={{ width: '14rem' }}>
                {/* <Card.Header>Manager/Enginner/QS</Card.Header>  */}
                <Card.Body>
                  <Card.Title>
                  <center>
                  <FinanceIcon style={{ fontSize: 50 }}/>
                  
                  <h3 style={{'color': '#273f7d' }}>Finance Management</h3>
                  
                  </center>
                  </Card.Title>
                  <Card.Text>
                  
                  </Card.Text>
                </Card.Body> 
            </Card>
          </div>
          <div className="col-4">
            <Card border="dark" style={{ width: '14rem' }}>
                {/* <Card.Header>Manager/Enginner</Card.Header>  */}
                <Card.Body>
                  <Card.Title>
                  <center>
                  <ResourceIcon style={{ fontSize: 50 }}/>
                  
                  <h3 style={{'color': '#273f7d' }}>Resource Management</h3>
                  
                  </center>
                  </Card.Title>
                  <Card.Text>
                  
                  </Card.Text>
                </Card.Body> 
            </Card>
          </div>
        </div>
      </center>
      }
      {!showAdminBoard && !showManagerBoard && showEngineerBoard &&
        <center>
        <div className="row">
          <div className="col-14">
            <Card border="dark" style={{ width: '14rem' }}>
                {/* <Card.Header>Manager/Enginner/Architect</Card.Header>  */}
                <Card.Body>
                  <Card.Title>
                  <center>
                  <ProjectIcon style={{ fontSize: 50 }}/>
                  
                  <h3 style={{'color': '#273f7d' }}>Project Management</h3>
                  
                  </center>
                  </Card.Title>
                  <Card.Text>
                  
                  </Card.Text>
                </Card.Body> 
            </Card>
          </div>
        </div>
        </center>
      }
      <hr></hr>
      {/* Project Lists starts*/}
      <h3><ProjectIcon style={{ fontSize: 40 }}/>Involved Projects</h3>
      <div className="row">
      <div className="col-md-1"></div>
      <div className="col-md-10">
        {/* <button className="btn btn-primary" onClick={this.showCompleted}>Show Completed Projects</button> */}
        <div className="list-group">
          {uprojects &&
            uprojects.map((project, index) => (
              <Card style={{ width: '54rem'}} className="m-2 shadow-sm">
              <div className="container row">
                <div className="col-9">
                  <Link
                    to={"/projectmanagementhome/" + project.projectId}
                    className="" style={{'text-decoration': 'none', 'color': '#273f7d'}}
                  >
                    <h4 className="mt-2">{project.title}</h4>
                  </Link>
                  <br/>
                    <h6>Brief : {project.description}</h6>
                    <h6>Location : {project.location}</h6>
                    <h6>Working Department : {project.department}</h6>
                    {/* {index} */}
                    {/* <h6>Position : {project.position}</h6> */}
                </div>
                <div className="col-3">
                <center>
                {/* <img
                  src={projectLogo}
                  style={{'width' : "100px", height: "100px"}}
                  alt="profile-img"
                  className = "mt-4"
                  
                /> */}
                  <ProgressBarCust
                      radius={50}
                      progress={66}
                      initialAnimation
                      initialAnimationDelay={2000}
                      strokeWidth={10}
                      strokeColor="#273f7d"
                      transition="2s ease"
                      trackStrokeWidth={10}
                      trackStrokeColor="#f3eded"
                      trackTransition="1s ease"
                      pointerRadius={1}
                      pointerStrokeWidth={15}
                      pointerStrokeColor="#5c81cd"
                      className="mt-2"
                  />
                  {/* <h5>Progress</h5>
                  <ProgressBar>
                    <ProgressBar  variant="primary" now={35} key={1} />
                    <ProgressBar variant="success" now={20} key={2} />
                    <ProgressBar variant="danger" now={10} key={3} />
                  </ProgressBar>
                  <h6>Progress</h6>
                  <CircularProgress variant="determinate" color="success" value={61} />
                    <p>61%</p> */}
                </center>
                </div> 
              </div>
              </Card>
            ))}
            </div>
        </div>
        </div> 
      {/* Project Lists ends */}
      </div>
    );
  }
}