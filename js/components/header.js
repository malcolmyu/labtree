import React from 'react'
import Reflux from 'reflux'

import cm from '../services/connect-mainpage.js'
import store from '../stores/main.js'
import actions from '../actions/main.js'

const Header = React.createClass({
  displayName: 'LabTreeHeader',
  mixins: [Reflux.connect(store, 'main')],

  componentWillMount() {
    let projectId;
    if (projectId = cm.getProjectId()) {
      actions.fetchRepoInfo(projectId);
    }
  },

  render() {
    let br = cm.getBranchName();
    let header = this.state.main.get('header');
    let url = header ? header.get('url') : '#';
    let path = header ? header.get('path') : '';
    let branch = br || (header ? header.get('branch') : 'master');

    return (
      <div className="labtree-header">
        <div className="labtree-header-repo">
          <i className="icon icon-book"></i>
          <a href={url}>{path}</a>
        </div>
        <div className="labtree-header-branch">
          <i className="icon icon-code-fork"></i>
          <span title={branch}>{branch}</span>
        </div>
      </div>
    );
  }
});

export default Header