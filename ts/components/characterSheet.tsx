import * as React from 'react';
import {
    Character, Save, Weapon, Wealth, Alignment, MagicItem, ExpendableItem, 
    WeaponType, WeaponKind, WeaponDamageKind, WeaponWeight, WeaponHandedness,
} from '../models/character';
import { Range } from '../models/range';
import { AbilityScores, AbilityScore, AbilityKind } from '../models/abilityScore';
import { Box, Text, Button, Label, TextInput, 
        Dialog, Radio, ListView, ListViewSection, 
        ListViewSectionHeader, ListViewRow, Checkbox,
        ListViewHeader,
} from 'react-desktop';
import { Class, ClassKind } from '../models/class';
import { Background } from '../models/background';
import { SkillKind } from '../models/skills';
import { SpellsList } from './spellsList';
import { IClassFeature, ClassFeature } from '../services/data';
import { Spell } from '../models/spells';
import { notEqual } from 'assert';
import { ClassDetails } from '../models/classDetails';

interface ICharacterSheetProps {
    character: Character;
    adjustDamage: (newValue: number) => void;
    adjustTempHP: (newValue: number) => void;
    adjustExp: (newValue: number) => void;
    adjustMoney: (newValue: Wealth) => void;
    adjustScores: (newValue: AbilityScores) => void;
    adjustExpendables: (newExpends: ExpendableItem[]) => void;
    adjustMagics: (newMagics: MagicItem[]) => void;
    adjustWeapons: (newWeapons: Weapon[]) => void;
    adjustInspiration: (newValue: number) => void;
    classFeatureOptionSelected: (name: string, idx: number) => void;
    spellList: Spell[];
}

interface ICharacterSheetState {
}

export class CharacterSheet extends React.Component<ICharacterSheetProps, ICharacterSheetState> {
    constructor(props: ICharacterSheetProps) {
        super(props);
    }

    render() {
        let children = [
            <CharacterName
                key="character-name"
                name={this.props.character.name}
                inspiration={this.props.character.inspiration}
                inspirationChanged={newValue => this.props.adjustInspiration(newValue)}
            />,
            <CharacterDescription
                key="character-desc"
                race={this.props.character.race.name}
                name={this.props.character.characterClass.name}
                level={this.props.character.level}
                alignment={this.props.character.alignment}
                background={this.props.character.background}
                experience={this.props.character.experience}
                expToNextLevel={this.props.character.expToNextLevel}
                adjustExperience={newExp => this.props.adjustExp(newExp)}
            />,
            <AbilitiesColumn
                key="abilities-column"
                scores={this.props.character.modifiedAbilityScores()}
                updateScores={scores => this.props.adjustScores(scores)}
                pendingBonuses={this.props.character.abilityScoreModNeeded()}
            />,
            <Proficiency
                key="proficiency"
                proficiency={this.props.character.proficiency}
                languages={this.props.character.languages}
            />,
            <Saves key="saves" saves={this.props.character.saves} />,
            <SkillsList key="skills-list" skills={this.props.character.rawSkills} />,
            <Defences
                key="defences"
                armorClass={this.props.character.armorClass()}
                initiative={this.props.character.initiative}
                hitPoints={this.props.character.currentHealth()}
                tempHitPoints={this.props.character.tempHp}
                hitDice={this.props.character.characterClass}
                speed={this.props.character.speed}
                damage={this.props.character.damage}
                damageChanged={dmg => this.props.adjustDamage(dmg)}
                tempHPChanged={hp => this.props.adjustTempHP(hp)}
            />,
            <Weapons
                key="weapons"
                weapons={this.props.character.weapons}
                adjustWeapons={newWeapons => this.props.adjustWeapons(newWeapons)}
            />,
            <Money
                key="money"
                wealth={this.props.character.wealth}
                adjustMoney={wealth => this.props.adjustMoney(wealth)}
            />,
            <Notes
                key="notes"
                classDetails={this.props.character.characterClass.classDetails}
                optionsSelected={(name, idx) => this.props.classFeatureOptionSelected(name, idx)}
            />,
            <ItemsList
                key="items-list"
                magicItems={this.props.character.magicItems}
                expendables={this.props.character.expendables}
                adjustExpendables={newExpendables => this.props.adjustExpendables(newExpendables)}
                adjustMagics={newMagics => this.props.adjustMagics(newMagics)}
            />,
        ];
        if (this.props.character.characterClass.isCaster) {
            children.push(
                <SpellsList
                    key="spells-list"
                    title={`${this.props.character.characterClass.name} Spells`}
                    spells={this.props.spellList}
                />
            );
        }
        return (
            <div className="character-sheet">
                {children}
            </div>
        )
    }
}

interface ICharacterNameProps {
    name: string
    inspiration: number;
    inspirationChanged: (newValue: number) => void;
}

export class CharacterName extends React.Component<ICharacterNameProps, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Box
                className="character-name-container"
            >
                <Text
                    className="character-name-text"
                    bold={true}
                    size={24}
                >{this.props.name}</Text>
                <div className="inspiration-container">
                    <Text
                        style={{
                            fontSize: 16,
                        }}
                    >{`Inspiration ${this.props.inspiration}`}</Text>
                    <Button
                        onClick={() => this.props.inspirationChanged(this.props.inspiration + 1)}
                        className="up"
                        padding="0px"
                    >
                        <i style={{ fontFamily: 'Material Icons', lineHeight: 1 }}>expand_less</i>
                    </Button>
                    <Button padding="0px" onClick={() => this.props.inspirationChanged(this.props.inspiration - 1)} className="down">
                        <i style={{ fontFamily: 'Material Icons', lineHeight: 1 }}>expand_more</i>
                    </Button>
                </div>
            </Box>
        );
    }
}

interface ICharacterDescriptionProps {
    name: ClassKind;
    level: number;
    race: string;
    alignment: Alignment;
    experience: number;
    background: Background;
    expToNextLevel: number;
    adjustExperience: (newExp: number) => void;
}

interface ICharacterDescriptionState {
    adjustingExperience: boolean;
}

