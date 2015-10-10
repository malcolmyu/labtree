import React from 'react/addons'
import Reflux from 'reflux'

import stores from '../stores/main.js'
import actions from '../actions/main.js'

const LoginForm = React.createClass({
  displayName: 'LoginForm',
  mixins: [
    React.addons.LinkedStateMixin,
    Reflux.connect(stores, 'main')
  ],

  getInitialState: function() {
    return {username: '', password: ''};
  },
  login(e) {
    e.preventDefault();
    actions.login(this.state.username, this.state.password);
  },

  render() {
    let tip = this.state.main.get('tip');
    return (
      <form onSubmit={this.login} className="labtree-form">
        <div className="labtree-form-row">
          <label>用户名</label>
          <input className="form-control"
                 type="text" required
                 valueLink={this.linkState('username')}/>
        </div>
        <div className="labtree-form-row">
          <label>密码</label>
          <input className="form-control"
                 type="password" required
                 valueLink={this.linkState('password')}/>
        </div>
        <div className="labtree-form-row">
          <button type="submit"
                  className="btn btn-save"
                  onClick={this.login}>登录</button>
          <span className="labtree-form-tips">{tip}</span>
        </div>
      </form>
    );
  }
});

module.exports = LoginForm;