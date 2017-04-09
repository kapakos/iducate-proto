import React, { Component } from 'react';
import R from 'ramda';
import { Grid, Row, Col } from 'react-flexbox-grid';
import SelectField from 'material-ui/SelectField';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import CourseList from '../../components/CourseList';
import dataService from '../../services/data';

const courseList = dataService.getCourses();
const partners = dataService.getPartners();

class CoursesPage extends Component {

  static getMenuItem(text, value) {
    return <MenuItem value={value} key={value} primaryText={text} />;
  }

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      partners,
      allCourses: courseList,
      filteredCourses: courseList,
      searchQuery: 'hallo',
    };
    this.handleChange = this.handleChange.bind(this);
    this.showCourses = this.showCourses.bind(this);
    this.filterCourses = this.filterCourses.bind(this);
  }

  filterCourses(searchText) {
    if (!R.isEmpty(searchText)) {
      const filtered = this.state.filteredCourses.filter(
        course => course.title.toLowerCase().includes(searchText.toLowerCase()));
      this.setState({ filteredCourses: filtered });
    };
  }

  showCourses(partnerId) {
    this.setState({ filteredCourses: partnerId === 'all'
        ? this.state.allCourses
        : this.state.allCourses.filter(
      course => course.partnerId === partnerId) });
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
