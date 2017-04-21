import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import Chip from 'material-ui/Chip';
import { Row, Col } from 'react-flexbox-grid';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { blue800 } from 'material-ui/styles/colors';
import dataStore from '../../data/store';
import SkillForm from '../SkillForm';

class SkillList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
    };
    this.renderSkillList = this.renderSkillList.bind(this);
    this.handleAddSkill = this.handleAddSkill.bind(this);
    this.handleDeleteSkill = this.handleDeleteSkill.bind(this);
  }

  componentWillMount() {
    dataStore.getSkills()
    .then((skills) => {
      this.setState({
        skills,
      });
    });
  }

  async handleDeleteSkill(skill) {
    const newSkillList = await dataStore.deleteSkill(skill);
    this.setState({
      skills: newSkillList,
    });
  }

  async handleAddSkill(skill) {
    if (!R.isEmpty(skill)) {
      const newSkillList = await dataStore.addSkill(skill);
      this.setState({
        skills: newSkillList,
      });
    }
  }

  renderSkillList(skill) {
    return (<Chip
      onRequestDelete={() => this.handleDeleteSkill(skill)}
      style={{ margin: 4 }}
      key={skill}
    >
      {skill}
    </Chip>);
  }

  render() {
    return (
      <div>
        <Row middle="xs" between="xs">
          <Col xs={2}>
            Skills
          </Col>
        </Row>
        <SkillForm addSkill={this.handleAddSkill} deleteSkill={this.handleDeleteSkill} />
        <Row>
          <Col xs={12}>
            {this.state.skills.map(this.renderSkillList)}
          </Col>
        </Row>
      </div>
    );
  }
}

export default SkillList;
