import jkurwa from 'jkurwa';
import gost89 from 'gost89';

function sign(key, cert, data) {
  const algo = gost89.compat.algos();
  const msg = new jkurwa.models.Message({
      type: 'signedData',
      cert: cert.contents
          ? jkurwa.models.Certificate.from_asn1(cert.contents)
          : cert,
      data,
      signer: key,
      hash: algo.hash,
  });
  return msg.as_asn1();
};

export {sign};
