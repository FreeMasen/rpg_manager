import * as React from 'react';
import { ListView, ListViewHeader, ListViewRow } from './common/ListView';
import { Spell } from '../models/spells';
import { CasterInfo } from '../models/casterInfo';

interface ISpellsListProps {
    title: string;
    spells: Spell[];
    casterInfo: CasterInfo;
    saveKnownSpells: (spells: Spell[]) => Promise<void>;
}

interface ISpellsListState {
    spells: Spell[][];
    selectedSpell: number;
    selectedSpellLevel: number;
    isEditing: boolean;
    pendingSpells: Spell[];
}

export class SpellsList extends React.Component<ISpellsListProps, ISpellsListState> {
    constructor(props: ISpellsListProps) {
        super(props);
        this.state = {
            selectedSpell: -1,
            selectedSpellLevel: -1,
            spells: this.mapSpells(props.spells || []),
            isEditing: false,
            pendingSpells: props.casterInfo._knownSpells.map(s => s),
        };
    }
    componentWillReceiveProps(props: ISpellsListProps) {
        if (this.state.spells.length === 0 && props.spells.length > 0) {            
            let spells = this.mapSpells(props.spells);
            this.setState({spells});
        }
    }

    mapSpells(spells: Spell[]): Spell[][] {
        return this.props.spells.reduce((acc, spell) => {
            acc[spell.level].push(spell);
            return acc;
        }, [[],[],[],[],[],[],[],[],[],[]]);
    }
    render() {
        return (
            <div className="box spell-list">
                <span className="spell-list-header">
                    {this.props.title}
                    <button
                        className="edit-spells-button"
                        onClick={() => {
                            if (!this.state.isEditing) {
                                return this.setState({isEditing: true});
                            }
                            this.props.saveKnownSpells(
                                this.state.pendingSpells
                                ).then(() => {
                                    this.setState({isEditing: false, pendingSpells: this.props.casterInfo._knownSpells})
                                })
                    }}
                    >{this.state.isEditing 
                        ? 'Save'
                        : 'Edit'
                    }</button>
                    {this.state.isEditing
                    ? <button
                        className="edit-spells-button"
                        onClick={() => {
                            this.setState({isEditing: false,pendingSpells: this.props.casterInfo._knownSpells.map(s => s)})
                        }}
                    >Cancel</button>
                    : null}
                </span>
                {this.renderInner()}
            </div>
        );
    }

    renderInner() {        
        if (this.state.selectedSpell < 0) {
            let spells = (this.state.isEditing ? this.state.spells : this.props.casterInfo.knownSpells) || [];     
            return (
                
                <ListView>
                    {spells.map((list: Spell[], level: number) => {          
                        let available = false;
                        if (this.state.isEditing) {
                            if (level < 1) {
                                available = this.state.pendingSpells.filter(s => s.level < 1).length < this.props.casterInfo.cantripCount;
                            } else {
                                console.log(level, this.props.casterInfo.spellSlots.length, this.state.pendingSpells.filter(s => s.level > 0), this.props.casterInfo.spellCount)
                                available = level <= this.props.casterInfo.spellSlots.length && this.state.pendingSpells.filter(s => s.level > 0).length < this.props.casterInfo.spellCount;
                            }
                        }        
                        return ([<ListViewHeader className="spell-list-level-header" key={`spell-entry-${level}`}>
                                    {`${level === 0 ? 'Cantrips' : `Level ${level}`} Spells`}
                                </ListViewHeader>].concat(
                                    list.map((s: Spell, i: number) => {
                                        let selected = this.state.pendingSpells.find(p => s.name === p.name) != null;
                                        let showButton = false;
                                        if (this.state.isEditing) {
                                            if (selected) {
                                                showButton = true;
                                            } else {
                                                showButton = available;
                                            }
                                        }
                                        return (
                                            <ListViewRow
                                                className="spell-list-entry"
                                                key={`spell-list-entry-${i}`}
                                            >
                                                <span>{`${s.name}`}</span>
                                                <button 
                                                    onClick={() => this.setState({selectedSpell: i, selectedSpellLevel: level})}
                                                    className="edit-spells-button"
                                                >
                                                    <i style={{display: 'block'}}>error_outline</i>
                                                </button>
                                                {showButton
                                                ? <button
                                                    className="edit-spells-button"
                                                    onClick={() => this.spellToggled(s, selected)}
                                                >
                                                    {selected ? 'Remove' : 'Add'}
                                                </button>
                                                : null}
                                            </ListViewRow>
                                        );
                                    })
                                )
                        );
                    })}
                </ListView>
            );
        } else {
            let selectedSpell = this.state.spells[this.state.selectedSpellLevel][this.state.selectedSpell];
            let components = '';
            if (selectedSpell.verbalRequirement) {
                components += 'V';
            }
            if (selectedSpell.somaticRequirement) {
                if (components.length != 0) {
                    components += '/S';
                } else {
                    components += 'S';
                }
            }
            if (selectedSpell.materialRequirement.length > 0) {
                if (components.length != 0) {
                    components += `/M (${selectedSpell.materialRequirement.join(', ')})`;
                } else {
                    components == `M (${selectedSpell.materialRequirement.join(', ')})`;
                }
            }
            return [
                <ListViewHeader
                    key="spell-desc-title-bar"
                >
                <button 
                    onClick={() => this.setState({selectedSpell: -1, selectedSpellLevel: -1})}
                    style={{
                        marginRight: 5,
                        spanAlign: 'center',
                        height: 20,
                        width: 20,
                    }}
                >
                    <i style={{
                        fontFamily: 'Material Icons',
                        fontSize: 10,
                        lineHeight: 1,
                    }}
                    >arrow_back_ios</i></button>
                    <span>{selectedSpell.name}</span>
                </ListViewHeader>,
                <SpellDescPart
                    key="spell-desc-components"
                    title="Components"
                    value={components}
                    multiLineValue={false}
                />,
                <SpellDescPart
                    key="spell-desc-time"
                    title="Casting Time"
                    value={selectedSpell.castingTime}
                    multiLineValue={false}
                />,
                <SpellDescPart
                    key="spell-desc-duration"
                    title="Effect Duration"
                    value={selectedSpell.duration}
                    multiLineValue={false}
                />,
                <SpellDescPart
                    key="spell-desc-desc"
                    title="Desc"
                    value={selectedSpell.desc}
                    multiLineValue={true}
                />
            ];
        }
    }

    spellToggled(spell: Spell, remove: boolean) {
        this.setState((prev, props) => {
            let pendingSpells;
            if (remove) {
                pendingSpells = prev.pendingSpells.filter(s => s.name !== spell.name);
            } else {
                pendingSpells = prev.pendingSpells.concat([spell]);
            }
            return {pendingSpells}
        });
    }
}

interface ISpellDescPartProps {
    title: string;
    value: string;
    multiLineValue: boolean;
}

interface ISpellDescPartState {

}

export class SpellDescPart extends React.Component<ISpellDescPartProps, ISpellDescPartState> {
    constructor(props: ISpellDescPartProps) {
        super(props);
    }
    render() {
        return (
            <div>
                {this.props.multiLineValue ? 
                    this.props.value.split('\n').map((line, i) => {
                        let key = `desc-line${i}`;
                    if (i === 0) {
                        return <span
                            key={key}
                        >{`${this.props.title}: ${line}`}</span>
                    } else {
                        return <span 
                            key={key}
                            style={{marginLeft: 5}}>{line}</span>
                    }
                })
                : <span>{`${this.props.title}: ${this.props.value}`}</span>}
            </div>
        );
    }
}