import * as React from 'react';
import { Character, Height, NormalLanguage } from '../models/character';
import { Class, ClassKind } from '../models/class';
import { ClassDetails} from '../models/classDetails';
import { Race, RaceKind, SubRace } from '../models/race';
import { Data } from '../services/data';
import { Box, TitleBar, Toolbar, 
        ToolbarNav, ToolbarNavItem, ListView, 
        ListViewRow, Text, ListViewHeader,
        ListViewSection, ListViewSectionHeader,
        Label, TextInput, Button, Checkbox } from 'react-desktop';
import { CircledLetter } from './icons';
import { Background } from '../models/background';
import { Randomizer } from '../services/randomizer';
import { Tool } from '../models/tools';
import { AbilityScores } from '../models/abilityScore';
import { Skills, SkillKind } from '../models/skills';
interface ICharacterCreatorProps {
    data: Data;
    onSave: (ch: Character) => void;
}

interface ICharacterCreatorState {
    character: Character;
    selectedTab: number;
}

const RACE_ICON = <CircledLetter id="race-icon" width={25} height={25} letter="R" />
const BASIC_ICON = <CircledLetter id="basic-icon" width={25} height={25} letter="I" />
const CLASS_ICON = <CircledLetter id="class-icon" width={25} height={25} letter = "C" />
const BACK_ICON = <CircledLetter id="background-icon" width={25} height={25} letter="B" />

export class CharacterCreator extends React.Component<ICharacterCreatorProps, ICharacterCreatorState> {
    allClasses: ClassKind[];
    allBackgrounds: Background[];
    constructor(props) {
        super(props);
        this.state = {
            character: null,
            selectedTab: 0,
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
                <TitleBar 
                    className="character-creator-tab-bar"
                    height={50}
                >
                    <Toolbar
                        height={50}
                    >
                        <ToolbarNav
                            height={50}
                        >
                            <ToolbarNavItem
                                title="Race"
                                icon={RACE_ICON}
                                selected={this.state.selectedTab === 0}
                                onClick={() => this.setState({selectedTab: 0})}
                            />
                            <ToolbarNavItem
                                title="Basic"
                                icon={BASIC_ICON}
                                selected={this.state.selectedTab === 1}
                                onClick={() => this.setState({selectedTab: 1})}
                            />
                            <ToolbarNavItem
                                title="Class"
                                icon={CLASS_ICON}
                                selected={this.state.selectedTab === 2}
                                onClick={() => this.setState({selectedTab: 2})}
                            />
                            <ToolbarNavItem
                                    title="Background"
                                    icon={BACK_ICON}
                                    selected={this.state.selectedTab === 3}
                                onClick={() => this.setState({selectedTab: 3})}
                            />
                            <Button
                                style={{
                                    width: 55,
                                    height: 40,
                                }}
                                onClick={() => {
                                    this.props.onSave(this.state.character);
                                }}
                            >Save</Button>
                        </ToolbarNav>
                    </Toolbar>
                </TitleBar>
                <div className="character-creator-tab-content">
                    { this.renderBody() }
                </div>
            </div>
        );
    }

