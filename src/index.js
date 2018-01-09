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

const gendiff = (firstfile, secondfile) => {
  const firstObject = getObject(firstfile);
  const secondObject = getObject(secondfile);
  const firstFileKeys = Object.keys(firstObject);
  const secondFileKeys = Object.keys(secondObject);
  const uniqKeys = _.union(firstFileKeys, secondFileKeys);
  const resultArray = uniqKeys.reduce((acc, key) => {
    if (key in firstObject && key in secondObject) {
      if (firstObject[key] === secondObject[key]) {
        return [...acc, `  ${key}: ${firstObject[key]}`];
      }
      return [...acc, `+ ${key}: ${secondObject[key]}\n- ${key}: ${firstObject[key]}`];
    }
    if (key in firstObject && !(key in secondObject)) {
      return [...acc, `- ${key}: ${firstObject[key]}`];
    }
    return [...acc, `+ ${key}: ${secondObject[key]}`];
  }, []);
  return `{\n${resultArray.join('\n')}\n}`;
};

export default gendiff;
