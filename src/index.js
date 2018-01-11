// @flow

import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

const getObject = (file) => {
  const fileToString = fs.readFileSync(file, 'utf-8');
  const extension = path.extname(file).slice(1);
  return parsers[extension] ? parsers[extension](fileToString) : '';
};

const getIndent = (depthNum, prefixSapce, indent) => {
  if (depthNum === 0) {
    return prefixSapce;
  }
  return getIndent(depthNum - 1, `${prefixSapce}${indent}`, indent);
};

const genObj = (data) => {
  if (data instanceof Object) {
    return data;
  }
  return {};
};

const getPrefix = (data1, data2) => {
  if (data1 instanceof Object && data2 instanceof Object) {
    return '  ';
  }
  if (data1 instanceof Object) {
    return '- ';
  }
  return '+ ';
};

const genDiffParse = (firstObj, secondObj, depth = 0) => {
  const firstFileKeys = Object.keys(firstObj);
  const secondFileKeys = Object.keys(secondObj);
  const uniqKeys = _.union(firstFileKeys, secondFileKeys);
  return uniqKeys.map((key) => {
    const value1 = firstObj[key];
    const value2 = secondObj[key];
    if ((value1 instanceof Object) || (value2 instanceof Object)) {
      return {
        type: 'haschild',
        key,
        children: genDiffParse(genObj(value1), genObj(value2), depth + 1),
        prefix: getPrefix(value1, value2),
        depthNum: depth,
      };
    }
    if (value1 === value2) {
      return {
        type: 'original',
        key,
        value: value1,
        prefix: '  ',
        depthNum: depth,
      };
    }
    if ((key in firstObj) && (key in secondObj)) {
      return {
        type: 'changed',
        key,
        old: value1,
        oldPrefix: '- ',
        new: value2,
        newPrefix: '+ ',
        depthNum: depth,
      };
    }
    if (key in secondObj) {
      return {
        type: 'added',
        key,
        value: value2,
        prefix: '+ ',
        depthNum: depth,
      };
    }
    return {
      type: 'deleted',
      key,
      value: value1,
      prefix: '- ',
      depthNum: depth,
    };
  });
};

const render = (data) => {
  const resultArray = data.reduce((acc, obj) => {
    const key = obj.key ? obj.key : '';
    const prefixSpace = '  ';
    const indent = getIndent(obj.depthNum, prefixSpace, '    ');
    if (obj.type === 'haschild') {
      return [...acc, `${indent}${obj.prefix}${key}: {${render(obj.children)}${indent}${prefixSpace}}`];
    }
    if (obj.type === 'original') {
      return [...acc, `${indent}${obj.prefix}${key}: ${obj.value}`];
    }
    if (obj.type === 'changed') {
      return [...acc, `${indent}${obj.newPrefix}${key}: ${obj.new}\n${indent}${obj.oldPrefix}${key}: ${obj.old}`];
    }
    if (obj.type === 'added') {
      return [...acc, `${indent}${obj.prefix}${key}: ${obj.value}`];
    }
    return [...acc, `${indent}${obj.prefix}${key}: ${obj.value}`];
  }, []);
  return `\n${resultArray.join('\n')}\n`;
};

const gendiff = (firstfile, secondfile) => {
  const firstObject = getObject(firstfile);
  const secondObject = getObject(secondfile);
  // console.log(JSON.stringify(genDiffParse(firstObject, secondObject), null, '  '));
  const result = render(genDiffParse(firstObject, secondObject));
  return `{${result}}`;
};

export default gendiff;
