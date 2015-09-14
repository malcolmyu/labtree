import React from 'react'
import Reflux from 'reflux'
import cx from 'classnames'

import store from '../stores/LabtreeStores.js'
import actions from '../actions/LabtreeActions.js'

let TreeView = React.createClass({
    mixins: [Reflux.connect(store)],

    componentWillMount() {
        let ref = document.getElementById('repository_ref'),
            branch = ref.value;

        actions.fetchTreeInfo({ref: branch});
    },

    fetchChildren(nodeData) {
        let path = !nodeData.path ? nodeData.name :
            [nodeData.path, nodeData.name].join('/');

        nodeData.toggle = !nodeData.toggle;

        if (nodeData.type === 'blob') return;
        if (nodeData.toggle && !nodeData.children) {
            actions.fetchTreeInfo({
                path: path,
                parent: nodeData,
                tree: this.state.treeData
            });
        } else {
            this.setState({
                treeData: this.state.treeData
            });
        }
    },

    renderTree(data, toggle) {
        let self = this,
            list = data.map((d) => {
            let isFolder = d.type !== 'blob',
                typeIcon = isFolder ?
                    <i className="icon icon-folder-close"></i> :
                    <i className="icon icon-file-alt"></i>,
                toggleIcon, children;

            switch (true) {
                case isFolder && d.toggle:
                    toggleIcon = <i className="icon icon-caret-down"></i>;
                    break;
                case isFolder && !d.toggle:
                    toggleIcon = <i className="icon icon-caret-right"></i>;
                    break;
                default:
                    toggleIcon = <i className="icon"></i>;
                    break;
            }

            if (d.children) {
                children = this.renderTree(d.children, d.toggle);
            }

            return (
                <li>
                    <span onClick={self.fetchChildren.bind(self, d)}>
                        {toggleIcon}
                        {typeIcon}
                        <a href={d.url}>{d.name}</a>
                    </span>
                    {children}
                </li>
            );
        }),
        style = cx({
            'labtree-list': 'labtree-list',
            'labtree-list-hidden': !toggle
        });

        return (
            <ul className={style}>
                {list}
            </ul>
        );
    },

    render() {
        return (
            <div className="labtree-view">
                {this.renderTree(this.state.treeData, true)}
            </div>
        );
    }
});

module.exports = TreeView;