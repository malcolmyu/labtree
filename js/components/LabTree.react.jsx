import $ from 'jquery'
import React from 'react'
import Reflux from 'reflux'

import store from '../stores/LabtreeStores.js'
import actions from '../actions/LabtreeActions.js'
import cx from 'classnames'

import LabTreeLogin from './Login.react.jsx'
import LabTreeHeader from './Header.react.jsx'
import TreeView from './TreeView.react.jsx'

let LabTree = React.createClass({

    mixins: [Reflux.connect(store)],

    toggleSidebar() {
        let action = !this.state.toggle ? 'addClass' : 'removeClass';

        // TODO: 修正为container宽度减少300
        $('.container')[action]('container-shim');
        actions.toggleSidebar(this.state.toggle);
    },

    render() {
        let navClasses = cx({
            'labtree': true,
            'labtree-hidden': !this.state.toggle
        });
        let iconClasses = cx({
            'icon-caret-left': this.state.toggle,
            'icon-caret-right': !this.state.toggle
        });

        let header = this.state.loginKey ? <LabTreeHeader/> :
            <div className="labtree-header">用户验证</div>;
        let body = this.state.loginKey ? <TreeView/> : <LabTreeLogin/>;
        return (
            <div>
                <nav className={navClasses}>
                    <a onClick={this.toggleSidebar}
                       className="labtree-toggle btn">
                        <i className={iconClasses}></i>
                    </a>
                    {header}
                    {body}
                </nav>
            </div>
        );
    }
});

module.exports = LabTree;