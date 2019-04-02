import * as React from 'react';
import { Character, Height, NormalLanguage, 
        Language, Alignment, AlignmentMinor, AlignmentMajor 
} from '../models/character';
import { Skills, SkillKind, Skill } from '../models/skills';
import { Class, ClassKind } from '../models/class';
import { ClassDetails} from '../models/classDetails';
import { Race, RaceKind, SubRace } from '../models/race';
import { Data } from '../services/data';
import { ListView, ListViewHeader, ListViewRow } from './common/ListView';
import { Background } from '../models/background';
import { Randomizer } from '../services/randomizer';
import { Tool } from '../models/tools';
import { AbilityScores, AbilityKind } from '../models/abilityScore';
interface ICharacterCreatorProps {
    data: Data;
    onSave: (ch: Character) => void;
    onCancel: () => void;
}

interface ICharacterCreatorState {
    character: Character;
    errorMessages: string[];
}

export class CharacterCreator extends React.Component<ICharacterCreatorProps, ICharacterCreatorState> {
    allClasses: ClassKind[];
    allBackgrounds: Background[];
    constructor(props: ICharacterCreatorProps) {
        super(props);
        this.state = {
            character: null,
            errorMessages: [],
        };
        this.allClasses = Data.getAllClasses();
        this.allBackgrounds = Data.getAllBackground();
    }
    componentDidMount() {
        Randomizer.randomCharacter().then(ch => {
            this.setState({character: ch});
        }, e => console.error('failed to get random character', e))
        .catch(e => {
            console.error('failed to get random character', e);
        });
    }
    render() {
        if (!this.state.character) {
            return <div></div>
        }
        return (
            <div className="character-creator">
                <div 
                    className="character-creator-title"
                >
                Create a new Character
                <button 
                    className="cancel"
                    onClick={() => this.props.onCancel()}
                >Cancel</button>
                <button
                    className="save"
                    onClick={() => {
                        if (this.validate()) {
                            this.props.onSave(this.state.character);
                        }
                    }}
                >Save</button>
            </div>
                {this.state.errorMessages.length > 0
                ? <div className="box error-messages">
                    {this.state.errorMessages.map((msg, i) => 
                        <span key={`error-${i}`} className="error-message">{msg}</span>
                    )}
                </div>
                : null}
                <RaceInfo
                    raceChanged={race => this.valueChanged('race', race)}
                    race={this.state.character.race}
                />
                <CharacterInfo 
                    name={this.state.character.name}
                    eyeColor={this.state.character.eyeColor}
                    race={this.state.character.race}
                    height={this.state.character.height}
                    weight={this.state.character.weight}
                    valueChanged={(key, value) => this.valueChanged(key, value)}
                    alignment={this.state.character.alignment}
                />
                <ClassInfo
                    classes={this.allClasses}
                    onClassChange={c => this.valueChanged('characterClass', c)}
                    characterClass={this.state.character.characterClass}
                    data={this.props.data}
                />
                <BackgroundInfo
                    backgrounds={this.allBackgrounds}
                    onBackgroundChange={b => this.valueChanged('background', b)}
                    characterBackground={this.state.character.background}
                    languages={Object.getOwnPropertyNames(NormalLanguage).map(l => NormalLanguage[l])}
                />
                <AbilityScoreSelector
                    scores={this.state.character.abilityScores}
                    remaining={27 - this.state.character.abilityScores.totalCost()}
                    primaryScores={this.state.character.characterClass.primaryAbility}
                    racialScores={this.state.character.race.abilityModifiers}
                    valueChanged={(scores) => this.valueChanged('abilityScores', scores)}
                />
                <SkillsSelector
                    classSkills={this.state.character.characterClass.selectedSkills}
                    backgroundSkills={this.state.character.background.skills}
                    skillCount={this.state.character.characterClass.numberOfSkills}
                    skillOptions={this.state.character.characterClass.availableSkills}
                    onChange={(skills) => this.skillsChanged(skills)}
                />
                <div className="bottom-buttons">
                    
                </div>
            </div>
        );
    }