export class CharacterDescription extends React.Component<ICharacterDescriptionProps, ICharacterDescriptionState> {
    constructor(props: ICharacterDescriptionProps) {
        super(props);
        this.state = {
            adjustingExperience: false,
        };
    }
    render() {
        let ret = [
            <Box
                className="character-description"
                padding={0}
                key="character-desc"
            >
                <div className="character-class desc-part">
                    <Text 
                        className="character-class-value desc-value"
                        style={{
                            paddingTop: 5,
                            lineHeight: 1,
                        }}
                    >{this.props.name}</Text>
                    <hr className="desc-divider" />
                    <Label
                        color="rgba(0,0,0,0.5)"
                        className="character-class-label desc-label"
                    >class</Label>
                </div>
                <div className="class-level desc-part">
                    <Text className={`class-level-value desc-value`}
                    style={{
                        paddingTop: 5,
                        lineHeight: 1,
                    }}>{this.props.level.toString()}</Text>
                    <hr className="desc-divider" />
                    <Label
                        color="rgba(0,0,0,0.5)" className="class-level-label desc-label">level</Label>
                </div>
                <div className="character-background desc-part">
                    <Text className="background-value desc-value"
                    style={{
                        paddingTop: 5,
                        lineHeight: 1,
                    }}>{this.props.background.kind}</Text>
                    <hr className="desc-divider" />
                    <Label
                        color="rgba(0,0,0,0.5)" className="background-label desc-label">background</Label>
                </div>
                <div className="character-race desc-part">
                    <Text className="race-value desc-value"
                    style={{
                        paddingTop: 5,
                        lineHeight: 1,
                    }}>{this.props.race}</Text>
                    <hr className="desc-divider" />
                    <Label
                        color="rgba(0,0,0,0.5)" className="race-label desc-label">race</Label>
                </div>
                <div className="character-alignment desc-part">
                    <Text className="alignment-value desc-value"
                    style={{
                        paddingTop: 5,
                        lineHeight: 1,
                    }}>{this.props.alignment.toString()}</Text>
                    <hr className="desc-divider" />
                    <Label
                        color="rgba(0,0,0,0.5)" className="alignment-label desc-label">alignment</Label>
                </div>
                <div className="character-experience desc-part"
                    onClick={() => this.adjustExperience()}
                    title={`next level in ${this.props.expToNextLevel} more exp`}
                >
                    <Text className="experience-value desc-value"
                    style={{
                        paddingTop: 5,
                        lineHeight: 1,
                    }}>{this.props.experience.toString()}</Text>
                    <hr className="desc-divider" />
                    <Label
                        color="rgba(0,0,0,0.5)" className="experience-label desc-label">experience</Label>
                </div>
            </Box>
        ];
        if (this.state.adjustingExperience) {
            ret.push(<ExperienceAdjuster
                key="experience-adjuster"
                onComplete={newExp => this.experienceAdjustmentComplete(newExp)}
                currentExp={this.props.experience}
            />)
        }
        return ret;
    }
    adjustExperience() {
        this.setState({ adjustingExperience: true });
    }
    experienceAdjustmentComplete(newValue: number) {
        this.setState({ adjustingExperience: false });
        this.props.adjustExperience(newValue);
    }
}

interface IExperienceAdjusterProps {
    onComplete: (newValue) => void;
    currentExp: number;
}

interface IExperienceAdjusterState {
    currentExp: number;
    newExp: number;
}

export class ExperienceAdjuster extends React.Component<IExperienceAdjusterProps, IExperienceAdjusterState> {
    private cachedHandler;
    constructor(props: IExperienceAdjusterProps) {
        super(props);
        this.state = {
            currentExp: this.props.currentExp,
            newExp: 0,
        };
        this.cachedHandler = this.keyHandler.bind(this);
        window.addEventListener('keyup', this.cachedHandler);
    }
    render() {
        return (
            <Dialog
                className="experience-adjuster"
                horizontalAlignment="center"
                style={{
                    zIndex: 100,
                    position: 'absolute',
                }}
            >
                <Label style={{ textAlign: "center" }}>New Experience</Label>
                <TextInput
                    focusRing={false}
                    type="number"
                    value={this.state.newExp.toString()}
                    onChange={ev => this.setState({ newExp: parseInt(ev.currentTarget.value), currentExp: this.props.currentExp })}
                />
                <Label style={{ textAlign: "center" }}>Current Experience</Label>
                <TextInput
                    focusRing={false}
                    type="number"
                    value={this.state.currentExp.toString()}
                    onChange={ev => this.setState({ currentExp: parseInt(ev.currentTarget.value), newExp: 0 })}
                />
                <div className="button-container">
                    <Button onClick={() => this.props.onComplete(this.state.currentExp + this.state.newExp)}>Save</Button>
                    <Button onClick={() => this.props.onComplete(this.props.currentExp)}>Cancel</Button>
                </div>
            </Dialog>
        );
    }
    keyHandler(ev: KeyboardEvent) {
        switch (ev.key) {
            case "Escape":
                this.props.onComplete(this.props.currentExp);
                window.removeEventListener('keyup', this.cachedHandler);
                delete this.cachedHandler
                break;
            case "Enter":
                this.props.onComplete(this.state.currentExp + this.state.newExp);
                window.removeEventListener('keyup', this.cachedHandler);
                delete this.cachedHandler;
                break;
        }
    }
}

interface IAbilitiesColumnProps {
    scores: AbilityScores;
    pendingBonuses: number;
    updateScores: (scores: AbilityScores) => void;
}
interface IAbilitiesColumnState {
    editingScores: boolean;
}

export class AbilitiesColumn extends React.Component<IAbilitiesColumnProps, IAbilitiesColumnState> {
    constructor(props: IAbilitiesColumnProps) {
        super(props);
        this.state = {
            editingScores: false,
        };
    }

    render() {
        return (
            <Box
                className="ability-scores-column"
                padding="5px"
            >
                {this.props.scores.map((score) => {
                    return (
                        <AbilityScoreContainer
                            key={`score-${score.kind}`}
                            score={score}
                            name={score.kind}
                        />
                    )
                })}
                <Button
                    onClick={() => this.editScores()}
                >edit</Button>
                {this.state.editingScores
                    ? (
                        <AbilityScoreAdjustor
                            scoresSaved={scores => this.completeEditingScores(scores)}
                        />
                    )
                    : null
                }
            </Box>
        );
    }

    editScores() {
        this.setState({ editingScores: true });
    }

    completeEditingScores(scores: AbilityScores) {
        this.setState({ editingScores: false }, () => {
            if (!scores) return;
            this.props.updateScores(scores);
        });
    }
}

interface IAbilityScoreAdjustorProps {
    scoresSaved: (scores: AbilityScores) => void;
}

interface IAbilityScoreAdjustorState {
    abilityScores: AbilityScores;
}

