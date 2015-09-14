'use strict'

import Reflux from 'reflux'
import { ajax } from 'jquery'
import Immutable, { Map } from 'immutable'

import LabtreeActions from '../actions/LabtreeActions.js'
let storeKey = 'labtree_private_key';
let key = localStorage.getItem(storeKey);

let state = {
    toggle: false,
    loginKey: key,
    header: {},
    treeData: []
};

let projectId, projectRef, projectPath, headerInfoDef;

let LabtreeStore = Reflux.createStore({
    listenables: [LabtreeActions],

    getInitialState() {
        return state;
    },

    onToggleSidebar(toggle) {
        this.trigger({toggle: !toggle});
    },
    onLogin(username, password) {
        let self = this;
        ajax({
            url: '/api/v3/session',
            type: 'POST',
            data: {
                login: username,
                password: password
            }
        }).done(res => {
            let token = res.private_token;
            localStorage.setItem(storeKey, token);
            self.trigger({loginKey: token});
        });
    },
    onFetchRepoInfo(id, br) {
        let header = {}, self = this;

        if (projectId !== id) {
            projectId = id;
            headerInfoDef = $.ajax({
                url: '/api/v3/projects/' + id,
                headers: {'PRIVATE-TOKEN': key}
            }).done((res) => {
                header.name = res.name;
                header.path = projectPath = res.path_with_namespace;
                header.url = res.web_url;
                header.branch = br || res.default_branch;
                self.trigger({header});
            });
        }
    },
    onFetchTreeInfo({path = '', ref = projectRef, parent = null, tree = null}) {
        let treeData, self = this,
            id = projectId,
            queryData = 'path=' + path + '&ref:' + ref,
            url = '/api/v3/projects/' + id + '/repository/tree?';

        projectRef = ref;

        headerInfoDef.then(function() {
            return $.ajax({
                url: url + queryData,
                headers: {'PRIVATE-TOKEN': key}
            });
        }).done(function(res) {
            treeData = res.map((d) => {
                d.toggle = false;

                if (d.type !== 'blob') {
                    d.url = '';
                    d.path = path;
                } else {
                    d.url = [
                        '', projectPath, 'blob', projectRef,
                        !path ? d.name : [path, d.name].join('/')
                    ].join('/');
                }
                return d;
            });

            if (parent) parent.children = [].concat(treeData);
            self.trigger({
                treeData: tree ? tree : treeData
            });
        });
    }
});

module.exports = LabtreeStore;
