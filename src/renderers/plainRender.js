import _ from 'lodash';

const plainRender = (data, parent = '') => {
  const paretnPath = parent.slice(0, parent.length);

  const selectFn = {
    nested: node => [`${plainRender(node.children, `${parent}${node.name}.`)}`],
    original: () => '',
    updated: node => [`Property '${paretnPath}${node.name}' was updated. From '${node.valueBefore}' to '${node.valueAfter}'`],
    added: node => [`Property '${paretnPath}${node.name}' was added with ${_.isObject(node.valueAfter) ?
      'complex value' : `value: '${node.valueAfter}'`}`],
    removed: node => [`Property '${paretnPath}${node.name}' was removed`],
  };

  const result = data.map(node => selectFn[node.type](node));
  const resultArray = _.compact(result);
  return [...resultArray].join('\n');
};

export default plainRender;
