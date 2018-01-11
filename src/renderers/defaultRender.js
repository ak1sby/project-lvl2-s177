const getPrefix = (obj) => {
  switch (obj.operation) {
    case 'added':
      return '+ ';
    case 'removed':
      return '- ';
    case 'updated':
      return {
        new: '+ ',
        old: '- ',
      };
    default:
      return '  ';
  }
};

const defaultRender = (data, indent = '  ') => {
  const resultArray = data.reduce((acc, obj) => {
    const prefix = getPrefix(obj);
    const key = obj.name ? obj.name : '';
    if (obj.type === 'complex value') {
      return [...acc, `${indent}${prefix}${key}: {${defaultRender(obj.children, `${indent}    `)}${indent}  }`];
    }
    if (obj.operation === 'original') {
      return [...acc, `${indent}${prefix}${key}: ${obj.value}`];
    }
    if (obj.operation === 'updated') {
      return [...acc, `${indent}${prefix.new}${key}: ${obj.new}\n${indent}${prefix.old}${key}: ${obj.old}`];
    }
    if (obj.operation === 'added') {
      return [...acc, `${indent}${prefix}${key}: ${obj.value}`];
    }
    if (obj.operation === 'removed') {
      return [...acc, `${indent}${prefix}${key}: ${obj.value}`];
    }
    return [...acc];
  }, []);
  return `\n${resultArray.join('\n')}\n`;
};

const finaldefaultRender = data => `{${defaultRender(data, '  ')}}`;

export default finaldefaultRender;
