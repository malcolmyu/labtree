import './css/main.scss'

import React from 'react'

import cm from './js/services/connect-mainpage.js'
import LabTree from './js/components/main.jsx'

function renderLabTree() {
  let container = document.createElement('div');

  if (cm.getProjectId()) {
    document.body.appendChild(container);
    React.render(<LabTree/>, container);
  }
}

renderLabTree();
document.addEventListener('page:load', renderLabTree);