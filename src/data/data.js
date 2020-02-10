const RACES = ["Aasimar", "Gold Dwarf", "Shield Dwarf", "Dragonkin", "Elf", "Gnome", "Half Elf", "Lightfoot Halfling", "Ghostwise Halfling", "Half Orc", "Human", "Kenku", "Tabaxi", "Tiefling"];
const CLASSES = [
  { name: "Barbarian", hitdie: 12, archLevel: 3, archetypes: ["Ancestral Guardian", "Battlerager", "Berserker", "Storm Herald", "Totem Warrior", "Zealot"] },
  { name: "Bard", hitdie: 8, archLevel: 3, archetypes: [] },
  { name: "Cleric", hitdie: 8, archLevel: 2, archetypes: [] },
  { name: "Druid", hitdie: 8, archLevel: 2, archetypes: [] },
  { name: "Fighter", hitdie: 10, archLevel: 3, archetypes: [] },
  { name: "Monk", hitdie: 8, archLevel: 3, archetypes: [] },
  { name: "Paladin", hitdie: 10, archLevel: 3, archetypes: [] },
  { name: "Ranger", hitdie: 10, archLevel: 3, archetypes: [] },
  { name: "Rogue", hitdie: 8, archLevel: 3, archetypes: ["Arcane Trickster", "Assassin", "Inquisitive", "Mastermind", "Scout", "Swashbuckler", "Thief"] },
  { name: "Sorcerer", hitdie: 6, archLevel: 1, archetypes: [] },
  { name: "Warlock", hitdie: 8, archLevel: 1, archetypes: [] },
  { name: "Wizard", hitdie: 6, archLevel: 2, archetypes: [] }
];
const DEITIES = [
  "Auril", "Azuth", "Bane", "Beshaba", "Bhaal", "Chauntea", "Cyric", "Deneir",
  "Eldath", "Gond", "Helm", "Ilmater", "Kelemvor", "Lathander", "Leira", "Lliira",
  "Loviatar", "Malar", "Mask", "Mielikki", "Milil", "Myrkul", "Mystra", "Oghma",
  "Savras", "Selûne", "Shar", "Silvanus", "Sune", "Talona", "Talos", "Tempus",
  "Torm", "Tymora", "Tyr", "Umberlee", "Waukeen", "Bahamut", "Blibdoolpoolp",
  "Corellon Larethian", "Deep Sashelas", "Eadro", "Garl Glitlergold", "Grolantor", "Gruumsh",
  "Hruggek", "Kurtulmak", "Laogzed", "Lolth", "Maglubiyel", "Moradin", "Rillifane Rallathil",
  "Sehanine Moonbow", "Sekolah", "Semuanya", "Skerrit", "Skoraeus Stonebones", "Surlur", "Thrym",
  "Tiamat", "Yondalla"
];
const BACKGROUNDS = [
  { name: "Charlatan", skills: ["Deception", "Sleight of Hand"] },
  { name: "Criminal (Spy)", skills: ["Deception", "Stealth"] },
  { name: "Entertainer (Gladiator)", skills: ["Acrobatics", "Performance"] },
  { name: "Faceless", skills: ["Deception", "Intimidation"] },
  { name: "Folk Hero", skills: ["Animal Handling", "Survival"] },
  { name: "Guild Artisan (Guild Merchant)", skills: ["Insight", "Persuasion"] },
  { name: "Hermit", skills: ["Medicine", "Religion"] },
  { name: "Noble (Knight)", skills: ["History", "Persuasion"] },
  { name: "Outlander", skills: ["Athletics", "Survival"] },
  { name: "Sage", skills: ["Arcana", "History"] },
  { name: "Sailor (Pirate)", skills: ["Athletics", "Perception"] },
  { name: "Soldier", skills: ["Athletics", "Intimidation"] },
  { name: "Urchin", skills: ["Sleight of Hand", "Stealth"] }
];

export {
  RACES,
  CLASSES,
  DEITIES,
  BACKGROUNDS
};