    renderBody() {
        switch (this.state.selectedTab) {
            case 0:
                return (
                    <RaceInfo
                        raceChanged={race => this.valueChanged('race', race)}
                        race={this.state.character.race}
                    />
                );
            case 1:
                return (
                    <CharacterInfo 
                        name={this.state.character.name}
                        eyeColor={this.state.character.eyeColor}
                        race={this.state.character.race}
                        height={this.state.character.height}
                        weight={this.state.character.weight}
                        valueChanged={(key, value) => this.valueChanged(key, value)}
                        abilityScores={this.state.character.abilityScores}
                        skills={this.state.character.skills}
                        chClass={this.state.character.characterClass}
                        backgroundSkills={this.state.character.background.skills}
                    />);
            case 2:
                return (
                    <ClassInfo
                        classes={this.allClasses}
                        onClassChange={c => this.valueChanged('characterClass', c)}
                        characterClass={this.state.character.characterClass}
                        data={this.props.data}
                    />);
            case 3:
                return (
                    <BackgroundInfo
                        backgrounds={this.allBackgrounds}
                        onBackgroundChange={b => this.valueChanged('background', b)}
                        characterBackground={this.state.character.background}
                        languages={Object.getOwnPropertyNames(NormalLanguage).map(l => NormalLanguage[l])}
                    />
                )
        }
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
            if (key === 'background') {
                newCharacter.resetSkills();
            }
            return {
                character: newCharacter
            }
        });
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
            <div className="race-info">
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
                    style={{
                        borderRight: '1px solid rgba(0,0,0,0.3)',
                    }}
                >
                <ListViewHeader
                    background='rgba(0,0,0,0.33)'
                ><Text>Details</Text></ListViewHeader>
                    {this.getList().map((s, i) => {
                        return (
                            <ListViewRow 
                                key={`race-detail-${i}`}
                                style={{
                                    borderBottom: '1px solid rgba(0,0,0,0.3)',
                                }}
                            >
                                <Text>{s}</Text>
                            </ListViewRow>
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
            >
                <Text>{this.props.text}</Text>
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
    abilityScores: AbilityScores;
    chClass: Class;
    skills: Skills;
    backgroundSkills: SkillKind[];
    valueChanged: (key: string, newValue: any) => void;
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
        let remainingSkills = this.props.chClass.numberOfSkills - this.state.skillsSelected;

        return (
            <div>
                <Box
                    padding="5px"
                    style={{
                        display: 'flex',
                        flexFlow: 'row wrap',
                    }}
                >
                    <Box 
                        className="input-pair"
                        padding="5px"
                        marginBottom="5px"
                        marginLeft="5px"
                        width={175}
                    >
                        <Label htmlFor="character-name">Name</Label>
                        <TextInput 
                            id="character-name" 
                            focusRing={false}
                            defaultValue={this.props.name || ''}
                            onChange={ev => this.props.valueChanged('name', ev.currentTarget.value)}
                            width={150}
                        />
                    </Box>
                    <Box 
                        className="input-pair"
                        padding="5px"
                        marginBottom="5px"
                        marginLeft="5px"
                        width={175}
                    >
                        <Label htmlFor="character-eye-color">Eye Color</Label>
                        <TextInput 
                            id="character-eye-color" 
                            focusRing={false}
                            defaultValue={this.props.eyeColor || ''}
                            onChange={ev => this.props.valueChanged('eyeColor', ev.currentTarget.value)}
                            width={150}
                        />
                    </Box>
                    <Box 
                        className="input-pair"
                        padding="5px"
                        marginBottom="5px"
                        marginLeft="5px"
                        width={175}
                    >
                        <Label htmlFor="height">Height</Label>
                        <div className="height-inputs">
                            <TextInput 
                                className="height-part height-feet"
                                focusRing={false}
                                type="number" 
                                value={this.props.height.feet}
                                onChange={ev => this.props.valueChanged('height', new Height(parseInt(ev.currentTarget.value), this.props.height.inches))}
                                width={75}
                            />
                            <TextInput 
                                className="height-part height-inches"
                                focusRing={false}
                                type="number" 
                                value={this.props.height.inches} 
                                onChange={ev => this.props.valueChanged('height', new Height(this.props.height.feet, parseInt(ev.currentTarget.value)))}
                                width={75}
                            />
                        </div>
                    </Box>
                    <Box 
                        className="input-pair"
                        padding="5px"
                        marginBottom="5px"
                        marginLeft="5px"
                        width={175}
                    >
                        <Label htmlFor="weight">Weight</Label>
                        <TextInput 
                            focusRing={false}
                            id="weight"
                            className="weight"
                            type="number"
                            value={this.props.weight}
                            onChange={ev => this.props.valueChanged('weight', parseInt(ev.currentTarget.value))}
                            width={150}
                        />
                    </Box>
                </Box>
                <Box>
                    <TitleBar>
                        <Text>Ability Scores</Text>
                    </TitleBar>
                    <Text>{`Remaining Points ${this.props.abilityScores.reduce((acc, c) => acc - (c.value - 8), 15)}`}</Text>
                    <div
                        style={{
                            display: 'flex',
                            flexFlow: 'row wrap',
                        }}
                    >
                    {this.props.abilityScores.map(s => {
                        return (
                        <Box
                            key={`abi-score-${s.kind}`}
                            style={{
                                width: 100,
                                height: 100,
                                flex: null,
                            }}
                            margin="5px"
                        >
                            <Text>{s.kind}</Text>
                            <Text>{s.value}</Text>
                            <Text>{s.modifier}</Text>
                            <div
                                style={{
                                    display: 'flex',
                                    flexFlow: 'row'
                                }}
                            >
                                <Button 
                                    padding="0px" 
                                    className="up"
                                    onClick={() => {
                                        let ret = AbilityScores.fromJson(this.props.abilityScores);
                                        ret.set(s.kind, s.value + 1);
                                        this.props.valueChanged('abilityScores', ret);
                                    }}
                                ><i style={{ fontFamily: 'Material Icons', lineHeight: 1 }}>expand_less</i></Button>
                                <Button 
                                    padding="0px" 
                                    className="down"
                                    onClick={() => {
                                        let ret = AbilityScores.fromJson(this.props.abilityScores);
                                        ret.set(s.kind, s.value - 1);
                                        this.props.valueChanged('abilityScores', ret);
                                    }}
                                ><i style={{ fontFamily: 'Material Icons', lineHeight: 1 }}>expand_more</i></Button>
                            </div>
                        </Box>);
                    })}
                    </div>
                </Box>
                <Box>
                    <TitleBar>
                        <Text>Skills</Text>
                    </TitleBar>
                    <Text>{`Remaining skills ${remainingSkills}`}</Text>
                    {this.props.skills.map(s => {
                        let enabledFromBackground = this.props.backgroundSkills.indexOf(s.kind) > -1;
                        let isClassSkill = this.props.chClass.availableSkills.indexOf(s.kind) > -1
                        let checkboxDisabled = enabledFromBackground || !isClassSkill;
                        return (<SkillRadio
                                key={`skill-list-item-${s.kind}`}
                                checked={s.enabled}
                                disabled={checkboxDisabled}
                                title={enabledFromBackground ? `Provided by background\n${s.desc}` : s.desc}
                                label={s.kind}
                                onClick={() => {
                                    if (remainingSkills === 0 && !s.enabled) {
                                        return;
                                    }
                                    let ret = Skills.fromJson(this.props.skills);
                                    ret.set(s.kind, !s.enabled);
                                    this.props.valueChanged('skills', ret);
                                    this.setState((prev, props) => {
                                        let skillsSelected = s.enabled ? prev.skillsSelected - 1 : prev.skillsSelected + 1;
                                        return {skillsSelected};
                                    });
                                }}
                            />
                        )
                    })}
                </Box>
            </div>
        );
    }
}

interface ISkillRadioProps {
    checked: boolean;
    disabled: boolean;
    label: string;
    title: string;
    onClick: () => void;
}

interface ISkillRadioState {

}

export class SkillRadio extends React.Component<ISkillRadioProps, ISkillRadioState> {
    constructor(props: ISkillRadioProps) {
        super(props);
    }
    render() {
        return (
            <div
                onClick={() => {
                    if (!this.props.disabled) {
                        this.props.onClick();
                    }
                }}
                title={this.props.title}
                style={{
                    display: 'flex',
                    flexFlow: 'row',
                }}
            >
                <div
                    style={{
                        width: 15,
                        height: 15,
                        margin: 0,
                        marginRight: 5,
                        padding: 0,
                        borderRadius: '50%',
                        backgroundColor: this.props.checked ? (this.props.disabled ? 'grey' : '#007bfa') : 'white',
                    }}
                >
                <div 
                    style={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        margin: 5,
                        backgroundColor: this.props.checked ? 'white'  : 'transparent',
                    }}
                />
                </div>
                <span
                    style={{
                        color: this.props.disabled ? 'grey' : 'black',
                        display: 'block',
                        
                    }}
                >
                    {this.props.label}
                </span>
            </div>
        );
    }
}

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
            <div className="class-info">
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
        // this.props.onClassChange(new Class(kind, this.props.characterClass.level));
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
                <ListView 
                    className="classes-list"
                    style={{
                        borderRight: '1px solid black',
                    }}
                >
                    <ListViewHeader
                        background='rgba(0,0,0,0.33)'
                    ><Text>Class</Text></ListViewHeader>
                    {this.props.classes.map((n, i) => {
                        return (
                            <ListViewRow
                                key={`class-entry-${i}`}
                                className={`class-entry ${this.props.selectedClassKind == n ? 'selected' : 'unselected'}`}
                                onClick={() => this.props.onClassChange(n)}
                                padding="5px"
                                style={{
                                    borderBottom: '1px solid rgba(0,0,0,0.3)',
                                }}
                                margin="0px"
                            >
                                <Text
                                    color={this.props.selectedClassKind == n ? 'white' : 'black'}
                                >{n}</Text>
                            </ListViewRow>
                        );
                    })}
                </ListView>
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

}

