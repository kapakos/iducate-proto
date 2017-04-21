import React from 'react';
import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { blue800 } from 'material-ui/styles/colors';
import R from 'ramda';
import moment from 'moment';
import EducationForm from '../EducationForm';
import dataStore from '../../data/store';
import dataProvider from '../../services/data';

class EducationList extends React.Component {
  constructor(props) {
    super(props);
    this.updateEducation = this.updateEducation.bind(this);
    this.handleCloseEducationDialog = this.handleCloseEducationDialog.bind(this);
    this.openSaveEducationDialog = this.openSaveEducationDialog.bind(this);
    this.handleDeleteEducation = this.handleDeleteEducation.bind(this);
    this.openNewEducationFormDialog = this.openNewEducationFormDialog.bind(this);
    this.openEditEducationFormDialog = this.openEditEducationFormDialog.bind(this);
    this.closeEducationForm = this.closeEducationForm.bind(this);
    this.getEducationList = this.getEducationList.bind(this);
    this.state = {
      educations: [],
      degrees: dataProvider.getDegrees(),
      deleteEducationDialogOpen: false,
      educationFormOpen: false,
      educationToDelete: '',
    };
  }

  componentWillMount() {
    dataStore.getEducations()
    .then((e) => {
      this.setState({
        educations: e,
      });
    });
  }

  getEducationList() {
    return this.state.educations.sort((a, b) => a.toDate < b.toDate).map((education, index) => (
      <Card key={education.id}>
        {index === 0 &&
          <Row middle="xs" between="xs">
            <Col xs={2}>
              <CardTitle title="Education" />
            </Col>
            <Col xs={1}>
              <IconButton tooltip="Add Education" onTouchTap={this.openNewEducationFormDialog}>
                <ContentAdd color={blue800} />
              </IconButton>
            </Col>
          </Row>
      }
        <CardHeader
          title={this.state.degrees[education.degree].name}
          subtitle={education.schoolName}
          actAsExpander
          showExpandableButton
        />
        <CardText style={{ paddingTop: '0', paddingBottom: '0' }}>{moment(education.fromDate).format('LL')} - {moment(education.toDate).format('LL')}</CardText>
        <CardText expandable>
          {education.description}
        </CardText>
        <CardActions>
          <div>
            <FlatButton
              primary
              onTouchTap={() => { this.openEditEducationFormDialog(education.id); }}
              label="Edit"
            />
            <FlatButton
              primary
              onTouchTap={() => { this.openSaveEducationDialog(education.id); }}
              label="Delete"
            />
          </div>
        </CardActions>
      </Card>));
  }

  async updateEducation(education) {
    const educationList = await dataStore.newOrUpdateEducation(education);
    this.setState({
      educations: educationList,
    });
  }

  handleCloseEducationDialog() {
    this.setState({
      deleteEducationDialogOpen: false,
      educationToDelete: '',
    });
  }

  openSaveEducationDialog(id) {
    this.setState({
      deleteEducationDialogOpen: true,
      educationToDelete: id,
    });
  }

  async handleDeleteEducation() {
    const eduToDelete = this.state.educationToDelete;
    if (!R.isEmpty(eduToDelete)) {
      const newList = await dataStore.deleteEducation(eduToDelete);
      this.setState({
        educations: newList,
        deleteEducationDialogOpen: false,
      });
    }
  }

  openEditEducationFormDialog(id) {
    const educationToEdit = R.find(R.propEq('id', id), this.state.educations);
    this.setState({
      educationFormOpen: true,
      educationFormInstance: educationToEdit,
    });
  }

  openNewEducationFormDialog() {
    this.setState({
      educationFormOpen: true,
      educationFormInstance: {},
    });
  }

  closeEducationForm() {
    this.setState({
      educationFormOpen: false,
    });
  }

  render() {
    const deleteDialogActions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleCloseEducationDialog}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={this.handleDeleteEducation}
      />,
    ];

    return (
      <div>
        {this.state.educationFormOpen &&
          <EducationForm
            educationInstance={this.state.educationFormInstance}
            updateEducation={this.updateEducation}
            closeDialog={this.closeEducationForm}
          />}
        {!R.isEmpty(this.state.educations) && this.getEducationList()}
        <Dialog
          title="Are you sure you want to delete this education?"
          actions={deleteDialogActions}
          modal={false}
          open={this.state.deleteEducationDialogOpen}
          onRequestClose={this.handleClose}
        >
          {'You won\'t be able to recover your data after deleting.'}
        </Dialog>
      </div>
    );
  }
}

export default EducationList;
