import './css/main.scss'

import $ from 'jquery'
import React from 'react'
import LabTree from './js/components/LabTree.react.jsx'

function renderLabTree() {
    let container = document.createElement('div');
    document.body.appendChild(container);

    if ($('body').attr('data-project-id')) {
        React.render(<LabTree/>, container);
    }
}

$(document).on('page:update', renderLabTree);