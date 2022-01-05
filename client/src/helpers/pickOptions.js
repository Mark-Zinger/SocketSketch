const pickOptions = (...options) => tool => {
    const result = {};
  options.forEach( property => tool.hasOwnProperty(property) && (result[property] = tool[property]));
  return result;
}

export default pickOptions;