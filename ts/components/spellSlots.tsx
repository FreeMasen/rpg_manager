import * as React from 'react';

interface IDailySpellsProps {
    dailyBreakdown: number[];
}

interface IDailySpellsState {

}

export class SpellSlots extends React.Component<IDailySpellsProps, IDailySpellsState> {
    constructor(props: IDailySpellsProps) {
        super(props);
    }
    render() {
        let {header, value} = this.props.dailyBreakdown.reduce((acc, c, i) => {
            acc.header.push(<th key={`daily-spell-header-${i}`} className="daily-breakdown-header">{i + 1}</th>);
            acc.value.push(<td key={`daily-spell-value-${i}`} className="daily-breakdown-value">{c}</td>);
            return acc;
        }, {header: [], value: []})
        return (
            <div className="daily-spells box">
                <div 
                    className="daily-spells-box-header"
                >
                    Spell Slots
                </div>
                <table
                    className="daily-spells-table"
                >
                    <thead
                        className="daily-spells-headers"
                    >
                        <tr>
                            {header}
                        </tr>
                    </thead>
                    <tbody
                        className="daily-spells-values"
                    >
                        <tr>
                            {value}
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}