import * as React from 'react';
import {
    Character, Save, Weapon, Wealth, Alignment, MagicItem, ExpendableItem, 
    WeaponType, WeaponKind, WeaponDamageKind, WeaponWeight, WeaponHandedness,
} from '../models/character';
import { Range } from '../models/range';
import { AbilityScores, AbilityScore, AbilityKind } from '../models/abilityScore';

import { ListView, ListViewHeader, ListViewRow } from './common/ListView';
import { SkillRadio as Radio } from './common/radio';
import { Class, ClassKind, DEFAULT_BONUS_ABILITY_SCORES } from '../models/class';
import { Background } from '../models/background';
import { SkillKind } from '../models/skills';
import { SpellsList } from './spellsList';
import { ClassFeature, IClassSpellSlots, Data } from '../services/data';
import { Spell } from '../models/spells';
import { ClassDetails } from '../models/classDetails';
import { Modal } from './common/Modal';
import { SpellsInfo } from './spellsInfo';
import { CasterInfo } from '../models/casterInfo';

interface ICharacterSheetProps {
    character: Character;
    adjustDamage: (newValue: number) => void;
    adjustTempHP: (newValue: number) => void;
    adjustExp: (newValue: number) => void;
    adjustMoney: (newValue: Wealth) => void;
    adjustScores: (newValue: AbilityScore[]) => void;
    adjustExpendables: (newExpends: ExpendableItem[]) => void;
    adjustMagics: (newMagics: MagicItem[]) => void;
    adjustWeapons: (newWeapons: Weapon[]) => void;
    adjustInspiration: (newValue: number) => void;
    classFeatureOptionSelected: (name: string, idx: number) => void;
    adjustClassSkills: (newSkills: SkillKind[]) => void;
    adjustExpertise: (newSkills: SkillKind[]) => void;
    saveKnownSpells: (spells: Spell[]) => Promise<void>;
    spellList: Spell[];
}

interface ICharacterSheetState {
}

