import $ from 'jquery'

const handler = {
  getProjectId() {
    return $('body').attr('data-project-id') || null;
  },
  getBranchName() {
    return $('#repository_ref').val() || null;
  },
  toggleContainer(toggle) {
    let action = toggle ? 'removeClass' : 'addClass';
    $('.container')[action]('container-shim');
  },
  renderLabTree(render) {
    let $container = $('<div></div>');
    let $body = $('body');

    return () => {
      if (handler.getProjectId()) {
        $body.append($container);
        render($container[0]);
      }
    }
  },
  $on(target, callback) {
    $(document).on(target, callback);
  }
};

export default handler