export class ClassDetailsComponent extends React.Component<IClassDetailsProps, IClassDetailsState> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ListView className={`class-details ${this.props.classKind.toLowerCase()}`}>
                <ListViewSection>
                    <ListViewSectionHeader>
                        <Text>Class Description</Text>
                    </ListViewSectionHeader>
                    <ListViewRow
                        margin="0px"
                    >
                        <Text>{this.props.classDesc}</Text>
                    </ListViewRow>
                </ListViewSection>
                <ListViewSection>
                    <ListViewSectionHeader>
                        <Text>Benefits at 1st Level</Text>
                    </ListViewSectionHeader>
                    {this.props.details.features.map((n, i) => {
                        return (
                            <ListViewRow 
                                key={`class-detail-note-${i}`}
                                margin="0px"
                                style={{
                                    borderBottom: '1px solid rgba(0,0,0,0.3)',
                                }}
                            >
                                <div>
                                    {n.longDesc.split('\n').map((l, i) => {
                                        return (<Text
                                                style={{
                                                    marginLeft: i === 0 ? 0 : 5,
                                                }}
                                                key={`long-desc-line-${n.name}-${i}`}
                                            >{i === 0 ? `${n.name}: ${l}` : l}</Text>)
                                    })}
                                </div>
                            </ListViewRow>
                        );
                    })}
                </ListViewSection>
            </ListView>
        );
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
            <ListView 
                className="race-selection"
                value={this.state.selectedRace}
                style={{
                    width: '50%',
                    borderRight: '1px solid rgba(0,0,0,0.3)'
                }}
            >
                <ListViewHeader
                    background='rgba(0,0,0,0.33)'
                >
                    <Text>Race</Text>
                </ListViewHeader>
                {this.allRaces.map(r => {
                    return (<ListViewRow 
                                key={r} 
                                onClick={() => {
                                    this.setState({selectedRace: r});
                                    this.props.onRaceChange(r);
                                }}
                                className={`race-option${this.state.selectedRace == r ? ' selected' : ''}`}
                                style={{
                                    borderBottom: '1px solid rgba(0,0,0,0.3)',
                                }}
                                margin="0px"
                            >
                            <Text>{r}</Text>
                            </ListViewRow>)
                })
                }
            </ListView>
            {subRaces == null ? null : 
                (
                    <ListView 
                        className="sub-race-selector"
                        style={{
                            borderRight: '1px solid rgba(0,0,0,0.3)'
                        }}
                    >
                    <ListViewHeader
                        background='rgba(0,0,0,0.33)'
                    ><Text>Sub Race</Text></ListViewHeader>
                    {subRaces.map((s, i) => 
                        (<ListViewRow 
                            key={`sub-race-${i}`}
                            className={`race-option${this.props.subRace && this.props.subRace == s ? ' selected' : ''}`}
                            style={{
                                borderBottom: '1px solid rgba(0,0,0,0.3)',
                            }}
                            margin="0px"
                            onClick={() => {
                                if (this.props.subRace === s) {
                                    this.props.subRaceChanged(null);
                                } else {
                                    this.props.subRaceChanged(s)
                                }
                            }}
                        >
                            <Text>{s}</Text>
                        </ListViewRow>)
                    )}
                    </ListView>
                )
            }
            </div>
        );
    }
}

