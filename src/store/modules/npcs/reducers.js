import produce from "immer";

const INITIAL_STATE = {
    pending: true,
    error: null
}

export default function npcs(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "@NPCs/LOAD_NPCS_PENDING":
        draft.pending = true;
        break;
      case "@NPCs/LOAD_NPCS_SUCCESS":
        draft.nonPlayerChars = action.nonPlayerChars;
        draft.pending = false;
        break;
      case "@NPCs/LOAD_NPCS_FAILURE":
        draft.error = action.error;
        draft.pending = false;
        break;
      default:
    }
  });
}

export const getNPCs = state => state.npcs.nonPlayerChars;
export const getNPCsPending = state => state.npcs.pending;
export const getNPCsError = state => state.npcs.error;
