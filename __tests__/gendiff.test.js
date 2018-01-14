import fs from 'fs';
import gendiff from '../src';

describe('Comparing flat data', () => {
  const basePath = '__tests__/__fixtures__/';
  const expected = fs.readFileSync(`${basePath}expected.txt`, 'utf8');

  test('test, difference JSON files', () => {
    expect(gendiff(`${basePath}JSON/firstFile.json`, `${basePath}JSON/secondFile.json`, 'default')).toBe(expected);
  });

  test('test, difference YML files', () => {
    expect(gendiff(`${basePath}YML/firstFile.yml`, `${basePath}YML/secondFile.yaml`, 'default')).toBe(expected);
  });

  test('test, difference INI files', () => {
    expect(gendiff(`${basePath}INI/firstFile.ini`, `${basePath}INI/secondFile.ini`, 'default')).toBe(expected);
  });
});

describe('Comparing recursive data', () => {
  const basePath = '__tests__/__fixtures__/';
  const expected = fs.readFileSync(`${basePath}expectedRecursive.txt`, 'utf8');

  test('difference JSON files', () => {
    expect(gendiff(`${basePath}JSON/firstFileRecursive.json`, `${basePath}JSON/secondFileRecursive.json`, 'default')).toBe(expected);
  });

  test('difference YML files', () => {
    expect(gendiff(`${basePath}YML/firstFileRecursive.yml`, `${basePath}YML/secondFileRecursive.yaml`, 'default')).toBe(expected);
  });

  test('difference INI files', () => {
    expect(gendiff(`${basePath}INI/firstFileRecursive.ini`, `${basePath}INI/secondFileRecursive.ini`, 'default')).toBe(expected);
  });
});

describe('Comparing flat data, plain format', () => {
  const basePath = '__tests__/__fixtures__/';
  const expected = fs.readFileSync(`${basePath}expectedPlain.txt`, 'utf8');

  test('test, difference JSON files', () => {
    expect(gendiff(`${basePath}JSON/firstFile.json`, `${basePath}JSON/secondFile.json`, 'plain')).toBe(expected);
  });

  test('test, difference YML files', () => {
    expect(gendiff(`${basePath}YML/firstFile.yml`, `${basePath}YML/secondFile.yaml`, 'plain')).toBe(expected);
  });

  test('test, difference INI files', () => {
    expect(gendiff(`${basePath}INI/firstFile.ini`, `${basePath}INI/secondFile.ini`, 'plain')).toBe(expected);
  });
});

describe('Comparing recursive data, plain format', () => {
  const basePath = '__tests__/__fixtures__/';
  const expected = fs.readFileSync(`${basePath}expectedRecursivePlain.txt`, 'utf8');

  test('difference JSON files', () => {
    expect(gendiff(`${basePath}JSON/firstFileRecursive.json`, `${basePath}JSON/secondFileRecursive.json`, 'plain')).toBe(expected);
  });

  test('difference YML files', () => {
    expect(gendiff(`${basePath}YML/firstFileRecursive.yml`, `${basePath}YML/secondFileRecursive.yaml`, 'plain')).toBe(expected);
  });

  test('difference INI files', () => {
    expect(gendiff(`${basePath}INI/firstFileRecursive.ini`, `${basePath}INI/secondFileRecursive.ini`, 'plain')).toBe(expected);
  });
});

describe('Comparing flat data, JSON format', () => {
  const basePath = '__tests__/__fixtures__/';
  const expected = fs.readFileSync(`${basePath}expectedJSON.txt`, 'utf8');

  test('test, difference JSON files', () => {
    expect(gendiff(`${basePath}JSON/firstFile.json`, `${basePath}JSON/secondFile.json`, 'json')).toBe(expected);
  });

  test('test, difference YML files', () => {
    expect(gendiff(`${basePath}YML/firstFile.yml`, `${basePath}YML/secondFile.yaml`, 'json')).toBe(expected);
  });

  test('test, difference INI files', () => {
    expect(gendiff(`${basePath}INI/firstFile.ini`, `${basePath}INI/secondFile.ini`, 'json')).toBe(expected);
  });
});

describe('Comparing recursive data, JSON format', () => {
  const basePath = '__tests__/__fixtures__/';
  const expected = fs.readFileSync(`${basePath}expectedRecursiveJSON.txt`, 'utf8');

  test('difference JSON files', () => {
    expect(gendiff(`${basePath}JSON/firstFileRecursive.json`, `${basePath}JSON/secondFileRecursive.json`, 'json')).toBe(expected);
  });

  test('difference YML files', () => {
    expect(gendiff(`${basePath}YML/firstFileRecursive.yml`, `${basePath}YML/secondFileRecursive.yaml`, 'json')).toBe(expected);
  });

  test('difference INI files', () => {
    expect(gendiff(`${basePath}INI/firstFileRecursive.ini`, `${basePath}INI/secondFileRecursive.ini`, 'json')).toBe(expected);
  });
});
