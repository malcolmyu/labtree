import React from 'react'
import Reflux from 'reflux'
import cx from 'classnames'

import cm from '../services/connect-mainpage.js'
import util from '../util.js'
import actions from '../actions/main.js'
import stores from '../stores/main.js'

import {
  GLOBAL
} from '../config.js'

const TreeView = React.createClass({
  displayName: 'TreeView',
  mixins: [Reflux.connect(stores, 'main')],

  componentWillMount() {
    GLOBAL.TREE_INFO_FETCHED || actions.fetchTreeInfo({});
  },

  visitLink(url, event) {
    event.preventDefault();
    let fn = `Turbolinks.visit('${url}')`;
    cm.executeScript(Function(fn));
  },

  // 获取子树内容
  fetchChildrenTree(leaf) {
    let ori = leaf.toJS();
    let id = ori.id;
    let path = util.getNodePath(ori.path, ori.name);

    if (ori.type !== 'blob') {
      if (!ori.toggle && !ori.children) {
        actions.fetchTreeInfo({id, path});
      } else {
        actions.toggleTreeBranch(id);
      }
    }
  },

  // 渲染单个树叶内容
  renderLeaf(leaf) {
    let type = leaf.get('type');
    let toggle = leaf.get('toggle');
    let url = leaf.get('url');
    let name = leaf.get('name');

    let isFolder = type !== 'blob';
    let children = null;

    let typeCx = cx({
      'folder-close': isFolder,
      'file-alt': !isFolder
    });
    let toggleCx = cx({
      'down': isFolder && toggle,
      'right': isFolder && !toggle
    });

    if (leaf.get('children')) {
      children = this.renderTrunk(leaf.get('children'), toggle);
    }

    return (
      <li>
        <div className="labtree-list-row"
             onClick={this.fetchChildrenTree.bind(this, leaf)}>&nbsp;</div>
        <span onClick={this.fetchChildrenTree.bind(this, leaf)}>
          <i className={`icon icon-caret-${toggleCx}`}></i>
          <i className={`icon icon-${typeCx}`}></i>
          <a href={url} onClick={this.visitLink.bind(this, url)}>{name}</a>
        </span>
        {children}
      </li>
    )
  },

  // 渲染树主干内容
  renderTrunk(data, toggle) {
    let ulCx = cx({'labtree-list-hidden': !toggle});
    let self = this;
    let list = data.size ? data.map(d => self.renderLeaf(d)) : '';

    return (
      <ul className={`labtree-list ${ulCx}`}>
        {list}
      </ul>
    )
  },

  render() {
    let tree = this.state.main.get('tree');

    return (
      <div className="labtree-view">
        {this.renderTrunk(tree, true)}
      </div>
    )
  }
});

export default TreeView