import { Database } from './data';
import { RoguishArchType, RogueDetails } from '../models/classDetails';
import { SkillKind, Skills } from '../models/skills';
import { ExpendableItem, MagicItem, Wealth, Weapon, Character, Alignment, Height, Armor, LightArmor, ArmorWeight, WeaponType, WeaponKind, WeaponDamageKind, WeaponWeight, WeaponHandedness, NormalLanguage } from '../models/character';
import { Range } from '../models/range'
import { AbilityScores, AbilityScore, AbilityKind } from '../models/abilityScore';
import { RaceKind, Race } from '../models/race';
import { ClassKind, Class } from '../models/class';
import { Background, BackgroundKind } from '../models/background';
import { MiscTools, GamingSet } from '../models/tools';

export async function seed(db: Database) { 
    let spellBooks = await fetch(window.location.href + 'spellBook.json')
        .then(res => res.text())
        .then(text => JSON.parse(text));

    console.info('seeding characters');
    await db.characters.bulkPut(seedCharacters());
    console.info('seeding bard spells');
    await db.clericSpells.bulkPut(spellBooks.bard);
    console.info('seeding cleric spells');
    await db.clericSpells.bulkPut(spellBooks.cleric);
    console.info('seeding druid spells');
    await db.druidSpells.bulkPut(spellBooks.druid);
    console.info('seeding paladin spells');
    await db.paladinSpells.bulkPut(spellBooks.paladin);
    console.info('seeding ranger spells');
    await db.rangerSpells.bulkPut(spellBooks.ranger);
    console.info('seeding rogue spells');
    await db.rogueSpells.bulkPut(spellBooks.rogue);
    console.info('seeding sorcerer spells');
    await db.sorcererSpells.bulkPut(spellBooks.sorcerer);
    console.info('seeding warlock spells');
    await db.warlockSpells.bulkPut(spellBooks.warlock);
    console.info('seeding wizard spells');
    await db.wizardSpells.bulkPut(spellBooks.wizard);
    console.info('seeding seeds')
    await db.seeds.put({when: new Date().toISOString()});
}

function seedCharacters(): Character[] {
    let d = new Character('Daggers', 
                new AbilityScores([
                    new AbilityScore(8, AbilityKind.Strength),
                    new AbilityScore(8+7, AbilityKind.Dexterity),
                    new AbilityScore(8, AbilityKind.Constitution),
                    new AbilityScore(8, AbilityKind.Intelligence),
                    new AbilityScore(8+1, AbilityKind.Wisdom),
                    new AbilityScore(8+7, AbilityKind.Charisma),
                ]), 
                new Race(RaceKind.Human), 
                new Class(ClassKind.Rogue, 4, 
                    [
                    [AbilityKind.Strength, 0],
                    [AbilityKind.Dexterity, 2],
                    [AbilityKind.Constitution, 0],
                    [AbilityKind.Intelligence, 0],
                    [AbilityKind.Wisdom, 0],
                    [AbilityKind.Charisma, 0],
                    ],
                    [SkillKind.Acrobatics, SkillKind.SleightOfHand, SkillKind.Persuasion, SkillKind.Perception,]
                ),
                new Background(BackgroundKind.Criminal,
                    [SkillKind.Stealth, SkillKind.Deception],
                    [],
                    [MiscTools.Thieves, GamingSet.Dragonchess]),
                Alignment.TrueNeutral(),
                5116,
                new Height(5, 8),
                160,
                'Blue',
                0,
                new Armor(LightArmor.Leather, ArmorWeight.Light, 2),
                null,
                new Skills(),
                [new Weapon('Dagger', 
                            WeaponType.Melee, 
                            WeaponKind.Simple, 
                            WeaponDamageKind.Piercing, 
                            WeaponWeight.Light, 
                            WeaponHandedness.One, 
                            [1, 4], 
                            new Range(5), 
                            1, 
                            new Range(20, 60), 
                            false, 
                            true),
                new Weapon('Short Bow', 
                            WeaponType.Range, 
                            WeaponKind.Simple, 
                            WeaponDamageKind.Piercing, 
                            WeaponWeight.Light, 
                            WeaponHandedness.Two, 
                            [1,6], 
                            new Range(80, 320), 
                            1, 
                            null, 
                            true, 
                            false),
                ],
                new Wealth(0, 0, 0, 3450, 0),
                [NormalLanguage.Common],
                [],
                0,
                0,
                [
                    new MagicItem('Cloak of Elvenkind', 'Hood up: Preception checks to see you have disadvantage, stealth checks have advantage'),
                    new MagicItem('Goggles of Night', 'Darkvision (60 feet)'),
                ],
                [new ExpendableItem(1, 'Health Pot.', 'heal 2d4+2 Damage')],
    );
    let details = d.characterClass.classDetails as RogueDetails;
    details.archType = RoguishArchType.Thief;
    details.expertise.push(SkillKind.Deception, SkillKind.Stealth);
    return [d];
} 