interface IBackgroundInfoProps {
    backgrounds: Background[];
    characterBackground: Background;
    languages: NormalLanguage[];
    onBackgroundChange: (b: Background) => void;
}

interface IBackgroundInfoState {

}

export class BackgroundInfo extends React.Component<IBackgroundInfoProps, IBackgroundInfoState> {
    constructor(props: IBackgroundInfoProps) {
        super(props);
    }
    render() {
        let ret = [
            <ListView 
                key="background-list-list"
                className="background-list"
                width={250}
                style={{
                    flex: null,
                }}
            >
                <ListViewHeader
                        background='rgba(0,0,0,0.33)'
                >
                    <Text>Background</Text>
                </ListViewHeader>
                {this.props.backgrounds.map(b => {
                    let selected = this.props.characterBackground.kind == b.kind;
                    return (
                    <ListViewRow
                        key={`background-item-${b.kind}`}
                        className={`backgound-item${selected ? ' selected' : ''}`}
                        style={{
                            borderBottom: '1px solid rgba(0,0,0,0.3)',
                            background: selected ? '#007bfa' : 'white',
                            color: selected ? 'white' : 'black',
                        }}
                        onClick={() => this.props.onBackgroundChange(b)}
                        margin="0px"
                    >
                        <Text
                        style={{
                            color: selected ? 'white' : 'black',
                        }}
                        >{b.kind}</Text>
                    </ListViewRow>);
                })}
            </ListView>,

            <ListView
                key="background-skill-prof-list"
                width={250}
                style={{
                    flex: null,
                }}
            >
            <ListViewHeader
                background='rgba(0,0,0,0.33)'
            >
                <Text>Skill Proficiencies</Text>
            </ListViewHeader>
            {this.props.characterBackground.skills.map(s => {
                return <ListViewRow
                            key={`background-skill-${s}`}
                            style={{
                                borderBottom: '1px solid rgba(0,0,0,0.3)',
                            }}
                            margin="0px"
                        >
                            <Text>{s}</Text>
                        </ListViewRow>
            })}
            </ListView>
        ];
        if (this.props.characterBackground.languages.length > 0) {
            ret.push(
                <ListView 
                    key="background-lang-list"
                    className="details-list"
                    width={250}
                    style={{
                        flex: null,
                    }}
                >
                <ListViewHeader
                    background='rgba(0,0,0,0.33)'
                >
                    <Text>{`Choose ${this.props.characterBackground.languages.length} Bonus Languages`}</Text>
                </ListViewHeader>
                {this.props.languages.map(l => {
                    let selected = this.props.characterBackground.languages.indexOf(l) > -1;
                    return (
                        <ListViewRow
                            key={`background-language-${l}`}
                            hidden={this.props.languages.length < 1}
                            className={`language-option${selected  ? 'selected' : ''}`}
                            style={{
                                borderBottom: '1px solid rgba(0,0,0,0.3)',
                                background: selected ? '#007bfa' : 'white',
                                color: selected ? 'white' : 'black',
                            }}
                            margin="0px"
                            onClick={() => {
                                if (this.props.characterBackground.languages.length == 0) {
                                    return;
                                }
                                let ret = Background.fromJson(this.props.characterBackground);
                                if (selected) {
                                    let idx = ret.languages.findIndex(la => la === l);
                                    ret.languages[idx] = null;
                                    return this.props.onBackgroundChange(ret);
                                }
                                if (this.props.characterBackground.languages.filter(la => la === null).length == 0) {
                                    return;
                                }
                                let lastNull = ret.languages.findIndex(la => la === null);
                                ret.languages[lastNull] = l;
                                return this.props.onBackgroundChange(ret);
                            }}
                        >
                            <Text
                            style={{
                                color: selected ? 'white' : 'black',
                            }}
                            >{l}</Text>
                        </ListViewRow>
                    );
                })}
                </ListView>
            )
        }
        if (this.props.characterBackground.toolProficiencies.length > 0) {
            ret.push(
            <ListView
                key={'background-tool-prof-list'}
            >
                <ListViewHeader
                        background='rgba(0,0,0,0.33)'
                >
                    <Text>Tools Proficiencies</Text>
                </ListViewHeader>
                {this.props.characterBackground.toolProficiencies.map((t, i) => {
                    let opts: Tool[] = this.props.characterBackground.toolOptions[i];
                    if (opts != null) {
                        return (
                            <ListViewSection
                                key={`tool-options-${i}`}
                            >
                                <ListViewSectionHeader
                                    background="rgba(0,0,0,0.1)"
                                >
                                    <Text>Choose One</Text>
                                </ListViewSectionHeader>
                                    {opts.map((o, j) => {
                                        let selected = o == t;
                                        return (
                                            <ListViewRow
                                                key={`choice-${i}-${j}`}
                                                style={{
                                                    background: selected ? '#007bfa' : 'white',
                                                    borderBottom: '1px solid rgba(0,0,0,0.3)',
                                                }}
                                                margin="0px"
                                                onClick={() => {
                                                    let ret = Background.fromJson(this.props.characterBackground);
                                                    ret.toolProficiencies[i] = o;
                                                    return this.props.onBackgroundChange(ret);
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: selected ? 'white' : 'black',
                                                    }}
                                                >{o}</Text>
                                            </ListViewRow>
                                        )
                                    })}
                            </ListViewSection>
                    )}
                    return (
                        <ListViewRow
                            key={`tool-prof-${t}`}
                            margin="0px"
                        >
                            <Text>{t}</Text>
                        </ListViewRow>)
                })}
            </ListView>);
        }
        return (
            <div className="background-info">
                {ret}
            </div>
        );
    }
}