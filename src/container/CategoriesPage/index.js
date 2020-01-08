import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import { Row, Col } from 'react-flexbox-grid';
import categoriesData from '../../content/field-categories';
import SidebarLayout from '../SidebarLayout';
import Categories from '../../components/Categories';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    overflowY: 'auto',
  },
};

const siteOptions = {
  title: 'Explore your potential',
  subtitle: 'Reach you\'re next Skill level',
};

class CategoriesPage extends React.Component {
  render() {
    return (
      <div>
        <Row center="xs">
          <Col xs={12}>
            <GridList
              cols={3}
              cellHeight={180}
              style={styles.gridList}
            >
              {categoriesData.map(tile => (
                <GridTile
                  key={tile.id}
                  title={tile.title}
                >
                  <img src={tile.img} alt={tile.title} />
                </GridTile>
      ))}
            </GridList>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SidebarLayout(CategoriesPage, Categories, siteOptions);
