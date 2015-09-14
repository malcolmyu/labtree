import $ from 'jquery'
import React from 'react'
import Reflux from 'reflux'
import store from '../stores/LabtreeStores.js'
import actions from '../actions/LabtreeActions.js'

let HeaderRepo = React.createClass({
    render() {
        return (
            <div className="labtree-header-repo">
                <i className="icon icon-book"></i>
                <a href={this.props.header.url}>
                    {this.props.header.path}
                </a>
            </div>
        );
    }
});

let HeaderBranch = React.createClass({
    render() {
        return (
            <div className="labtree-header-branch">
                <i className="icon icon-code-fork"></i>
                <span title={this.props.header.branch}>
                    {this.props.header.branch}
                </span>
            </div>
        );
    }
});

let Header = React.createClass({
    mixins: [Reflux.connect(store)],

    componentWillMount() {
        let projectId = $('body').attr('data-project-id'),
            branch = $('#repository_ref').val() || 'master';

        if (projectId) {
            actions.fetchRepoInfo(projectId, branch);
        }
    },
    render() {
        return (
            <div className="labtree-header">
                <HeaderRepo header={this.state.header}/>
                <HeaderBranch header={this.state.header}/>
            </div>
        );
    }
});

module.exports = Header;