import { SortColumn } from './actions';

const sortColumn = (state = SortColumn.SORT_NAME, action) => {
  switch (action.type) {
    case 'SORT_COLUMN':
      return action.column;
    default:
      return state;
  }
};

export default sortColumn;
