import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';
import content from './content';

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
    fontSize: '14px',
  },
};

const Course = ({ course, savedCourse, courseActions, resetCourse }) => (
  <Card style={{ marginBottom: '20px' }}>
    <CardHeader
      title={course.title}
      subtitle={course.subtitle}
      avatar={course.image}
    />
    {/* <CardTitle title={course.partnerId} />*/}
    <CardText>
      {course.tracks.length > 0 ? <p>Categories: {course.tracks}</p> : ''}
      {course.summary}

    </CardText>
    <CardActions>
      <div>
        <RadioButtonGroup
          name="course-actions"
          onChange={courseActions.bind(this, course.key)}
          value={course.key}
          valueSelected={savedCourse}
        >
          <RadioButton
            value="courseTaken"
            label={content.COURSE_TAKEN}
            style={styles.radioButton}
          />
          <RadioButton
            value="courseToTake"
            label={content.COURSE_TO_TAKE}
            style={styles.radioButton}
          />
        </RadioButtonGroup>
        <FlatButton
          primary
          disabled={R.isEmpty(savedCourse)}
          label="Reset"
          onTouchTap={() => resetCourse(course.key)}
          name="reset"
        />
      </div>
    </CardActions>
  </Card>
  );

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
  courseActions: () => {},
  resetCourse: () => {},
  savedCourse: '',
};

Course.propTypes = {
  course: PropTypes.shape(CourseType),
  courseActions: PropTypes.func.isRequired,
  resetCourse: PropTypes.func.isRequired,
  savedCourse: PropTypes.string,
};

export default Course;
