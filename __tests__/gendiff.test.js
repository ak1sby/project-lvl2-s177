// import fs from 'fs';
import gendiff from '../src';

const basePath = '__tests__/__fixtures__/';
// const expected = fs.readFileSync(`${basePath}expected`, 'utf8');
// const expectedRecursive = fs.readFileSync(`${basePath}expectedRecursive`, 'utf8');

const firstJSONFile = `${basePath}JSON/firstFile.json`;
const secondJSONFile = `${basePath}JSON/secondFile.json`;

const firstYMLFile = `${basePath}YML/firstFile.yml`;
const secondYAMLFile = `${basePath}YML/secondFile.yaml`;

const firstINIFile = `${basePath}INI/firstFile.ini`;
const secondINIFile = `${basePath}INI/secondFile.ini`;

const firstJSONFileR = `${basePath}JSON/firstFileRecursive.json`;
const secondJSONFileR = `${basePath}JSON/secondFileRecursive.json`;

const firstYMLFileR = `${basePath}YML/firstFileRecursive.yml`;
const secondYAMLFileR = `${basePath}YML/secondFileRecursive.yaml`;

const firstINIFileR = `${basePath}INI/firstFileRecursive.ini`;
const secondINIFileR = `${basePath}INI/secondFileRecursive.ini`;


const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

const expectedRecursive = `{
    common: {
        setting1: Value 1
      - setting2: 200
        setting3: true
        setting6: {
            key: value
          + ops: vops
        }
      + setting4: blah blah
      + setting5: {
          + key5: value5
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
    }
  - group2: {
      - abc: 12345
    }
  + group3: {
      + fee: 100500
    }
}`;

test('test, difference JSON files', () => {
  expect(gendiff(firstJSONFile, secondJSONFile)).toBe(expected);
});

test('test, difference YML files', () => {
  expect(gendiff(firstYMLFile, secondYAMLFile)).toBe(expected);
});

test('test, difference INI files', () => {
  expect(gendiff(firstINIFile, secondINIFile)).toBe(expected);
});

test('test, difference JSON Recursive files', () => {
  expect(gendiff(firstJSONFileR, secondJSONFileR)).toBe(expectedRecursive);
});

test('test, difference YML Recursive files', () => {
  expect(gendiff(firstYMLFileR, secondYAMLFileR)).toBe(expectedRecursive);
});

test('test, difference INI Recursive files', () => {
  expect(gendiff(firstINIFileR, secondINIFileR)).toBe(expectedRecursive);
});
