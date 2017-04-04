import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle';

const Course = ({ course, saveHandler, removeHandler, savedCourses }) => {
  const saved = savedCourses.indexOf(course.id) > -1;
  return (
    <Card style={{ marginBottom: '20px' }}>
      <CardHeader
        title={course.title}
        avatar={course.photoUrl}
      />
      <CardText>
        {course.description}
      </CardText>
      <CardActions>
        <RaisedButton
          primary
          onTouchTap={() => { saved ? removeHandler(course.id) : saveHandler(course.id); }}
          label={saved ? 'Remove from my Courses' : 'Save to my courses'}
          icon={saved && <ActionCheckCircle />}
        />
      </CardActions>
    </Card>
  );
};

export const CourseType = {
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  homepage: React.PropTypes.string,
  summary: React.PropTypes.string,
  short_summary: React.PropTypes.string,
  key: React.PropTypes.string,
};

Course.defaultProps = {
  course: {},
  saveHandler: () => {},
  removeHandler: () => {},
  savedCourses: [],
};

Course.propTypes = {
  course: React.PropTypes.shape(CourseType),
  saveHandler: React.PropTypes.func.isRequired,
  removeHandler: React.PropTypes.func.isRequired,
  savedCourses: React.PropTypes.arrayOf(React.PropTypes.string),
};

export default Course;
