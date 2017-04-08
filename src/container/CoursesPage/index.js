import React, { Component } from 'react';
import R from 'ramda';
import { Grid, Row, Col } from 'react-flexbox-grid';
import SelectField from 'material-ui/SelectField';
import AutoComplete from 'material-ui/AutoComplete';
import CourseList from 'components/CourseList';
import MenuItem from 'material-ui/MenuItem';
import partners from '../../data/partners';
import dataService from '../../services/data';

const courseList = dataService.getCourses();
class Courses extends Component {

  static getMenuItem(text, value) {
    return <MenuItem value={value} key={value} primaryText={text} />;
  }

  constructor(props) {
    super(props);
    this.state = {
      value: null,
      partners,
      courses: courseList,
      filteredCourses: null,
      searchQuery: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.filterCourses = this.filterCourses.bind(this);
  }

  handleChange(event, index, value) {
    if (value != null) {
      this.setState({ value });
      const id = this.state.partners[value].id;
      this.setState({ filteredCourses: courseList.filter(
      course => course.partnerId === id) });
    }
  }

  filterCourses(searchText) {
    const filtered = courseList.filter(
      course => course.title.includes(searchText));
    this.setState({ filteredCourses: filtered });
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
              <MenuItem value={null} primaryText="" />
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
