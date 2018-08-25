import React, { Component } from "react";
import axios from "axios";

import StudentList from "./StudentList.js";
import SingleStudent from "./SingleStudent.js";
import NewStudentForm from "./NewStudentForm.js";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      selectedStudent: {},
      showForm: false
    };

    this.selectStudent = this.selectStudent.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.addStudent = this.addStudent.bind(this);
  }

  componentDidMount() {
    this.getStudents();
  }

  getStudents() {
    console.log("fetching");
    axios
      .get("/student")
      .then(res => this.setState({ students: res.data }))
      .catch(console.error);
  }

  async addStudent(newStudent) {
    try {
      const { data } = await axios.post("/student", newStudent);
    } catch (error) {
      console.error(error);
    }
  }

  selectStudent(student) {
    return this.setState({
      selectedStudent: student
    });
  }

  toggleForm() {
    //this is the long way:
    if (!this.state.showForm) this.setState({ showForm: true });
    else this.setState({ showForm: false });
    //shorer version:
    //showForm: !this.state.showForm
  }

  render() {
    return (
      <div>
        <h1>Students</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Tests</th>
            </tr>
          </thead>
          <StudentList
            students={this.state.students}
            selectStudent={this.selectStudent}
          />
        </table>

        {this.state.selectedStudent.id ? (
          <SingleStudent student={this.state.selectedStudent} />
        ) : null}
        <button onClick={this.toggleForm}>Add New Student</button>
        {this.state.showForm && <NewStudentForm addStudent={this.addStudent} />}
      </div>
    );
  }
}
