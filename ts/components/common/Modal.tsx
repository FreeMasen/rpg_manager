import * as React from 'react';

interface IModalProps {

}

interface IModalState {

}

export class Modal extends React.Component<IModalProps, IModalState> {
    render() {
        return (
            <div className="common-modal">
                {this.props.children}
            </div>
        )
    }
}