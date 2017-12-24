import {decode as decodeJks} from 'jksreader';

function open(file, password) {
  if (file.format === 'jks-key') {
    return decodeJks(file.contents, password);
  }

  return null;
}

export default open;
