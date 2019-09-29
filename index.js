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
      if (typeof arg[Object.keys(arg)] !== 'boolean') {
        throw new Error('the value in object should be the boolean')
      }

      if (/\s/.test(Object.keys(arg))) {
        const oldKey = Object.keys(arg).join();
        const newKey = checkAndRemoveSpaces(Object.keys(arg).join())
        Object.defineProperty(arg, newKey,
          Object.getOwnPropertyDescriptor(arg, oldKey),
        )
        delete arg[oldKey];
      };

      return Object.keys(arg).filter(className => arg[className]).join(' ');
    }

    if (typeof arg === 'string') {
      return checkAndRemoveSpaces(arg);
    }
  })

  return arr.join(' ');
}