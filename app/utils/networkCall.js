// @flow

const networkCall = (
  requestName: string,
  reponseData: Object,
  response: (data: Object) => void,
  responseTime: ?number = null,
): (() => void) => {
  const random = (Math.random() % 10) * 1000;
  const handler = setTimeout(() => {
    console.log('reponse key', requestName);
    response(reponseData);
  }, responseTime || random);

  return () => {
    clearTimeout(handler);
  };
};

export {networkCall};
