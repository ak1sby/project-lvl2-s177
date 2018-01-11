import _ from 'lodash';

const genObj = (data) => {
  if (data instanceof Object) {
    return data;
  }
  return {};
};

const getOperation = (data1, data2) => {
  if (data1 instanceof Object && data2 instanceof Object) {
    return 'original';
  }
  if (data1 instanceof Object) {
    return 'removed';
  }
  return 'added';
};

const genDiffParse = (firstObj, secondObj, depth = 0, parent = '') => {
  const firstFileKeys = Object.keys(firstObj);
  const secondFileKeys = Object.keys(secondObj);
  const uniqKeys = _.union(firstFileKeys, secondFileKeys);
  return uniqKeys.map((key) => {
    const value1 = firstObj[key];
    const value2 = secondObj[key];
    if ((value1 instanceof Object) || (value2 instanceof Object)) {
      return {
        name: key,
        type: 'complex value',
        operation: getOperation(value1, value2),
        children: genDiffParse(genObj(value1), genObj(value2), depth + 1, key),
        depth,
        parent,
      };
    }
    if (value1 === value2) {
      return {
        name: key,
        type: 'value',
        operation: 'original',
        value: value1,
        depth,
        parent,
      };
    }
    if ((key in firstObj) && (key in secondObj)) {
      return {
        name: key,
        type: 'value',
        operation: 'updated',
        old: value1,
        new: value2,
        depth,
        parent,
      };
    }
    if (key in secondObj) {
      return {
        name: key,
        type: 'value',
        operation: 'added',
        value: value2,
        depth,
        parent,
      };
    }
    return {
      name: key,
      type: 'value',
      operation: 'removed',
      value: value1,
      depth,
      parent,
    };
  });
};

export default genDiffParse;
