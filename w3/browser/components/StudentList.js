import React from "react";

const StudentList = props => {
  console.log("p", props);
  return (
    <tbody>
      {props.students.map(student => (
        <tr key={student.id}>
          <td>{student.fullName}</td>
          <td onClick={() => props.selectStudent(student)}>
            <button> Click to see more</button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default StudentList;
