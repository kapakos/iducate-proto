import React from 'react';
import R from 'ramda';
import Chip from 'material-ui/Chip';
import { Row, Col } from 'react-flexbox-grid';
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
      key={skill}
      onRequestDelete={() => this.handleDeleteSkill(skill)}
      style={{ margin: 4 }}
    >
      {skill}
    </Chip>);
  }

  render() {
    return (
      <div>
        <Row middle="xs" between="xs">
          <Col xs={12}>
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
