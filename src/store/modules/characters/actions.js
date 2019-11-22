export function loadCharactersPending() {
  return {
    type: "@characters/LOAD_CHARACTERS_PENDING"
  };
}

export function loadCharactersSuccess(characters) {
  return {
    type: "@characters/LOAD_CHARACTERS_SUCCESS",
    characters: characters
  };
}

export function loadCharactersFailure(error) {
  return {
    type: "@characters/LOAD_CHARACTERS_FAILURE",
    error: error
  }
}