export class CharacterSheet extends React.Component<ICharacterSheetProps, ICharacterSheetState> {
    constructor(props: ICharacterSheetProps) {
        super(props);
        this.state = {
        }
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
            <SkillsList 
                key="skills-list" 
                skills={this.props.character.rawSkills} 
                newSkillsAvailable={this.props.character.skillsModNeeded()}
                newSkillsOptions={this.props.character.availableSkillsToAdd()}
                skillsUpdated={skills => this.props.adjustClassSkills(skills)}
                expertiseRequired={this.props.character.characterClass.expertise.filter(s => !s).length}
                expertiseUpdated={skills => this.props.adjustExpertise(skills)}
            />,
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
            <Features
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
                <SpellsInfo
                    key="spells-info"
                    abilityModifier={this.props.character.castorAbilityModifier()}
                    cantripsKnown={this.props.character.characterClass.casterInfo.cantripCount}
                    spellsKnown={this.props.character.characterClass.casterInfo.spellCount}
                    casterLevel={this.props.character.characterClass.level}
                    classKind={this.props.character.characterClass.name}
                    profBonus={this.props.character.proficiencyBonus}
                    dcBase={8}
                    dailyBreakdown={this.props.character.characterClass.casterInfo.spellSlots}
                />
            );
            children.push(
                <SpellsList
                    key="spells-list"
                    title={`${this.props.character.characterClass.name} Spells`}
                    spells={this.props.spellList}
                    casterInfo={this.props.character.characterClass.casterInfo}
                    saveKnownSpells={async spells => await this.props.saveKnownSpells(spells)}
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
            <div
                className="character-name-container box"
            >
                <span
                    className="character-name-span"
                    style={{
                        fontWeight: 'bold',
                        fontSize: '18pt',
                    }}
                >{this.props.name}</span>
                <div className="inspiration-container">
                    <span
                        style={{
                            fontSize: 16,
                        }}
                    >{`Inspiration ${this.props.inspiration}`}</span>
                    <button
                        onClick={() => this.props.inspirationChanged(this.props.inspiration + 1)}
                        className="up"
                        style={{
                            padding: '0px'
                        }}
                    >
                        <i style={{ fontFamily: 'Material Icons', lineHeight: 1 }}>expand_less</i>
                    </button>
                    <button style={{
                            padding: '0px'
                        }} 
                    onClick={() => this.props.inspirationChanged(this.props.inspiration - 1)} className="down">
                        <i style={{ fontFamily: 'Material Icons', lineHeight: 1 }}>expand_more</i>
                    </button>
                </div>
            </div>
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
            <div
                className="character-description box"
                key="character-desc"
            >
                <div className="character-class desc-part">
                    <span 
                        className="character-class-value desc-value"
                    >{this.props.name}</span>
                    <hr className="desc-divider" />
                    <span
                        color="rgba(0,0,0,0.5)"
                        className="character-class-label desc-label"
                    >class</span>
                </div>
                <div className="class-level desc-part">
                    <span className={`class-level-value desc-value`}>{this.props.level.toString()}</span>
                    <hr className="desc-divider" />
                    <span
                        style={{
                            color: "rgba(0,0,0,0.5)"
                         }} 
                         className="class-level-label desc-label"
                    >level</span>
                </div>
                <div className="character-background desc-part">
                    <span className="background-value desc-value" >{this.props.background.kind}</span>
                    <hr className="desc-divider" />
                    <span
                        style={{
                            color: "rgba(0,0,0,0.5)"
                         }} 
                        className="background-label desc-label">background</span>
                </div>
                <div className="character-race desc-part">
                    <span className="race-value desc-value" >{this.props.race}</span>
                    <hr className="desc-divider" />
                    <span
                        style={{
                            color: "rgba(0,0,0,0.5)"
                         }} 
                        className="race-label desc-label">race</span>
                </div>
                <div className="character-alignment desc-part">
                    <span className="alignment-value desc-value" >{this.props.alignment.toString()}</span>
                    <hr className="desc-divider" />
                    <span
                        style={{
                            color: "rgba(0,0,0,0.5)"
                         }}  className="alignment-label desc-label">alignment</span>
                </div>
                <div className="character-experience desc-part"
                    onClick={() => this.adjustExperience()}
                    title={`next level in ${this.props.expToNextLevel} more exp`}
                >
                    <span className="experience-value desc-value" >{this.props.experience.toString()}</span>
                    <hr className="desc-divider" />
                    <span
                        style={{
                            color: "rgba(0,0,0,0.5)"
                         }} className="experience-label desc-label">experience</span>
                </div>
            </div>
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
            <Modal className="experience-adjuster">
                <span style={{ textAlign: "center" }}>New Experience</span>
                <input
                    type="number"
                    value={this.state.newExp.toString()}
                    onChange={ev => this.setState({ newExp: parseInt(ev.currentTarget.value), currentExp: this.props.currentExp })}
                />
                <span style={{ textAlign: "center" }}>Current Experience</span>
                <input
                    type="number"
                    value={this.state.currentExp.toString()}
                    onChange={ev => this.setState({ currentExp: parseInt(ev.currentTarget.value), newExp: 0 })}
                />
                <div className="button-container">
                    <button onClick={() => this.props.onComplete(this.state.currentExp + this.state.newExp)}>Save</button>
                    <button onClick={() => this.props.onComplete(this.props.currentExp)}>Cancel</button>
                </div>
            </Modal>
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
    scores: AbilityScore[];
    pendingBonuses: number;
    updateScores: (scores: AbilityScore[]) => void;
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
            <div
                className={`ability-scores-column box ${this.props.pendingBonuses > 0 ? 'alert' : ''}`}
                style={{
                    padding: "5px",
                }}
                onClick={() => {
                    if (this.props.pendingBonuses > 0 && !this.state.editingScores) {
                        this.editScores();
                    }
                }}
                title={this.props.pendingBonuses > 0 ? `${this.props.pendingBonuses} additional ability score values available` : 'ability scores'}
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
                {this.state.editingScores
                    ? (
                        <AbilityScoreAdjustor
                            scoresSaved={scores => this.completeEditingScores(scores)}
                            scores={this.props.scores}
                            maxAddition={this.props.pendingBonuses}
                        />
                    )
                    : null
                }
            </div>
        );
    }

    editScores() {
        this.setState({ editingScores: true });
    }

    completeEditingScores(scores: AbilityScore[]) {
        this.setState({ editingScores: false }, () => {
            if (!scores) return;
            this.props.updateScores(scores);
        });
    }
}

interface IAbilityScoreAdjustorProps {
    scores: AbilityScore[];
    maxAddition: number;
    scoresSaved: (scores: AbilityScore[]) => void;
}

