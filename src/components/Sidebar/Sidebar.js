import React from 'react';
import './Sidebar.css';
import PropTypes from 'prop-types';

const Sidebar = ({ items, headers, subheaders, onClick }) => {
  let listJSX = [];
  if (Array.isArray(items)) {
    listJSX = items.map((item, i) =>
        <li key={ item._id } value={ item } onClick = { () => onClick(item) }>
          { headers(item) } <br />
          <span>
            { subheaders(item) }
          </span>
        </li>
    );
  }
  return (
    <aside id="sidebar">
      <ul>
        { listJSX }
      </ul>
    </aside>
  );
}

Sidebar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      charName: PropTypes.string.isRequired,
      charClass: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  headers: PropTypes.func.isRequired,
  subheaders: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Sidebar;
