import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
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

  filterCourses(event) {
    const filtered = courseList.filter(
      course => course.title.includes(event.target.value));
    this.setState({ filteredCourses: filtered });
  }

  render() {
    return (
      <div className="content">
        <h2>Courses</h2>
        <SelectField
          floatingLabelText="Select Provider"
          value={this.state.value}
          onChange={this.handleChange}
        >
          <MenuItem value={null} primaryText="" />
          {this.state.partners.map((partner, index) => Courses.getMenuItem(partner.name, index))}
        </SelectField>
        {this.state.filteredCourses &&
        <div>
          <TextField
            onChange={this.filterCourses}
            hintText="Start typing to filter for courses"
            floatingLabelText="Search Course" fullWidth
          />
          <CourseList courses={this.state.filteredCourses} />
        </div>}
      </div>
    );
  }
}

export default Courses;
