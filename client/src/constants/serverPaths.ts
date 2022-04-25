const audioPaths = {
  LIST: '/audio/list',
  UPSTREAM: '/audio/upstream',
  DOWNSTREAM: (id: string) => `/audio/downstream/${id}`,
};

const serverPaths = {
  AUDIO: audioPaths,
};

export default serverPaths;
