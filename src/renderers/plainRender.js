const getOperation = (obj) => {
  switch (obj.operation) {
    case 'added':
      return 'added';
    case 'removed':
      return 'removed';
    case 'updated':
      return 'updated';
    default:
      return '  ';
  }
};

const plainRender = (data, parent = '') => {
  const resultArray = data.reduce((acc, obj) => {
    const key = obj.name ? obj.name : '';
    const paretnPath = parent.slice(0, parent.length);
    const operation = getOperation(obj);
    if (obj.type === 'complex value') {
      return [...acc, `${plainRender(obj.children, `${parent}${obj.name}.`)}`];
    }
    if (obj.operation === 'updated') {
      return [...acc, `Property '${paretnPath}${key}' was ${operation}. From  ${obj.old} to ${obj.new}`];
    }
    if (obj.operation === 'added') {
      return [...acc, `Property '${paretnPath}${key}' was ${operation} with value: ${obj.value}`];
    }
    if (obj.operation === 'removed') {
      return [...acc, `Property '${paretnPath}${key}' was ${operation}`];
    }
    return [...acc];
  }, []);
  return `${resultArray.join('\n')}`;
};

const finalplainRender = data => `{\n${plainRender(data, '')}\n}`;

export default finalplainRender;
