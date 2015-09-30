const handler = {
  getProjectId() {
    return document.body.getAttribute('data-project-id') || null;
  },
  getBranchName() {
    let repoRef = document.getElementById('repository_ref');
    return repoRef.value || null;
  },
  toggleContainer(toggle) {
    let action = toggle ? 'remove' : 'add';
    let containers = document.getElementsByClassName('container');
    let i = 0, len = containers.length;

    for (; i < len; i++) {
      containers[i].classList[action]('container-shim');
    }
  },
  executeScript(foo) {
    let code = `(${foo.toString()})()`;
    var script = document.createElement('script');

    script.textContent = code;
    document.body.appendChild(script);
    script.parentNode.removeChild(script);
  }
};

export default handler