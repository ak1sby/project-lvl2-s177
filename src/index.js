// @flow

import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import getRender from './renderers';

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

const types = [
  {
    type: 'nested',
    check: (first, second, key) => (first[key] instanceof Object && second[key] instanceof Object)
      && !(first[key] instanceof Array && second[key] instanceof Array),
    process: (first, second, fun) => fun(first, second),
  },
  {
    type: 'original',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] === second[key])),
    process: first => _.identity(first),
  },
  {
    type: 'updated',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] !== second[key])),
    process: (first, second) => ({ old: first, new: second }),
  },
  {
    type: 'added',
    check: (first, second, key) => (!_.has(first, key) && _.has(second, key)),
    process: (first, second) => _.identity(second),
  },
  {
    type: 'removed',
    check: (first, second, key) => (_.has(first, key) && !_.has(second, key)),
    process: first => _.identity(first),
  },
];

const getAst = (firstObj = {}, secondObj = {}) => {
  const uniqKeys = _.union(Object.keys(firstObj), Object.keys(secondObj));
  return uniqKeys.map((key) => {
    const { type, process } = _.find(types, item => item.check(firstObj, secondObj, key));
    const value = process(firstObj[key], secondObj[key], getAst);
    return { name: key, type, value };
  });
};

const gendiff = (firstfile, secondfile, type = 'default') => {
  const firstObject = getObject(firstfile);
  const secondObject = getObject(secondfile);
  // console.log(JSON.stringify(genDiffParse(firstObject, secondObject), null, '  '));
  const render = getRender(type);
  const result = render(getAst(firstObject, secondObject));
  return `\n${result}\n`;
};

export default gendiff;
