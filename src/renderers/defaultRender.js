import _ from 'lodash';

const setIndent = 4;
const convertToSpaces = num => ' '.repeat(num);

const defaultRender = (data, curentIndent = setIndent) => {
  const prefixSpace = '  ';
  const indent = convertToSpaces(curentIndent - 2);
  const constIndent = convertToSpaces(setIndent);

  const objectToString = (obj) => {
    const result = Object.keys(obj).map(key =>
      [`${constIndent}${indent}${prefixSpace}${key}: `,
        _.isObject(obj[key]) ?
          objectToString(obj[key]) : `${obj[key]}`].join(''));
    return (['{', ...result, `${convertToSpaces(curentIndent)}}`]).join('\n');
  };
  const getValue = value => [_.isObject(value) ? `${objectToString(value)}` : `${value}`].join('');

  const genString = (name, value, prefix = '  ') => [`${indent}${prefix}${name}: ${getValue(value)}`].join('\n');

  const selectFn = {
    nested: node => genString(node.name, defaultRender(node.value, curentIndent + setIndent)),
    original: node => genString(node.name, node.value),
    updated: node => [genString(node.name, node.value.new, '+ '), genString(node.name, node.value.old, '- ')].join('\n'),
    added: node => genString(node.name, node.value, '+ '),
    removed: node => genString(node.name, node.value, '- '),
  };

  const resultArray = data.map(node => selectFn[node.type](node));

  return ['{', ...resultArray, `${convertToSpaces(curentIndent - setIndent)}}`].join('\n');
};

export default defaultRender;
