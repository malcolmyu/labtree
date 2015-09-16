'use strict';

import Reflux from 'reflux'
import { Map } from 'immutable'

import actions from '../actions/toggle.js'

import {
  STORAGE_KEY
} from '../config.js'

const store = Reflux.createStore({
  listenables: actions,

  // 数据初始化与同步
  init () {
    this.logged = false;
    this.toggle = false;
    this.header = null;
  },
  getState() {
    return new Map({
      logged: this.logged,
      toggle: this.toggle,
      header: this.header
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
    this.toggle = !this.toggle;
    this.refreshState();
  },
  onLogin(ret) {
    let token = ret['private_token'];
    localStorage.setItem(STORAGE_KEY, token);
    this.logged = true;
    this.refreshState();
  },
  onFetchRepoInfo(ret) {
    this.header = new Map({
      name: ret.name,
      path: ret['path_with_name'],
      url: ret['web_url'],
      branch: res['default_branch']
    });
    this.refreshState();
  }
});