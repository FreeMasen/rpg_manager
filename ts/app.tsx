import * as React from 'react';
import * as ReactDom from 'react-dom';
import { CharacterSheet } from './components/characterSheet';
import { CharacterPicker } from './components/characterPicker';
import { Character, Wealth, ExpendableItem, MagicItem, Weapon } from './models/character';
import { Data } from './services/data';
import { Randomizer } from './services/randomizer';
import { CharacterCreator } from './components/newCharacter';
import { AbilityScores } from './models/abilityScore';
import { TitleBar, Text, Button } from 'react-desktop';
import { Race } from './models/race';
import { Class } from './models/class';
import { Background, BackgroundKind } from './models/background';

interface IAppState {
    currentView: View,
    characters: Character[];
    selectedCharacter: number;
}

export class App extends React.Component<{}, IAppState> {
    private data: Data;
    constructor(props) {
        super(props);
        this.data = new Data();
        this.state = {
            currentView: View.CharacterPicker,
            characters: [],
            selectedCharacter: -1,
        }
    }

    componentDidMount() {
        this.data.getCharacters().then(characters => this.setState({characters}));
    }

    render() {
        return (
            <div className="app-container">
                <TitleBar 
                    style={{
                        display: 'flex',
                        flexFlow: 'row',
                        alignItems: 'center',
                    }}
                    className="top-bar"
                >
                    <Button 
                        className="back-button"
                        onClick={() => this.goBack()}
                        style={{
                            display: `${this.state.currentView == View.CharacterPicker ? 'none' : 'block'}`,
                            textAlign: 'center',
                        }}
                    ><i style={{
                        fontFamily: 'Material Icons',
                        fontSize: 18,
                        lineHeight: 2,
                        
                    }}>arrow_back_ios</i></Button>
                    <Text 
                        className="top-bar-title"
                        style={{
                            width: 'calc(90% - 50px)',
                            textAlign: 'center',
                            fontSize: 36,
                            marginLeft: this.state.currentView == View.CharacterPicker ? 25 : 0,
                        }}
                    >
                        DnD Character Manager
                    </Text>
                </TitleBar>
                { this.renderView() }
            </div>
        );
    }

    renderView() {
        switch (this.state.currentView) {
            case View.CharacterPicker:
                return (<CharacterPicker 
                    characters={this.state.characters}
                    characterSelected={i => this.switchView(View.CharacterSheet, i)}
                    newCharacterClicked={() => {
                        this.switchView(View.CharacterCreator)
                    }}
                />)
            case View.CharacterSheet:
                return (<CharacterSheet 
                            character={this.state.characters[this.state.selectedCharacter] || new Character()} 
                            adjustDamage={newDmg => this.adjustSelectedCharacterDamage(newDmg)}
                            adjustTempHP={newHp => this.adjustSelectedCharacterTempHP(newHp)}
                            adjustExp={newExp => this.adjustCharacterExperience(newExp)}
                            adjustMoney={wealth => this.adjustCharacterWealth(wealth)}
                            adjustScores={scores => this.adjustCharacterScores(scores)}
                            adjustExpendables={expends => this.adjustCharacterExpends(expends)}
                            adjustMagics={magics => this.adjustCharacterMagicItems(magics)}
                            adjustWeapons={newWeapons => this.adjustCharacterWeapons(newWeapons)}
                            adjustInspiration={newValue => this.adjustCharacterInspiration(newValue)}
                        />);
            case View.CharacterCreator:
                    return (<CharacterCreator 
                            onSave={ch => this.newCharacter(ch)}
                        />)
        }
    }

    switchView(newView: View, meta?: number) {
        let newState;
        switch (newView) {
            case View.CharacterPicker:
                newState = {currentView: newView, selectedCharacter: -1};
            break;
            case View.CharacterSheet:
                newState = {currentView: newView, selectedCharacter: meta};
            break;
            case View.CharacterCreator:
                newState = {currentView: newView, selectedCharacter: -1};
        }
        this.setState(newState);
    }

    goBack() {
        switch (this.state.currentView) {
            case View.CharacterPicker:
                return;
            case View.CharacterSheet:
            case View.CharacterCreator:
                this.switchView(View.CharacterPicker);
            break;
        }
    }
    adjustSelectedCharacterDamage(newDmg: number) {
        this.setState((prev, props) => {
            let ch = prev.characters[this.state.selectedCharacter];
            ch.damage = newDmg;
            return Object.apply(prev, {character: ch});
        }, () => {
            this.data.saveCharacters(this.state.characters)
        });
    }
    adjustSelectedCharacterTempHP(newHP: number) {
        this.setState((prev, props) => {
            let ch = prev.characters[this.state.selectedCharacter];
            ch.tempHp = newHP;
            return Object.apply(prev, {character: ch});
        }, () => {
            this.data.saveCharacters(this.state.characters)
        });
    }
    adjustCharacterExperience(newExp: number) {
        this.setState((prev, props) => {
            let ch = prev.characters[this.state.selectedCharacter];
            ch.experience = newExp;
            return Object.apply(prev, {character: ch});
        }, () => {
            this.data.saveCharacters(this.state.characters);
        });
    }
    adjustCharacterWealth(wealth: Wealth) {
        this.setState((prev, props) => {
            let ch = prev.characters[this.state.selectedCharacter];
            ch.wealth = wealth;
            return Object.apply(prev, {character: ch})
        }, () => {
            this.data.saveCharacters(this.state.characters);
        });
    }
    adjustCharacterScores(scores: AbilityScores) {
        this.setState((prev, props) => {
            let ch = prev.characters[this.state.selectedCharacter];
            ch.abilityScores = ch.abilityScores.add(scores);
            return Object.apply(prev, {character: ch})
        }, () => {
            this.data.saveCharacters(this.state.characters);
        });
    }
    adjustCharacterExpends(expends: ExpendableItem[]) {
        this.setState((prev, props) => {
            let ch = prev.characters[this.state.selectedCharacter];
            ch.expendables = expends;
            return Object.apply(prev, {character: ch})
        }, () => {
            this.data.saveCharacters(this.state.characters);
        });
    }
    adjustCharacterMagicItems(magics: MagicItem[]) {
        this.setState((prev, props) => {
            let ch = prev.characters[this.state.selectedCharacter];
            ch.magicItems = magics;
            return Object.apply(prev, {character: ch})
        }, () => {
            this.data.saveCharacters(this.state.characters);
        });
    }
    adjustCharacterWeapons(weapons: Weapon[]) {
        this.setState((prev, props) => {
            let ch = prev.characters[this.state.selectedCharacter];
            ch.weapons = weapons;
            return Object.apply(prev, {character: ch})
        }, () => {
            this.data.saveCharacters(this.state.characters);
        });
    }
    adjustCharacterInspiration(inspiration: number) {
        this.setState((prev, props) => {
            let ch = prev.characters[this.state.selectedCharacter];
            ch.inspiration = inspiration;
            return Object.apply(prev, {character: ch})
        }, () => {
            this.data.saveCharacters(this.state.characters);
        });
    }

    newCharacter(ch: Character) {
        this.setState((prev, props) => {
            let newChs = prev.characters.concat([ch]);
            return {characters: newChs, currentView: View.CharacterPicker};
        }, () => {
            this.data.saveCharacters(this.state.characters);
        });
    }
}

enum View {
    CharacterPicker,
    CharacterSheet,
    CharacterCreator,
}

(function() {
    let app = document.getElementById('app');
    ReactDom.render(<App/>, app);
})();
