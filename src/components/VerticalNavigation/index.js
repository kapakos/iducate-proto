import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const VerticalNavigation = ({ handleMenuItemTap }) => (
  <IconMenu
    iconStyle={{ color: 'white' }}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    onItemTouchTap={handleMenuItemTap}
  >
    <MenuItem primaryText="Settings" data-route="/settings" value={1} />
    <MenuItem primaryText="Sign out" value={2} />
  </IconMenu>
);

VerticalNavigation.propTypes = {
  handleMenuItemTap: React.PropTypes.func,
};

VerticalNavigation.defaultProps = {
  handleMenuItemTap: () => {},
};

export default VerticalNavigation;
