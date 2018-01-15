import _ from 'lodash';

const setIndent = 4;
const convertToSpaces = num => ' '.repeat(num);

const defaultRender = (data, curentIndent = setIndent) => {
  const prefixSpace = '  ';
  const indent = convertToSpaces(curentIndent - 2);
  const constIndent = convertToSpaces(setIndent);

  const valueToString = (value) => {
    const objectToString = (obj) => {
      const result = Object.keys(obj)
        .map(key =>
          `{\n${constIndent}${indent}${prefixSpace}${key}: ${_.isObject(obj[key]) ? objectToString(obj[key]) : obj[key]}\n${indent}${prefixSpace}}`);
      return result;
    };
    return (_.isObject(value) ? `${objectToString(value)}` : `${value}`);
  };

  const genString = (name, value, prefix = '  ') => (`${indent}${prefix}${name}: ${valueToString(value)}`);

  const selectFn = {
    nested: node => genString(node.name, defaultRender(node.children, curentIndent + setIndent)),
    original: node => genString(node.name, node.valueAfter),
    updated: node => [genString(node.name, node.valueAfter, '+ '), genString(node.name, node.valueBefore, '- ')].join('\n'),
    added: node => genString(node.name, node.valueAfter, '+ '),
    removed: node => genString(node.name, node.valueBefore, '- '),
  };

  const resultArray = data.map(node => selectFn[node.type](node));

  return ['{', ...resultArray, `${convertToSpaces(curentIndent - setIndent)}}`].join('\n');
};

export default defaultRender;
