import React, { Component } from 'react';
import R from 'ramda';
import { Grid, Row, Col } from 'react-flexbox-grid';
import SelectField from 'material-ui/SelectField';
import Checkbox from 'material-ui/Checkbox';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import CourseList from '../../components/CourseList';
import dataService from '../../services/data';

class CoursesPage extends Component {

  static getMenuItem(text, value) {
    return <MenuItem value={value} key={value} primaryText={text} />;
  }

  constructor(props) {
    super(props);

    this.courses = dataService.getCourses();
    this.providers = dataService.getProviders();
    this.courseStates = dataService.getCourseStates();

    this.handleProviderChange = this.handleProviderChange.bind(this);
    this.handleCourseStateChange = this.handleCourseStateChange.bind(this);
    this.getCoursesByPartner = this.getCoursesByPartner.bind(this);
    this.getCoursesByCourseState = this.getCoursesByCourseState.bind(this);
    this.filterCourses = this.filterCourses.bind(this);
    this.isFilterSelected = this.isFilterSelected.bind(this);
    this.handleChecked = this.handleChecked.bind(this);

    this.state = {
      providerIndex: 0,
      courseStateIndex: 0,
      filteredCourses: this.courses,
      savedCourses: [],
    };
  }

  getCoursesByPartner(partnerId) {
    const coursesToFilter = this.isFilterSelected('courseStateIndex') ? this.state.filteredCourses : this.courses;

    return partnerId === 'all'
        ? coursesToFilter
        : coursesToFilter.filter(
      course => course.partnerId === partnerId);
  }

  async getCoursesByCourseState(courseState) {
    const coursesToFilter = this.isFilterSelected('providerIndex') ? this.state.filteredCourses : this.courses;
    if (courseState === 'all') {
      return dataService.getAllMarkedCourses(coursesToFilter);
    }
    const courses = courseState === 'taken'
    ? await dataService.getTakenCourses(coursesToFilter)
    : await dataService.getToTakeCourses(coursesToFilter);
    return courses;
  }

  async handleChecked(event, checked) {
    let courses = [];
    if (checked) {
      courses = await this.getCoursesByCourseState(event.target.name);
    } else {
      courses = await this.getCoursesByCourseState('all');
    }
    this.setState({ filteredCourses: courses });
  }

  isFilterSelected(filter) {
    return this.state[filter] !== 0;
  }

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

  handleProviderChange(event, index, value) {
    if (value != null) {
      this.setState({ providerIndex: value });
      const id = this.providers[value].id;
      this.setState({ filteredCourses: this.getCoursesByPartner(id) });
    }
  }

  async handleCourseStateChange(event, index, value) {
    if (value != null) {
      this.setState({ courseStateIndex: value });
      const id = this.courseStates[value].id;
      const filtered = await this.getCoursesByCourseState(id);
      this.setState({ filteredCourses: filtered });
    }
  }

  render() {
    const styles = {
      checkbox: {
        marginTop: 26,
      },
    };
    return (
      <Grid fluid>
        <Row>
          <Col xs={12} md={4}>
            <SelectField
              floatingLabelText="Select by Provider"
              value={this.state.providerIndex}
              onChange={this.handleProviderChange}
              id="providers"
            >
              {this.providers.map((partner, index) =>
                CoursesPage.getMenuItem(partner.name, index))}
            </SelectField>
          </Col>
          <Col xs={12} md={2}>
            {/*  <SelectField
              floatingLabelText="Select by Course State"
              value={this.state.courseStateIndex}
              onChange={this.handleCourseStateChange}
              id="courseStates"
            >
              {this.courseStates.map((states, index) =>
                CoursesPage.getMenuItem(states.name, index))}
            </SelectField>*/}
            <Checkbox
              name="taken"
              label="Completed"
              style={styles.checkbox}
              onCheck={this.handleChecked}
            />

          </Col>
          <Col xs={12} md={2}>
            <Checkbox
              name="toTake"
              label="Planned"
              style={styles.checkbox}
              onCheck={this.handleChecked}
            />
          </Col>
        </Row>
        {this.state.filteredCourses &&
        <Row>
          <Col xs={12} sm={6}>
            <AutoComplete
              style={{ marginBottom: '20px' }}
              floatingLabelText="Search for course"
              filter={AutoComplete.fuzzyFilter}
              dataSource={R.pluck('title')(this.state.filteredCourses)}
              maxSearchResults={10}
              onUpdateInput={this.filterCourses}
              fullWidth
            />
          </Col>
          <CourseList courses={this.state.filteredCourses} />
        </Row>}
      </Grid>
    );
  }
}

export default CoursesPage;
