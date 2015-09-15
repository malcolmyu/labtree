'use strict';

import Reflux from 'reflux'
import Immutable, { Map } from 'immutable'

import base from './base.js'
import actions from '../actions/toggle.js'

const store = Reflux.createStore({
  mixins: [base],
  listenables: actions,

  init () {
    this.toggle = false;
  },

  onToggle () {

  }
});