interface IAbilityScoreAdjustorState {
    abilityScores: AbilityScore[];
}

export class AbilityScoreAdjustor extends React.Component<IAbilityScoreAdjustorProps, IAbilityScoreAdjustorState> {
    private cachedHandler;
    constructor(props: IAbilityScoreAdjustorProps) {
        super(props);
        this.state = {
            abilityScores: AbilityScores.Empty().map(s => s),
        };
        this.cachedHandler = this.keyHandler.bind(this);
        window.addEventListener('keyup', this.cachedHandler);
    }
    render() {
        let remaining = this.props.maxAddition - this.state.abilityScores.reduce((acc, s) => acc + s.value, 0);
        return (
            <Modal
                className="ability-score-adjustor"
            >
                <span className="remaining-points">{remaining} Remaining</span>
                <div className="scores-list box">
                    {this.state.abilityScores.map(score => {
                        return (
                            <div 
                                key={`adjusting-score-${score.kind}`} 
                                className={`box input-group ${score.kind.toLowerCase()}`}>
                                <span style={{ textAlign: "center" }}>{score.kind}</span>
                                <input
                                    value={score.value.toString()}
                                    type="number"
                                    onChange={ev => this.updateAbilities(score.kind, ev.currentTarget.valueAsNumber)}
                                />
                            </div>
                        );
                    })
                    }
                </div>
                <div>
                    <button onClick={() => this.props.scoresSaved(this.state.abilityScores)}>Save</button>
                    <button onClick={() => this.props.scoresSaved(null)}
                    >Cancel</button>
                </div>
            </Modal>
        );
    }

    updateAbilities(kind: AbilityKind, newValue: number) {
        this.setState((prev, props) => {
            let originalScore = props.scores.find(s => s.kind === kind).value;
            let newTotal = prev.abilityScores.reduce((acc, score) => {
                if (score.kind === kind) {
                    return acc + newValue
                }
                return acc + score.value
            }, 0);
            let originalTotal = props.scores.reduce((acc, score) => acc + score.value, 0);
            let abilityScores = prev.abilityScores;
            if (newValue >= 0 && newTotal <= props.maxAddition) {
                abilityScores = abilityScores.map(s => {
                    if (s.kind === kind) {
                        return new AbilityScore(newValue, kind);
                    }
                    return s;
                });
            }
            return {
                abilityScores
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
            <div
                className="ability-score-container box"
            >
                <label style={{lineHeight: '1'}} className="ability-score-name">{this.props.name.substr(0, 3).toUpperCase()}</label>
                <span style={{lineHeight: '1'}} className="ability-score-value">{this.props.score.value}</span>
                <span style={{lineHeight: '1'}} className="ability-modifier-value">{this.props.score.modifier}</span>
            </div>
        )
    }
}

interface ISavesProps {
    saves: Save[];
}

export class Saves extends React.Component<ISavesProps, {}> {
    render() {
        return (
            <div className="saves-list box">
                {this.props.saves.map(save => {
                    return (
                        <SkillContainer key={save.kind} name={save.kind} score={save.value} enabled={save.enabled} />
                    )
                })}
            </div>
        )
    }
}

interface ISkillsListProps {
    skills: [SkillKind, number, boolean][];
    newSkillsAvailable: number;
    newSkillsOptions: SkillKind[];
    skillsUpdated: (skills: SkillKind[]) => void;
    expertiseUpdated: (skills: SkillKind[]) => void;
    expertiseRequired: number;
}

interface ISkillsListState {
    editingSkills: boolean;
}

export class SkillsList extends React.Component<ISkillsListProps, ISkillsListState> {
    constructor(props) {
        super(props);
        this.state = {
            editingSkills: false,
        };
    }
    render() {
        let pendingSkills = this.props.newSkillsAvailable > 0;
        let expertise = this.props.expertiseRequired > 0;
        let title;
        let options = [];
        let max;
        if (pendingSkills) {
            title = 'You have new skills to choose';
            options = this.props.newSkillsOptions;
            max = this.props.newSkillsAvailable;
        } else if (expertise) {
            title = 'You have new expertise to select';
            options = this.props.skills.filter(s => s[2]).map(s => s[0]);
            max = this.props.expertiseRequired;
        }
        return [
            <div 
                key="skills-list" 
                className={`skills-list box ${pendingSkills || expertise ? 'alert' : ''}`}
                title={title}
                onClick={() => {
                    if ((pendingSkills || expertise) && !this.state.editingSkills) {
                        this.setState({editingSkills: true});
                    }
                }}
            >
                {this.props.skills.map(skill => {
                    return (<SkillContainer key={`skill-${skill[0]}`} name={skill[0]} score={skill[1]} enabled={skill[2]} />)
                })}
            </div>,
            this.state.editingSkills ? 
            <SkillAdjustor
                key="skills-adjuster"
                maxAdditional={max}
                skills={options}
                onComplete={skills => this.skillsUpdated(expertise, skills)}
                expertise={expertise}
            />
            : null,
        ];
    }

    skillsUpdated(expertise: boolean, skills?: SkillKind[]) {
        this.setState({editingSkills: false}, () => {
            if (expertise && skills) {
                this.props.expertiseUpdated(skills);
            } else if (skills) {
                this.props.skillsUpdated(skills);
            }
        });
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
                <Radio 
                    label={`${this.props.score} ${this.props.name}`}
                    checked={this.props.enabled}
                    disabled={false}
                    title={this.props.name}
                    onClick={() => {}}
                />
            </div>
        )
    }
}

interface ISkillAdjustorProps {
    maxAdditional: number;
    skills: SkillKind[];
    onComplete: (skills?: SkillKind[]) => void;
    expertise: boolean;
}

interface ISkillAdjustorState {
    selected: Set<SkillKind>;
}

export class SkillAdjustor extends React.Component<ISkillAdjustorProps, ISkillAdjustorState> {
    constructor(props: ISkillAdjustorProps) {
        super(props);
        this.state = {
            selected: new Set(),
        };
    }
    render() {
        return (
            <Modal className="skills-adjustor box">
                <span className="skills-adjustor-title">Remaining: {this.props.maxAdditional - this.state.selected.size}</span>
                {this.props.skills.map(s => 
                    <span 
                        className={`skill-adjustor-option ${this.state.selected.has(s) ? 'selected' : ''}`} 
                        key={`skill-adjustor-${s}`}
                        onClick={() => this.skillClicked(s)}
                    >{s}</span>
                )}
                <button
                    onClick={() => this.done(false)}
                >Cancel</button>
                <button
                    onClick={() => this.done(true)}
                >Save</button>
            </Modal>
        );
    }

