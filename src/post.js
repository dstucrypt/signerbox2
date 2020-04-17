function post(queryUrL, data, cb) {
  // X-Requested-With header enables request to work with cors anywhere, details - https://cors-anywhere.herokuapp.com/
  return fetch(queryUrL, {body: data, method: 'POST', mode: 'cors', headers:{'X-Requested-With': null}})
  .then((res)=> res.arrayBuffer())
  .then((res)=> (
    new Buffer(new Uint8Array(res))
  ));
}


export default post;
