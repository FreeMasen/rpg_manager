import * as React from 'react';
import { ListView, ListViewHeader, ListViewRow } from './common/ListView';
import { Spell } from '../models/spells';

interface ISpellsListProps {
    title: string;
    spells: Spell[];
}

interface ISpellsListState {
    spells: Spell[][];
    selectedSpell: number;
    selectedSpellLevel: number;
}

export class SpellsList extends React.Component<ISpellsListProps, ISpellsListState> {
    constructor(props: ISpellsListProps) {
        super(props);
        this.state = {
            selectedSpell: -1,
            selectedSpellLevel: -1,
            spells: [],
        };
    }
    componentWillReceiveProps(props: ISpellsListProps) {
        if (this.state.spells.length === 0 && props.spells.length > 0) {
            let spells = props.spells.reduce((acc, spell) => {
                acc[spell.level].push(spell);
                return acc;
            }, [[],[],[],[],[],[],[],[],[],[]]);
            this.setState({spells});
        }
    }
    render() {
        return (
            <div className="box spell-list">
                {this.renderInner()}
            </div>
        );
    }

    renderInner() {
        if (this.state.selectedSpell === -1) {
            return (
                <ListView>
                    <ListViewHeader className="spell-list-header">
                        {this.props.title}
                    </ListViewHeader>
                    {this.state.spells.map((list: Spell[], level: number) => {
                        return ([<ListViewHeader className="spell-list-level-header" key={`spell-entry-${level}`}>
                                    {`${level === 0 ? 'Cantrip' : `Level ${level}`} Spells`}
                                </ListViewHeader>].concat(
                                    list.map((s: Spell, i: number) => {
                                        return (
                                            <ListViewRow
                                                className="spell-list-entry"
                                                key={`spell-list-entry-${i}`}
                                                onClick={() => this.setState({selectedSpell: i, selectedSpellLevel: level})}
                                            >
                                                <span>{`${s.name}`}</span>
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