    skillClicked(kind: SkillKind) {
        this.setState((prev, props) => {
            if (prev.selected.has(kind)) {
                prev.selected.delete(kind);
            } else if (prev.selected.size < props.maxAdditional) {
                prev.selected.add(kind);
            }
            return {selected: prev.selected}
        });
    }
    done(withValue: boolean) {
        if (this.state.selected.size < this.props.maxAdditional) {
            return;
        }
        if (withValue) {
            let arr = Array.from(this.state.selected);
            this.props.onComplete(arr)
        } else {
            this.props.onComplete();
        }
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
            <div
                className="passive-wisdom"
                style={{
                    padding: 1,
                    height: 20
                }}
            >
                <span>{this.props.value}</span><span>passive perception</span>
            </div>
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
            <div
                className="defences box"
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
            </div>
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
            <div
                className={`defence-container box ${cls}`}
            >
                <span className={`defence-name ${cls}`}>{this.props.name}</span>
                {this.props.valueChanged ?
                    <div className="adjustable-inner">
                        <span className={`defence-value ${cls}`}>{this.props.value}</span>
                        <button
                            className="adjust-up"
                            onClick={() => this.props.valueChanged(this.props.value + 1)}
                            style={{
                                fontFamily: 'Material Icons',
                                lineHeight: 1,
                                padding: '0px',
                            }}
                            >expand_less</button>
                        <button
                            className="adjust-down"
                            onClick={() => this.props.valueChanged(this.props.value - 1)}
                            style={{
                                fontFamily: 'Material Icons',
                                padding: '0px',
                                lineHeight: 1,
                            }}
                        >expand_more</button>
                    </div>
                    : <span className={`defence-value ${cls}`}>{this.props.value}</span>}
            </div>
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
            <div
                className="defence-container hit-die box"
            >
                <label className="defence-name">Hit Dice</label>
                <div className="defence-value" key={`hit-die-${c.name}-${c.level}`}>
                    <span>{`d${c.hitDie}`}:</span><span>{c.level}</span>
                </div>
            </div>
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
            <div
                key="weapons"
                className="weapons box"
                style={{
                    display: 'flex',
                    flexFlow: 'column',
                }}
            >
                <ListView
                    className="weapon-list"
                    headerText="Weapons"
                >
                    {this.props.weapons.map((w, i) => (<WeaponContainer
                        key={`weapon-${i}`}
                        weapon={w}
                        onDeleteClicked={() => this.removeWeapon(i)}
                    />))}
                </ListView>
                <button
                style={{
                    padding: '0px',
                }}
                    onClick={() => this.setState({ addingWeapon: true })}
                >add</button>

            </div>,
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
                style={{
                    flex: '0',
                    background: 'rgba(0,0,0,0.04)',
                    display: 'grid',
                    gridTemplateRows: '',
                    justifyContent: 'space-between',
                    height: 20,
                }}
            >
                <span className="weapon-name">{this.props.weapon.name}</span>
                <span className="weapon-dmg">{`${this.props.weapon.hitDie[0]}d${this.props.weapon.hitDie[1]}`}</span>
                <span className="weapon-misc">{this.props.weapon.miscString()}</span>
                <button
                    onClick={() => this.props.onDeleteClicked()}
                    style={{
                        padding: "0px",
                        height: 19,
                        width: 19,
                    }}
                >
                    <i style={{ fontFamily: 'Material Icons' }}>delete</i>
                </button>
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
            <Modal className="new-weapon">
                <div>
                    <label style={{ textAlign: "center" }}>Name</label>
                    <input
                        defaultValue={this.state.weapon.name}
                        onChange={ev => this.updateState('name', ev.currentTarget.value)}
                    />
                </div>
                <div>
                    <label style={{ textAlign: "center" }}>Type</label>
                    <select className="weapon-type"
                        value={this.state.weapon.weaponType}
                        onChange={ev => this.updateState('weaponType', ev.currentTarget.value)}
                    >
                        <option value={WeaponType.Melee}>{WeaponType.Melee}</option>
                        <option value={WeaponType.Range}>{WeaponType.Range}</option>
                    </select>
                </div>
                <div>
                    <label style={{ textAlign: "center" }}>Kind</label>
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
                    <label style={{ textAlign: "center" }}>Damage Kind</label>
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
                    <label style={{ textAlign: "center" }}>Weight</label>
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
                    <label style={{ textAlign: "center" }}>Handedness</label>
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
                    <label style={{ textAlign: "center" }}>Damage</label>
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
                    <label style={{ textAlign: "center" }}>Range</label>
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
                    <label style={{ textAlign: "center" }}>Carry Weight (lbs)</label>
                    <input
                        className="carry-weight"
                        value={this.state.weapon.carryWeight}
                        type="number"
                        onChange={ev => this.updateState('carryWeight', ev.currentTarget.valueAsNumber)}
                    />
                </div>
                <div>
                    <label style={{ textAlign: "center" }}>Finesse</label>
                    <input
                        type="checkbox"
                        checked={this.state.weapon.isFinesse}
                        onChange={ev => this.updateState('isFinesse', ev.currentTarget.checked)}
                    />
                </div>
                <div>
                    <button
                        onClick={() => this.props.onComplete(this.state.weapon)}
                    >Save</button>
                    <button
                        onClick={() => this.props.onComplete(null)}
                    >Cancel</button>
                </div>
            </Modal>
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
            <div 
                className="money box"
                key="money"
                style={{
                    display: 'flex',
                    flexFlow: 'column',
                }}
            >
                <ListView
                    headerText="Money"
                >
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
                </ListView>
                <button
                    style={{
                        marginTop: 5,
                    }}
                    onClick={() => this.updateMoney()}
                >edit
                </button>
            </div>
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

    finishUpdatingMoney(newValue?: Wealth) {
        this.setState((prev, props) => {
            return { updatingMoney: false }
        }, () => {
            if (newValue) {
                this.props.adjustMoney(newValue)
            }
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
                style={{
                    background: 'rgba(0,0,0,0.04)'
                }}
            >
                <span 
                    className="unit-value"
                    style={{
                        width: '30px',
                        textAlign: 'right',
                    }}
                >{this.props.value}</span>
                <span className="unit-unit">{this.props.name}</span>
            </ListViewRow>
        );
    }
}

interface IMoneyAdjusterProps {
    currentWealth: Wealth;
    onComplete: (wealth?: Wealth) => void;
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
            currentWealth: props.currentWealth.clone(),
            updatedWealth: new Wealth(0, 0, 0, 0, 0),
            updatedWealthMul: 1,
        };
        this.cachedHandler = this.keyHandler.bind(this);
        window.addEventListener('keyup', this.cachedHandler);
    }
    render() {
        return (
            <Modal className="money-adjuster">
                <div className="current-wealth inputs box"
                    style={{
                        display: 'flex',
                        flexFlow: 'column',
                        marginBottom: 0,
                        
                    }}
                >
                    <span>Update Money</span>
                    <div
                        style={{
                            display: 'flex',
                            flexFlow: 'row'
                        }}
                    >
                        <div className="input-pair">
                            <label>Copper</label>
                            <input
                                defaultValue={this.state.currentWealth.copper.toString()}
                                onChange={ev => this.updateCurrentWealth('copper', ev.currentTarget.valueAsNumber || 0)}
                                type="number"
                            />
                        </div>
                        <div className="input-pair">
                            <label>Silver</label>
                            <input
                                defaultValue={this.state.currentWealth.silver.toString()}
                                onChange={ev => this.updateCurrentWealth('silver', ev.currentTarget.valueAsNumber || 0)}
                                type="number"
                            />
                        </div>
                        <div className="input-pair">
                            <label>Electrum</label>
                            <input
                                defaultValue={this.state.currentWealth.electrum.toString()}
                                onChange={ev => this.updateCurrentWealth('electrum', ev.currentTarget.valueAsNumber || 0)}
                                type="number"
                            />
                        </div>
                        <div className="input-pair">
                            <label>Gold</label>
                            <input
                                defaultValue={this.state.currentWealth.gold.toString()}
                                onChange={ev => this.updateCurrentWealth('gold', ev.currentTarget.valueAsNumber || 0)}
                                type="number"
                            />
                        </div>
                        <div className="input-pair">
                            <label>Platinum</label>
                            <input
                                type="number"
                                defaultValue={this.state.currentWealth.platinum.toString()}
                                onChange={ev => this.updateCurrentWealth('platinum', ev.currentTarget.valueAsNumber || 0)}
                            />
                        </div>
                    </div>
                </div>
                <div className="updated-wealth inputs box">
                    <span>Add Money</span>
                    <div
                        style={{
                            display: 'flex',
                            flexFlow: 'row',
                        }}
                    >
                        <div className="input-pair">
                            <label>Copper</label>
                            <input
                                defaultValue={this.state.updatedWealth.copper.toString()}
                                onChange={ev => this.updateUpdatedWealth('copper', ev.currentTarget.valueAsNumber || 0)}
                                type="number"
                            />
                        </div>
                        <div className="input-pair">
                            <label>Silver</label>
                            <input
                                defaultValue={this.state.updatedWealth.silver.toString()}
                                onChange={ev => this.updateUpdatedWealth('silver', ev.currentTarget.valueAsNumber || 0)}
                                type="number"
                            />
                        </div>
                        <div className="input-pair">
                            <label>Electrum</label>
                            <input
                                defaultValue={this.state.updatedWealth.electrum.toString()}
                                onChange={ev => this.updateUpdatedWealth('electrum', ev.currentTarget.valueAsNumber || 0)}
                                type="number"
                            />
                        </div>
                        <div className="input-pair">
                            <label>Gold</label>
                            <input
                                defaultValue={this.state.updatedWealth.gold.toString()}
                                onChange={ev => this.updateUpdatedWealth('gold', ev.currentTarget.valueAsNumber || 0)}
                                type="number"
                            />
                        </div>
                        <div className="input-pair">
                            <label>Platinum</label>
                            <input
                                defaultValue={this.state.updatedWealth.platinum.toString()}
                                onChange={ev => this.updateUpdatedWealth('platinum', ev.currentTarget.valueAsNumber || 0)}
                                type="number"
                            />
                        </div>
                        <div className="input-pair">
                            <label>Multiplier</label>
                            <input
                                defaultValue={this.state.updatedWealthMul.toString()}
                                onChange={ev => this.setState({ updatedWealthMul: ev.currentTarget.valueAsNumber || 0 })}
                                type="number"
                            />
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <button
                        onClick={() => this.props.onComplete(this.state.currentWealth.add(this.state.updatedWealth.mul(this.state.updatedWealthMul)))}
                    >Save</button>
                    <button
                        onClick={() => this.props.onComplete()}
                    >Cancel</button>
                </div>
            </Modal>
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
            <div className="proficiency box">
                <ListView
                    headerText="Proficiency"
                >
                    {this.props.proficiency.map((s, i) => {
                        return (
                            <ListViewRow key={`prof-${i}`}><span className="prof-value" >{s}</span></ListViewRow>
                        )
                    })}
                    <ListViewHeader>
                        Languages
                    </ListViewHeader>
                    {this.props.languages.map((l, i) => (<ListViewRow key={`lang-${i}`}><span>{l}</span></ListViewRow>))
                    }
                </ListView>
            </div>
        );
    }
}

interface IFeaturesProps {
    classDetails: ClassDetails;
    optionsSelected: (name: string, idx: number) => void;
}

interface IFeaturesState {
    selectedNote: number;
}

export class Features extends React.Component<IFeaturesProps, IFeaturesState> {
    constructor(props) {
        super(props);
        this.state = {
            selectedNote: -1,
        }
    }
    render() {
        return (
            <div className="notes box">
                {this.state.selectedNote < 0 ?
                    <FeaturesList
                        classDetails={this.props.classDetails}
                        noteSelected={idx => this.setState({selectedNote: idx})}
                    /> 
                : <FeatureInfo
                    note={this.props.classDetails.getAllAvailableFeatures()[this.state.selectedNote]}
                    onBack={() => this.setState({selectedNote: -1})}
                    optionsSelected={(name, idx) => this.selectedFeature(name, idx)}
                />
                }
            </div>
        );
    }

