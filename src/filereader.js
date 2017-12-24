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

export {readFile};
