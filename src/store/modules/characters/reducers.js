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
      case "@characters/DELETE_CHARACTER":
        // Filter out the character with the deleted _id
        draft.charList = draft.charList.filter(char => char._id !== action._id.result[0]);
        draft.pending = false;
        break;
      case "@characters/EDIT_CHARACTER":
      const char = action.character;
        draft.charList = draft.charList[char._id] = char;
        draft.pending = false;
        break;
      default:
    }
  });
}

export const getCharacters = state => state.characters.charList;
export const getCharactersPending = state => state.characters.pending;
export const getCharactersError = state => state.characters.error;
