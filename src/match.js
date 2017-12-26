import {isCA} from './utils';

function findMatch(key, other) {
  if (key.format === 'jks-key' && key.match) {
    return key.match;
  }
  if (key.type !== 'Priv') {
    return null;
  }
  return other.reduce((acc, file)=> {
    if (acc) {
      return acc;
    }
    if (file.format !== 'x509') {
      return acc;
    }
    if (isCA(file.extension.keyUsage) || !file.extension.ipn) {
      return acc;
    }

    file.pubkey_unpack && file.pubkey_unpack();
    if (key.pub_match(file.pubkey)) {
      return file;
    }
    return acc;
  }, null);
}

function makeMatches(material) {
  return material.map((part)=> {
    part.match = findMatch(part, material);
    return part;
  });
}

export {makeMatches};
