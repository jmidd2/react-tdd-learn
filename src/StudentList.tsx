import React from "react";

type StudentState = { students: any[] };

export default class StudentList extends React.Component<any, StudentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      students: [],
    };
  }

  componentDidMount() {
    fetch("/api/students")
      .then((response) => response.json())
      .then((students) => this.setState({ students: students }));
  }

  render() {
    return (
      <ul>
        {this.state.students.map(
          (
            student: {
              firstName:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
              lastName:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
            },
            index: React.Key | null | undefined
          ) => (
            <li key={index}>
              {student.firstName} {student.lastName}
            </li>
          )
        )}
      </ul>
    );
  }
}
