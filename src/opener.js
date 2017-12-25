import gost89 from 'gost89';
import {decode as decodeJks} from 'jksreader';

function open(file, password) {
  if (file.format === 'jks-key') {
    return decodeJks(file.contents, password);
  }
  if (file.format === 'IIT' || file.format === 'PBES2') {
    const algo = gost89.compat.algos();
    return algo.storeload(file, password);
  }

  return null;
}

export default open;