    valueChanged(key: string, value: any) {
        this.setState((prev, props) => {
            let newProps = {[key]: value};
            if (key === 'race') {
                let race = value as Race;
                newProps.height = Randomizer.randomHeight(...race.heightRange);
                newProps.weight = Randomizer.randomWeight(race.avgWeight);
            }
            let newCharacter = Character.fromJson(Object.assign(prev.character, newProps));
            if (key === 'characterClass') {
                newCharacter.characterClass.selectedSkills = [];
            }
            return {
                character: newCharacter
            }
        });
    }

    skillsChanged(skills: SkillKind[]) {
        this.setState((prev, props) => {
            prev.character.characterClass.selectedSkills = skills;
            return {
                character: prev.character,
            };
        })
    }

    validate() {
        let msgs = [];
        if (this.state.character.abilityScores.totalCost() < 27) {
            msgs.push('Incorrect number of ability scores selected');
        }
        if (this.state.character.characterClass.selectedSkills.length != this.state.character.characterClass.numberOfSkills) {
            msgs.push('Incorrect number of skills selected');
        }
        if (this.state.character.background.languages.includes(null)) {
            msgs.push('Incorrect number of languages selected');
        }
        if (this.state.character.background.toolProficiencies.includes(null)) {
            msgs.push('Incorrect number of proficiencies selected');
        }
        this.setState({errorMessages: msgs});
        return msgs.length === 0;
    }
}

interface IRaceInfoProps {
    raceChanged: (race: Race) => void;
    race: Race;
}

interface IRaceInfoState {

}

export class RaceInfo extends React.Component<IRaceInfoProps, IRaceInfoState> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="race-info box">
                <RaceSelector 
                    onRaceChange={(raceKind) => this.props.raceChanged(new Race(raceKind))}
                    race={this.props.race.name}
                    subRaceChanged={(subRace) => this.props.raceChanged(new Race(this.props.race.name, subRace))}
                    subRace={this.props.race.subRace}
                />
                <RaceDetails
                    race={this.props.race}
                />
            </div>
        );
    }
}

interface IRaceDetailsProps {
    race: Race;
}

interface IRaceDetailsState {

}

export class RaceDetails extends React.Component<IRaceDetailsProps, IRaceDetailsState> {
    constructor(props: IRaceDetailsProps) {
        super(props);
    }
    render() {
        return (
            <div className="race-details">
                <ListView 
                    className="race-details-list"
                    headerText="Details"
                >
                    {this.getList().map((s, i) => {
                        return (
                            <ListViewRow key={`race-detail-${i}`}>{s}</ListViewRow>
                        );
                    })}
                </ListView>
            </div>
        );
    }

    getList(): string[] {
        const race = this.props.race;
        let ret = race.abilityModifiers.map(m => `+${m[1]} to ${m[0]}`)
        ret.push(`Age Range: ${race.ageRange[0]} - ${race.ageRange[1]}`);
        ret.push(`Typical Alignment ${race.preferredAlignment.toString()}`);
        ret.push(`Height: ${race.heightRange[0].toString()} - ${race.heightRange[1].toString()}`);
        ret.push(`Speed: ${race.speed}`);
        ret.push(`Size: ${race.size}`);
        ret.push(`Avg. Weight: ${race.avgWeight}`);
        ret.push(`Languages: ${race.languages.join(', ')}`);
        if (race.darkVision != null) {
            ret.push(`Darkvision: ${race.darkVision.first}`);
        }
        if (race.damageResistance != null) {
            ret.push(`Damage Resistance: ${race.damageResistance}`);
        }
        if (race.naturalWeapons.length == 3) {
            let {name, damageKind, hitDie} = race.naturalWeapons[2];
            ret.push(`Bonus Natural Weapon: ${name} ${damageKind} ${hitDie[0]}d${hitDie[1]}`);
        }
        if (race.weaponProfs.length > 0) {
            ret.push(`Weapon Proficiencies: ${race.weaponProfs.join(', ')}`);
        }
        if (race.toolProfs.length > 0) {
            ret.push(`Tool Proficiencies: ${race.toolProfs.join(', ')}`);
        }
        if (race.armorProfs.length > 0) {
            ret.push(`Armor Proficiencies: ${race.armorProfs.join(', ')}`);
        }
        if (race.bonusLanguages > 0) {
            ret.push(`${race.bonusLanguages} Bonus Language${race.bonusLanguages == 1 ? 's' : ''}`);
        }
        ret.push(...race.miscBenefits);
        return ret;
    }
}

