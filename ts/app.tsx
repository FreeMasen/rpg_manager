import * as React from 'react';
import * as ReactDom from 'react-dom';
import { CharacterSheet } from './components/characterSheet';
import { CharacterPicker } from './components/characterPicker';
import { Character, Wealth, ExpendableItem, MagicItem, Weapon } from './models/character';
import { Data } from './services/data';
import { CharacterCreator } from './components/newCharacter';
import { AbilityScores, AbilityScore, AbilityKind } from './models/abilityScore';
import { Spell } from './models/spells';
import { SkillKind } from './models/skills';

interface IAppState {
    currentView: View,
    characters: Character[];
    selectedCharacter: number;
    spellList: Spell[];
}

export class App extends React.Component<{}, IAppState> {
    private data: Data;
    constructor(props) {
        super(props);
        (window as any).data = this.data = new Data();

        this.state = {
            currentView: View.CharacterPicker,
            characters: [],
            selectedCharacter: -1,
            spellList: [],
        }
    }

    componentDidMount() {
        this.data.getCharacters().then(characters => {
            this.setState({characters})
        });
    }

    render() {
        return (
            <div className="app-container">
                <div 
                    style={{
                        display: 'flex',
                        flexFlow: 'row',
                        alignItems: 'center',
                    }}
                    className="top-bar"
                >
                    <button 
                        className="back-button"
                        onClick={() => this.goBack()}
                        style={{
                            display: `${this.state.currentView == View.CharacterPicker ? 'none' : 'block'}`,
                            textAlign: 'center',
                            padding: '0px',
                        }}
                    ><i style={{
                        fontFamily: 'Material Icons',
                        fontSize: 18,
                        lineHeight: 2,
                        
                    }}>arrow_back_ios</i></button>
                    <span 
                        className="top-bar-title"
                        style={{
                            width: 'calc(90% - 50px)',
                            textAlign: 'center',
                            fontSize: 36,
                            marginLeft: this.state.currentView == View.CharacterPicker ? 25 : 0,
                        }}
                    >
                        DnD Character Manager
                    </span>
                </div>
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
                    newCharacterClicked={() => this.switchView(View.CharacterCreator)}
                />)
            case View.CharacterSheet:
                let ch = this.state.characters[this.state.selectedCharacter];
                return (<CharacterSheet 
                            character={ch} 
                            adjustDamage={newDmg => this.adjustSelectedCharacterDamage(newDmg)}
                            adjustTempHP={newHp => this.adjustSelectedCharacterTempHP(newHp)}
                            adjustExp={newExp => this.adjustCharacterExperience(newExp)}
                            adjustMoney={wealth => this.adjustCharacterWealth(wealth)}
                            adjustScores={scores => this.adjustCharacterScores(scores)}
                            adjustExpendables={expends => this.adjustCharacterExpends(expends)}
                            adjustMagics={magics => this.adjustCharacterMagicItems(magics)}
                            adjustWeapons={newWeapons => this.adjustCharacterWeapons(newWeapons)}
                            adjustInspiration={async newValue => await this.adjustCharacterInspiration(newValue)}
                            adjustClassSkills={async newSkills => await this.adjustClassSkills(newSkills)}
                            classFeatureOptionSelected={async (name, idx) => await this.updateCharacterFeature(name, idx)}
                            spellList={this.state.spellList}
                        />);
            case View.CharacterCreator:
                    return (<CharacterCreator 
                            onSave={ch => this.newCharacter(ch)}
                            onCancel={() => this.switchView(View.CharacterPicker)}
                            data={this.data}
                        />)
            case View.Loading:
                    return (<div style={{width: "100%", height: "100%"}}></div>)
        }
    }

    switchView(newView: View, meta?: number) {
        switch (newView) {
            case View.CharacterPicker:
                this.setState({currentView: newView, selectedCharacter: -1, spellList: []});
            break;
            case View.CharacterSheet:
                this.setState({currentView: newView, selectedCharacter: meta});
                this.data.getSpellsForClass(this.state.characters[meta].characterClass.name).then(spells => {
                    this.setState({currentView: newView, selectedCharacter: meta, spellList: spells});
                });
            break;
            case View.CharacterCreator:
                this.setState({currentView: newView, selectedCharacter: -1, spellList: []});
            break;
        }
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
        let ch: Character;
        this.setState((prev, props) => {
            ch = Character.fromJson(prev.characters[this.state.selectedCharacter]);
            ch.damage = newDmg;
            return {characters: prev.characters.map(c => {
                if (c.id === ch.id) {
                    return ch;
                }
                return c
            })}
        }, async () => {
            await this.data.saveCharacter(ch);
        });
    }
    adjustSelectedCharacterTempHP(newHP: number) {
        let ch: Character;
        this.setState((prev, props) => {
            ch = Character.fromJson(prev.characters[this.state.selectedCharacter]);
            ch.tempHp = newHP;
            return {characters: prev.characters.map(c => {
                if (c.id === ch.id) {
                    return ch;
                }
                return c
            })}
        }, async () => {
            await this.data.saveCharacter(ch);
        });
    }
    async adjustCharacterExperience(newExp: number) {
        let ch: Character;
        ch = Character.fromJson(this.state.characters[this.state.selectedCharacter]);
        ch.experience = newExp;
        ch = await this.data.saveCharacter(ch);
        this.setState((prev, props) => {
            return {characters: prev.characters.map(c => {
                if (c.id === ch.id) {
                    return ch;
                }
                return c
            })}
        });
    }
    adjustCharacterWealth(wealth: Wealth) {
        let ch: Character;
        this.setState((prev, props) => {
            ch = Character.fromJson(prev.characters[this.state.selectedCharacter]);
            ch.wealth = wealth;
            return {characters: prev.characters.map(c => {
                if (c.id === ch.id) {
                    return ch;
                }
                return c
            })}
        }, async () => {
            await this.data.saveCharacter(ch);
        });
    }
    adjustCharacterScores(scores: AbilityScore[]) {
        let ch: Character;
        this.setState((prev, props) => {
            ch = Character.fromJson(prev.characters[this.state.selectedCharacter]);
            ch.characterClass.bonusAbilityScores = ch.characterClass.bonusAbilityScores.map((s, i) => {
                let newValue = scores.find(a => a.kind === s[0]);
                if (newValue) {
                    return [newValue.kind, newValue.value] as [AbilityKind, number];
                }
                return s;
            })
            return {characters: prev.characters.map(c => {
                if (c.id === ch.id) {
                    return ch;
                }
                return c
            })}
        }, async () => {
            await this.data.saveCharacter(ch);
        });
    }
    adjustCharacterExpends(expends: ExpendableItem[]) {
        let ch: Character;
        this.setState((prev, props) => {
            ch = Character.fromJson(prev.characters[this.state.selectedCharacter]);
            ch.expendables = expends;
            return {characters: prev.characters.map(c => {
                if (c.id === ch.id) {
                    return ch;
                }
                return c
            })}
        }, async () => {
            await this.data.saveCharacter(ch);
        });
    }
    adjustCharacterMagicItems(magics: MagicItem[]) {
        let ch: Character;
        this.setState((prev, props) => {
            ch = Character.fromJson(prev.characters[this.state.selectedCharacter]);
            ch.magicItems = magics;
            return {characters: prev.characters.map(c => {
                if (c.id === ch.id) {
                    return ch;
                }
                return c
            })}
        }, async () => {
            await this.data.saveCharacter(ch);
        });
    }
    adjustCharacterWeapons(weapons: Weapon[]) {
        let ch: Character;
        this.setState((prev, props) => {
            ch = Character.fromJson(prev.characters[this.state.selectedCharacter]);
            ch.weapons = weapons;
            return {characters: prev.characters.map(c => {
                if (c.id === ch.id) {
                    return ch;
                }
                return c
            })}
        }, async () => {
            await this.data.saveCharacter(ch);
        });
    }
    adjustCharacterInspiration(inspiration: number) {
        let ch: Character;
        this.setState((prev, props) => {
            ch = Character.fromJson(prev.characters[this.state.selectedCharacter]);
            ch.inspiration = inspiration;
            return {characters: prev.characters.map(c => {
                if (c.id === ch.id) {
                    return ch;
                }
                return c
            })}
        }, async () => {
            await this.data.saveCharacter(ch);
        });
    }
 
    async adjustClassSkills(newSkills: SkillKind[]) {
        let ch: Character;
        this.setState((prev, props) => {
            ch = this.state.characters[this.state.selectedCharacter];
            ch.characterClass.selectedSkills.push(...newSkills);
            return {characters: prev.characters.map(c => {
                if (c.id === ch.id) {
                    return ch;
                }
                return c
            })}
        }, async () => {
            await this.data.saveCharacter(ch);
        })
    }

    async updateCharacterFeature(name: string, idx: number) {
        let ch = this.state.characters[this.state.selectedCharacter];
        ch.characterClass.classDetails.chooseFeatureOption(name, idx);
        ch = await this.data.saveCharacter(ch);
        this.setState((prev, props) => {
            return {characters: prev.characters.map(c => {
                if (c.id === ch.id) {
                    return ch;
                }
                return c
            })}
        });
    }

    newCharacter(ch: Character) {
        this.setState((prev, props) => {
            let newChs = prev.characters.concat([ch]);
            return {characters: newChs, currentView: View.CharacterPicker};
        }, async () => {
            await this.data.addCharacter(ch);
        });
    }
}

enum View {
    CharacterPicker,
    CharacterSheet,
    CharacterCreator,
    Loading,
}

(function() {
    let app = document.getElementById('app');
    ReactDom.render(<App/>, app);
})();