export class AbilityScoreAdjustor extends React.Component<IAbilityScoreAdjustorProps, IAbilityScoreAdjustorState> {
    private cachedHandler;
    constructor(props: IAbilityScoreAdjustorProps) {
        super(props);
        this.state = {
            abilityScores: AbilityScores.Empty(),
        };
        this.cachedHandler = this.keyHandler.bind(this);
        window.addEventListener('keyup', this.cachedHandler);
    }
    render() {
        return (
            <Dialog
                className="ability-score-adjustor"
                style={{
                    position: 'absolute',
                    zIndex: 100,
                }}
                horizontalAlignment="center"
            >
                <Box className="scores-list">
                    {this.state.abilityScores.map(score => {
                        return (
                            <Box key={`adjusting-score-${score.kind}`} className={`input-group ${score.kind.toLowerCase()}`}>
                                <Label style={{ textAlign: "center" }}>{score.kind}</Label>
                                <TextInput
                                    focusRing={false}
                                    value={score.value.toString()}
                                    type="number"
                                    onChange={ev => this.updateAbilities(score.kind, ev.currentTarget.valueAsNumber)}
                                />
                            </Box>
                        );
                    })
                    }
                </Box>
                <div>
                    <Button
                        onClick={() => this.props.scoresSaved(this.state.abilityScores)}
                    >Save</Button>
                    <Button
                        onClick={() => this.props.scoresSaved(null)}
                    >Cancel</Button>
                </div>
            </Dialog>
        );
    }

    updateAbilities(kind: AbilityKind, newValue: number) {
        this.setState((prev, props) => {
            prev.abilityScores.set(kind, newValue);
            return {
                abilityScores: prev.abilityScores
            };
        });
    }

    keyHandler(ev: KeyboardEvent) {
        switch (ev.key) {
            case "Escape":
                window.removeEventListener('keyup', this.cachedHandler);
                this.props.scoresSaved(null)
                delete this.cachedHandler;
                break;
            case "Enter":
                window.removeEventListener('keyup', this.cachedHandler);
                this.props.scoresSaved(this.state.abilityScores)
                delete this.cachedHandler;
                break;
        }
    }
}

interface IAbilityScoreContainerProps {
    name: string;
    score: AbilityScore;
}
interface IAbilityScoreContainerState {

}

export class AbilityScoreContainer extends React.Component<IAbilityScoreContainerProps, IAbilityScoreContainerState> {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Box
                className="ability-score-container"
                padding={5}
            >
                <Label bold={true} className="ability-score-name">{this.props.name.substr(0, 3).toUpperCase()}</Label>
                <Text className="ability-score-value">{this.props.score.value}</Text>
                <Text className="ability-modifier-value">{this.props.score.modifier}</Text>
            </Box>
        )
    }
}

interface ISavesProps {
    saves: Save[];
}

export class Saves extends React.Component<ISavesProps, {}> {
    render() {
        return (
            <Box className="saves-list"
                padding="0"
            >
                {this.props.saves.map(save => {
                    return (
                        <SkillContainer key={save.kind} name={save.kind} score={save.value} enabled={save.enabled} />
                    )
                })}
            </Box>
        )
    }
}

interface ISkillsListProps {
    skills: [SkillKind, number, boolean][];
}

export class SkillsList extends React.Component<ISkillsListProps, {}> {
    render() {
        return (
            <Box className="skills-list"
                padding="0"
            >
                {this.props.skills.map(skill => {
                    return (<SkillContainer key={`skill-${skill[0]}`} name={skill[0]} score={skill[1]} enabled={skill[2]} />)
                })}
            </Box>
        )
    }
}

interface ISkillContainerProps {
    name: string;
    score: number;
    enabled: boolean
}

export class SkillContainer extends React.Component<ISkillContainerProps, {}> {
    render() {
        return (
            <div className="skill-container">
                <Radio className="skill-flag"
                    defaultChecked={this.props.enabled}
                    disabled
                />
                <Text className="skill-value">{this.props.score}</Text>
                <Text className="skill-name">{this.props.name}</Text>
            </div>
        )
    }
}

interface IPassiveWisdomProps {
    value: number;
}

interface IPassiveWisdomState {

}

export class PassiveWisdom extends React.Component<IPassiveWisdomProps, IPassiveWisdomState> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Box
                height={20}
                padding="1px"
                className="passive-wisdom"
            >
                <Text>{this.props.value}</Text><Text>passive perception</Text>
            </Box>
        );
    }
}

interface IDefencesProps {
    armorClass: number;
    initiative: number;
    speed: number;
    hitPoints: number;
    damage: number;
    tempHitPoints: number;
    hitDice: Class;
    damageChanged: (newDmg: number) => void;
    tempHPChanged: (newTemp: number) => void;
}

interface IDefencesState {

}

export class Defences extends React.Component<IDefencesProps, IDefencesState> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Box
                className="defences"
                padding="8px 0"
            >
                <DefenceContainer name="Armor Class" value={this.props.armorClass} />
                <DefenceContainer name="Initiative" value={this.props.initiative} />
                <DefenceContainer name="Speed" value={this.props.speed} />
                <DefenceContainer name="Hit Points" value={this.props.hitPoints} />
                <DefenceContainer
                    name="Temp Hit Points"
                    value={this.props.tempHitPoints}
                    valueChanged={newTemp => this.props.tempHPChanged(newTemp)}
                />
                <DefenceContainer
                    name="Damage"
                    value={this.props.damage}
                    valueChanged={newValue => this.props.damageChanged(newValue)}
                />
                <HitDieDefenceContainer characterClass={this.props.hitDice} />
            </Box>
        );
    }
}

interface IDefenceContainerProps {
    name: string;
    value: number;
    valueChanged?: (newValue: number) => void;
}

interface IDefenceContainerState {

}

export class DefenceContainer extends React.Component<IDefenceContainerProps, IDefenceContainerState> {
    constructor(props) {
        super(props);
    }
    render() {
        let cls = formatClass(this.props.name);
        return (
            <Box
                className={`defence-container ${cls}`}
                padding="8px"
            >
                <Label className={`defence-name ${cls}`}>{this.props.name}</Label>
                {this.props.valueChanged ?
                    <div className="adjustable-inner">
                        <Text className={`defence-value ${cls}`}>{this.props.value}</Text>
                        <Button
                            className="adjust-up"
                            onClick={() => this.props.valueChanged(this.props.value + 1)}
                            padding="0px"
                            style={{
                                fontFamily: 'Material Icons',
                                lineHeight: 1,
                            }}
                        >expand_less</Button>
                        <Button
                            className="adjust-down"
                            onClick={() => this.props.valueChanged(this.props.value - 1)}
                            style={{
                                fontFamily: 'Material Icons',
                                lineHeight: 1,
                            }}
                            padding="0px"
                        >expand_more</Button>
                    </div>
                    : <Text className={`defence-value ${cls}`}>{this.props.value}</Text>}
            </Box>
        );
    }
}

interface IHidDieDefenceContainerProps {
    characterClass: Class
}

interface IHidDieDefenceContainerState {

}

export class HitDieDefenceContainer extends React.Component<IHidDieDefenceContainerProps, IHidDieDefenceContainerState> {
    constructor(props) {
        super(props);
    }
    render() {
        let c = this.props.characterClass;
        return (
            <Box
                className="defence-container hit-die"
                padding="0px"
            >
                <Label className="defence-name">Hit Dice</Label>
                <div className="defence-value" key={`hit-die-${c.name}-${c.level}`}>
                    <Text>{`d${c.hitDie}`}:</Text><Text>{c.level}</Text>
                </div>
            </Box>
        );
    }
}

