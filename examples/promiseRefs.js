// Equivalent to Axios Call
const apiClientCall = () => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () =>
        resolve({
          id: '007',
          message: 'Am I working'
        }),
      3000
    );
  });
};

function execute() {
  const cachedPromise = apiClientCall();

  const callerA = cachedPromise;
  callerA
    .then((data) => {
      console.log('Got my copy: ', data);
    })
    .catch((error) => {
      console.error('Caught you: ', error);
    });

  return cachedPromise;
}

execute().then(
  (data) => {
    console.log('All is well: ', data);
  },
  (error) => {
    console.log('All is NOT well: ', error);
  }
);
