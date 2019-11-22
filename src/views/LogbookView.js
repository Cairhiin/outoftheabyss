import React from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import Logbook from '../components/Logbook/Logbook';
import { connect } from 'react-redux';
import { getLogs, getLogsPending, getLogsError } from '../store/modules/logbook/reducers';

const mapStateToProps = (state) => ({
  logs: getLogs(state),
  isLoading: getLogsPending(state),
  error: getLogsError(state),
});

const LogbookView = ({ logs, error, isLoading }) => {

  function shouldComponentRender() {
      if (isLoading === false) return true;
      return false;
  }

  if (!shouldComponentRender()) {
    return (
      <Row>
        <Col md={12}>
          <div className="spinner">
            <Spinner animation="border" role="status" variant="secondary" size="lg">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        </Col>
      </Row>
    );
  }

  return (
    <Row>
      <Col md={12}>
        <main>
          { !error ? <Logbook data={ logs } /> :
              <div>{ error }</div>
          }
        </main>
      </Col>
    </Row>
  );
}

export default connect(mapStateToProps, null)(LogbookView);
