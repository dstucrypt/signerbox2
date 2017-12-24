import jkurwa from 'jkurwa';
import {parse as parseJks} from 'jksreader';
import {isSigning, isJks} from './utils';

function readFile(file) {
  if (file.contents) {
    return Promise.resolve(file);
  }
  const reader = new FileReader();
  return new Promise((resolve, reject)=> {
    reader.onload = (event)=> resolve({
      name: file.name,
      contents: new Buffer(event.target.result),
    });
    reader.onerror = reject;
    reader.readAsArrayBuffer(file)
  });
}

function selectSigning(certs) {
  return certs.filter(isSigning)[0] || null;
}

function flattenJks(material) {
  return material.reduce((acc, file)=> {
    if (!file) {
      return acc;
    }
    if (file.key && file.certs) {
      const certs = file.certs.map((contents)=> jkurwa.guess_parse(contents));
      acc = [...acc, ...certs, {format: 'jks-key', contents: file.key, name: file.name, match: selectSigning(certs)}];
    }

    return acc;
  }, []);
}

function flattenMaterial(material) {
  return material.reduce((acc, file)=> {
    if (!file) {
      return acc;
    }
    if (file.material) {
      return [...acc, ...flattenJks(file.material)];
    }
    if (file.format === 'IIT' || file.format === 'x509') {
      return [...acc, file];
    }
    if (file.format === 'privkeys') {
      return [...acc, ...file.keys];
    }

    return acc;
  }, []);
}


function read(files) {
  return Promise.all(
    Array.prototype.map.call(files, (file)=> {
      return readFile(file)
        .then((file)=> isJks(file)
          ? ({...file, ...parseJks(file.contents)})
          : jkurwa.guess_parse(file.contents)
        )
        .catch((err)=> console.error(err));
    })
  )
  .then(flattenMaterial);
}
export default read;
