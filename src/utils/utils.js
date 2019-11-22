const calculateAttrModifiers = function(attr) {
  return Math.floor((attr - 10) / 2);
}

const getSkills = function(attr) {
    switch (attr) {
      case "strength":
        return ["Athletics"];
      case "dexterity":
        return ["Acrobatics", "Sleight of Hand", "Stealth"];
      case "constitution":
        return [];
      case "intelligence":
        return ["Arcana", "History", "Investigation", "Nature", "Religion"];
      case "wisdom":
        return ["Animal Handling", "Insight", "Medicine", "Perception", "Survival"];
      case "charisma":
        return ["Deception", "Intimidation", "Performance", "Persuasion"];
      default:
        return [];
    }
}

const getSavingThrow = function(charclass) {
    switch (charclass) {
      case "Barbarian":
        return [1, 0, 1, 0, 0, 0];
      case "Bard":
        return [0, 1, 0, 0, 0, 1];
      case "Cleric":
        return [0, 0, 0, 0, 1, 1];
      case "Druid":
        return [0, 0, 0, 1, 1, 0];
      case "Fighter":
        return [1, 0, 1, 0, 0, 0];
      case "Monk":
        return [1, 1, 0, 0, 0, 0];
      case "Paladin":
        return [0, 0, 0, 0, 1, 1];
      case "Ranger":
        return [1, 1, 0, 0, 0, 0];
      case "Rogue":
        return [0, 1, 0, 1, 0, 0];
      case "Sorcerer":
        return [0, 0, 1, 0, 0, 1];
      case "Warlock":
        return [0, 0, 0, 0, 1, 1];
      case "Wizard":
        return [0, 0, 0, 1, 1, 0];
      default:
        return [];
    }
}

const calculateProficiency = function(level) {
  return 2 + Math.floor(level / 4);
}

const calculateAC = function(charClass, armour, shield, dex, wis) {
  const shieldValue = shield ? 2 : 0;
  if (!armour && (charClass === 'Monk' || charClass === 'Barbarian')) return 10 + dex + wis + shieldValue;
  if (!armour && (charClass !== 'Monk' || charClass !== 'Barbarian')) return 10 + dex + shieldValue;
  if (dex > armour.dexModifier) {
    return armour.armourValue + armour.dexModifier + shieldValue;
  }
  return armour.armourValue + dex + shieldValue;
}

const formatDate = function(date) {
  let newDate = new Date(date);
  let month = newDate.getMonth();
  switch (month) {
    case 0:
    month = "Jan";
    break;
    case 1:
    month = "Feb";
    break;
    case 2:
    month = "Mar";
    break;
    case 3:
    month = "Apr";
    break;
    case 4:
    month = "May";
    break;
    case 5:
    month = "Jun";
    break;
    case 6:
    month = "Jul";
    break;
    case 7:
    month = "Aug";
    break;
    case 8:
    month = "Sep";
    break;
    case 9:
    month = "Oct";
    break;
    case 10:
    month = "Nov";
    break;
    case 11:
    month = "Dec";
    break;
    default:
    break;
  }
  return newDate.getDate() + " " + month;
}

const formatDateLong = function(date) {
  let newDate = new Date(date);
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return newDate.toLocaleDateString('en-EN', options);
}

export {
  calculateAttrModifiers,
  getSkills,
  getSavingThrow,
  calculateProficiency,
  calculateAC,
  formatDate,
  formatDateLong
};
