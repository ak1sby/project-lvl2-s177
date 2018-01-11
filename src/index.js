// @flow

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import getRender from './renderers';
import genDiffParse from './parse';

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

const gendiff = (firstfile, secondfile, type = 'default') => {
  const firstObject = getObject(firstfile);
  const secondObject = getObject(secondfile);
  // console.log(JSON.stringify(genDiffParse(firstObject, secondObject), null, '  '));
  const render = getRender(type);
  const result = render(genDiffParse(firstObject, secondObject));
  return result;
};

export default gendiff;
