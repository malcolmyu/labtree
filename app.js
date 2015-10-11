import './css/main.scss'

import React from 'react'

import cm from './js/services/connect-mainpage.js'
import LabTree from './js/components/main.jsx'
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
}

function initWidget() {
  // 记录滚动条位置
  GLOBAL.SCROLL_TOP = cm.scrollTopAccessor();
  // 高亮当前对应文件路径
}

renderLabTree();
document.addEventListener('page:load', renderLabTree);
document.addEventListener('page:fetch', initWidget);