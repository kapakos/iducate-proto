import React from 'react';
import { Link } from 'react-router';
import categoriesData from '../../content/field-categories';

const styles = {
  list: {
    marginBottom: '10px',
  },
};
const FieldCategories = () => (
  <div>
    <ul>
      {
      categoriesData.map(cat => <li key={cat.id} style={styles.list}>
        <Link to={{ pathname: '/courses', query: { categoryId: cat.id } }}>{cat.title}</Link>
      </li>)
    }
    </ul>
  </div>
  );

export default FieldCategories;
