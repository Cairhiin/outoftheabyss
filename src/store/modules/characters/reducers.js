import produce from "immer";

const INITIAL_STATE = {
  pending: true,
  charList: [],
  error: null
};

export default function logbook(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "@characters/LOAD_CHARACTERS_PENDING":
        draft.pending = true;
        break;
      case "@characters/LOAD_CHARACTERS_SUCCESS":
        draft.charList = action.characters;
        draft.pending = false;
        break;
      case "@characters/LOAD_CHARACTERS_FAILURE":
        draft.error = action.error;
        draft.pending = false;
        break;
      default:
    }
  });
}

export const getCharacters = state => state.characters.charList;
export const getCharactersPending = state => state.characters.pending;
export const getCharactersError = state => state.characters.error;
