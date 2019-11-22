import { connect } from 'react-redux';
import { setSortColumn } from '../../store/modules/npcs/actions';
import Link from '../../components/Link/Link';

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.column === state.sortColumn
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setSortColumn(ownProps.column))
})

export default connect(mapStateToProps, mapDispatchToProps)(Link);
