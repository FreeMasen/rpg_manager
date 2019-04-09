import { Database, IClassFeature, IClassFeatureOption, IClassSpellSlots } from './data';
import { SkillKind, Skills } from '../models/skills';
import { Wealth, Weapon, Character, Alignment, Height, Armor, 
    LightArmor, ArmorWeight, WeaponType, WeaponKind, WeaponDamageKind, 
    WeaponWeight, WeaponHandedness, NormalLanguage, ExpendableItem, MagicItem } from '../models/character';
import { Range } from '../models/range'
import { AbilityScores, AbilityScore, AbilityKind } from '../models/abilityScore';
import { RaceKind, Race } from '../models/race';
import { ClassKind, Class, DEFAULT_BONUS_ABILITY_SCORES } from '../models/class';
import { Background } from '../models/background';
import Dexie from 'dexie';
export async function seed(db: Database) { 
    let spellBooks = await fetch(window.location.href + 'spellBook.json')
        .then(res => res.json())
    console.info('seeding spells');
    await db.spells.bulkPut(spellBooks);
    let classInfo = await fetch(window.location.href + 'classes.json')
        .then(res => res.json());
    console.info('seeding class info');
    await seedClassInfo(db, classInfo);
    console.info('seeding characters');
    let chs = await seedCharacters(db);
    await db.characters.bulkPut(chs);
    console.info('seeding seeds');
    await seedClassSpellSlots(db.classSpellSlots)
    await db.seeds.put({when: new Date().toISOString(), version: db.verno});
}
async function seedClassInfo(db: Database, info: any) {
    for (let cls in info) {
        for (let feat of info[cls].features) {
            await insertFeature(db, cls as ClassKind, feat);
        }
    }
}
async function insertFeature(db: Database, cls: ClassKind, feat: any, optId?: number) {
    let dbFeat: IClassFeature = {
        classKind: cls as ClassKind,
        name: feat.name,
        level: feat.level,
        shortDesc: feat.shortDesc,
        longDesc: feat.longDesc,
    };
    if (optId) {
        dbFeat.optionId = optId;
    }
    let featId = await db.classFeatures.put(dbFeat);
    if (feat.options) {
        for (let opt of feat.options) {
            let dbOpt: IClassFeatureOption = {
                featId,
                name: opt.name,
                shortDesc: opt.shortDesc,
                longDesc: opt.longDesc,
            }
            let optId = await db.classFeatureOptions.put(dbOpt);
            if (opt.features) {
                for (let subFeat of opt.features) {
                    await insertFeature(db, cls, subFeat, optId);
                }
            }
        }
    }
}
async function seedCharacters(db: Database): Promise<Character[]> {
    // let details = await db.getClassDetails(ClassKind.Rogue, 4);
    // let d = new Character('Daggers', 
    //             new AbilityScores([
    //                 new AbilityScore(8, AbilityKind.Strength),
    //                 new AbilityScore(8+7, AbilityKind.Dexterity),
    //                 new AbilityScore(8, AbilityKind.Constitution),
    //                 new AbilityScore(8, AbilityKind.Intelligence),
    //                 new AbilityScore(8+1, AbilityKind.Wisdom),
    //                 new AbilityScore(8+7, AbilityKind.Charisma),
    //             ]), 
    //             new Race(RaceKind.Human), 
    //             new Class(
    //                 ClassKind.Rogue, 
    //                 4, 
    //                 details,
    //                 [
    //                     [AbilityKind.Strength, 0],
    //                     [AbilityKind.Dexterity, 2],
    //                     [AbilityKind.Constitution, 0],
    //                     [AbilityKind.Intelligence, 0],
    //                     [AbilityKind.Wisdom, 0],
    //                     [AbilityKind.Charisma, 0],
    //                 ],
    //                 [SkillKind.Acrobatics, SkillKind.SleightOfHand, 
    //                     SkillKind.Persuasion, SkillKind.Perception,]
    //             ),
    //             new Background(BackgroundKind.Criminal,
    //                 [SkillKind.Stealth, SkillKind.Deception],
    //                 [],
    //                 [MiscTools.Thieves, GamingSet.Dragonchess]),
    //             Alignment.TrueNeutral(),
    //             5116,
    //             new Height(5, 8),
    //             160,
    //             'Blue',
    //             0,
    //             new Armor(LightArmor.Leather, ArmorWeight.Light, 2),
    //             null,
    //             new Skills(),
    //             [new Weapon('Dagger', 
    //                         WeaponType.Melee, 
    //                         WeaponKind.Simple, 
    //                         WeaponDamageKind.Piercing, 
    //                         WeaponWeight.Light, 
    //                         WeaponHandedness.One, 
    //                         [1, 4], 
    //                         new Range(5), 
    //                         1, 
    //                         new Range(20, 60), 
    //                         false, 
    //                         true),
    //             new Weapon('Short Bow', 
    //                         WeaponType.Range, 
    //                         WeaponKind.Simple, 
    //                         WeaponDamageKind.Piercing, 
    //                         WeaponWeight.Light, 
    //                         WeaponHandedness.Two, 
    //                         [1,6], 
    //                         new Range(80, 320), 
    //                         1, 
    //                         null, 
    //                         true, 
    //                         false),
    //             ],
    //             new Wealth(0, 0, 0, 3450, 0),
    //             [NormalLanguage.Common],
    //             0,
    //             0,
    //             [
    //                 new MagicItem('Cloak of Elvenkind', 'Hood up: Preception checks to see you have disadvantage, stealth checks have advantage'),
    //                 new MagicItem('Goggles of Night', 'Darkvision (60 feet)'),
    //             ],
    //             [new ExpendableItem(1, 'Health Pot.', 'heal 2d4+2 Damage')],
    // );
    // d.characterClass.classDetails.chooseFeatureOption('Roguish Archetype', 2);
    // (d.characterClass.classDetails as RogueDetails).expertise.push(SkillKind.Deception, SkillKind.Stealth);
    let details = await db.getClassDetails(ClassKind.Rogue, 4);
    let d = new Character(
        'Daggers',
        new AbilityScores([
            new AbilityScore(8, AbilityKind.Strength),
            new AbilityScore(15, AbilityKind.Dexterity),
            new AbilityScore(10, AbilityKind.Constitution),
            new AbilityScore(10, AbilityKind.Intelligence),
            new AbilityScore(14, AbilityKind.Wisdom),
            new AbilityScore(14, AbilityKind.Charisma),
        ]),
        new Race(RaceKind.Human),
        new Class(
            ClassKind.Rogue,
            4,
            details,
            DEFAULT_BONUS_ABILITY_SCORES,
            [
                SkillKind.Acrobatics,
                SkillKind.Perception,
                SkillKind.Persuasion,
                SkillKind.SleightOfHand,
            ]
        ),
        Background.Criminal(),
        Alignment.TrueNeutral(),
        5616,
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
        new Wealth(0, 0, 0, 3300, 0),
        [NormalLanguage.Common, NormalLanguage.Draconic],
        0,
        0,
        [
            new MagicItem('Cloak of Elvenkind', 'Hood up: Preception checks to see you have disadvantage, stealth checks have advantage'),
            new MagicItem('Goggles of Night', 'Darkvision (60 feet)'),
        ],
        [new ExpendableItem(1, 'Health Pot.', 'heal 2d4+2 Damage')],
)
    return [d];
} 
export async function seedClassSpellSlots(t: Dexie.Table<IClassSpellSlots, number>) {
    let bard = [
            {slots: [2],                         cantrips: 2, spells: 4,},
            {slots: [3],                         cantrips: 2, spells: 5,},
            {slots: [4, 2],                      cantrips: 2, spells: 6,},
            {slots: [4, 3],                      cantrips: 3, spells: 7,},
            {slots: [4, 3, 2],                   cantrips: 3, spells: 8,},
            {slots: [4, 3, 3],                   cantrips: 3, spells: 9,},
            {slots: [4, 3, 3, 1],                cantrips: 3, spells: 10,},
            {slots: [4, 3, 3, 2],                cantrips: 3, spells: 11,},
            {slots: [4, 3, 3, 3, 1],             cantrips: 3, spells: 12,},
            {slots: [4, 3, 3, 3, 2],             cantrips: 4, spells: 14,},
            {slots: [4, 3, 3, 3, 2],             cantrips: 4, spells: 15,},
            {slots: [4, 3, 3, 3, 2, 1],          cantrips: 4, spells: 15,},
            {slots: [4, 3, 3, 3, 2, 1, 1],       cantrips: 4, spells: 16,},
            {slots: [4, 3, 3, 3, 2, 1, 1],       cantrips: 4, spells: 18,},
            {slots: [4, 3, 3, 3, 2, 1, 1, 1],    cantrips: 4, spells: 19,},
            {slots: [4, 3, 3, 3, 2, 1, 1, 1],    cantrips: 4, spells: 19,},
            {slots: [4, 3, 3, 3, 2, 1, 1, 1, 1], cantrips: 4, spells: 20,},
            {slots: [4, 3, 3, 3, 3, 1, 1, 1, 1], cantrips: 4, spells: 22,},
            {slots: [4, 3, 3, 3, 3, 2, 1, 1, 1], cantrips: 4, spells: 22,},
            {slots: [4, 3, 3, 3, 3, 2, 2, 1, 1], cantrips: 4, spells: 22,},
    ];
    let cleric = [
        {slots: [2],                          cantrips: 3},
        {slots: [3],                          cantrips: 3},
        {slots: [4, 2],                       cantrips: 3},
        {slots: [4, 3],                       cantrips: 4},
        {slots: [4, 3, 2],                    cantrips: 4},
        {slots: [4, 3, 3],                    cantrips: 4},
        {slots: [4, 3, 3, 1],                 cantrips: 4},
        {slots: [4, 3, 3, 2],                 cantrips: 4},
        {slots: [4, 3, 3, 3, 1],              cantrips: 4},
        {slots: [4, 3, 3, 3, 2],              cantrips: 5},
        {slots: [4, 3, 3, 3, 2, 1],           cantrips: 5},
        {slots: [4, 3, 3, 3, 2, 1],           cantrips: 5},
        {slots: [4, 3, 3, 3, 2, 1, 1],        cantrips: 5},
        {slots: [4, 3, 3, 3, 2, 1, 1],        cantrips: 5},
        {slots: [4, 3, 3, 3, 2, 1, 1, 1],     cantrips: 5},
        {slots: [4, 3, 3, 3, 2, 1, 1, 1],     cantrips: 5},
        {slots: [4, 3, 3, 3, 2, 1, 1, 1, 1],  cantrips: 5},
        {slots: [4, 3, 3, 3, 3, 1, 1, 1, 1],  cantrips: 5},
        {slots: [4, 3, 3, 3, 3, 2, 1, 1, 1],  cantrips: 5},
        {slots: [4, 3, 3, 3, 3, 2, 2, 1, 1 ], cantrips: 5},
    ]
    let druid = [
        {slots: [2, 2,],                        cantrips: 2, },
        {slots: [2, 3,],                        cantrips: 2, },
        {slots: [2, 4, 2,],                     cantrips: 2, },
        {slots: [3, 4, 3,],                     cantrips: 3, },
        {slots: [3, 4, 3, 2,],                  cantrips: 3, },
        {slots: [3, 4, 3, 3,],                  cantrips: 3, },
        {slots: [3, 4, 3, 3, 1,],               cantrips: 3, },
        {slots: [3, 4, 3, 3, 2,],               cantrips: 3, },
        {slots: [3, 4, 3, 3, 3, 1,],            cantrips: 3, },
        {slots: [4, 4, 3, 3, 3, 2,],            cantrips: 4, },
        {slots: [4, 4, 3, 3, 3, 2, 1,],         cantrips: 4, },
        {slots: [4, 4, 3, 3, 3, 2, 1,],         cantrips: 4, },
        {slots: [4, 4, 3, 3, 3, 2, 1, 1,],      cantrips: 4, },
        {slots: [4, 4, 3, 3, 3, 2, 1, 1,],      cantrips: 4, },
        {slots: [4, 4, 3, 3, 3, 2, 1, 1, 1,],   cantrips: 4, },
        {slots: [4, 4, 3, 3, 3, 2, 1, 1, 1,],   cantrips: 4, },
        {slots: [4, 4, 3, 3, 3, 2, 1, 1, 1, 1], cantrips: 4, },
        {slots: [4, 4, 3, 3, 3, 3, 1, 1, 1, 1], cantrips: 4, },
        {slots: [4, 4, 3, 3, 3, 3, 2, 1, 1, 1], cantrips: 4, },
        {slots: [4, 4, 3, 3, 3, 3, 2, 2, 1, 1], cantrips: 4, },
    ]
    let paladin = [
        {slots: [2,], },
        {slots: [3,], },
        {slots: [3,], },
        {slots: [4, 2,], },
        {slots: [4, 2,], },
        {slots: [4, 3,], },
        {slots: [4, 3,], },
        {slots: [4, 3, 2,], },
        {slots: [4, 3, 2,], },
        {slots: [4, 3, 3,], },
        {slots: [4, 3, 3,], },
        {slots: [4, 3, 3, 1,], },
        {slots: [4, 3, 3, 1,], },
        {slots: [4, 3, 3, 2,], },
        {slots: [4, 3, 3, 2,], },
        {slots: [4, 3, 3, 3, 1], },
        {slots: [4, 3, 3, 3, 1], },
        {slots: [4, 3, 3, 3, 2], },
        {slots: [4, 3, 3, 3, 2 ], },
    ];
    let ranger = [
        {slots: [],                 spells: 0,},
        {slots: [2],                spells: 2,},
        {slots: [3],                spells: 3,},
        {slots: [3],                spells: 3,},
        {slots: [4, 2],             spells: 4,},
        {slots: [4, 2],             spells: 4,},
        {slots: [4, 3],             spells: 5,},
        {slots: [4, 3],             spells: 5,},
        {slots: [4, 3, 2],          spells: 6,},
        {slots: [4, 3, 2],          spells: 6,},
        {slots: [4, 3, 3],          spells: 7,},
        {slots: [4, 3, 3],          spells: 7,},
        {slots: [4, 3, 3, 1],       spells: 8,},
        {slots: [4, 3, 3, 1],       spells: 8,},
        {slots: [4, 3, 3, 2],       spells: 9,},
        {slots: [4, 3, 3, 2],       spells: 9,},
        {slots: [ 4, 3, 3, 3, 1,],  spells: 10,},
        {slots: [ 4, 3, 3, 3, 1,],  spells: 10,},
        {slots: [ 4, 3, 3, 3, 2,],  spells: 11,},
        {slots: [ 4, 3, 3, 3, 2, ], spells: 11,},
    ];
    let sorcerer = [
        {slots: [2, ],                        cantrips: 4, spells: 2,},
        {slots: [3, ],                        cantrips: 4, spells: 3,},
        {slots: [4, 2, ],                     cantrips: 4, spells: 4,},
        {slots: [4, 3, ],                     cantrips: 5, spells: 5,},
        {slots: [4, 3, 2, ],                  cantrips: 5, spells: 6,},
        {slots: [4, 3, 3, ],                  cantrips: 5, spells: 7,},
        {slots: [4, 3, 3, 1, ],               cantrips: 5, spells: 8,},
        {slots: [4, 3, 3, 2, ],               cantrips: 5, spells: 9,},
        {slots: [4, 3, 3, 3, 1, ],            cantrips: 5, spells: 10,},
        {slots: [4, 3, 3, 3, 2, ],            cantrips: 5, spells: 11,},
        {slots: [4, 3, 3, 3, 2, 1, ],         cantrips: 6, spells: 12,},
        {slots: [4, 3, 3, 3, 2, 1, ],         cantrips: 6, spells: 12,},
        {slots: [4, 3, 3, 3, 2, 1, 1, ],      cantrips: 6, spells: 13,},
        {slots: [4, 3, 3, 3, 2, 1, 1, ],      cantrips: 6, spells: 13,},
        {slots: [4, 3, 3, 3, 2, 1, 1, 1, ],   cantrips: 6, spells: 14,},
        {slots: [4, 3, 3, 3, 2, 1, 1, 1, ],   cantrips: 6, spells: 14,},
        {slots: [4, 3, 3, 3, 2, 1, 1, 1, 1],  cantrips: 6, spells: 15,},
        {slots: [4, 3, 3, 3, 3, 1, 1, 1, 1],  cantrips: 6, spells: 15,},
        {slots: [4, 3, 3, 3, 3, 2, 1, 1, 1],  cantrips: 6, spells: 15,},
        {slots: [4, 3, 3, 3, 3, 2, 2, 1, 1 ], cantrips: 6, spells: 15,},
    ];
    let wizard = [
        {slots: [2],                          cantrips: 3,},
        {slots: [3],                          cantrips: 3,},
        {slots: [4, 2],                       cantrips: 3,},
        {slots: [4, 3],                       cantrips: 4,},
        {slots: [4, 3, 2],                    cantrips: 4,},
        {slots: [4, 3, 3],                    cantrips: 4,},
        {slots: [4, 3, 3, 1],                 cantrips: 4,},
        {slots: [4, 3, 3, 2],                 cantrips: 4,},
        {slots: [4, 3, 3, 3, 1],              cantrips: 4,},
        {slots: [4, 3, 3, 3, 2],              cantrips: 5,},
        {slots: [4, 3, 3, 3, 2, 1],           cantrips: 5,},
        {slots: [4, 3, 3, 3, 2, 1],           cantrips: 5,},
        {slots: [4, 3, 3, 3, 2, 1, 1],        cantrips: 5,},
        {slots: [4, 3, 3, 3, 2, 1, 1],        cantrips: 5,},
        {slots: [4, 3, 3, 3, 2, 1, 1, 1],     cantrips: 5,},
        {slots: [4, 3, 3, 3, 2, 1, 1, 1],     cantrips: 5,},
        {slots: [4, 3, 3, 3, 2, 1, 1, 1, 1],  cantrips: 5,},
        {slots: [4, 3, 3, 3, 3, 1, 1, 1, 1],  cantrips: 5,},
        {slots: [4, 3, 3, 3, 3, 2, 1, 1, 1],  cantrips: 5,},
        {slots: [4, 3, 3, 3, 3, 2, 2, 1, 1], cantrips: 5,},
    ];
    let fighter = [
        {slots: [], cantrips: 0, spells: 0},
        {slots: [], cantrips: 0, spells: 0},
        {slots: [2], cantrips: 0, spells: 0},
        {slots: [3], cantrips: 0, spells: 0},
        {slots: [3], cantrips: 0, spells: 0},
        {slots: [3], cantrips: 0, spells: 0},
        {slots: [4, 2], cantrips: 0, spells: 0},
        {slots: [4, 2], cantrips: 0, spells: 0},
        {slots: [4, 2], cantrips: 0, spells: 0},
        {slots: [5, 4, 2], cantrips: 0, spells: 0},
        {slots: [6, 4, 2], cantrips: 0, spells: 0},
        {slots: [6, 4, 2], cantrips: 0, spells: 0},
        {slots: [7, 4, 3], cantrips: 0, spells: 0},
        {slots: [8, 4, 3], cantrips: 0, spells: 0},
        {slots: [9, 4, 3, 2], cantrips: 0, spells: 0},
        {slots: [10, 4, 3, 2], cantrips: 0, spells: 0},
        {slots: [10, 4, 3, 2], cantrips: 0, spells: 0},
        {slots: [11, 4, 3, 3], cantrips: 0, spells: 0},
        {slots: [11, 4, 3, 3], cantrips: 0, spells: 0},
        {slots: [11, 4, 3, 3], cantrips: 0, spells: 0},
        {slots: [12, 4, 3, 3, 1], cantrips: 0, spells: 0},
        {slots: [13, 4, 3, 3, 1], cantrips: 0, spells: 0},
    ]
    let rogue = [
        {slots: [], cantrips: 0, spells: 0},
        {slots: [], cantrips: 0, spells: 0},
        {slots: [2], cantrips: 3, spells: 3,},
        {slots: [3], cantrips: 3, spells: 4,},
        {slots: [3], cantrips: 3, spells: 4,},
        {slots: [3], cantrips: 3, spells: 4,},
        {slots: [4, 2], cantrips: 3, spells: 5,},
        {slots: [4, 2], cantrips: 4, spells: 6,},
        {slots: [4, 2], cantrips: 4, spells: 6,},
        {slots: [4, 3], cantrips: 4, spells: 7,},
        {slots: [4, 3], cantrips: 4, spells: 8,},
        {slots: [4, 3], cantrips: 4, spells: 8,},
        {slots: [4, 3, 2], cantrips: 4, spells: 9,},
        {slots: [4, 3, 2], cantrips: 4, spells: 10,},
        {slots: [4, 3, 2], cantrips: 4, spells: 10,},
        {slots: [4, 3, 3], cantrips: 4, spells: 11,},
        {slots: [4, 3, 3], cantrips: 4, spells: 11,},
        {slots: [4, 3, 3], cantrips: 4, spells: 11,},
        {slots: [4, 3, 3, 1], cantrips: 4, spells: 12,},
        {slots: [4, 3, 3, 1], cantrips: 4, spells: 13,},
    ];
    let warlock = [
        {slots: [1], cantrips: 2, spells: 2, },
        {slots: [2], cantrips: 2, spells: 3, },
        {slots: [null, 2], cantrips: 2, spells: 4, },
        {slots: [null, 2], cantrips: 3, spells: 5, },
        {slots: [null, null, 2], cantrips: 3, spells: 6, },
        {slots: [null, null, 2], cantrips: 3, spells: 7, },
        {slots: [null, null, null, 2], cantrips: 3, spells: 8, },
        {slots: [null, null, null, 2], cantrips: 3, spells: 9, },
        {slots: [null, null, null, null, 2], cantrips: 3, spells: 10},
        {slots: [null, null, null, null, 2], cantrips: 4, spells: 10},
        {slots: [null, null, null, null, 3], cantrips: 4, spells: 11},
        {slots: [null, null, null, null, 3], cantrips: 4, spells: 11},
        {slots: [null, null, null, null, 3], cantrips: 4, spells: 12},
        {slots: [null, null, null, null, 3], cantrips: 4, spells: 12},
        {slots: [null, null, null, null, 3], cantrips: 4, spells: 13},
        {slots: [null, null, null, null, 3], cantrips: 4, spells: 13},
        {slots: [null, null, null, null, 4], cantrips: 4, spells: 14},
        {slots: [null, null, null, null, 4], cantrips: 4, spells: 14},
        {slots: [null, null, null, null, 4], cantrips: 4, spells: 15},
        {slots: [null, null, null, null, 4], cantrips: 4, spells: 15},
    ];
    let classes = [
        {kind: ClassKind.Bard, items: bard},
        {kind: ClassKind.Cleric, items: cleric},
        {kind: ClassKind.Druid, items: druid},
        {kind: ClassKind.Fighter, items: fighter},
        {kind: ClassKind.Paladin, items: paladin},
        {kind: ClassKind.Ranger, items: ranger},
        {kind: ClassKind.Rogue, items: rogue},
        {kind: ClassKind.Sorcerer, items: sorcerer},
        {kind: ClassKind.Warlock, items: warlock},
        {kind: ClassKind.Wizard, items: wizard},
    ];
    for (let set of classes) {        for (var i = 0; i < set.items.length; i++) {            let level = set.items[i];
            t.add(Object.assign(level, {classKind: set.kind, level: i+1, _knownSpells: []}))
        }
    }
}