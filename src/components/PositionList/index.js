import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { blue800 } from 'material-ui/styles/colors';
import moment from 'moment';
import { Row, Col } from 'react-flexbox-grid';
import R from 'ramda';
import PositionForm from '../PositionForm';
import dataStore from '../../data/store';

class PositionList extends React.Component {

  constructor(props) {
    super(props);
    this.getHeader = this.getHeader.bind(this);
    this.openPositionFormDialog = this.openPositionFormDialog.bind(this);
    this.handleClosePositionDialog = this.handleClosePositionDialog.bind(this);
    this.handleDeletePosition = this.handleDeletePosition.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.getPositionList = this.getPositionList.bind(this);
    this.closePositionForm = this.closePositionForm.bind(this);
    this.handleCloseDeletePositionDialog = this.handleCloseDeletePositionDialog.bind(this);
    this.savePosition = this.savePosition.bind(this);
    this.openEditPositionFormDialog = this.openEditPositionFormDialog.bind(this);
    this.openDeletePositionDialog = this.openDeletePositionDialog.bind(this);

    this.state = {
      positionFormOpen: false,
      positionFormInstance: {},
      positions: [],
      deletePositionDialogOpen: false,
      positionToDelete: {},
    };
  }

  componentWillMount() {
    dataStore.getPositions()
    .then((p) => {
      this.setState({
        positions: p,
      });
    });
  }

  getHeader() {
    return (<Row>
      <Col xs={12}>
        <Card style={{ boxShadow: 'none' }}>
          <Row middle="xs" between="xs">
            <Col xs={4}>
              <CardTitle title="" />
            </Col>
            <Col xs={2}>
              <IconButton tooltip="Add Position" style={{ float: 'right', marginRight: '5px' }} onTouchTap={this.openPositionFormDialog}>
                <ContentAdd color={blue800} />
              </IconButton>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>);
  }

  openPositionFormDialog() {
    this.setState({
      positionFormOpen: true,
    });
  }

  closePositionForm() {
    this.setState({
      positionFormOpen: false,
    });
  }

  async savePosition(position) {
    const positionList = await dataStore.newOrUpdatePosition(position);
    this.setState({
      positions: positionList,
    });
  }

  async handleDeletePosition() {
    const posToDelete = this.state.positionToDelete;
    if (!R.isEmpty(posToDelete)) {
      const newList = await dataStore.deletePosition(posToDelete);
      this.setState({
        positions: newList,
        deletePositionDialogOpen: false,
      });
    }
  }

  handleClosePositionDialog() {}
  updatePosition() {}

  openEditPositionFormDialog(id) {
    const positionToEdit = R.find(R.propEq('id', id), this.state.positions);
    this.setState({
      positionFormOpen: true,
      positionFormInstance: positionToEdit,
    });
  }

  openDeletePositionDialog(id) {
    this.setState({
      deletePositionDialogOpen: true,
      positionToDelete: id,
    });
  }


  getPositionList() {
    return (
      <Col xs={12}>{this.state.positions.sort((a, b) => a.toDate < b.toDate).map(position => (
        <Card style={{ marginBottom: '20px' }} key={position.id}>
          <CardHeader
            title={position.title}
            subtitle={position.location}
            actAsExpander
            showExpandableButton
          />
          <CardText style={{ paddingTop: '0', paddingBottom: '0' }}>{moment(position.fromDate).format('LL')} - {!R.isEmpty(position.toDate) ? moment(position.toDate).format('LL') : 'Until now'}</CardText>
          <CardText expandable>
            {position.description}
          </CardText>
          <CardActions>
            <div>
              <FlatButton
                primary
                onTouchTap={() => { this.openEditPositionFormDialog(position.id); }}
                label="Edit"
              />
              <FlatButton
                primary
                onTouchTap={() => { this.openDeletePositionDialog(position.id); }}
                label="Delete"
              />
            </div>
          </CardActions>
        </Card>))}
      </Col>
    );
  }
  handleCloseDeletePositionDialog() {}

  render() {
    const deleteDialogActions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleClosePositionDialog}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={this.handleDeletePosition}
      />,
    ];

    return (
      <div>
        {this.state.positionFormOpen &&
          <PositionForm
            positionInstance={this.state.positionFormInstance}
            closeDialog={this.closePositionForm}
            updatePosition={this.savePosition}
          />}
        {this.getHeader()}
        {!R.isEmpty(this.state.positions) && this.getPositionList()}
        <Dialog
          title="Are you sure you want to delete this Position?"
          actions={deleteDialogActions}
          modal={false}
          open={this.state.deletePositionDialogOpen}
          onRequestClose={this.handleCloseDeletePositionDialog}
        >
          {'You won\'t be able to recover your data after deleting.'}
        </Dialog>
      </div>
    );
  }
}

export default PositionList;