interface IRaceDetailProps {
    text: string;
}

export class RaceDetail extends React.Component<IRaceDetailProps, {}> {
    render() {
        return (
            <ListViewRow 
                className="race-detail"
                style={{
                    borderBottom: '1px solid rgba(0,0,0,0.3)',
                }}
            >{this.props.text}
            </ListViewRow>
        );
    }
}

interface ICharacterInfoProps {
    name: string;
    eyeColor: string;
    race: Race;
    height: Height;
    weight: number;
    valueChanged: (key: string, newValue: any) => void;
    alignment: Alignment;
}

interface ICharacterInfoState {
    skillsSelected: number;

}

export class CharacterInfo extends React.Component<ICharacterInfoProps, ICharacterInfoState> {
    constructor(props: ICharacterInfoProps) {
        super(props);
        this.state = {
            skillsSelected: 0,
        }
    }

    render() {
        return (
                <div className="basic-info box">
                    <div className="input-pair">
                        <label htmlFor="character-name">Name</label>
                        <input 
                            id="character-name" 
                            defaultValue={this.props.name || ''}
                            onChange={ev => this.props.valueChanged('name', ev.currentTarget.value)}
                        />
                    </div>
                    <div className="input-pair">
                        <label htmlFor="character-eye-color">Eye Color</label>
                        <input 
                            id="character-eye-color" 
                            defaultValue={this.props.eyeColor || ''}
                            onChange={ev => this.props.valueChanged('eyeColor', ev.currentTarget.value)}
                        />
                    </div>
                    <div className="input-pair">
                        <label htmlFor="height">Height</label>
                        <div className="height-inputs">
                            <input 
                                className="height-part height-feet"
                                type="number" 
                                value={this.props.height.feet.toString()}
                                onChange={ev => this.props.valueChanged('height', new Height(parseInt(ev.currentTarget.value), this.props.height.inches))}
                            />
                            <input 
                                className="height-part height-inches"
                                type="number" 
                                value={this.props.height.inches.toString()} 
                                onChange={ev => this.props.valueChanged('height', new Height(this.props.height.feet, parseInt(ev.currentTarget.value)))}
                            />
                        </div>
                    </div>
                    <div className="input-pair">
                        <label htmlFor="weight">Weight</label>
                        <input 
                            id="weight"
                            className="weight"
                            type="number"
                            value={this.props.weight.toString()}
                            onChange={ev => this.props.valueChanged('weight', parseInt(ev.currentTarget.value))}
                        />
                    </div>
                    <div className="input-pair">
                        <label htmlFor="alignment">Alignment</label>
                        <div className="alignment-inputs">
                            <select
                                value={this.props.alignment.major}
                                onChange={ev => this.props.valueChanged(
                                        'alignment', new Alignment(ev.currentTarget.value as AlignmentMajor, 
                                        this.props.alignment.minor))}
                            >
                                <option value="Lawful">Lawful</option>
                                <option value="Neutral">Neutral</option>
                                <option value="Chaotic">Chaotic</option>
                            </select>
                            <select
                                value={this.props.alignment.minor}
                                onChange={ev => this.props.valueChanged('alignment', new Alignment(
                                        this.props.alignment.major, 
                                        ev.currentTarget.value as AlignmentMinor))}
                            >
                                <option value="Good">Good</option>
                                <option value="Neutral">Neutral</option>
                                <option value="Evil">Evil</option>
                            </select>
                        </div>
                    </div>
                </div>
                );
            }
        }
        // <Box>
        //     <TitleBar>
        //         <Text>Skills</Text>
        //     </TitleBar>
        //     <Text>{`Remaining skills ${remainingSkills}`}</Text>
        //     {this.props.skills.map(s => {
        //         let enabledFromBackground = this.props.backgroundSkills.indexOf(s.kind) > -1;
        //         let isClassSkill = this.props.chClass.availableSkills.indexOf(s.kind) > -1
        //         let checkboxDisabled = enabledFromBackground || !isClassSkill;
        //         return (<SkillRadio
        //                 key={`skill-list-item-${s.kind}`}
        //                 checked={s.enabled}
        //                 disabled={checkboxDisabled}
        //                 title={enabledFromBackground ? `Provided by background\n${s.desc}` : s.desc}
        //                 label={s.kind}
        //                 onClick={() => {
        //                     if (remainingSkills === 0 && !s.enabled) {
        //                         return;
        //                     }
        //                     let ret = Skills.fromJson(this.props.skills);
        //                     ret.set(s.kind, !s.enabled);
        //                     this.props.valueChanged('skills', ret);
        //                     this.setState((prev, props) => {
        //                         let skillsSelected = s.enabled ? prev.skillsSelected - 1 : prev.skillsSelected + 1;
        //                         return {skillsSelected};
        //                     });
        //                 }}
        //             />
        //         )
        //     })}
        // </Box>


