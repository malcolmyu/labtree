import React from 'react'
import Reflux from 'reflux'

// 引入组件
import LabTreeHeader from './header.js'
import ToggleButton from './toggle-button.js'
import LoginForm from './login-form.js'

import stores from '../stores/main.js'

const LabTree = React.createClass({
  displayName: 'LabTree',
  mixins: [Reflux.connect(store, 'main')]
});