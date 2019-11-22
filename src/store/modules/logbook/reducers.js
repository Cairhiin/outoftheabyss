import produce from "immer";

const INITIAL_STATE = {
    pending: true,
    logs: [],
    error: null
}

export default function logbook(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "@logbook/LOAD_LOGS_PENDING":
        draft.pending = true;
        break;
      case "@logbook/LOAD_LOGS_SUCCESS":
        draft.logs = action.logs;
        draft.pending = false;
        break;
      case "@logbook/LOAD_LOGS_FAILURE":
        draft.error = action.error;
        draft.pending = false;
        break;
      default:
    }
  });
}

export const getLogs = state => state.logbook.logs;
export const getLogsPending = state => state.logbook.pending;
export const getLogsError = state => state.logbook.error;