interface IClassInfoProps {
    classes: ClassKind[];
    onClassChange: (c: Class) => void;
    characterClass: Class;
    data: Data;
}

interface IClassInfoState {

}

export class ClassInfo extends React.Component<IClassInfoProps, IClassInfoState> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="class-info box">
                <ClassSelector
                    classes={this.props.classes}
                    onClassChange={v => this.classChanged(v)}
                    selectedClassKind={this.props.characterClass.name}
                />
                <ClassDetailsComponent
                    classKind={this.props.characterClass.name}
                    classDesc={this.props.characterClass.desc}
                    details={this.props.characterClass.classDetails}
                />
            </div>
        );
    }
    classChanged(kind: ClassKind) {
        this.props.data.getClassDetails(kind, 1).then(details => {
            this.props.onClassChange(new Class(kind, 1, details));
        });
    }
}

interface IClassSelectorProps {
    classes: ClassKind[];
    selectedClassKind: ClassKind;
    onClassChange: (ck: ClassKind) => void;
}

interface IClassSelectorState {
}

export class ClassSelector extends React.Component<IClassSelectorProps, IClassSelectorState> {
    constructor(props: IClassSelectorProps) {
        super(props);
    }
    render() {
        return (
            <div className="class-selector">
                <label htmlFor="class-selection">Class</label>
                <select
                    value={this.props.selectedClassKind}
                    onChange={ev => this.props.onClassChange(ev.currentTarget.value as ClassKind)}
                >
                    {this.props.classes.map(c => (<option value={c} key={c}>{c}</option>))}
                </select>
            </div>
        );
    }
    
}

interface IClassDetailsProps {
    classKind: ClassKind;
    classDesc: string;
    details: ClassDetails;
}

interface IClassDetailsState {
    selectedFeatures: number[];
}

export class ClassDetailsComponent extends React.Component<IClassDetailsProps, IClassDetailsState> {
    constructor(props) {
        super(props);
        this.state = {
            selectedFeatures: [],
        }
    }
    render() {
        return (
            <ListView 
                className={`class-details ${this.props.classKind.toLowerCase()}`}
                headerText="Class Description"
            >
                <ListViewRow>{this.props.classDesc}</ListViewRow>
                <ListViewHeader>Benefits at 1st Level</ListViewHeader>
                {this.props.details.features.map((n, i) => {
                    let selected = this.state.selectedFeatures.includes(i);
                    return (
                        <ListViewRow
                            className="class-feature-row"
                            key={`class-benefit-${i}`}
                            onClick={() => this.toggleFeature(i)}
                            title={selected ? 'click for fewer details' : 'click for more details'}
                        >
                            <span className="class-feature-name">{n.name}</span>
                            <span className="class-feature-spacer">-</span>
                            <span className="class-feature-desc">
                            {selected
                            ? this.renderLongDesc(n.longDesc, n.name)
                            : n.shortDesc
                            }
                            </span>
                        </ListViewRow>
                    );
                }
                )}
            </ListView>
        );
    }

