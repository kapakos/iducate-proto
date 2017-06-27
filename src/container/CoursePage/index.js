import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Checkbox from 'material-ui/Checkbox';
import AutoComplete from 'material-ui/AutoComplete';
import CircularProgress from 'material-ui/CircularProgress';
import { withRouter } from 'react-router';
import dataService from '../../services/data';
import SidebarLayout from '../SidebarLayout';
import Filter from '../../components/Filter';
import CourseList from '../../components/CourseList';

class CoursePage extends Component {

  constructor(props) {
    super(props);

    this.handleCourseStateChange = this.handleCourseStateChange.bind(this);
    this.filterCourses = this.filterCourses.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.state = {
      courseStateIndex: 0,
      filteredCourses: [],
      savedCourses: [],
      courses: [],
    };
  }

  async componentWillMount() {
    const udacityData = await dataService.getUdacityData();
    const courseraData = await dataService.getCourseraData();
    this.categories = R.map(cat => cat.name, udacityData.tracks);
    this.categories.push('Other');
    this.providers = dataService.getProviders();
    this.courseStates = dataService.getCourseStates();

    this.setState({
      courses: udacityData.courses,
      filteredCourses: udacityData.courses,
    });
  }

 /* getCoursesByPartner(partnerId) {
    const coursesToFilter = this.isFilterSelected('courseStateIndex') ? this.state.filteredCourses : this.courses;

    return partnerId === 'all'
        ? coursesToFilter
        : coursesToFilter.filter(
      course => course.partnerId === partnerId);
  }*/

 /* async getCoursesByCourseState(courseState) {
    const coursesToFilter = this.isFilterSelected('providerIndex') ? this.state.filteredCourses : this.courses;
    if (courseState === 'all') {
      return dataService.getAllMarkedCourses(coursesToFilter);
    }
    const courses = courseState === 'taken'
    ? await dataService.getTakenCourses(coursesToFilter)
    : await dataService.getToTakeCourses(coursesToFilter);
    return courses;
  }*/

 /* async handleChecked(event, checked) {
    let courses = [];
    if (checked) {
      courses = await this.getCoursesByCourseState(event.target.name);
    } else {
      courses = await this.getCoursesByCourseState('all');
    }
    this.setState({ filteredCourses: courses });
  }*/

  filterCourses(searchText) {
    const partnerId = this.providers[this.state.providerIndex].id;
    const currentCourseList = this.getCoursesByPartner(partnerId);
    if (!R.isEmpty(searchText)) {
      const filtered = currentCourseList.filter(
        course => course.title.toLowerCase().includes(searchText.toLowerCase()));
      this.setState({ filteredCourses: filtered });
    } else {
      this.setState({ filteredCourses: currentCourseList });
    }
  }

/*  handleProviderChange(event, index, value) {
    if (value != null) {
      this.setState({ providerIndex: value });
      const id = this.providers[value].id;
      this.setState({ filteredCourses: this.getCoursesByPartner(id) });
    }
  }*/

  async handleCourseStateChange(event, index, value) {
    if (value != null) {
      this.setState({ courseStateIndex: value });
      const id = this.courseStates[value].id;
      const filtered = await this.getCoursesByCourseState(id);
      this.setState({ filteredCourses: filtered });
    }
  }

  setFilter(filter) {
    const { selectedProvider, selectedCategories } = filter;
    this.filterCoursesByCategories(selectedCategories);
  }

  filterCoursesByCategories(categories) {
    const { courses } = this.state;
    const intersects = R.intersection(categories);

    let filteredCourseList =
      R.isEmpty(categories) ? courses : R.filter(c => !R.isEmpty(intersects(c.tracks)), courses);
    if (R.contains('Other', categories)) {
      filteredCourseList =
        R.concat(R.filter(c => R.isEmpty(c.tracks), courses), filteredCourseList);
    }

    this.setState({
      filteredCourses: filteredCourseList,
    });
  }

  render() {
    const styles = {
      checkbox: {
        marginTop: 26,
      },
    };

    // const childrenWithProps = React.cloneElement(this.props.children, this.props);

    return (
      <Grid fluid>
        <Row>
          <Col xs={12} sm={3}>
            <Filter
              categories={this.categories}
              courseStates={this.courseStates}
              providers={this.providers}
              updateFilter={this.setFilter}
            />
          </Col>
          <Col xs={12} sm={9}>
            <AutoComplete
              style={{ marginBottom: '20px' }}
              floatingLabelText="Search for course"
              filter={AutoComplete.fuzzyFilter}
              dataSource={R.pluck('title')(this.state.filteredCourses)}
              maxSearchResults={10}
              onUpdateInput={this.filterCourses}
              fullWidth
            />

            {
              this.state.filteredCourses
              ? <div>
                <span>Courses found: ({this.state.filteredCourses.length})</span>
                <CourseList courses={this.state.filteredCourses} />
              </div>
              : <CircularProgress style={{ marginTop: 150 }} />
            }

          </Col>
        </Row>
      </Grid>
    );
  }
}

CoursePage.propTypes = {
  location: PropTypes.shape(),
};

CoursePage.defaultProps = {
  location: {},
};

export default withRouter(CoursePage);
