import rfc3161 from 'jkurwa/lib/spec/rfc3161-tsp';
import post from './post';

function parse(data) {
  let rtsp = rfc3161.TimeStampResp.decode(data, 'der');
  if (rtsp.status.status !== 'granted') {
    console.log('oops');
    return;
  }
  rtsp = rfc3161.TSTInfo.decode(rtsp.timeStampToken.content.contentInfo.content);
  console.log('resp body', rtsp);
  return data.slice(9);
}

function makeTsp(cert, hash) {
  const tsp = rfc3161.TimeStampReq.encode({
    version: 1,
    messageImprint: {
      hashAlgorithm: {
        algorithm: 'Gost34311',
      },
      hashedMessage: hash,
    },
  }, 'der');

  return post('https://cors-anywhere.herokuapp.com/' + cert.extension.tsp, tsp)
  .then(parse)

}

export default makeTsp;
