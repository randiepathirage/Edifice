import React, { Component } from "react";
import { Link } from "react-router-dom";
import DocumentDataService from "./../../../services/documentfile.service";
import DirectoryDataService from "./../../../services/directory.service";
import Table from 'react-bootstrap/Table';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import UpdateIcon from '@material-ui/icons/Update';

export default class ViewDirectory extends Component {
    constructor(props) {
        super(props);
        this.retrieveCategoryDocument = this.retrieveCategoryDocument.bind(this);
        this.state = {
          id: this.props.match.params.id,
          documents: [],
          title: "",
          description: "", 
          projectId: ""
        };
      }
    
      componentDidMount() {
        this.retrieveCategoryDocument(this.props.match.params.id);
        this.retriveCategoryInfo(this.props.match.params.id);
      }
      retriveCategoryInfo(id){
        DirectoryDataService.getOne(id)
        .then(response => {
          this.setState({
            id: response.data.id,
            title: response.data.title,
            description: response.data.description,
            projectId: response.data.projectId,
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      }
      retrieveCategoryDocument(id) {
        DocumentDataService.getCat(id)
          .then(response => {
            this.setState({
              documents: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
      render() {
          const { id,title,description,documents,currentIndex } = this.state;
          return (
              <div>
                <h2>Directory Single Page</h2>
                <p>Manage the document in each drawing category</p>
                <hr></hr>
                <h3>Category details</h3>
                <h6>Name : {title}</h6>
                <h6>Description : {description}</h6>
                <hr></hr>
                
                <h3>Drawing List</h3>
                {/* Drawing List */}
                <Table striped bordered hover variant="dark" responsive>
                  <thead>
                    <tr>
                      <th>Index</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Type</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {/* Functional for table data */}
                  <tbody>
                  {documents &&
                      documents.map((drawing, index) => (
                      <tr
                          // className={
                          // "list-group-item row" +
                          // (index === currentIndex ? "active" : "")
                          // }
                          // onClick={() => this.setActiveProject(project, index)}
                          key={index}
                      >
                      <td>{drawing.id}</td>
                      <td>{drawing.title}</td>
                      <td>{drawing.description}</td>
                      <td>{title}</td>
                      <td>   
                          {/* Button Group */}
                          {/* <Link to={"/viewdrawing/"+drawing.id}>
                          <button className="btn btn-primary">View <VisibilityIcon/> </button>
                          </Link> */}
                          <a className="btn btn-primary" href={"http://localhost:8080/api/files/"+drawing.title+".pdf"} target="_blank">View<VisibilityIcon/></a>
                          <Link to={"/viewdrawing/"+drawing.id}>
                          <button className="btn btn-success m-2">Update <UpdateIcon/> </button>
                          </Link>
                          <Link to={"/viewdrawing/"+drawing.id}>
                          <button className="btn btn-danger">Delete <DeleteIcon/> </button>
                          </Link>
                      </td>    
                      </tr>
                      ))}
                  </tbody>
                  {/*Ends */}
                </Table>
               
              </div>
          );
      }
}