    toggleFeature(idx: number) {
        this.setState((prev, props) => {
            let currentIdx = prev.selectedFeatures.indexOf(idx);
            let selectedFeatures = prev.selectedFeatures;
            if (currentIdx > -1) {
                selectedFeatures.splice(currentIdx, 1);
            } else {
                selectedFeatures.push(idx);
            }
            return {selectedFeatures};
        });
    }

    renderLongDesc(desc: string, name: string) {
        return <span>{desc.split('\n').map((l, i) => i === 0 ? l : (<p key={`${name}-line-${i}`}>{l}</p>))}</span>
    }
}

interface IRaceSelectorProps {
    onRaceChange: (race: RaceKind) => void;
    subRaceChanged: (subRace: SubRace) => void;
    race: RaceKind;
    subRace?: SubRace;
}

interface IRaceSelectorState {
    selectedRace: RaceKind;
}

export class RaceSelector extends React.Component<IRaceSelectorProps, IRaceSelectorState> {
    private allRaces: RaceKind[];
    constructor(props: IRaceSelectorProps) {
        super(props);
        this.allRaces = Data.getAllRaces();
        this.state = {
            selectedRace: props.race
        }
    }
    render() {
        let subRaces = Data.subRaceFor(this.state.selectedRace);
        return (
            <div className="race-selector">
                <div className="race-selector-title">
                    <label htmlFor="race-selection">Race</label>
                    <select 
                        name="race-selection" 
                        id="race-selection"
                        onChange={ev => this.handleChange(ev, false)}
                        value={this.state.selectedRace}
                    >
                        {this.allRaces.map((r, i) => (<option value={r} key={`race-option-${i}`}>{r}</option>))}
                        
                    </select>
                </div>
                {subRaces && subRaces.length > 0 
                ? <div  className="race-selector-title">
                    <label htmlFor="sub-race-selection">Sub Race</label>
                    <select 
                        name="sub-race-selection" 
                        id="sub-race-selection"
                        value={this.props.subRace || ''}
                        onChange={ev => this.handleChange(ev, true)}
                    >
                        <option></option>
                        {subRaces.map((r, i) => (<option value={r} key={`sub-race-option-${i}`}>{r}</option>))}
                    </select>
                </div>
                : null}
            </div>
        );
    }

    handleChange(ev: React.ChangeEvent<HTMLSelectElement>, isSub: boolean) {
        if (isSub) {
            let rawValue = ev.currentTarget.value;
            if (!rawValue || rawValue == '') {
                this.props.subRaceChanged(null);
            } else {
                this.props.subRaceChanged(rawValue as SubRace);
            }
        } else {
            let selectedRace = ev.currentTarget.value as RaceKind;
            this.setState({selectedRace}, () => this.props.onRaceChange(selectedRace));
        }
    }
}

interface IBackgroundInfoProps {
    backgrounds: Background[];
    characterBackground: Background;
    languages: NormalLanguage[];
    onBackgroundChange: (b: Background) => void;
}

interface IBackgroundInfoState {
    backgroundIdx: number;
    pendingBackground: Background;
}

