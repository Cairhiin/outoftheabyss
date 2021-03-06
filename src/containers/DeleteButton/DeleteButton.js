import { connect } from 'react-redux';
import { Button } from '../../components/Layout/Layout';
import { deleteCharacterFromDB } from '../../api/api';
import './DeleteButton.css';

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    ownProps.onClick();
    dispatch(deleteCharacterFromDB(ownProps._id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Button);
