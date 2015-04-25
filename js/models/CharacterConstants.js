export default {
  RACES: ['dwarf', 'elf', 'halfling', 'human'],
  CLASSES: ['bard', 'cleric', 'druid', 'fighter', 'paladin', 'ranger', 'thief', 'wizard'],
  bard: { HP_MOD: 6, DMG: 'd6', classes: ['elf', 'human'] },
  cleric: { HP_MOD: 8, DMG: 'd6', classes: ['dwarf', 'human'] },
  druid: { HP_MOD: 6, DMG: 'd6', classes: ['elf', 'halfling', 'human'] },
  fighter: { HP_MOD: 10, DMG: 'd10', classes: ['dwarf', 'elf', 'halfling', 'human'] },
  paladin: { HP_MOD: 10, DMG: 'd10', classes: ['human'] },
  ranger: { HP_MOD: 8, DMG: 'd8', classes: ['elf', 'human'] },
  thief: { HP_MOD: 6, DMG: 'd8', classes: ['halfling', 'human'] },
  wizard: { HP_MOD: 4, DMG: 'd4', classes: ['elf', 'human'] }
}
