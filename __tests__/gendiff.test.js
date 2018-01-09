import gendiff from '../src';
import expected from './Ignore/expected';

const firstJSONFile = './__tests__/__fixtures__/JSON/firstFile.json';
const secondJSONFile = './__tests__/__fixtures__/JSON/secondFile.json';

const firstYMLFile = './__tests__/__fixtures__/YML/firstFile.yml';
const secondYAMLFile = './__tests__/__fixtures__/YML/secondFile.yaml';

const firstINIFile = './__tests__/__fixtures__/INI/firstFile.ini';
const secondINIFile = './__tests__/__fixtures__/INI/secondFile.ini';


test('test, difference JSON files', () => {
  expect(gendiff(firstJSONFile, secondJSONFile)).toBe(expected);
});

test('test, difference YML files', () => {
  expect(gendiff(firstYMLFile, secondYAMLFile)).toBe(expected);
});

test('test, difference INI files', () => {
  expect(gendiff(firstINIFile, secondINIFile)).toBe(expected);
});