interface IWeaponsProps {
    weapons: Weapon[];
    adjustWeapons: (newWeapons: Weapon[]) => void;
}

interface IWeaponsState {
    addingWeapon: boolean;
}

export class Weapons extends React.Component<IWeaponsProps, IWeaponsState> {
    constructor(props) {
        super(props);
        this.state = {
            addingWeapon: false,
        };
    }
    render() {
        let ret = [
            <Box
                key="weapons"
                className="weapons"
                padding="0px"
                style={{
                    display: 'flex',
                    flexFlow: 'column',
                }}
            >
                <ListView
                    className="weapon-list"
                >
                    <ListViewHeader>
                        <Text>Weapons</Text>
                    </ListViewHeader>
                    {this.props.weapons.map((w, i) => (<WeaponContainer
                        key={`weapon-${i}`}
                        weapon={w}
                        onDeleteClicked={() => this.removeWeapon(i)}
                    />))}
                </ListView>
                <Button
                    onClick={() => this.setState({ addingWeapon: true })}
                >add</Button>

            </Box>,
        ];
        if (this.state.addingWeapon) {
            ret.push(<NewWeapon
                key="new-weapon"
                onComplete={newWeapon => this.addWeapon(newWeapon)}
            />)

        }
        return ret;
    }
    addWeapon(newWeapon: Weapon) {
        this.setState({ addingWeapon: false }, () => {
            if (newWeapon === null) return;
            let newWeapons = this.props.weapons.map(w => w).concat([newWeapon]);
            this.props.adjustWeapons(newWeapons);
        });
    }
    removeWeapon(idx: number) {
        let newWeapons = this.props.weapons.filter((w, i) => i != idx);
        this.props.adjustWeapons(newWeapons);
    }
}

interface IWeaponContainerProps {
    weapon: Weapon;
    onDeleteClicked: () => void;
}

interface IWeaponContainerState {

}

export class WeaponContainer extends React.Component<IWeaponContainerProps, IWeaponContainerState> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ListViewRow className="weapon-container"
                padding="0px"
                height={20}
                style={{
                    flex: '0',
                    background: 'rgba(0,0,0,0.04)',
                    display: 'grid',
                    gridTemplateRows: '',
                    justifyContent: 'space-between',
                }}
            >
                <Text className="weapon-name">{this.props.weapon.name}</Text>
                <Text className="weapon-dmg">{`${this.props.weapon.hitDie[0]}d${this.props.weapon.hitDie[1]}`}</Text>
                <Text className="weapon-misc">{this.props.weapon.miscString()}</Text>
                <Button
                    onClick={() => this.props.onDeleteClicked()}
                    padding="0px"
                    style={{
                        height: 19,
                        width: 19,
                    }}
                >
                    <i style={{ fontFamily: 'Material Icons' }}>delete</i>
                </Button>
            </ListViewRow>
        );
    }
}

interface INewWeaponProps {
    onComplete: (weapon: Weapon) => void;
}

interface INewWeaponState {
    weapon: Weapon;
}

export class NewWeapon extends React.Component<INewWeaponProps, INewWeaponState> {
    private cachedHandler;
    constructor(props: INewWeaponProps) {
        super(props);
        this.state = {
            weapon: new Weapon('Dagger', WeaponType.Melee, WeaponKind.Simple, WeaponDamageKind.Piercing, WeaponWeight.Light, WeaponHandedness.One, [1, 4], new Range(5), 1, new Range(60), false, true, ''),
        }
        this.cachedHandler = this.keyHandler.bind(this);
        window.addEventListener('keyup', this.cachedHandler)
    }
    render() {
        return (
            <Dialog
                className="new-weapon"
                padding="5px"
                style={{
                    position: 'absolute',
                    zIndex: 200,
                }}
                horizontalAlignment="center"
            >
                <div>
                    <Label style={{ textAlign: "center" }}>Name</Label>
                    <TextInput
                        focusRing={false}
                        defaultValue={this.state.weapon.name}
                        onChange={ev => this.updateState('name', ev.currentTarget.value)}
                    />
                </div>
                <div>
                    <Label style={{ textAlign: "center" }}>Type</Label>
                    <select className="weapon-type"
                        value={this.state.weapon.weaponType}
                        onChange={ev => this.updateState('weaponType', ev.currentTarget.value)}
                    >
                        <option value={WeaponType.Melee}>{WeaponType.Melee}</option>
                        <option value={WeaponType.Range}>{WeaponType.Range}</option>
                    </select>
                </div>
                <div>
                    <Label style={{ textAlign: "center" }}>Kind</Label>
                    <select
                        className="weapon-kind"
                        value={this.state.weapon.kind}
                        onChange={ev => this.updateState('kind', ev.currentTarget.value)}
                    >
                        <option value={WeaponKind.Simple}>{WeaponKind.Simple}</option>
                        <option value={WeaponKind.Simple}>{WeaponKind.Martial}</option>
                        <option value={WeaponKind.Simple}>{WeaponKind.Natural}</option>
                    </select>
                </div>
                <div>
                    <Label style={{ textAlign: "center" }}>Damage Kind</Label>
                    <select
                        className="weapon-damage"
                        value={this.state.weapon.damageKind}
                        onChange={ev => this.updateState('damageKind', ev.currentTarget.value)}
                    >
                        <option value={WeaponDamageKind.Acid}>{WeaponDamageKind.Acid}</option>
                        <option value={WeaponDamageKind.Bludgeoning}>{WeaponDamageKind.Bludgeoning}</option>
                        <option value={WeaponDamageKind.Cold}>{WeaponDamageKind.Cold}</option>
                        <option value={WeaponDamageKind.Fire}>{WeaponDamageKind.Fire}</option>
                        <option value={WeaponDamageKind.Lightening}>{WeaponDamageKind.Lightening}</option>
                        <option value={WeaponDamageKind.Piercing}>{WeaponDamageKind.Piercing}</option>
                        <option value={WeaponDamageKind.Poison}>{WeaponDamageKind.Poison}</option>
                        <option value={WeaponDamageKind.Slashing}>{WeaponDamageKind.Slashing}</option>
                    </select>
                </div>
                <div>
                    <Label style={{ textAlign: "center" }}>Weight</Label>
                    <select
                        className="weapon-weight"
                        value={this.state.weapon.weight}
                        onChange={ev => this.updateState('weight', ev.currentTarget.value)}
                    >
                        <option value={WeaponWeight.Light}>{WeaponWeight.Light}</option>
                        <option value={WeaponWeight.Light}>{WeaponWeight.Heavy}</option>
                    </select>
                </div>
                <div>
                    <Label style={{ textAlign: "center" }}>Handedness</Label>
                    <select
                        className="weapon-handedness"
                        value={this.state.weapon.handedness}
                        onChange={ev => this.updateState('handedness', ev.currentTarget.value)}
                    >
                        <option value={WeaponHandedness.One}>{WeaponHandedness.One}</option>
                        <option value={WeaponHandedness.Two}>{WeaponHandedness.Two}</option>
                        <option value={WeaponHandedness.Versatile}>{WeaponHandedness.Versatile}</option>
                    </select>
                </div>
                <div>
                    <Label style={{ textAlign: "center" }}>Damage</Label>
                    <div className="hit-die">
                        <input
                            type="number"
                            value={this.state.weapon.hitDie[0]}
                            onChange={ev => this.updateState("hitDie", [ev.currentTarget.valueAsNumber, this.state.weapon.hitDie[1]])}
                        />
                        <input
                            type="number"
                            value={this.state.weapon.hitDie[1]}
                            onChange={ev => this.updateState("hitDie", [this.state.weapon.hitDie[0], ev.currentTarget.valueAsNumber])}
                        />
                    </div>
                </div>
                <div>
                    <Label style={{ textAlign: "center" }}>Range</Label>
                    <div>
                        <input
                            type="number"
                            value={this.state.weapon.range.first}
                            onChange={ev => this.updateState('range', new Range(ev.currentTarget.valueAsNumber, this.state.weapon.range.second))}
                        />
                        {this.state.weapon.weaponType == WeaponType.Range
                            ? <input
                                type="number"
                                value={this.state.weapon.range.second || 0}
                                onChange={ev => this.updateState('range', new Range(this.state.weapon.range.first, ev.currentTarget.valueAsNumber))}
                            />
                            : null}
                    </div>
                </div>
                <div>
                    <Label style={{ textAlign: "center" }}>Carry Weight (lbs)</Label>
                    <input
                        className="carry-weight"
                        value={this.state.weapon.carryWeight}
                        type="number"
                        onChange={ev => this.updateState('carryWeight', ev.currentTarget.valueAsNumber)}
                    />
                </div>
                <div>
                    <Label style={{ textAlign: "center" }}>Finesse</Label>
                    <Checkbox
                        defaultChecked={this.state.weapon.isFinesse}
                        onChange={ev => this.updateState('isFinesse', ev.currentTarget.checked)}
                    />
                </div>
                <div>
                    <Button
                        onClick={() => this.props.onComplete(this.state.weapon)}
                    >Save</Button>
                    <Button
                        onClick={() => this.props.onComplete(null)}
                    >Cancel</Button>
                </div>
            </Dialog>
        );
    }

