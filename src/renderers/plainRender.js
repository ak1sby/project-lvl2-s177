import _ from 'lodash';

const plainRender = (data, parent = '') => {
  const paretnPath = parent.slice(0, parent.length);

  const objectToString = (obj) => {
    const result = Object.keys(obj).map(key =>
      [_.isObject(obj[key]) ?
        objectToString(obj[key]) : `${obj[key]}`]);
    return [...result];
  };

  const getValue = value => [_.isObject(value) ? `${objectToString(value)}` : `${value}`];

  const selectFn = {
    nested: node => [`${plainRender(node.value, `${parent}${node.name}.`)}`],
    original: () => '',
    updated: node => [`Property '${paretnPath}${node.name}' was updated. From  ${getValue(node.value.old)} to ${getValue(node.value.new)}`],
    added: node => [`Property '${paretnPath}${node.name}' was added with value: ${getValue(node.value)}`],
    removed: node => [`Property '${paretnPath}${node.name}' was removed`],
  };

  const result = data.map(node => selectFn[node.type](node));
  const resultArray = _.compact(result);
  return [...resultArray].join('\n');
};

export default plainRender;
