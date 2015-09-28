import React from 'react/addons'
import actions from '../actions/main.js'

const LoginForm = React.createClass({
  displayName: 'LoginForm',
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {username: '', password: ''};
  },
  login(e) {
    e.preventDefault();
    actions.login(this.state.username, this.state.password);
  },

  render() {
    return (
      <form onSubmit={this.login} className="labtree-form">
        <div className="labtree-form-row">
          <label>用户名</label>
          <input type="text" required
                 valueLink={this.linkState('username')}/>
        </div>
        <div className="labtree-form-row">
          <label>密码</label>
          <input type="password" required
                 valueLink={this.linkState('password')}/>
        </div>
        <div className="labtree-form-row">
          <button type="submit"
                  className="btn"
                  onClick={this.login}>登录</button>
        </div>
      </form>
    );
  }
});

module.exports = LoginForm;