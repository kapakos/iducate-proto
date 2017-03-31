import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './courseList.css';

function getCard(card) {
  return (
    <Card style={{ marginBottom: '20px' }} key={card.id}>
      <CardHeader
        title={card.title}
        avatar={card.photoUrl}
      />
      {/* <CardMedia
        overlay={<CardTitle title={card.title} subtitle="Overlay subtitle" />}
      >
        <img src={card.photoUrl} alt={card.title} />
      </CardMedia>*/}
      <CardText>
        {card.description}
      </CardText>
      <CardActions>
        <FlatButton label="Go to course page" />
        <FlatButton label="Save to my courses" />
      </CardActions>
    </Card>
  );
}

const CourseList = ({ courses }) => (
  <div>
    {courses && courses.map(course => getCard(course))}
  </div>);

export const coursePropType = React.PropTypes.arrayOf(React.PropTypes.shape({
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  homepage: React.PropTypes.string,
  summary: React.PropTypes.string,
  short_summary: React.PropTypes.string,
  key: React.PropTypes.string,
}));

CourseList.defaultProps = {
  courses: {},
};

CourseList.propTypes = {
  courses: coursePropType,
};

export default CourseList;
