import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { blue800 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Row, Col } from 'react-flexbox-grid';
import config from './fieldConfig';

class SkillForm extends React.Component {
  constructor(props) {
    super(props);
    this.fieldConfig = config;
    this.getFields = this.getFields.bind(this);
    this.handlerAddSkill = this.handlerAddSkill.bind(this);
    this.state = {
      errorText: {},
    };
  }

  getFields(field) {
    const style = {
      width: '100%',
    };
    return (<TextField
      ref={(input) => {
        this[field.name] = input;
      }}
      name={field.name}
      floatingLabelText={field.label}
      type={field.type}
      errorText={this.state.errorText[field.name]}
      style={style}
      multiLine={field.multiLine}
      key={field.name}
    />);
  }

  handlerAddSkill() {
    const skill = this.skill.input.value;
    this.props.addSkill(skill);
    this.skill.input.value = '';
  }

  render() {
    return (
      <div>
        <Row middle="xs">
          <Col xs={6}>
            {this.fieldConfig.map(field => this.getFields(field))}
          </Col>
          <Col xs={1}>
            <IconButton tooltip="Add Skill" onTouchTap={this.handlerAddSkill}>
              <ContentAdd color={blue800} />
            </IconButton>
          </Col>
        </Row>
      </div>
    );
  }
}

SkillForm.propTypes = {
  addSkill: PropTypes.func,
};

SkillForm.defaultProps = {
  addSkill: () => {},
};

export default SkillForm;
