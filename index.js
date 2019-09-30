const checkAndRemoveSpaces = (str) => {
  try {
    if (/\s/.test(str)) {
      throw new Error('no space allowed in class names. All the spaces were removed.');
    }
  } catch (error) {
    console.log(error);
    
    for(let i = 0; i < str.length; i++) {
      str = str.replace(" ", "");
    }
    return str;
  }
  return str;
}

export default (...args) => {
  const arr = args.map(arg => {
    if (typeof arg !== 'string' && typeof arg !== 'object') {
      throw new Error('arguments should be a string or an object')
    }

    if (typeof arg === 'object' && arg !== null) {
      const arr = Object.keys(arg).map(key => {
        if (typeof arg[key] !== 'boolean') {
          throw new Error('the value in object should be the boolean')
        }
        if (/\s/.test(key)) {
          const oldKey = key;
          const newKey = checkAndRemoveSpaces(key)
          Object.defineProperty(arg, newKey,
            Object.getOwnPropertyDescriptor(arg, oldKey),
          )
          delete arg[oldKey];
          return newKey
        };
        return arg[key] ? key : null;
      });
      return arr.join(' ')
    }

    if (typeof arg === 'string') {
      return checkAndRemoveSpaces(arg);
    }
  })

  return arr.join(' ');
}