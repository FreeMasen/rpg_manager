import * as React from 'react';

interface ISkillRadioProps {
    checked: boolean;
    disabled: boolean;
    label: string;
    title: string;
    onClick: () => void;
}

interface ISkillRadioState {

}

export class SkillRadio extends React.Component<ISkillRadioProps, ISkillRadioState> {
    constructor(props: ISkillRadioProps) {
        super(props);
    }
    render() {
        return (
            <div
                onClick={() => {
                    if (!this.props.disabled) {
                        this.props.onClick();
                    }
                }}
                title={this.props.title}
                style={{
                    display: 'flex',
                    flexFlow: 'row',
                    width: '100%',
                }}
            >
                <div
                    style={{
                        width: 15,
                        height: 15,
                        margin: 0,
                        marginRight: 5,
                        padding: 0,
                        borderRadius: '50%',
                        backgroundColor: this.props.checked ? (this.props.disabled ? 'grey' : '#007bfa') : 'white',
                    }}
                >
                <div 
                    style={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        margin: 5,
                        backgroundColor: this.props.checked ? 'white'  : 'transparent',
                    }}
                />
                </div>
                <span
                    style={{
                        color: this.props.disabled ? 'grey' : 'black',
                        display: 'block',
                        whiteSpace: "nowrap",
                    }}
                >
                    {this.props.label}
                </span>
            </div>
        );
    }
}
