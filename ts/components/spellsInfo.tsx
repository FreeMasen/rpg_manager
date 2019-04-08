import * as React from 'react';
import { ClassKind } from '../models/class';
import { SpellSlots } from './spellSlots';
interface ISpellsInfoProps {
    classKind: ClassKind;
    profBonus: number;
    dcBase: number;
    abilityModifier: number;
    spellsKnown?: number;
    cantripsKnown?: number;
    casterLevel: number;
    dailyBreakdown: number[];
}

interface ISpellsInfoState {

}

export class SpellsInfo extends React.Component<ISpellsInfoProps, ISpellsInfoState> {
    constructor(props: ISpellsInfoProps) {
        super(props);
    }
    render() {
        let {dcBase, profBonus, abilityModifier, spellsKnown = 0, classKind, casterLevel} = this.props;
        let dc = dcBase + profBonus + abilityModifier;
        let atk = this.props.profBonus + this.props.abilityModifier;
        if (classKind === ClassKind.Cleric
            || classKind === ClassKind.Druid
            || classKind === ClassKind.Paladin
            || classKind === ClassKind.Wizard) {
            spellsKnown = casterLevel + abilityModifier
        }
        return (
            <div className="spells-info box">
                <span className="spells-info-header">
                    Caster Info
                </span>
                <div className="spells-dc box">
                    <span>DC</span>
                    <span>{dc}</span>
                </div>
                <div className="spells-attack-bonus box">
                    <span>Attack Bonus</span>
                    <span>{atk}</span>
                </div>
                {spellsKnown 
                ? <div className="spells-known box">
                    <span>Spells Known</span>
                    <span>{spellsKnown}</span>
                </div>
                : null}
                {this.props.cantripsKnown
                ? <div className="cantrips-known box">
                    <span>Cantrips Known</span>
                    <span>{this.props.cantripsKnown}</span>
                </div>
                : null}
                <SpellSlots
                     dailyBreakdown={this.props.dailyBreakdown}
                />
            </div>
        );
    }
}