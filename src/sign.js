import jkurwa from 'jkurwa';
import gost89 from 'gost89';
import makeTsp from './tsp';

const algo = gost89.compat.algos();

function signHelper(key, cert, data, dataHash, tspB) {
  const msg = new jkurwa.models.Message({
      type: 'signedData',
      cert: cert.contents
          ? jkurwa.models.Certificate.from_asn1(cert.contents)
          : cert,
      data,
      dataHash,
      tspB,
      signer: key,
      hash: algo.hash,
  });
  return msg.as_asn1();
};

function sign(key, cert, data) {
  const dataHash = algo.hash(data);
  return makeTsp(cert, dataHash)
    .catch(()=> null)
    .then((tspB)=> signHelper(key, cert, data, dataHash, tspB));
}

export {sign};
