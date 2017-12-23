import jkurwa from 'jkurwa';
import {parse as parseJks} from 'jksreader';

function isJks(file) {
  return file.name.endsWith('.jks');
}

function readFile(file) {
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

function flattenJks(material) {
  return material.reduce((acc, file)=> {
    if (!file) {
      return acc;
    }
    if (file.certs) {
      acc = [...acc, ...file.certs.map((contents)=> jkurwa.guess_parse(contents))];
    }
    if (file.key) {
      acc = [...acc, {format: 'jks-key', contents: file.key, name: file.name}];
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
