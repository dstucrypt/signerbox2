function post(queryUrL, data, cb) {
  return fetch(queryUrL, {body: data, method: 'POST', mode: 'cors'})
  .then((res)=> res.arrayBuffer())
  .then((res)=> (
    new Buffer(new Uint8Array(res))
  ));
}


export default post;
