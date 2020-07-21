// TO BE MOVED into JK codebase
// Key usage bitmask (inverted):
// digital signature 0
// non repudiation 1
// key encipherment 2
// data extension.keyUsage 3
// key agreement 4
// ca key 5
// crl key 6
// encipher only 7
// decipher only 8

function canSign(data) {
  const lastByte = data[data.length - 1];
  return Boolean(lastByte & 0x80);
}

function canEnc(data) {
  const lastByte = data[data.length - 1];
  return Boolean(lastByte & (0x80 >> 4));
}

function isCA(data) {
  const lastByte = data[data.length - 1];
  return Boolean(lastByte & (0x80 >> 5));
}

function isKey(file) {
  return file && (file.format === 'IIT' || file.format === 'jks-key' || file.format === 'PBES2');
}

function isOpen(file) {
  return file && file.type === 'Priv';
}

function isSigning(file) {
  return file && file.format === 'x509' && canSign(file.extension.keyUsage);
}

function isJks(file) {
  return file.name.endsWith('.jks');
}

export {canSign, canEnc, isCA, isKey, isOpen, isSigning, isJks};