    selectedFeature(name: string, idx: number) {
        this.setState({selectedNote: -1}, () => {
            this.props.optionsSelected(name, idx);
        });
    }
}

interface IFeaturesListProps {
    classDetails: ClassDetails;
    noteSelected: (idx: number) => void;
}

interface IFeaturesListState {

}

export class FeaturesList extends React.Component<IFeaturesListProps, IFeaturesListState> {
    constructor(props: IFeaturesListProps) {
        super(props);
    }
    render() {
        let features = this.props.classDetails.getAllAvailableFeatures();
        return (
            <ListView
                headerText="Notes"
            >
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
                                onClick={() => this.props.noteSelected(i)}
                                title={needsSelection ? 'Select an option' : ''}
                                className="note-value"
                            >
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
                            </ListViewRow>)
                        })}
                    </ListView>
        );
    }
}

interface IFeatureInfoProps {
    note: ClassFeature;
    onBack: () => void;
    optionsSelected: (name: string, idx: number) => void;
}

interface IFeatureInfoState {

}

export class FeatureInfo extends React.Component<IFeatureInfoProps, IFeatureInfoState> {
    constructor(props: IFeatureInfoProps) {
        super(props);
    }
    render() {
        let inner = [
            <div
                key="main-note-info"
            >
                    <ListViewHeader>
                        <button
                            onClick={() => this.props.onBack()}
                            style={{
                                marginRight: 5,
                                textAlign: 'center',
                                height: 20,
                                width: 20,
                                padding: '0 0 0 3px',
                            }}
                        >
                            <i style={{
                                fontFamily: 'Material Icons',
                                fontSize: 10,
                                lineHeight: 1,
                            }}
                            >arrow_back_ios</i>
                        </button>
                        <span className="notes-header">Notes</span>
                    </ListViewHeader>
                    <ListViewRow
                        style={{
                            borderBottom: '1px solid rgba(0,0,0,0.3)',
                        }} 
                    >
                        <span
                            style={{
                                fontWeight: 'bold',

                            }}
                        >
                        {this.props.note.name}
                        </span>
                    </ListViewRow>
                    <ListViewRow 
                    >
                        <span 
                            className="note-value"
                        >
                            {this.props.note.shortDesc}
                        </span>
                    </ListViewRow>
                    <ListViewRow
                    >
                        <span>
                            {this.props.note.longDesc}
                        </span>
                    </ListViewRow>
                </div>
        ];
        if (this.props.note.options) {
            inner.push(
                <div
                    key="feature-option-list"
                >
                    <ListViewHeader>
                        Choose an Option
                    </ListViewHeader>
                    {this.props.note.options.map((o, i) => {
                        return (
                            <ListViewRow
                                key={`note-option${o.name}-${i}`}
                                style={{
                                    paddingBottom: 5,
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
                                <button
                                    onClick={() => this.props.optionsSelected(this.props.note.name, i)}
                                >Choose</button>
                            </ListViewRow>
                        );
                    })}
                </div> 
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
            <div 
                className="items-list box"
                key="items-list"
                style={{
                    padding: "0px",
                }}
            >
            <ListView>
                <div className="magic-list item-list">
                    <ListViewHeader>
                        Magic Items
                    </ListViewHeader>
                    {this.props.magicItems.map((item, i) => {
                        return <ListViewRow key={`magic-item-${i}`} className="magic-list-item">
                            <span><span style={{ fontWeight: 'bold' }}>{`${item.name}`}</span>{` - ${item.buf}`}</span>
                            <button
                                onClick={() => this.removeItem(i, true)}
                                style={{
                                    width: 19,
                                    height: 19,
                                    padding: "0px",
                                    lineHeight: '14px',
                                    color: 'red',
                                }}
                            >
                                <i style={{ fontFamily: 'Material Icons' }}>delete</i>
                            </button>
                        </ListViewRow>
                    })}
                </div>
                <div className="expendable-list item-list">
                    <ListViewHeader>
                        Expendable Items
                    </ListViewHeader>
                    {this.props.expendables.map((item, i) => {
                        return <ListViewRow key={`expendable-item-${i}`} className="magic-list-item">
                            <span>{`${item.quantity}x`}<span style={{ fontWeight: 'bold' }}>{`${item.name}`}</span>{` - ${item.desc}`}</span>
                            <button
                                onClick={() => this.adjustExpendables(i, item.quantity + 1)}
                                style={{
                                    padding: "0px",
                                    width: 19,
                                    height: 19,
                                    lineHeight: '14px'
                                }}
                            >+</button>
                            <button
                                onClick={() => this.adjustExpendables(i, item.quantity - 1)}
                                style={{
                                    padding: "0px",
                                    width: 19,
                                    height: 19,
                                    lineHeight: '14px'
                                }}
                            >-</button>
                            <button
                                onClick={() => this.removeItem(i, false)}
                                style={{
                                    padding: "0px",
                                    width: 19,
                                    height: 19,
                                    lineHeight: '14px',
                                    color: 'red',
                                }}
                            >
                                <i style={{ fontFamily: 'Material Icons' }}>delete</i>
                            </button>
                        </ListViewRow>
                    })}
                </div>
            </ListView>
            <button
                onClick={() => this.setState({ addingItem: true })}
            >add</button>
        </div>];
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
            <Modal className="new-item">
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
                            <input
                                id="new-magic-item-name"
                                defaultValue={this.state.pendingName}
                                onChange={ev => this.setState({ pendingName: ev.currentTarget.value })}
                                placeholder="Name"
                                title="Description"
                            />
                            <input
                                id="new-magic-item-desc"
                                defaultValue={this.state.pendingDesc}
                                onChange={ev => this.setState({ pendingDesc: ev.currentTarget.value })}
                                placeholder="Description"
                                title="Description"
                            />
                        </div>
                        : <div className="input-set">
                            <input
                            id="new-exp-item-name"
                            defaultValue={this.state.pendingName}
                            onChange={ev => this.setState({ pendingName: ev.currentTarget.value })}
                            placeholder="Name"
                            title="Name"
                            />
                            <input
                            id="new-exp-item-desc"
                            defaultValue={this.state.pendingDesc}
                            onChange={ev => this.setState({ pendingDesc: ev.currentTarget.value })}
                            placeholder="Description"
                            title="Description"
                            />
                            <input
                                id="new-exp-item-qty"
                                defaultValue={this.state.pendingQty.toString()}
                                onChange={ev => this.setState({ pendingQty: ev.currentTarget.valueAsNumber })}
                                type="number"
                                title="quantity"
                            />
                        </div>
                }
                <button
                    onClick={() => this.save()}
                >Save</button>
                <button
                    onClick={() => this.props.newItemComplete(null)}
                >Cancel</button>
            </Modal>
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