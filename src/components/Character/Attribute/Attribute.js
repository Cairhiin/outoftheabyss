import React from 'react';
import './Attribute.css';
import {
  calculateAttrModifiers,
  getSkills,
  getSavingThrow,
  calculateProficiency
} from '../../../utils/utils';

const Attribute = (props) => {
  const { type, character, id } = props;
  const skills = getSkills(type);
  const attr = character[type];
  const mod = calculateAttrModifiers(attr);
  const profvalue = calculateProficiency(character.level);
  const savingthrow = getSavingThrow(character.charClass)[id];
  const proficiencies = skills.map(skill => {
    return skill.replace(/\s/g,'').toLowerCase();
  });

  const skillJSX = skills.map((skill, i) => {
    let profJSX = <span>&#9671;<span className="bigger-font">&#9675;</span> { mod } { skill }</span>;
    if (character[proficiencies[i]] === 1) {
      profJSX = <span>&#9671;<span className="bigger-font">&#9679;</span> { profvalue + mod } { skill }</span>;
    } else if (character[proficiencies[i]] === 2) {
      profJSX = <span>&#9670;<span className="bigger-font">&#9679;</span> { 2 * profvalue + mod } { skill }</span>;
    }
    return <li key={ skill }>{ profJSX }</li>;
  });
  return (
    <div className="display__character__attribute">
      <div className="display__character__attribute__header">
        <div>{ type }</div>
        <div>
          <ul>
            <li key="save">{ savingthrow ? <span className="bigger-font">&#9679;</span> : <span className="bigger-font">&#9675;</span> }
              &nbsp;{ savingthrow ? profvalue + mod : mod }&nbsp;Saving Throw
            </li>
            { skillJSX }
          </ul>
        </div>
      </div>
      <div className="display__character__attribute__details">
        <div className="display__character__attribute__details__attr">{ attr }</div>
        <div className="display__character__attribute__details__mod">{ mod }</div>
      </div>
    </div>
  );
}

export default Attribute;
