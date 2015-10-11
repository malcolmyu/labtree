'use strict';

import Reflux from 'reflux'
import Immutable, { Map } from 'immutable'

import actions from '../actions/main.js'
import util from'../util.js'
import cm from '../services/connect-mainpage.js'

import {
  STORAGE_KEY,
  GLOBAL
} from '../config.js'

let logged = !!localStorage.getItem(STORAGE_KEY);

let state = {
  toggle: false,
  loaded: false,
  logged: logged,
  header: null,
  tip: '',
  tree: []
};

const store = Reflux.createStore({
  listenables: actions,

  // 数据初始化与同步
  getState() {
    return Immutable.fromJS(state);
  },
  getInitialState() {
    return this.getState();
  },
  refreshState() {
    this.trigger(this.getState());
  },

  // action监听
  onToggle() {
    state.toggle = !state.toggle;
    this.refreshState();
  },

  onToggleTreeBranch(id) {
    let tree = state.tree.toJS();
    let node = getLeafById(tree, id);
    if (node) {
      node.toggle = !node.toggle;
    }
    state.tree = Immutable.fromJS(tree);
    this.refreshState();
  },

  onSetTreeBranchLoading(id) {
    let tree = state.tree.toJS();
    let node = getLeafById(tree, id);
    if (node) {
      node.loaded = false;
    }
    state.tree = Immutable.fromJS(tree);
    this.refreshState();
  },

  onSetLeafSelected() {
    if (state.tree.toJS) {
      let tree = state.tree.toJS();
      markSelected(tree);
      state.tree = Immutable.fromJS(tree);
      this.refreshState();
    }
  },

  // 登录事件处理
  onLoginCompleted(res) {
    let ret = res.body;
    let token = ret['private_token'];
    localStorage.setItem(STORAGE_KEY, token);
    state.logged = true;
    this.refreshState();
  },
  onLoginFailed(res) {
    if (typeof res === 'string') {
      state.tip = res;
    } else {
      state.tip = '校验失败';
    }
    this.refreshState();
  },

  // 获取repo信息事件处理
  onFetchRepoInfoCompleted(res) {
    let ret = res.body;
    let branch = cm.getBranchName() || ret['default_branch'];
    let path = ret['path_with_namespace'];
    let groupName = ret.namespace.name;

    if (path === GLOBAL.PROJECT && branch === GLOBAL.BRANCH) {
      GLOBAL.REPO_INFO_Q.resolve({branch, path});
    } else {
      GLOBAL.PROJECT = path;
      GLOBAL.BRANCH = branch;
      GLOBAL.REPO_INFO_Q.resolve({branch, path});
      GLOBAL.REPO_INFO_Q = Promise.defer();
      GLOBAL.REPO_INFO_Q.resolve({branch, path});
    }

    state.loaded = true;
    state.header = new Map({
      groupName,
      groupUrl: `/groups/${groupName}`,
      repoName: ret.name,
      path, branch
    });
    this.refreshState();
  },
  onFetchRepoInfoFailed() {
    // TODO
  },

  // 获取tree信息事件处理
  onFetchTreeInfoCompleted(ret) {
    let [res, parentId, path] = ret;
    let node = null;
    let self = this;

    GLOBAL.REPO_INFO_Q.promise.then(d => {
      // 填充树的节点数据
      let treeData = res.map(leaf => {
        let pathName = util.getNodePath(path, leaf.name);
        let url = window.location.href;

        leaf.toggle = false;
        if (leaf.type !== 'blob') {
          leaf.url = `/${d.path}/tree/${d.branch}/${pathName}`;
          leaf.path = path;
          leaf.loaded = true;
        } else {
          leaf.url = `/${d.path}/blob/${d.branch}/${pathName}`;
        }
        // 添加高亮
        let reg = new RegExp(`${leaf.url}$`);
        leaf.selected = reg.test(url);
        return leaf;
      });

      if (!parentId) {
        state.tree = Immutable.fromJS(treeData);
        GLOBAL.TREE_INFO_FETCHED = true;
      } else {
        let tree = state.tree.toJS();
        if (node = getLeafById(tree, parentId)) {
          node.children = treeData;
          node.toggle = !node.toggle;
          node.loaded = true;
        }
        state.tree = Immutable.fromJS(tree);
      }
      self.refreshState();
    });
  },
  onFetchTreeInfoFailed() {
    // TODO
  }
});

// 根据id值找到对应的树节点
function getLeafById(tree, id) {
  let i = 0;
  let len = tree.length;
  for (;i < len; i++) {
    let v = tree[i];
    if (id === v.id) {
      return v;
    } else if (v.children) {
      let node = getLeafById(v.children, id);
      if (node) {
        return node;
      }
    }
  }
}

function markSelected(data) {
  data.forEach(leaf => {
    let url = window.location.href;
    let reg = new RegExp(`${leaf.url}$`);
    leaf.selected = reg.test(url);

    if (leaf.children) {
      markSelected(leaf.children);
    }
  });
}

export default store