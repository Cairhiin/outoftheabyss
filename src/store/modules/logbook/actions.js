export function loadLogbookPending() {
  return {
    type: "@logbook/LOAD_LOGS_PENDING"
  };
}

export function loadLogbookSuccess(logs) {
  return {
    type: "@logbook/LOAD_LOGS_SUCCESS",
    logs: logs
  };
}

export function loadLogbookFailure(error) {
  return {
    type: "@logbook/LOAD_LOGS_FAILURE",
    error: error
  }
}
