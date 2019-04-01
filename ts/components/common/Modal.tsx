import * as React from 'react';

interface IModalProps {
    style?: React.CSSProperties;
    className?: string;
}

interface IModalState {

}

export class Modal extends React.Component<IModalProps, IModalState> {
    render() {
        return (
            <div className={`${this.props.className || ''} common-modal`}
            style={this.props.style}>
                {this.props.children}
            </div>
        )
    }
}