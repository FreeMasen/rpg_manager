import * as React from 'react';

export interface IProps {
    style?: React.CSSProperties,
    className?: string;
    title?: string;
    onClick?: (ev: React.SyntheticEvent) => void;

}

export interface IListViewProps extends IProps {

}

export interface IListViewState {

}

export class ListView extends React.Component<IListViewProps, IListViewState> {
    render() {
        return (
            <div
                className={`${this.props.className || ''} common-list-view`}
                style={this.props.style}
                title={this.props.title}
                onClick={this.props.onClick}
            >
                {this.props.children}
            </div>
        )
    }
}

export interface IListViewHeaderProps extends IProps {
    style?: React.CSSProperties,
    className?: string;
}

export interface IListViewHeaderState {

}

export class ListViewHeader extends React.Component<IListViewHeaderProps, IListViewHeaderProps> {
    render() {
        return (
            <span
                className={`${this.props.className || ''} common-list-view-header`}
                style={this.props.style}
                title={this.props.title}
                onClick={this.props.onClick}
            >
                {this.props.children}
            </span>
        )
    }
}

interface IListViewRowProps extends IProps {

}

interface IListViewRowState {

}

export class ListViewRow extends React.Component<IListViewRowProps, IListViewRowState> {
    render() {
        return (
            <div
                style={this.props.style}
                className={`${this.props.className} common-list-view-row`}
                title={this.props.title}
                onClick={this.props.onClick}
            >
                {this.props.children}
            </div>
        )
    }
}