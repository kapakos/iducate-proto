import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
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
      completedCourses: [],
      recomendedCourses: [],
      user: {},
    };
  }
  async componentWillMount() {
    const courses = await service.getCourses();
    const completedCourses = await service.getCompletedCourses(courses);
    const recomendedCourses = R.take(3, courses);
    const educations = await dataStore.getEducations();
    const latestEducation = await dataStore.getLatestEducation(educations);
    const user = await dataStore.getUser();
    this.setState({
      completedCourses,
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
    const { user, recomendedCourses, completedCourses, latestEducation } = this.state;
    return (
      <div>
        <Row center="xs" style={styles.row}>
          <Col xs={12}>
            <Card>
              <CardTitle
                title={`${user.firstName} ${user.lastName}`}
                subtitle={(!R.isNil(latestEducation) && !R.isEmpty(latestEducation)) ? `${latestEducation.schoolName} - ${service.mapDegreeIdToDegreeName(latestEducation.degree)}` : ''}
              />
              <CardActions>
                <FlatButton label="Edit Profile" onTouchTap={this.goToProfile} />
              </CardActions>
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
        <Row style={styles.row}>
          <Col xs={12}>
            <Card>
              <CardTitle title="Completed Courses" />

              {completedCourses.map(
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
