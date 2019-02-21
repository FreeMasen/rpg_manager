import * as React from 'react';
import { Character } from '../models/character';
import { Class, ClassKind } from '../models/class';
import { Box, Text, ListView, ListViewHeader, ListViewRow } from 'react-desktop/macOs';
import {Barbarian, Bard, Cleric, Druid, Fighter, Monk, Paladin, Ranger, Rogue, Sorcerer, Warlock, Wizard, NewCharacter } from './icons';

interface ICharacterPickerProps {
    characters: Character[];
    characterSelected: (idx: number) => void;
    newCharacterClicked: () => void;
}

interface ICharacterPickerState {

}

export class CharacterPicker extends React.Component<ICharacterPickerProps, ICharacterPickerState> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ListView
                className="character-picker"
            >
            <ListViewHeader>
                <Text>
                    Choose Your Character
                </Text>
            </ListViewHeader>
                {this.props.characters.map((c, i) => {
                    return (
                        <CharacterPickerEntry 
                            onClick={() => this.props.characterSelected(i)}
                            key={`picker-entry-${i}`} 
                            name={c.name}
                            characterClass={c.characterClass}
                        />
                    )
                })}
                <CharacterPickerEntry
                    onClick={() => this.props.newCharacterClicked()}
                    name="Create a New Character"
                    characterClass={null}

                />
            </ListView>
        );
    }
}

interface ICharacterPickerEntryProps {
    name: string;
    characterClass: Class;
    onClick: () => void;
}

interface ICharacterPickerEntryState {
    hover: boolean;
}

export class CharacterPickerEntry extends React.Component<ICharacterPickerEntryProps, ICharacterPickerEntryState> {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
        }
        window.addEventListener('mouseenter', () => this.setState({hover: true}));
        window.addEventListener('mouseleave', () => this.setState({hover: false}));
    }
    render() {
        let chClass = this.characterClassString();
        return (
            <ListViewRow
                style={{
                    borderBottom: '1px solid rgba(0,0,0,0.2)',
                }}
                background={this.state.hover ? 'blue' : 'white'}
                onClick={() => this.props.onClick()}
            >
                
                <CharacterClassIcon 
                    classKind={this.props.characterClass && this.props.characterClass.name} 
                    fill={this.state.hover ? 'white' : null}
                />
                <Text 
                    marginLeft={5}
                    style={{lineHeight: '25px'}}
                    size={24}
                    title={`${this.props.name}\n${chClass.split('/').join('\n')}`}
                    color={this.state.hover ? 'white' : null}
                >{`${this.props.name} ${this.characterClassString()}`}</Text>
            </ListViewRow>
        );
    }

    characterClassString(): string {
        let c = this.props.characterClass;
        if (!c) {
            return '';
        }
        return `${c.name} (lvl${c.level})`;
    }
}

interface ICharacterClassIconProps {
    classKind: ClassKind;
    fill?: string;
}

interface ICharacterClassIconState {

}

export class CharacterClassIcon extends React.Component<ICharacterClassIconProps, ICharacterClassIconState> {
    constructor(props: ICharacterClassIconProps) {
        super(props);
    }
    render() {
        switch (this.props.classKind) {
            case ClassKind.Barbarian:
                return <Barbarian height="25px" width="25px" />;
            case ClassKind.Bard:
                return <Bard height="25px" width="25px" />;
            case ClassKind.Cleric:
                return <Cleric height="25px" width="25px" />;
            case ClassKind.Druid:
                return <Druid height="25px" width="25px" />;
            case ClassKind.Fighter:
                return <Fighter height="25px" width="25px" />;
            case ClassKind.Monk:
                return <Monk height="25px" width="25px" />;
            case ClassKind.Paladin:
                return <Paladin height="25px" width="25px" />;
            case ClassKind.Ranger:
                return <Ranger height="25px" width="25px" />;
            case ClassKind.Rogue:
                return <Rogue width="25px" height="25px" />;
            case ClassKind.Sorcerer:
                return <Sorcerer height="25px" width="25px" />;
            case ClassKind.Warlock:
                return <Warlock height="25px" width="25px" />;
            case ClassKind.Wizard:
                return <Wizard height="25px" width="25px" />;
            default:
                return <NewCharacter height="25px" width="25px" />;
        }
    }
}