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
        let slots = this.props.dailyBreakdown;
        if (slots.length < 9) {
            slots = slots.concat(new Array(9 - slots.length).fill(0));
        }
        let value = slots.map((c, i) => 
            <td key={`daily-spell-value-${i}`} className="daily-breakdown-value">{c}</td>  
        );
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
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                            <th>7</th>
                            <th>8</th>
                            <th>9</th>
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