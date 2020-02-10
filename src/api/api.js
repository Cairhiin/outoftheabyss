import { loadLogbookPending, loadLogbookSuccess, loadLogbookFailure } from '../store/modules/logbook/actions';
import {
  loadCharactersPending,
  loadCharactersSuccess,
  loadCharactersFailure,
  deleteCharacter,
  editCharacter
} from '../store/modules/characters/actions';
import { loadNPCsPending, loadNPCsSuccess, loadNPCsFailure } from '../store/modules/npcs/actions';

function loadAllCharacters() {
  return dispatch => {
        dispatch(loadCharactersPending());
        fetch(process.env.REACT_APP_DB_HOST + '/rest/characters?h={"$orderby": {"charName": 1}}', {
          method: 'GET',
          headers: {
            "content-type": "application/json",
            "x-apikey": process.env.REACT_APP_API_KEY,
            "cache-control": "no-cache"
          }
        })
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(loadCharactersSuccess(res));
        })
        .catch(error => {
            dispatch(loadCharactersFailure(error));
        })
    }
}

function loadAllNotes(token) {
  return dispatch => {
        dispatch(loadLogbookPending());
        fetch(process.env.REACT_APP_DB_HOST + '/rest/logbook?h={"$orderby": {"date": -1}}', {
          method: 'GET',
          headers: {
            "content-type": "application/json",
            "x-apikey": process.env.REACT_APP_API_KEY,
            "cache-control": "no-cache"
          }
        })
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(loadLogbookSuccess(res));
        })
        .catch(error => {
            dispatch(loadLogbookFailure(error));
        })
    }
}

function loadAllNPCs() {
  return dispatch => {
        dispatch(loadNPCsPending());
        fetch(process.env.REACT_APP_DB_HOST + '/rest/npcs?h={"$orderby": {"name": 1}}', {
          method: 'GET',
          headers: {
            "content-type": "application/json",
            "x-apikey": process.env.REACT_APP_API_KEY,
            "cache-control": "no-cache"
          }
        })
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(loadNPCsSuccess(res));
        })
        .catch(error => {
            dispatch(loadNPCsFailure(error));
        })
    }
}

function updateCharacterInDB(character) {
  return dispatch => {
    fetch(process.env.REACT_APP_DB_HOST + 'rest/characters/' + character._id, {
      method: 'PUT',
      headers: {
        "content-type": "application/json",
        "x-apikey": process.env.REACT_APP_API_KEY,
        "cache-control": "no-cache"
      },
      body: character,
      json: true
    })
    .then(res => res.json())
    .then(res => {
        if(res.error) {
            throw(res.error);
        }
        dispatch(editCharacter(res));
    })
    .catch(error => {
        console.info("ERR: ", error);
    });
  }
}

function deleteCharacterFromDB(id) {
  return dispatch => {
    fetch(process.env.REACT_APP_DB_HOST + 'rest/characters/' + id, {
      method: 'DELETE',
      headers: {
        "content-type": "application/json",
        "x-apikey": process.env.REACT_APP_API_KEY,
        "cache-control": "no-cache"
      }
    })
    .then(res => res.json())
    .then(res => {
        if(res.error) {
            throw(res.error);
        }
        dispatch(deleteCharacter(res));
    })
    .catch(error => {
        console.info("ERR: ", error);
    });
  }
}

export {
  loadAllCharacters,
  loadAllNotes,
  loadAllNPCs,
  updateCharacterInDB,
  deleteCharacterFromDB
}
