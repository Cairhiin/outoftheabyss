export function loadNPCsPending() {
  return {
    type: "@NPCs/LOAD_NPCS_PENDING"
  };
}

export function loadNPCsSuccess(npcs) {
  return {
    type: "@NPCs/LOAD_NPCS_SUCCESS",
    nonPlayerChars: npcs
  };
}

export function loadNPCsFailure(error) {
  return {
    type: "@NPCs/LOAD_NPCS_FAILURE",
    error: error
  };
}

export function setVisibilityFilter(filter) {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  };
}

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_GNOME: 'SHOW_GNOME',
  SHOW_ORC: 'SHOW_ORC',
  SHOW_DWARF: 'SHOW_DWARF',
  SHOW_ELF: 'SHOW_ELF',
  SHOW_MONSTROUS: 'SHOW_MONSTROUS',
  SHOW_HALFLING: 'SHOW_HALFLING'
};

export function setSortColumn(column) {
  return {
    type: 'SORT_COLUMN',
    column
  };
}

export const SortColumn = {
  SORT_LEVEL: 'SORT_LEVEL',
  SORT_LOCATION: 'SORT_LOCATION',
  SORT_RACE: 'SORT_RACE',
  SORT_ALIGNMENT: 'SORT_ALIGNMENT',
  SORT_STANDING: 'SORT_STANDING',
  SORT_NAME: 'SORT_NAME',
};