    updateState(key: string, value: any) {
        this.setState((prev, props) => {
            prev.weapon[key] = value;
            return { weapon: prev.weapon }
        });
    }

    keyHandler(ev: KeyboardEvent) {
        switch (ev.key) {
            case 'Escape':
                this.props.onComplete(null);
                window.removeEventListener('keyup', this.cachedHandler);
                delete this.cachedHandler;
                break;
            case 'Enter':
                this.props.onComplete(this.state.weapon);
                window.removeEventListener('keyup', this.cachedHandler);
                delete this.cachedHandler;
                break;
        }
    }
}

interface IMoneyProps {
    wealth: Wealth;
    adjustMoney: (wealth: Wealth) => void;
}

interface IMoneyState {
    updatingMoney: boolean;
}

export class Money extends React.Component<IMoneyProps, IMoneyState> {
    constructor(props) {
        super(props);
        this.state = {
            updatingMoney: false,
        };
    }
    render() {
        let ret = [
            <Box 
                className="money"
                key="money"
                padding="0"
            >
                <ListView
                    padding="0px"
                >
                    <ListViewHeader>
                        <Text
                            style={{
                                fontWeight: 'bold',
                            }}
                        >Money</Text>
                    </ListViewHeader>
                    <MoneyRow
                        name="copper"
                        value={this.props.wealth.copper}
                    />
                    <MoneyRow
                        name="silver"
                        value={this.props.wealth.silver}
                    />
                    <MoneyRow
                        name="silver"
                        value={this.props.wealth.silver}
                    />
                    <MoneyRow
                        name="electrum"
                        value={this.props.wealth.electrum}
                    />
                    <MoneyRow
                        name="gold"
                        value={this.props.wealth.gold}
                    />
                    <MoneyRow
                        name="platinum"
                        value={this.props.wealth.platinum}
                    />
                    <Button
                        onClick={() => this.updateMoney()}
                    >edit
                    </Button>
                </ListView>
            </Box>
        ];
        if (this.state.updatingMoney) {
            ret.push(<MoneyAdjuster
                key="money-adjuster"
                currentWealth={this.props.wealth}
                onComplete={wealth => this.finishUpdatingMoney(wealth)}
            />)
        }
        return ret;
    }
    updateMoney() {
        this.setState({ updatingMoney: true })
    }

    finishUpdatingMoney(newValue: Wealth) {
        this.setState((prev, props) => {
            return { updatingMoney: false }
        }, () => {
            this.props.adjustMoney(newValue)
        });
    }
}

interface IMoneyRowProps {
    value: number;
    name: string;
}

interface IMoneyRowState {

}

export class MoneyRow extends React.Component<IMoneyRowProps, IMoneyRowState> {
    constructor(props: IMoneyRowProps) {
        super(props);
    }
    render() {
        return (
            <ListViewRow className="money-unit"
                padding={2}
                style={{
                    background: 'rgba(0,0,0,0.04)'
                }}
            >
                <Label 
                    className="unit-value"
                    style={{
                        width: '30px',
                        textAlign: 'right',
                    }}
                >{this.props.value}</Label>
                <Label className="unit-unit">{this.props.name}</Label>
            </ListViewRow>
        );
    }
}

interface IMoneyAdjusterProps {
    currentWealth: Wealth;
    onComplete: (wealth: Wealth) => void;
}

interface IMoneyAdjusterState {
    currentWealth: Wealth;
    updatedWealth: Wealth;
    updatedWealthMul: number;
}

