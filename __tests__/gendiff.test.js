import gendiff from '../src';

const firstJSONFile = './__tests__/__fixtures__/JSON/firstFile.json';
const secondJSONFile = './__tests__/__fixtures__/JSON/secondFile.json';

const firstYMLFile = './__tests__/__fixtures__/YML/firstFile.yml';
const secondYAMLFile = './__tests__/__fixtures__/YML/secondFile.yaml';

const firstINIFile = './__tests__/__fixtures__/INI/firstFile.ini';
const secondINIFile = './__tests__/__fixtures__/INI/secondFile.ini';

const expected = `{
  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
+ verbose: true
}`;

export default expected;

test('test, difference JSON files', () => {
  expect(gendiff(firstJSONFile, secondJSONFile)).toBe(expected);
});

test('test, difference YML files', () => {
  expect(gendiff(firstYMLFile, secondYAMLFile)).toBe(expected);
});

test('test, difference INI files', () => {
  expect(gendiff(firstINIFile, secondINIFile)).toBe(expected);
});
