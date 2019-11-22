import React, { Component } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadAllNPCs } from '../api/api';
import { getNPCs, getNPCsError, getNPCsPending } from '../store/modules/npcs/reducers';
import VisibleNPCList from '../containers/VisibleNPCList/VisibleNPCList';
import FilterLink from '../containers/FilterLink/FilterLink';
import { VisibilityFilters } from '../store/modules/npcs/actions';
import './NPCView.css';

const mapStateToProps = state => ({
  error: getNPCsError(state),
  nonPlayerChars: getNPCs(state),
  pending: getNPCsPending(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchNPCs: loadAllNPCs
}, dispatch);

class NPCView extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  componentDidMount() {
    const { fetchNPCs } = this.props;
    fetchNPCs();
  }

  shouldComponentRender() {
      const { pending } = this.props;
      if (pending === false) return true;
      return false;
  }

  render() {
    const { error } = this.props;
    if(!this.shouldComponentRender()) {
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
            <div id="visibility-filters">
              <FilterLink customClass="filter-link" filter={ VisibilityFilters.SHOW_ALL }>All NPCs</FilterLink>
              <FilterLink customClass="filter-link" filter={ VisibilityFilters.SHOW_DWARF }>Dwarf</FilterLink>
              <FilterLink customClass="filter-link" filter={ VisibilityFilters.SHOW_ELF }>Elf</FilterLink>
              <FilterLink customClass="filter-link" filter={ VisibilityFilters.SHOW_GNOME }>Gnome</FilterLink>
              <FilterLink customClass="filter-link" filter={ VisibilityFilters.SHOW_HALFLING }>Halfling</FilterLink>
              <FilterLink customClass="filter-link" filter={ VisibilityFilters.SHOW_MONSTROUS }>Monstrous</FilterLink>
              <FilterLink customClass="filter-link" filter={ VisibilityFilters.SHOW_ORC }>Orc</FilterLink>
            </div>
            {
              !error ? <VisibleNPCList /> : <div>{ error }</div>
            }
          </main>
        </Col>
      </Row>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NPCView);
