import React, { Component } from 'react';
import R from 'ramda';
import { Grid, Row, Col } from 'react-flexbox-grid';
import SelectField from 'material-ui/SelectField';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import CourseList from '../../components/CourseList';
import dataService from '../../services/data';

const courses = dataService.getCourses();
const providers = dataService.getProviders();

class CoursesPage extends Component {

  static getMenuItem(text, value) {
    return <MenuItem value={value} key={value} primaryText={text} />;
  }

  constructor(props) {
    super(props);
    this.state = {
      providerIndex: 0,
      providers,
      allCourses: courses,
      filteredCourses: courses,
    };
    this.handleProviderChange = this.handleProviderChange.bind(this);
    this.getCoursesByPartner = this.getCoursesByPartner.bind(this);
    this.filterCourses = this.filterCourses.bind(this);
  }

  getCoursesByPartner(partnerId) {
    return partnerId === 'all'
        ? this.state.allCourses
        : this.state.allCourses.filter(
      course => course.partnerId === partnerId);
  }

  filterCourses(searchText) {
    const partnerId = this.state.providers[this.state.providerIndex].id;
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
      const id = this.state.providers[value].id;
      this.setState({ filteredCourses: this.getCoursesByPartner(id) });
    }
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <SelectField
              floatingLabelText="Select Provider"
              value={this.state.providerIndex}
              onChange={this.handleProviderChange}
            >
              {this.state.providers.map((partner, index) =>
                CoursesPage.getMenuItem(partner.name, index))}
            </SelectField>
          </Col>
        </Row>
        {this.state.filteredCourses &&
        <Row>
          <Col xs={12}>
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
