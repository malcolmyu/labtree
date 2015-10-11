import './css/main.scss'

import React from 'react'

import cm from './js/services/connect-mainpage.js'
import LabTree from './js/components/main.jsx'
import actions from './js/actions/main.js'

import {
  GLOBAL
} from './js/config.js'

function renderLabTree() {
  let container = document.createElement('div');

  if (cm.getProjectId()) {
    document.body.appendChild(container);
    React.render(<LabTree/>, container);
    cm.scrollTopAccessor(GLOBAL.SCROLL_TOP);
  }

  actions.setLeafSelected();
}

function recordScrollTop() {
  // 记录滚动条位置
  GLOBAL.SCROLL_TOP = cm.scrollTopAccessor();
}

renderLabTree();
document.addEventListener('page:load', renderLabTree);
document.addEventListener('page:fetch', recordScrollTop);