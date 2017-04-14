import React from 'react';
import R from 'ramda';
import Course, { CourseType } from '../Course';
import dataStore from '../../data/store';

import './courseList.css';

class CourseList extends React.Component {
  static getCard(course, savedCourses, addCourse, removeCourse) {
    return (
      <Course
        key={course.id}
        course={course}
        savedCourses={savedCourses}
        saveHandler={addCourse}
        removeHandler={removeCourse}
      />
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      savedCourses: [],
    };
    this.addCourse = this.addCourse.bind(this);
    this.removeCourse = this.removeCourse.bind(this);
  }

  componentWillMount() {
    const self = this;
    dataStore.getCourses()
    .then((courses) => {
      self.setState({ savedCourses: courses });
    });
  }

  addCourse(id) {
    dataStore.saveCourse(id);
    const courses = this.state.savedCourses;
    courses.push(id);
    this.setState({ savedCourses: courses });
  }

  removeCourse(id) {
    dataStore.removeCourse(id);
    const courses = this.state.savedCourses;
    this.setState({ savedCourses: R.without([id], courses) });
  }

  render() {
    return (
      <div>
        {this.props.courses && this.props.courses.map(course =>
          CourseList.getCard(course, this.state.savedCourses, this.addCourse, this.removeCourse))}
      </div>);
  }
}

export const CoursesPropType = React.PropTypes.arrayOf(React.PropTypes.shape(CourseType));

CourseList.defaultProps = {
  courses: [],
};

CourseList.propTypes = {
  courses: CoursesPropType,
};

export default CourseList;
