import React from 'react';
import './Character.css';
import Attribute from './Attribute/Attribute';
import {
  calculateAC,
  calculateAttrModifiers,
  calculateProficiency
} from '../../utils/utils';

const Character = function(props) {
  const { character } = props;
  let charJSX;
  if (character) {
    const {
      athlethics,
      acrobatics,
      sleightofhand,
      stealth,
      arcana,
      history,
      investigation,
      nature,
      religion,
      animalhandling,
      insight,
      medicine,
      perception,
      survival,
      deception,
      intimidation,
      performance,
      persuasion,
      level,
      alignment,
      deity,
      charClass,
      charName
    } = props.character;
    const { background } = props.character;
    const { race } = props.character;
    const { weapons } = props.character;
    const dex = calculateAttrModifiers(character.dexterity);
    const str = calculateAttrModifiers(character.strength);
    const wis = calculateAttrModifiers(character.wisdom);
    const weaponJSX = formatWeaponAttacks(weapons, charClass,
      str,
      dex,
      level
    );
    const monkDmg = 4 + Math.floor(level / 4);
    charJSX = (
      <div id="display__character">
        <div className="display__character__attributes">
          <Attribute
            id = { 0 }
            character={ character }
            type="strength"
            proficiencies = { [athlethics] }
          />
          <Attribute
            id = { 1 }
            character={ character }
            type="dexterity"
            proficiencies = { [acrobatics, sleightofhand, stealth] }
          />
          <Attribute
            id = { 2 }
            character={ character }
            type="constitution"
            proficiencies = { [] }
          />
          <Attribute
            id = { 3 }
            character={ character }
            type="intelligence"
            proficiencies = { [arcana, history, investigation, nature, religion] }
          />
          <Attribute
            id = { 4 }
            character={ character }
            type="wisdom"
            proficiencies = { [animalhandling, insight, medicine, perception, survival] }
          />
          <Attribute
            id = { 5 }
            character={ character }
            type="charisma"
            proficiencies = { [deception, intimidation, performance, persuasion] }
          />
        </div>
        <div className="display__character__info">
          <div className="display__character__info__header">
            <h3>
              { charName }
              &nbsp;<span>{ race } { charClass } { level }</span>
            </h3>
            <div className="display__character__info__details">
              <div>
                <span>Background</span><br /> { background }
              </div>
              <div>
                <span>Alignment</span><br /> { alignment }
              </div>
              <div>
                <span>Patron Deity</span><br /> { deity }
              </div>
            </div>
          </div>
          <div className="display__character__details">
            <div className="display__character__details__header">
              <div>
                Armour Class
              </div>
              <div>
                Proficiency Bonus
              </div>
              <div>
                Initiative
              </div>
              <div>
                Speed
              </div>
            </div>
            <div className="display__character__details__categories">
              <div>
                  { calculateAC(charClass, character.armour[0], "",
                      dex,
                      wis
                    ) }
              </div>
              <div>
                { calculateProficiency(level) }
              </div>
              <div>
                { dex }
              </div>
              <div>
                { //speed
                }
              </div>
            </div>
          </div>
          <div className="display__character__info__attack">
            <div className="display__character__info__attack__header">
              <div>Weapon</div>
              <div>To Hit</div>
              <div>Damage</div>
            </div>
            <div className="display__character__info__attack__details darker_bg">
              <div>Unarmed Strike</div>
              <div>+{ charClass === 'Monk' ? dex + calculateProficiency(level) : str + calculateProficiency(level) }</div>
              <div>{ charClass === 'Monk' ? '1d' + monkDmg + '+' + dex : 1 + str } bludgeoning</div>
            </div>
              { weaponJSX }
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      { charJSX }
    </div>
  );
}

const formatWeaponAttacks = function(weapons, charClass, str, dex, level) {
  let weaponsJSX;
  if (weapons.length !== 0) {
    weaponsJSX = weapons.map((weapon, i) => {
      let attMod = str;
      if (weapon.finesse || weapon.ranged) attMod = dex;
      return (
        <div key={i}>
          <div className={ i%2 !== 0 ?
            "display__character__info__attack__details darker_bg" :
            "display__character__info__attack__details" }>
            <div>{ weapon.weaponName }</div>
            <div>{  '+' + (attMod + calculateProficiency(level)) }</div>
            <div>{  weapon.damage + '+' + attMod } { weapon.dmgType }
            { weapon.versatile ? ' (' + weapon.versatile + '+' + attMod + ')' : '' }
            </div>
          </div>
        </div>
      )
    });
  }

  return weaponsJSX;
}

export default Character;
