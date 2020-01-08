import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CategoriesSelect from '../../components/CategoriesSelect';

class Filter extends React.Component {
  static getMenuItem(text, value) {
    return <MenuItem value={value} key={value} primaryText={text} />;
  }

  constructor(props) {
    super(props);

    this.handleProviderChange = this.handleProviderChange.bind(this);
    this.handleSelectCategories = this.handleSelectCategories.bind(this);
    this.state = {
      selectedProvider: 0,
      selectedCategories: [],
    };
  }

  handleProviderChange(event, index, value) {
    if (value != null) {
      this.updateFilter({ selectedProvider: value });
    }
  }

  handleSelectCategories(name, checked) {
    let categories = this.state.selectedCategories;
    if (checked) {
      categories = R.uniq(R.append(name, categories));
    } else {
      categories = R.without([name], categories);
    }

    this.updateFilter({ selectedCategories: categories });
  }

  updateFilter(filter) {
    const updatedFilter = R.mergeAll([this.state, filter]);
    this.setState({
      selectedCategories: updatedFilter.selectedCategories,
      selectedProvider: updatedFilter.selectedProvider,
    },
      );
    this.props.updateFilter(updatedFilter);
  }

  render() {
    return (<div>
      <SelectField
        floatingLabelText="Select by Provider"
        value={this.state.selectedProvider}
        onChange={this.handleProviderChange}
        id="providers"
      >
        {this.props.providers.map((partner, index) =>
                Filter.getMenuItem(partner.name, index))}
      </SelectField>
      {
        !R.isEmpty(this.props.categories) &&
        <CategoriesSelect
          checkedCategory={this.handleSelectCategories}
          categories={this.props.categories}
        />
      }
    </div>);
  }
}

Filter.propTypes = {
  updateFilter: PropTypes.func,
  categories: PropTypes.arrayOf(PropTypes.string),
  providers: PropTypes.arrayOf(PropTypes.shape),
  // courseStates: PropTypes.arrayOf(PropTypes.string),
};

Filter.defaultProps = {
  updateFilter: () => {},
  categories: [],
  providers: [],
  // courseStates: [],
};

export default Filter;
