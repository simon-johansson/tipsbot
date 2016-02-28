
// Taken from https://muffinresearch.co.uk/removing-leading-whitespace-in-es6-template-strings/
export const singleLineString = (strings, ...values) => {
  let output = '';
  for (let i = 0; i < values.length; i++) {
    output += strings[i] + values[i];
  }
  output += strings[values.length];

  let lines = output.split(/(?:\r\n|\n|\r)/);

  return lines.map((line) => {
    return line.replace(/^\s+/gm, '');
  }).join(' ').trim();
};

export const print = (target, name, descriptor) => {
  const method = descriptor.value;

  descriptor.value = function (...args) {
    const msg = method.apply(this, args);
    console.log(singleLineString`${msg}`);
    args[0] ? console.log(err) : void(0);
    return this;
  }
}

export const exit = (target, name, descriptor) => {
  const method = descriptor.value;

  descriptor.value = function (...args) {
    method.apply(this, args);
    process.exit(1);
    return this;
  }
}

export const promiseWrapper = (fn, ...args) => {
  return new Promise((resolve, reject) => {
    try {
      fn.apply(this, args);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
