import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const Message = ({ message, handleClose }) => (
  <Card>
    <CardTitle
      title="Message"
      subtitle={message}
    />
    <CardActions>
      <FlatButton label="Close" onTouchTap={handleClose} />
    </CardActions>
  </Card>
  );

Message.propTypes = {
  message: PropTypes.string,
  handleClose: PropTypes.func,
};


Message.defaultProps = {
  message: '',
  handleClose: () => {},
};

export default Message;