export class MoneyAdjuster extends React.Component<IMoneyAdjusterProps, IMoneyAdjusterState> {
    private cachedHandler;
    constructor(props: IMoneyAdjusterProps) {
        super(props);
        this.state = {
            currentWealth: props.currentWealth,
            updatedWealth: new Wealth(0, 0, 0, 0, 0),
            updatedWealthMul: 1,
        };
        this.cachedHandler = this.keyHandler.bind(this);
        window.addEventListener('keyup', this.cachedHandler);
    }
    render() {
        return (
            <Dialog className="money-adjuster"
                padding="5px"
                style={{
                    position: 'absolute',
                    zIndex: 100,
                }}
            >
                <Box className="current-wealth inputs"
                    padding="0px"
                    style={{
                        display: 'flex',
                        flexFlow: 'column',
                        marginBottom: 0,
                    }}
                    margin="0px"
                >
                    <Label>Update Money</Label>
                    <div
                        style={{
                            display: 'flex',
                            flexFlow: 'row'
                        }}
                    >
                        <div className="input-pair">
                            <Label>Copper</Label>
                            <TextInput
                                focusRing={false}
                                defaultValue={this.state.currentWealth.copper}
                                onChange={ev => this.updateCurrentWealth('copper', ev.currentTarget.valueAsNumber || 0)}
                                type="number"
                            />
                        </div>
                        <div className="input-pair">
                            <Label>Silver</Label>
                            <TextInput
                                focusRing={false}
                                defaultValue={this.state.currentWealth.silver}
                                onChange={ev => this.updateCurrentWealth('silver', ev.currentTarget.valueAsNumber || 0)}
                                type="number"
                            />
                        </div>
                        <div className="input-pair">
                            <Label>Electrum</Label>
                            <TextInput
                                focusRing={false}
                                defaultValue={this.state.currentWealth.electrum}
                                onChange={ev => this.updateCurrentWealth('electrum', ev.currentTarget.valueAsNumber || 0)}
                                type="number"
                            />
                        </div>
                        <div className="input-pair">
                            <Label>Gold</Label>
                            <TextInput
                                focusRing={false}
                                defaultValue={this.state.currentWealth.gold}
                                onChange={ev => this.updateCurrentWealth('gold', ev.currentTarget.valueAsNumber || 0)}
                                type="number"
                            />
                        </div>
                        <div className="input-pair">
                            <Label>Platinum</Label>
                            <TextInput
                                focusRing={false}
                                defaultValue={this.state.currentWealth.platinum}
                                onChange={ev => this.updateCurrentWealth('platinum', ev.currentTarget.valueAsNumber || 0)}
                                type="number"
                            />
                        </div>
                    </div>
                </Box>
                <Box className="updated-wealth inputs" padding="0px" margin="0px">
                    <Label>Add Money</Label>
                    <div
                        style={{
                            display: 'flex',
                            flexFlow: 'row'

                        }}
                    >
                        <div className="input-pair">
                            <Label>Copper</Label>
                            <TextInput
                                focusRing={false}
                                defaultValue={this.state.updatedWealth.copper}
                                onChange={ev => this.updateUpdatedWealth('copper', ev.currentTarget.valueAsNumber || 0)}
                                type="number"
                            />
                        </div>
                        <div className="input-pair">
                            <Label>Silver</Label>
                            <TextInput
                                focusRing={false}
                                defaultValue={this.state.updatedWealth.silver}
                                onChange={ev => this.updateUpdatedWealth('silver', ev.currentTarget.valueAsNumber || 0)}
                                type="number"
                            />
                        </div>
                        <div className="input-pair">
                            <Label>Electrum</Label>
                            <TextInput
                                focusRing={false}
                                defaultValue={this.state.updatedWealth.electrum}
                                onChange={ev => this.updateUpdatedWealth('electrum', ev.currentTarget.valueAsNumber || 0)}
                                type="number"
                            />
                        </div>
                        <div className="input-pair">
                            <Label>Gold</Label>
                            <TextInput
                                focusRing={false}
                                defaultValue={this.state.updatedWealth.gold}
                                onChange={ev => this.updateUpdatedWealth('gold', ev.currentTarget.valueAsNumber || 0)}
                                type="number"
                            />
                        </div>
                        <div className="input-pair">
                            <Label>Platinum</Label>
                            <TextInput
                                focusRing={false}
                                defaultValue={this.state.updatedWealth.platinum}
                                onChange={ev => this.updateUpdatedWealth('platinum', ev.currentTarget.valueAsNumber || 0)}
                                type="number"
                            />
                        </div>
                        <div className="input-pair">
                            <Label>Multiplier</Label>
                            <TextInput
                                focusRing={false}
                                defaultValue={this.state.updatedWealthMul}
                                onChange={ev => this.setState({ updatedWealthMul: ev.currentTarget.valueAsNumber || 0 })}
                                type="number"
                            />
                        </div>
                    </div>
                </Box>
                <div className="buttons">
                    <button
                        onClick={() => this.props.onComplete(this.state.currentWealth.add(this.state.updatedWealth.mul(this.state.updatedWealthMul)))}
                    >Save</button>
                    <button
                        onClick={() => this.props.onComplete(this.props.currentWealth)}
                    >Cancel</button>
                </div>
            </Dialog>
        );
    }

    updateCurrentWealth(unit: string, value: number) {
        if (Number.isNaN(value)) {
            value = 0;
        }
        this.setState((prev, props) => {
            prev.currentWealth[unit] = value;
            prev.currentWealth.balance();
            return {
                currentWealth: prev.currentWealth,
                updatedWealth: new Wealth(0, 0, 0, 0, 0),
            };
        });
    }
    updateUpdatedWealth(unit: string, value: number) {
        if (Number.isNaN(value)) {
            value = 0;
        }
        this.setState((prev, props) => {
            prev.updatedWealth[unit] = value;
            return {
                currentWealth: props.currentWealth,
                updatedWealth: prev.updatedWealth,
            };
        });
    }

    keyHandler(ev: KeyboardEvent) {
        switch (ev.key) {
            case "Escape":
                window.removeEventListener('keyup', this.cachedHandler);
                this.props.onComplete(this.props.currentWealth);
                delete this.cachedHandler;
                break;
            case "Enter":
                window.removeEventListener('keyup', this.cachedHandler);
                this.props.onComplete(this.state.currentWealth.add(this.state.updatedWealth.mul(this.state.updatedWealthMul)))
                delete this.cachedHandler;
                break;
        }
    }
}

interface IProficiencyProps {
    proficiency: string[];
    languages: string[];
}

interface IProficiencyState {

}

export class Proficiency extends React.Component<IProficiencyProps, IProficiencyState> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Box className="proficiency" padding="0px">
                <ListView>
                    <ListViewSection
                        header={<ListViewSectionHeader>
                            <Label bold>Proficiency</Label>
                        </ListViewSectionHeader>}

                    >
                        {this.props.proficiency.map((s, i) => {
                            return (
                                <ListViewRow key={`prof-${i}`} padding="0px"><Text className="prof-value" >{s}</Text></ListViewRow>
                            )
                        })}
                    </ListViewSection>
                    <ListViewSection
                        header={<ListViewSectionHeader>
                            <Label bold>Languages</Label>
                        </ListViewSectionHeader>}
                    >
                        {this.props.languages.map((l, i) => (<ListViewRow padding="0px" key={`lang-${i}`}><Text>{l}</Text></ListViewRow>))
                        }
                    </ListViewSection>
                </ListView>
            </Box>
        );
    }
}

