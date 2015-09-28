import './css/main.scss'

import React from 'react'

import cm from './js/services/connect-mainpage.js'
import LabTree from './js/components/main.jsx'

let render = cm.renderLabTree(
    container => React.render(<LabTree/>, container)
);

render();
cm.$on('page:update', render);