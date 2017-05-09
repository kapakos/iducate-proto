import React from 'react';
import R from 'ramda';
import Course, { CourseType } from '../Course';
import dataStore from '../../data/store';

import './courseList.css';

class CourseList extends React.Component {
  static getCard(course, activeButton, courseActions, resetCourse) {
    return (
      <Course
        key={course.id}
        course={course}
        savedCourse={activeButton}
        courseActions={courseActions}
        resetCourse={resetCourse}
      />
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      savedCourses: [],
    };
    this.handleCourseAction = this.handleCourseAction.bind(this);
    this.courseActions = this.courseActions.bind(this);
    this.resetCourse = this.resetCourse.bind(this);
  }

  async componentWillMount() {
    const courses = await dataStore.getCourses();
    this.setState({
      savedCourses: courses,
    });
  }

  courseActions(id, event, value) {
    this.handleCourseAction(id, value);
  }

  async handleCourseAction(id, action) {
    const courses = await dataStore[action](id);
    this.setState({ savedCourses: courses });
  }

  resetCourse(id) {
    this.handleCourseAction(id, 'resetCourse');
  }

  render() {
    const filterSavedCourses = R.flip(R.find)(this.state.savedCourses);
    const pickByTrueValue = (val, key) => val === true;

    return (
      <div>
        {
          this.props.courses && this.props.courses.map((course) => {
            let activeButton = R.keys(R.pickBy(pickByTrueValue)(filterSavedCourses(c => c.id === course.id)))[0];
            activeButton = !R.isNil(activeButton)
            ? activeButton === 'taken'
              ? 'courseTaken'
                : 'courseToTake'
                  : '';
            return CourseList.getCard(course, activeButton, this.courseActions, this.resetCourse);
          })

        }
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