export class BackgroundInfo extends React.Component<IBackgroundInfoProps, IBackgroundInfoState> {
    constructor(props: IBackgroundInfoProps) {
        super(props);
        this.state = {
            backgroundIdx: props.backgrounds.findIndex(b => b.kind === props.characterBackground.kind),
            pendingBackground: Background.fromJson(props.characterBackground),
        }
    }
    render() {
        return (
            <div className="background-info box">
                <div className="background-info-title">
                    <label htmlFor="background-selection">Background</label>
                    <select 
                        id="background-selection" 
                        name="background-selection"
                        value={this.state.backgroundIdx}
                        onChange={(ev) => this.backgroundSelected(ev)}
                    >
                        <option hidden value={-1} disabled></option>
                        {this.props.backgrounds.map((b, i) => (<option key={`${b.kind}`} value={i}>{b.kind}</option>))}
                    </select>
                </div>
                {this.state.backgroundIdx > -1 
                ? <ListView
                    className="background-desc"
                >
                    <ListViewHeader>Skills</ListViewHeader>
                    {this.props.characterBackground.skills.map(s => {
                        return (
                            <ListViewRow className="background-desc-row" key={`background-skill-${s}`}>
                                {s}
                            </ListViewRow>
                        );
                    })}
                    {this.renderLanguages(this.props.characterBackground.languages)}
                    {this.renderTools(this.props.characterBackground.toolProficiencies, this.props.characterBackground.toolOptions)}
                </ListView>
                : null }
            </div>
        )
    }

    renderLanguages(languages: Language[]) {
        if (languages.length === 0) {
            return null;
        }
        return [
            <ListViewHeader key="languages-list-header">Languages</ListViewHeader>,
            ...languages.map((l, i) => {
                return <ListViewRow
                            key={`lang-${i}`}
                        >
                        <span>Choose a Language</span>
                        <select
                            className="language-select"
                            onChange={ev => this.languageSelected(i, ev)}
                            value={l || ''}
                        >
                            <option value="" disabled hidden></option>
                            {this.props.languages.map(o => {
                                return <option key={`${o}-${i}`} value={o}>{o}</option>
                            })}
                        </select>
                    </ListViewRow>
            })
        ];
    }

    languageSelected(idx: number, ev: React.ChangeEvent<HTMLSelectElement>) {
        let languages = this.props.characterBackground.languages.map((l, i) => {
            if (i === idx) {
                return ev.currentTarget.value as NormalLanguage;
            }
            return l;
        });
        this.props.onBackgroundChange(Object.assign(this.props.characterBackground, {languages}));
    }

    renderTools(tools: Tool[], options: Tool[][]) {
        if (tools.length === 0) {
            return null;
        }
        return [
            <ListViewHeader key="tools header">Tools</ListViewHeader>,
            this.renderTool(tools[0], options[0], 0),
            this.renderTool(tools[1], options[1], 1),
        ];
    }

    renderTool(tool: Tool, options: Tool[], position: number) {
        if (!tool && !options) {
            return null;
        }
        if (!options) {
            return <ListViewRow key={`${tool}-${position}`}>{tool}</ListViewRow>
        }
        return (
            <ListViewRow key={`${tool}-${position}`}>
                <span>Choose a Tool</span>
                <select
                    className="tool-select"
                    value={tool || ''}
                    onChange={ev => this.toolSelected(position, ev)}
                >
                    <option value="" disabled hidden></option>
                    {options.map((t, i) => 
                        <option key={`tool-${position}-${i}`} value={t}>{t}</option>)}
                </select>
            </ListViewRow>
        )
    }

    toolSelected(toolsIdx: number, ev: React.ChangeEvent<HTMLSelectElement>) {
        let tools = this.props.characterBackground.toolProficiencies.map((t, i) => {
            if (i === toolsIdx) {
                return ev.currentTarget.value as Tool;
            }
            return t;
        });
        this.props.onBackgroundChange(Object.assign(this.props.characterBackground, {toolProficiencies: tools}));
    }

    backgroundSelected(ev: React.ChangeEvent<HTMLSelectElement>) {
        let idx = parseInt(ev.currentTarget.value);
        this.setState({backgroundIdx: idx}, () => {
            let bkg = Background.fromJson(this.props.backgrounds[idx]);
            this.props.onBackgroundChange(bkg)
        });
    }
}

interface IAbilityScoreSelectorProps {
    scores: AbilityScores;
    primaryScores: AbilityKind[];
    racialScores: [AbilityKind, number][];
    valueChanged: (value: AbilityScores) => void;
    remaining: number;
}

interface IAbilityScoreSelectorState {

}

