import * as React from 'react';
import {Text, ListView, ListViewHeader, ListViewRow, ListViewSection, ListViewSectionHeader, Box, TitleBar, Button} from 'react-desktop';
import { Spell } from '../models/spells';

interface ISpellsListProps {
    title: string;
    spells: Spell[];
}

interface ISpellsListState {
    selectedSpell: number;
    selectedSpellLevel: number;
}

export class SpellsList extends React.Component<ISpellsListProps, ISpellsListState> {
    private spellLists: Spell[][];
    constructor(props: ISpellsListProps) {
        super(props);
        this.spellLists = this.props.spells.reduce((acc, spell) => {
            acc[spell.level].push(spell);
            return acc;
        }, [[],[],[],[],[],[],[],[],[],[]]);
        this.state = {
            selectedSpell: -1,
            selectedSpellLevel: -1,
        };
    }
    render() {
        return (
            <Box
                style={{
                    gridArea: 'spells',
                    marginLeft: 5,
                    marginTop: 5,
                    borderRadius: 5,
                }}
                padding="0px"
            >
                {this.renderInner()}
            </Box>
        );
    }

    renderInner() {
        if (this.state.selectedSpell === -1) {
            return (
                <ListView>
                    <ListViewHeader>{this.props.title}</ListViewHeader>
                    {this.spellLists.map((list: Spell[], level: number) => {
                        return (
                            <ListViewSection key={`spell-level-list-${level}`}>
                                <ListViewSectionHeader>
                                    <Text>{`${level === 0 ? 'Cantrip' : `Level ${level}`} Spells`}</Text>
                                </ListViewSectionHeader>
                                {list.map((s: Spell, i: number) => {
                                    return (
                                        <ListViewRow
                                            key={`spell-list-entry-${i}`}
                                            onClick={() => this.setState({selectedSpell: i, selectedSpellLevel: level})}
                                        >
                                            <Text>{`${s.name}`}</Text>
                                        </ListViewRow>
                                    );
                                })}
                            </ListViewSection>
                        );
                    })}
                </ListView>
            );
        } else {
            let selectedSpell = this.spellLists[this.state.selectedSpellLevel][this.state.selectedSpell];
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
                <TitleBar
                    key="spell-desc-title-bar"
                >
                <Button 
                    onClick={() => this.setState({selectedSpell: -1, selectedSpellLevel: -1})}
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
                    >arrow_back_ios</i></Button>
                    <Text>{selectedSpell.name}</Text>
                </TitleBar>,
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
                        return <Text
                            key={key}
                        >{`${this.props.title}: ${line}`}</Text>
                    } else {
                        return <Text 
                            key={key}
                            style={{marginLeft: 5}}>{line}</Text>
                    }
                })
                : <Text>{`${this.props.title}: ${this.props.value}`}</Text>}
            </div>
        );
    }
}