import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import R from 'ramda';

class CategoriesSelect extends React.Component {
  constructor(props) {
    super(props);
    this.checkedCategory = this.checkedCategory.bind(this);
  }

  checkedCategory(event, checked) {
    this.props.checkedCategory(event.target.name, checked);
  }

  render() {
    const { categories } = this.props;
    return (
      <div>
        {
        !R.isEmpty(categories) && categories.map(cat =>
          <Checkbox key={cat} name={cat} label={cat} onCheck={this.checkedCategory} />)
      }
      </div>
    );
  }
}

CategoriesSelect.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  checkedCategory: PropTypes.func,
};

CategoriesSelect.defaultProps = {
  categories: [],
  checkedCategory: () => {},
};

export default CategoriesSelect;