interface INotesProps {
    classDetails: ClassDetails;
    optionsSelected: (name: string, idx: number) => void;
}

interface INotesState {
    selectedNote: number;
}

export class Notes extends React.Component<INotesProps, INotesState> {
    constructor(props) {
        super(props);
        this.state = {
            selectedNote: -1,
        }
    }
    render() {
        return (
            <Box className="notes" padding="0px">
                {this.state.selectedNote < 0 ?
                    <NoteList
                        classDetails={this.props.classDetails}
                        noteSelected={idx => this.setState({selectedNote: idx})}
                    /> 
                : <NoteInfo
                    note={this.props.classDetails.getAllAvailableFeatures()[this.state.selectedNote]}
                    onBack={() => this.setState({selectedNote: -1})}
                    optionsSelected={(name, idx) => this.selectedFeature(name, idx)}
                />
                }
            </Box>
        );
    }

    selectedFeature(name: string, idx: number) {
        this.setState({selectedNote: -1});
        this.props.optionsSelected(name, idx);
    }
}

interface INoteListProps {
    classDetails: ClassDetails;
    noteSelected: (idx: number) => void;
}

interface INoteListState {

}

export class NoteList extends React.Component<INoteListProps, INoteListState> {
    constructor(props: INoteListProps) {
        super(props);
    }
    render() {
        let features = this.props.classDetails.getAllAvailableFeatures();
        return (
            <ListView>
                    <ListViewHeader>
                        <Text className="notes-header">Notes</Text>
                    </ListViewHeader>
                    {features.map((n, i) => {
                        let selection = this.props.classDetails.selectedFeatures.get(n.name);
                        let needsSelection = selection && selection.idx < 0 && selection.minLevel <= this.props.classDetails.level;
                        let desc;
                        if (needsSelection || !selection) {
                            desc = n.shortDesc;
                        } else {
                            desc = n.options[selection.idx].name;
                        }
                        return (
                            <ListViewRow 
                                key={`note-${i}`} 
                                style={{
                                    borderBottom: '1px solid rgba(0,0,0,0.3)',
                                }} 
                                padding="0"
                                padding-left="5"
                                onClick={() => this.props.noteSelected(i)}
                                title={needsSelection ? 'Select an option' : ''}
                            >
                                <Text className="note-value">
                                    <span
                                        style={{
                                            fontWeight: 'bold',
                                            marginRight: 5,
                                            color: needsSelection ? 'red' : 'inherit',
                                        }}
                                    >
                                        {n.name}
                                    </span>
                                    <span
                                        style={{
                                            marginRight: 5,
                                        }}
                                    >-</span>
                                    <span>{desc}</span>
                                </Text>
                            </ListViewRow>
                            );
                        })}
                    </ListView>
        );
    }
}

interface INoteInfoProps {
    note: ClassFeature;
    onBack: () => void;
    optionsSelected: (name: string, idx: number) => void;
}

interface INoteInfoState {

}

export class NoteInfo extends React.Component<INoteInfoProps, INoteInfoState> {
    constructor(props: INoteInfoProps) {
        super(props);
    }
    render() {
        let inner = [
            <ListViewSection
                key="main-note-info"
            >
                    <ListViewSectionHeader>
                        <Button
                            onClick={() => this.props.onBack()}
                            style={{
                                marginRight: 5,
                                textAlign: 'center',
                                height: 20,
                                width: 20,
                            }}
                            padding="0 0 0 3px"
                        >
                            <i style={{
                                fontFamily: 'Material Icons',
                                fontSize: 10,
                                lineHeight: 1,
                            }}
                            >arrow_back_ios</i>
                        </Button>
                        <Text className="notes-header">Notes</Text>
                    </ListViewSectionHeader>
                    <ListViewRow
                        style={{
                            borderBottom: '1px solid rgba(0,0,0,0.3)',
                        }} 
                        padding="0"
                        padding-left="5"
                    >
                        <Text
                            style={{
                                fontWeight: 'bold',

                            }}
                        >
                        {this.props.note.name}
                        </Text>
                    </ListViewRow>
                    <ListViewRow 
                        padding="0"
                        padding-left="5"
                    >
                        <Text 
                            className="note-value"
                        >
                            {this.props.note.shortDesc}
                        </Text>
                    </ListViewRow>
                    <ListViewRow
                        padding="0"
                        padding-left="5"
                    >
                        <Text>
                            {this.props.note.longDesc}
                        </Text>
                    </ListViewRow>
                </ListViewSection>
        ];
        if (this.props.note.options) {
            inner.push(
                <ListViewSection
                    key="feature-option-list"
                >
                    <ListViewSectionHeader>
                        <Text>Choose an Option</Text>
                    </ListViewSectionHeader>
                    {this.props.note.options.map((o, i) => {
                        return (
                            <ListViewRow
                                key={`note-option${o.name}-${i}`}
                                padding="0px"
                                padding-left="5"
                            >
                                <Text
                                    style={{
                                        borderBottom: '1px solid rgba(0,0,0,0.3)'
                                    }}
                                >
                                    <p
                                        style={{
                                            padding: 0,
                                            fontWeight: 'bold',
                                            margin: 0,
                                        }}
                                    >
                                        {o.name}
                                    </p>
                                    <p
                                        style={{
                                            padding: 0,
                                            margin: 0,
                                        }}
                                    >
                                        {o.shortDesc}
                                    </p>
                                    <p
                                        style={{
                                            padding: 0,
                                            margin: 0,
                                        }}
                                    >
                                        {o.longDesc}
                                    </p>
                                </Text>
                                <Button
                                    onClick={() => this.props.optionsSelected(this.props.note.name, i)}
                                >Choose</Button>
                            </ListViewRow>
                        );
                    })}
                </ListViewSection> 
            );
        }
        return (
            <ListView>
                {inner}
            </ListView>
        );
    }
}

interface IItemsListProps {
    magicItems: MagicItem[];
    expendables: ExpendableItem[];
    adjustExpendables: (newExpendables: ExpendableItem[]) => void;
    adjustMagics: (newMagics: MagicItem[]) => void;
}

interface IItemsListState {
    addingItem: boolean;
}

