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
  }
};

export default handler