import React, { Component } from 'react';
import { push } from 'connected-react-router'
import { connect } from 'react-redux';
import { getCharacters } from '../../store/modules/characters/reducers';
import { updateCharacterInDB } from '../../api/api';
import { editCharacter } from '../../store/modules/characters/actions';
import EditCharacterForm from '../../components/EditCharacterForm/EditCharacterForm';

const mapStateToProps = (state) => ({
  characters: getCharacters(state)
});

const mapDispatchToProps = dispatch => {
  return {
      editCharacter: character => dispatch(editCharacter(character)).then(dispatch(push('/characters')))
  }
}

class EditCharView extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    }

    this.updateCharacter = this.updateCharacter.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const { charId } = this.props.match.params;
    const character = this.props.characters.filter(character => charId === character._id);
    if (this._isMounted) this.setState({ character: character[0] });
  }

  async updateCharacter(character) {
    if (this._isMounted) {
      await updateCharacterInDB(character);
      this.props.editCharacter(character);
    }
  }

  componentWillUnmount() {
     this._isMounted = false;
  }

  render() {
    return (
      <div>
        { this.state.character ?
            <EditCharacterForm
              character={ this.state.character }
              onSubmit={ this.updateCharacter }
            />
          :
            <div>No character to edit</div>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCharView);
