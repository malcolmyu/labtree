const handler = {
  getNodePath(path, name) {
    return path ? `${path}/${name}` : name;
  }
};

export default handler