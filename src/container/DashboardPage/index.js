import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import R from 'ramda';
import SidebarLayout from '../SidebarLayout';
import dataStore from '../../data/store';
import service from '../../services/data';

const styles = {
  row: {
    marginBottom: '20px',
  },
};
class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.goToProfile = this.goToProfile.bind(this);
    this.state = {
      takenCourses: [],
      toTakeCourses: [],
      recomendedCourses: [],
      latestEducation: {},
      user: {},
    };
  }
  async componentWillMount() {
    const courses = await service.getCourses();
    const takenCourses = await service.getTakenCourses(courses);
    const toTakeCourses = await service.getToTakeCourses(courses);
    const recomendedCourses = R.take(3, courses);
    const educations = await dataStore.getEducations();
    const latestEducation = await dataStore.getLatestEducation(educations);
    const user = await dataStore.getUser();
    this.setState({
      takenCourses,
      toTakeCourses,
      recomendedCourses,
      latestEducation,
      user,
    });
  }

  goToProfile(e) {
    e.preventDefault();
    this.context.router.push({ pathname: '/settings' });
  }

  render() {
    const { user, recomendedCourses, takenCourses, toTakeCourses, latestEducation } = this.state;
    const takenCount = R.isNil(takenCourses) ? 0 : takenCourses.length;
    const toTakeCount = R.isNil(toTakeCourses) ? 0 : toTakeCourses.length;
    return (
      <div>
        <Row center="xs" style={styles.row}>
          <Col xs={12}>
            <Card>
              <CardTitle
                title={`${user.firstName} ${user.lastName}`}
                subtitle={(!R.isNil(latestEducation) && !R.isEmpty(latestEducation)) ? `${latestEducation.schoolName} - ${service.mapDegreeIdToDegreeName(latestEducation.degree)}` : ''}
              />
              <CardText>
                <Badge
                  badgeContent={takenCount}
                  primary
                >
                Completed Courses
                </Badge>
                <Badge
                  badgeContent={toTakeCount}
                  secondary
                >
                Planned Courses
                </Badge>
              </CardText>
              <CardActions>
                <FlatButton label="Edit Profile" onTouchTap={this.goToProfile} />
              </CardActions>
            </Card>
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col xs={12}>
            <Card>
              <CardTitle title="Completed Courses" />

              {takenCourses && takenCourses.map(
                course => <Card key={course.id}>
                  <CardHeader title={course.title} avatar={course.photoUrl} />
                  <CardTitle title={course.partnerId} />
                  <CardText>{course.description}</CardText>
                </Card>,
                )
            }
            </Card>
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col xs={12}>
            <Card>
              <CardTitle title="Planned Courses" />

              {toTakeCourses && toTakeCourses.map(
                course => <Card key={course.id}>
                  <CardHeader title={course.title} avatar={course.photoUrl} />
                  <CardTitle title={course.partnerId} />
                  <CardText>{course.description}</CardText>
                </Card>,
                )
            }
            </Card>
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col xs={12}>
            <Card>
              <CardTitle
                title="Recommended Courses"
                subtitle="based on your profile we recommend these courses for you"
              />
              {recomendedCourses.map(
                course => <Card key={course.id}>
                  <CardHeader title={course.title} avatar={course.photoUrl} />
                  <CardTitle title={course.partnerId} />
                  <CardText>{course.description}</CardText>
                </Card>,
                )
            }
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

DashboardPage.contextTypes = {
  router: PropTypes.shape().isRequired,
};

DashboardPage.propTypes = {
  location: PropTypes.shape(),
};

DashboardPage.defaultProps = {
  location: {},
};

export default SidebarLayout(DashboardPage);
