// @flow

import fs from 'fs';
import _ from 'lodash';

const fileToString = file => fs.readFileSync(file);

const gendiff = (firstfile, secondfile) => {
  const firstString = fileToString(firstfile);
  const secondString = fileToString(secondfile);
  const firstObject = JSON.parse(firstString);
  const secondObject = JSON.parse(secondString);
  const firstFileKeys = Object.keys(firstObject);
  const secondFileKeys = Object.keys(secondObject);
  const unitedKeys = [...firstFileKeys, ...secondFileKeys];
  const uniqKeys = _.uniq(unitedKeys);
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
