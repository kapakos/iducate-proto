import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle';
import content from './content';

const Course = ({ course, saveHandler, removeHandler, savedCourses }) => {
  const saved = savedCourses.indexOf(course.id) > -1;
  return (
    <Card style={{ marginBottom: '20px' }}>
      <CardHeader
        title={course.title}
        avatar={course.photoUrl}
      />
      <CardTitle title={course.partnerId} />
      <CardText>
        {course.description}
      </CardText>
      <CardActions>
        <div>
          <RaisedButton
            style={{ width: '200px', margin: 12 }}
            primary
            onTouchTap={() => (saved ? removeHandler(course.id) : saveHandler(course.id))}
            label={saved ? content.REMOVE_COURSE : content.SAVE_COURSE}
            icon={saved && <ActionCheckCircle />}
          />
        </div>
      </CardActions>
    </Card>
  );
};

export const CourseType = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  homepage: PropTypes.string,
  summary: PropTypes.string,
  short_summary: PropTypes.string,
  key: PropTypes.string,
};

Course.defaultProps = {
  course: {},
  saveHandler: () => {},
  removeHandler: () => {},
  savedCourses: [],
};

Course.propTypes = {
  course: PropTypes.shape(CourseType),
  saveHandler: PropTypes.func.isRequired,
  removeHandler: PropTypes.func.isRequired,
  savedCourses: PropTypes.arrayOf(React.PropTypes.string),
};

export default Course;
