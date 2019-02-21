import * as React from 'react';
import {Text, ListView, ListViewHeader, ListViewRow, ListViewSection, ListViewSectionHeader, Box} from 'react-desktop';
import { Spell } from '../models/spells';

interface ISpellsListProps {
    title: string;
    spells: Spell[];
}

interface ISpellsListState {

}

export class SpellsList extends React.Component<ISpellsListProps, ISpellsListState> {
    constructor(props: ISpellsListProps) {
        super(props);
    }
    render() {
        let listOfLists: Spell[][] = this.props.spells.reduce((acc, spell) => {
            acc[spell.level].push(spell);
            return acc;
        }, [[],[],[],[],[],[],[],[],[],[]]);
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
                <ListView>
                    <ListViewHeader>{this.props.title}</ListViewHeader>
                    {listOfLists.map((list: Spell[], level: number) => {
                        return (
                            <ListViewSection key={`spell-level-list-${level}`}>
                                <ListViewSectionHeader>
                                    <Text>{`${level === 0 ? 'Cantrip' : `Level ${level}`} Spells`}</Text>
                                </ListViewSectionHeader>
                                {list.map((s: Spell, i: number) => {
                                    return (
                                        <ListViewRow>
                                            <Text>{`${s.name}`}</Text>
                                        </ListViewRow>
                                    );
                                })}
                            </ListViewSection>
                        );
                    })}
                </ListView>
            </Box>
        );
    }
}