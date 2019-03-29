import {Alignment, AlignmentMajor, AlignmentMinor, Character, Height, ArmorWeight, Armor, Wealth, HeavyArmor, LightArmor, MediumArmor} from '../models/character';
import { RaceKind, Race, SubRace } from '../models/race';
import { ClassKind, Class } from '../models/class';
import { AbilityScores, AbilityKind } from '../models/abilityScore';
import { Data } from './data';
import { Background, ALL_BACKGROUNDS } from '../models/background';
import { Skills } from '../models/skills';

export class Randomizer {
    public static async randomCharacter(): Promise<Character> {
        let data = new Data();
        let raceKind = Randomizer.randomRace();
        let subRace = Randomizer.randomSubRace(raceKind);
        let race = new Race(raceKind, subRace);
        let classKind = Randomizer.randomClassKind();
        let details = await data.getClassDetails(classKind, 1);
        let cls = new Class(classKind, 1, details,);
        let bkgnd = Randomizer.randomBackground();
        let ret = new Character(
            Character.nextName(),
            new AbilityScores(),
            race,
            cls,
            bkgnd,
            race.preferredAlignment,
            0,
            Randomizer.randomHeight(race.heightRange[0], race.heightRange[1]),
            Randomizer.randomWeight(race.avgWeight),
            'grey',
            0,
            Randomizer.randomArmor(cls.armorProfs[cls.armorProfs.length - 1]),
            cls.canUseShield && Math.random() > 0.5 ? new Armor('Shield', ArmorWeight.Heavy, 2, null) : null,
            new Skills(),
            [],
            new Wealth(),
            race.languages.concat(bkgnd.languages),
            0,
            0,
            [],
            [],
        );
        let points = 15;
        let ct = 8;
        for (let abi of cls.primaryAbility) {
            ret.abilityScores.set(abi, 8 + 4);
            points -= 4;
            ct -= 1;
        }
        let each = Math.floor(points / ct);
        ret.abilityScores = new AbilityScores(ret.abilityScores.map(s => {
            if (s.value > 8) {
                return s;
            }
            s.value += each;
            points -= each;
            return s;
        }));
        if (points > 0) {
            ret.abilityScores.set(AbilityKind.Charisma, 8 + each + points);
        }
        return ret;
    }
    public static randomClassKind(): ClassKind {
        return Randomizer.sampleEnum(ClassKind) as ClassKind
    }

    public static randomRace(): RaceKind {
        return Randomizer.sampleEnum(RaceKind) as RaceKind;
    }

    public static randomSubRace(race: RaceKind): SubRace | null {
        let opts = Data.subRaceFor(race);
        if (opts === null) {
            return null;
        }
        return this.sample(opts);
    }

    public static randomAlignment(): Alignment {
        return new Alignment(
            Randomizer.sampleEnum(AlignmentMajor) as AlignmentMajor, 
            Randomizer.sampleEnum(AlignmentMinor) as AlignmentMinor,
        );
    }

    public static randomBackground(): Background {
        return Randomizer.sample(ALL_BACKGROUNDS)
    }

    public static randomHeight(min: Height, max: Height) {
        let ft = Randomizer.rng(min.feet, max.feet);
        let inches = Randomizer.rng(0, 12);
        return new Height(ft, inches);
    }

    public static randomWeight(avgWeight: number) {
        let values = new Uint8Array([0,0,0,0,0,0,0,0,0,0]);
        for (;;) {
            window.crypto.getRandomValues(values);
            for (var i = 0; i < values.length; i++) {
                let value = values[i];
                let percent = value / avgWeight;
                if (percent > 1 && percent < 1.3) {
                    return value;
                }
                if (percent < 1 && percent > 0.7) {
                    return value;
                }
            }
        }
    }

    public static randomArmor(weight: ArmorWeight) {
        switch (weight) {
            case ArmorWeight.Heavy:
                return new Armor(HeavyArmor.RingMail, ArmorWeight.Heavy, 4, 0);
            case ArmorWeight.Light:
                return new Armor(LightArmor.Leather, ArmorWeight.Light, 2, null);
            case ArmorWeight.Medium:
                return new Armor(MediumArmor.Hide, ArmorWeight.Medium, 2, 2);
        }
    }

    public static rng(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    public static sample<T>(array: Array<T>): T {
        let rng = Math.floor(Math.random() * array.length);
        return array[rng];
    }

    public static sampleEnum(enumeration: any): string | number {
        let keys = Object.getOwnPropertyNames(enumeration);
        let key = Randomizer.sample(keys);
        return enumeration[key];
    }

}