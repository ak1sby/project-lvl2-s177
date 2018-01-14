import _ from 'lodash';

const plainRender = (data, parent = '') => {
  const paretnPath = parent.slice(0, parent.length);

  const valueToString = (value) => {
    const objectToString = (obj) => {
      const result = Object.keys(obj)
        .map(key =>
          (_.isObject(obj[key]) ? objectToString(obj[key]) : 'complex value'));
      return [...result];
    };
    return (_.isObject(value) ? `${objectToString(value)}` : `${value}`);
  };

  const selectFn = {
    nested: node => [`${plainRender(node.children, `${parent}${node.name}.`)}`],
    original: () => '',
    updated: node => [`Property '${paretnPath}${node.name}' was updated. From '${valueToString(node.valueBefore)}' to '${valueToString(node.valueAfter)}'`],
    added: node => [`Property '${paretnPath}${node.name}' was added with ${_.isObject(node.valueAfter) ?
      'complex value' : `value: '${valueToString(node.valueAfter)}'`}`],
    removed: node => [`Property '${paretnPath}${node.name}' was removed`],
  };

  const result = data.map(node => selectFn[node.type](node));
  const resultArray = _.compact(result);
  return [...resultArray].join('\n');
};

export default plainRender;

const objectToString = (obj) => {
  const result = Object.keys(obj)
    .map(key =>
      (_.isObject(obj[key]) ? objectToString(obj[key]) : 'complex value'));
  return [...result];
};
