import React from 'react'
import Reflux from 'reflux'
import cx from 'classnames'

// 引入组件
import LabTreeHeader from './header.jsx'
import ToggleButton from './toggle-button.jsx'
import LoginForm from './login-form.jsx'
import TreeView from './tree-view.jsx'

import stores from '../stores/main.js'

const LabTree = React.createClass({
  displayName: 'LabTree',
  mixins: [Reflux.connect(stores, 'main')],

  render() {
    let toggle = this.state.main.get('toggle');
    let logged = this.state.main.get('logged');

    let navCx = cx({'labtree-hidden': !toggle});

    let header = logged ? <LabTreeHeader/> :
      (
        <div className="labtree-header">
          <span className="labtree-header-title">用户验证</span>
        </div>
      );
    let body = logged ? <TreeView/>: <LoginForm/>;

    return (
      <div>
        <nav className={`labtree ${navCx}`}>
          <ToggleButton/>
          {header}
          {body}
        </nav>
      </div>
    )
  }
});

export default LabTree