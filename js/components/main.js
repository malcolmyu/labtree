import React from 'react'
import Reflux from 'reflux'

import loginStore from '../stores/login.js'

const LabTree = React.createClass({

  mixins: [Reflux.connect(loginStore, 'isLogin')]

});