import { connect } from 'react-redux'
import NonPlayerCharList from '../../components/NonPlayerCharList/NonPlayerCharList';
import { VisibilityFilters } from '../../store/modules/npcs/actions';
import { SortColumn } from '../../store/modules/npcs/actions';

const mapStateToProps = state => ({
  npcs: getSortedColumn(getVisibleNPCs(state.npcs, state.visibilityFilter), state.sortColumn)
})

const mapDispatchToProps = dispatch => ({

});

const getSortedColumn = (nonPlayerChars, column) => {
  nonPlayerChars = nonPlayerChars.slice();
  switch (column) {
    case SortColumn.SORT_NAME:
      return nonPlayerChars.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
    case SortColumn.SORT_LEVEL:
      return nonPlayerChars.sort((a, b) => b.level - a.level);
    case SortColumn.SORT_ALIGNMENT:
    return nonPlayerChars.sort((a, b) => {
      const alignments = ["Chaotic Evil", "Neutral Evil", "Lawful Evil",
        "Chaotic Neutral", "Neutral", "Lawful Neutral", "Chaotic Good",
        "Neutral Good", "Lawful Good"];
      return alignments.indexOf(b.alignment) - alignments.indexOf(a.alignment);
    });
    case SortColumn.SORT_RACE:
      return nonPlayerChars.sort((a, b) => {
        if (a.race > b.race) return 1;
        if (a.race < b.race) return -1;
        return 0;
      });
    case SortColumn.SORT_STANDING:
      return nonPlayerChars.sort((a, b) => {
        const standings = ["dead", "hostile", "indifferent", "friendly", "trusted ally", "best friend"];
        return standings.indexOf(b.standing) - standings.indexOf(a.standing);
      });
    case SortColumn.SORT_LOCATION:
      return nonPlayerChars.sort((a, b) => {
        if (a.area[0].name > b.area[0].name) return 1;
        if (a.area[0].name < b.area[0].name) return -1;
        return 0;
      });
    default:
      throw new Error('Unknown sorted column: ' + column)
  }
}

const getVisibleNPCs = ({ nonPlayerChars }, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return nonPlayerChars;
    case VisibilityFilters.SHOW_GNOME:
      return nonPlayerChars.filter(npc =>
        npc.race === 'Svirfneblin' || npc.race === 'Forest Gnome' || npc.race === 'Rock Gnome');
    case VisibilityFilters.SHOW_ORC:
      return nonPlayerChars.filter(npc => npc.race === 'Orc');
    case VisibilityFilters.SHOW_DWARF:
      return nonPlayerChars.filter(npc =>
        npc.race === 'Shield Dwarf' || npc.race === 'Gold Dwarf');
    case VisibilityFilters.SHOW_ELF:
      return nonPlayerChars.filter(npc =>
        npc.race === 'Elf' || npc.race === 'Drow');
    case VisibilityFilters.SHOW_HALFLING:
      return nonPlayerChars.filter(npc =>
        npc.race === 'Halfling');
    case VisibilityFilters.SHOW_MONSTROUS:
      return nonPlayerChars.filter(npc =>
        npc.race === 'Myconid Sprout' || npc.race === 'Quaggoth'
          ||  npc.race === 'Derro' ||  npc.race === 'Kuo-Toa'
          || npc.race === 'Stone Giant');
    default:
      throw new Error('Unknown filter: ' + filter)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NonPlayerCharList);
