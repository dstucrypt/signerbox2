function invertPromise(promise) {
  return new Promise(
    (resolve, reject) => 
      promise.then(reject, resolve)
  );
}

function raceToSuccess(promises) {
  return invertPromise(
    Promise.all(
      promises.map(invertPromise)));
} 

module.exports = raceToSuccess;