export class AbilityScoreSelector extends React.Component<IAbilityScoreSelectorProps, IAbilityScoreSelectorState> {
    constructor(props: IAbilityScoreSelectorProps) {
        super(props);
    }
    render() {
        return (
            <div className="ability-score-selector box">
                <span className="ability-score-selector-title">Ability Scores</span>
                <span className="ability-score-selector-remaining">Remaining Points: {this.props.remaining}</span>
                <span title="not reflected below" className="racial-ability-score-bonuses">Racial Bonuses: {this.props.racialScores.filter(s => s[1] > 0).map(s => `${s[0]}: ${s[1]}`).join(' ')}</span>
                <div className="ability-score-values">
                    {this.props.scores.map(s => {
                        let isPrimary = this.props.primaryScores.includes(s.kind);
                        return (
                            <div 
                                key={`ability-score-value-${s.kind}`} 
                                className={`ability-score-value box ${isPrimary ? 'primary' : ''}`}
                                title={isPrimary ? 'Primary Ability' : null}
                            >
                                <span className="ability-score-name">{s.kind}</span>
                                <span className="ability-score-value">{s.value}</span>
                                <span className="ability-score-mod">{s.modifier}</span>
                                <div className="ability-score-adjustor-buttons">
                                    <button
                                        disabled={s.value > 14 || this.props.remaining <= 0}
                                        onClick={() => {
                                            let ret = AbilityScores.fromJson(this.props.scores);
                                            ret.set(s.kind, s.value + 1);
                                            this.props.valueChanged(ret);

                                        }}
                                    ><i style={{ fontFamily: 'Material Icons', lineHeight: 1 }}>expand_less</i></button>
                                    <button
                                        disabled={s.value < 9}
                                        onClick={() => {
                                            let ret = AbilityScores.fromJson(this.props.scores);
                                            ret.set(s.kind, s.value - 1);
                                            this.props.valueChanged(ret);
                                        }}
                                    ><i style={{ fontFamily: 'Material Icons', lineHeight: 1 }}>expand_more</i></button>
                                </div>
                        </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

interface ISkillsSelectorProps {
    classSkills: SkillKind[];
    backgroundSkills: SkillKind[];
    skillOptions: SkillKind[];
    skillCount: number;
    onChange: (skills: SkillKind[]) => void;
}

interface ISkillsSelectorState {
}

export class SkillsSelector extends React.Component<ISkillsSelectorProps, ISkillsSelectorState> {
    constructor(props: ISkillsSelectorProps) {
        super(props);
        this.state = {
        };
    }
    render() {
        let remaining = this.props.skillCount - this.props.classSkills.length;
        let options = Array.from(this.props.backgroundSkills.concat(this.props.skillOptions).reduce((acc, s) => {
            acc.add(s);
            return acc;
        }, new Set()))
        .sort((l, r) => l[0] > r[0] ? 1 : -1);
        return (
            <div className="box skill-selector">
                <span className="skill-selector-title">Skills</span>
                <span className="skill-selector-remaining">Remaining Skills: {remaining}</span>
                <div className="skill-selector-values">
                    {options.map(s => {
                        let enabledFromBackground = this.props.backgroundSkills.includes(s);
                        let enabled = this.props.classSkills.includes(s) || enabledFromBackground;
                        return <div 
                                    key={s} 
                                    className={`skill-selector-value ${enabled ? 'enabled' : ''}`}
                                    title={enabledFromBackground ? 'free from background' : null}
                                    onClick={() => {
                                        if (enabledFromBackground) return;
                                        let skillIdx = this.props.classSkills.indexOf(s);
                                        let newSkills;
                                        if (skillIdx > -1) {
                                            newSkills = this.props.classSkills.filter(k => k != s);
                                        } else {
                                            if (remaining < 1) {
                                                return;
                                            }
                                            newSkills = this.props.classSkills.concat([s]);
                                        }
                                        this.props.onChange(newSkills);
                                    }
                                }
                                >
                                <span>{s}</span>
                                { enabledFromBackground ? <i>lock</i> : null }
                        </div>
                    })}
                </div>
            </div>
        );
    }
}