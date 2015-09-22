'use strict';

import Reflux from 'reflux'
import { Map } from 'immutable'

import actions from '../actions/main.js'

import {
  STORAGE_KEY
} from '../config.js'

let logged = !!localStorage.getItem(STORAGE_KEY);

let state = {
  toggle: false,
  logged: logged,
  header: null
};

const store = Reflux.createStore({
  listenables: actions,

  // 数据初始化与同步
  getState() {
    return new Map({
      logged: state.logged,
      toggle: state.toggle,
      header: state.header
    });
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

  onLoginCompleted(ret) {
    let token = ret['private_token'];
    localStorage.setItem(STORAGE_KEY, token);
    state.logged = true;
    this.refreshState();
  },
  onLoginFailed() {
    // TODO
  },

  onFetchRepoInfoCompleted(ret) {
    state.header = new Map({
      name: ret.name,
      path: ret['path_with_namespace'],
      url: ret['web_url'],
      branch: ret['default_branch']
    });
    this.refreshState();
  },
  onFetchRepoInfoFailed() {
    // TODO
  }
});

export default store