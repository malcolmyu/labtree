import React from 'react'
import Reflux from 'reflux'
import cx from 'classnames'

import actions from '../actions/main.js'
import stores from '../stores/main.js'

const TreeView = React.createClass({
    displayName: 'TreeView',
    mixins: [Reflux.connect(stores, 'main')]
});