import { Database, IClassFeature, IClassFeatureOption } from './data';
import { RoguishArchetype, RogueDetails } from '../models/classDetails';
import { SkillKind, Skills } from '../models/skills';
import { ExpendableItem, MagicItem, Wealth, Weapon, Character, Alignment, Height, Armor, LightArmor, ArmorWeight, WeaponType, WeaponKind, WeaponDamageKind, WeaponWeight, WeaponHandedness, NormalLanguage, AlignmentMajor, AlignmentMinor } from '../models/character';
import { Range } from '../models/range'
import { AbilityScores, AbilityScore, AbilityKind } from '../models/abilityScore';
import { RaceKind, Race } from '../models/race';
import { ClassKind, Class, DEFAULT_BONUS_ABILITY_SCORES } from '../models/class';
import { Background, BackgroundKind } from '../models/background';
import { MiscTools, GamingSet } from '../models/tools';

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
            new AbilityScore(8, AbilityKind.Constitution),
            new AbilityScore(8, AbilityKind.Intelligence),
            new AbilityScore(15, AbilityKind.Wisdom),
            new AbilityScore(15, AbilityKind.Charisma),
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
        new Wealth(),
        [NormalLanguage.Common],
        0,
        0,
        [],
        []
    )
    return [d];
} 