import React, { Component } from 'react';
import R from 'ramda';
import { Grid, Row, Col } from 'react-flexbox-grid';
import SelectField from 'material-ui/SelectField';
import AutoComplete from 'material-ui/AutoComplete';
import CourseList from 'components/CourseList';
import MenuItem from 'material-ui/MenuItem';
import dataService from '../../services/data';

const courseList = dataService.getCourses();
const partners = dataService.getPartners();

class Courses extends Component {

  static getMenuItem(text, value) {
    return <MenuItem value={value} key={value} primaryText={text} />;
  }

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      partners,
      filteredCourses: courseList,
      searchQuery: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.showCourses = this.showCourses.bind(this);
    this.filterCourses = this.filterCourses.bind(this);
  }

  filterCourses(searchText) {
    const filtered = searchText === 'all'
    ? courseList.filter(
      course => course.title.includes(searchText))
    : courseList;
    this.setState({ filteredCourses: filtered });
  }

  showCourses(id) {
    this.setState({ filteredCourses: id === 'all'
        ? courseList
        : courseList.filter(
      course => course.partnerId === id) });
  }

  handleChange(event, index, value) {
    if (value != null) {
      this.setState({ value });
      const id = this.state.partners[value].id;
      this.showCourses(id);
    }
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <SelectField
              floatingLabelText="Select Provider"
              value={this.state.value}
              onChange={this.handleChange}
            >
              {this.state.partners.map((partner, index) =>
                Courses.getMenuItem(partner.name, index))}
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
              maxSearchResults={5}
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

export default Courses;