export class ItemsList extends React.Component<IItemsListProps, IItemsListState> {
    constructor(props: IItemsListProps) {
        super(props);
        this.state = {
            addingItem: false,
        };
    }
    render() {
        let ret = [
            <Box 
                className="items-list"
                key="items-list"
                style={{

                }}
                padding="0px"
            >
            <ListView>
                    <ListViewSection className="magic-list item-list">
                        <ListViewSectionHeader>
                            <Label bold>Magic Items</Label>
                        </ListViewSectionHeader>
                        {this.props.magicItems.map((item, i) => {
                            return <ListViewRow padding={0} key={`magic-item-${i}`} className="magic-list-item">
                                <Text><span style={{ fontWeight: 'bold' }}>{`${item.name}`}</span>{` - ${item.buf}`}</Text>
                                <Button
                                    onClick={() => this.removeItem(i, true)}
                                    padding="0px"
                                    width={19}
                                    height={19}
                                    style={{
                                        lineHeight: '14px',
                                        color: 'red',
                                    }}
                                >
                                    <i style={{ fontFamily: 'Material Icons' }}>delete</i>
                                </Button>
                            </ListViewRow>
                        })}
                    </ListViewSection>
                <ListViewSection className="expendable-list item-list">
                        <ListViewSectionHeader>
                            <Label bold>Expendable Items</Label>
                        </ListViewSectionHeader>
                        {this.props.expendables.map((item, i) => {
                            return <ListViewRow padding={0} key={`expendable-item-${i}`} className="magic-list-item">
                                <Text padding="0px">{`${item.quantity}x`}<span style={{ fontWeight: 'bold' }}>{`${item.name}`}</span>{` - ${item.desc}`}</Text>
                                <Button
                                    onClick={() => this.adjustExpendables(i, item.quantity + 1)}
                                    padding="0px"
                                    width={19}
                                    height={19}
                                    style={{
                                        lineHeight: '14px'
                                    }}
                                >+</Button>
                                <Button
                                    onClick={() => this.adjustExpendables(i, item.quantity - 1)}
                                    padding="0px"
                                    width={19}
                                    height={19}
                                    style={{
                                        lineHeight: '14px'
                                    }}
                                >-</Button>
                                <Button
                                    onClick={() => this.removeItem(i, false)}
                                    padding="0px"
                                    width={19}
                                    height={19}
                                    style={{
                                        lineHeight: '14px',
                                        color: 'red',
                                    }}
                                >
                                    <i style={{ fontFamily: 'Material Icons' }}>delete</i>
                                </Button>
                            </ListViewRow>
                        })}
                    </ListViewSection>
            </ListView>
            <Button
                onClick={() => this.setState({ addingItem: true })}
            >add</Button>
        </Box>];
        if (this.state.addingItem) {
            ret.push(<NewItem
                key="new-item"
                newItemComplete={(newItem, magic) => this.addNewItem(newItem, magic)}
            />);
        }
        return ret;
    }

    adjustExpendables(idx: number, newQty: number) {
        let newExpendables = this.props.expendables.map((e, i) => {
            if (i == idx) {
                return new ExpendableItem(
                    newQty,
                    e.name,
                    e.desc
                )
            }
            return e;
        });
        this.props.adjustExpendables(newExpendables);
    }
    addNewItem(item: MagicItem | ExpendableItem, magic: boolean) {
        this.setState({ addingItem: false }, () => {
            if (!item) return;
            if (magic) {
                let newMagics = this.props.magicItems.map(m => m);
                newMagics.push(item as MagicItem);
                this.props.adjustMagics(newMagics);
            } else {
                let newExpendables = this.props.expendables.map(e => e)
                newExpendables.push(item as ExpendableItem);
                this.props.adjustExpendables(newExpendables);
            }
        });
    }
    removeItem(idx: number, magic: boolean) {
        if (magic) {
            let newMagics = this.props.magicItems.map(m => m);
            newMagics.splice(idx, 1);
            this.props.adjustMagics(newMagics);
        } else {
            let newExps = this.props.expendables.map(e => e);
            newExps.splice(idx, 1);
            this.props.adjustExpendables(newExps);
        }
    }
}

interface INewItemProps {
    newItemComplete: (item: MagicItem | ExpendableItem, isMagic?: boolean) => void;
}

interface INewItemState {
    magic: boolean;
    pendingQty: number;
    pendingName: string;
    pendingDesc: string;
}

export class NewItem extends React.Component<INewItemProps, INewItemState> {
    private cachedHandler;
    constructor(props: INewItemProps) {
        super(props);
        this.state = {
            magic: false,
            pendingDesc: '',
            pendingName: '',
            pendingQty: 1,
        };
        this.cachedHandler = this.keyHandler.bind(this);
        window.addEventListener('keyup', this.cachedHandler);
    }
    render() {
        return (
            <Dialog className="new-item"
                style={{
                    position: 'absolute',
                }}
            >
                <select
                    value={this.state.magic ? "1" : "0"}
                    onChange={ev => this.setState({ magic: ev.currentTarget.value == "1" })}
                >
                    <option value="0">Expendable</option>
                    <option value="1">Magic</option>
                </select>
                {
                    this.state.magic
                        ? <div className="input-set">
                            <TextInput
                                focusRing={false}
                                value={this.state.pendingName}
                                onChange={ev => this.setState({ pendingName: ev.currentTarget.value })}
                                placeholder="Name"
                                title="Description"
                            />
                            <TextInput
                                focusRing={false}
                                value={this.state.pendingDesc}
                                onChange={ev => this.setState({ pendingDesc: ev.currentTarget.value })}
                                placeholder="Description"
                                title="Description"
                            />
                        </div>
                        : <div className="input-set">
                            <TextInput
                                focusRing={false}
                                value={this.state.pendingQty.toString()}
                                onChange={ev => this.setState({ pendingQty: ev.currentTarget.valueAsNumber })}
                                type="number"
                                title="quantity"
                            />
                            <TextInput
                                focusRing={false}
                                value={this.state.pendingName}
                                onChange={ev => this.setState({ pendingName: ev.currentTarget.value })}
                                placeholder="Name"
                                title="Name"
                            />
                            <TextInput
                                focusRing={false}
                                value={this.state.pendingDesc}
                                onChange={ev => this.setState({ pendingDesc: ev.currentTarget.value })}
                                placeholder="Description"
                                title="Description"
                            />
                        </div>
                }
                <Button
                    onClick={() => this.save()}
                >Save</Button>
                <Button
                    onClick={() => this.props.newItemComplete(null)}
                >Cancel</Button>
            </Dialog>
        );
    }

    save() {
        if (this.state.magic) {
            return this.props.newItemComplete(new MagicItem(this.state.pendingName, this.state.pendingDesc), true);
        }
        this.props.newItemComplete(new ExpendableItem(this.state.pendingQty, this.state.pendingName, this.state.pendingDesc), false);
    }
    keyHandler(ev: KeyboardEvent) {
        switch (ev.key) {
            case "Escape":
                this.props.newItemComplete(null)
                window.removeEventListener('keyup', this.cachedHandler);
                delete this.cachedHandler;
                break;
            case "Enter":
                this.save();
                window.removeEventListener('keyup', this.cachedHandler);
                delete this.cachedHandler;
                break;
        }
    }
}

export function formatClass(name: string): string {
    return name.split(' ').map(w => w.toLowerCase()).join('-')
}