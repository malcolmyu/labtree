import React from 'react'
import Reflux from 'reflux'
import cx from 'classnames'

import cm from '../services/connect-mainpage.js'
import actions from '../actions/main.js'
import stores from '../stores/main.js'

const ToggleButton = React.createClass({
  displayName: 'ToggleButton',
  mixins: [Reflux.connect(stores, 'main')],

  toggleSidebar () {
    let toggle = this.state.main.get('toggle');
    cm.toggleContainer(toggle);
    actions.toggle();
  },

  render () {
    let toggle = this.state.main.get('toggle');
    let iconCx = cx({
      'left': toggle, 'right': !toggle
    });

    return (
      <a onClick={this.toggleSidebar}
         className="labtree-toggle btn">
        <i className={`icon-caret-${iconCx}`}></i>
      </a>
    )
  }
});

export default ToggleButton