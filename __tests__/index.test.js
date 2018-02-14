// import fs from 'fs';
import gendiff from '../src';

describe('Comparing flat data', () => {
  const basePath = '__tests__/__fixtures__/';
  // const expected = fs.readFileSync(`${basePath}expected.txt`, 'utf-8');
  const expected = `
{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}
`;

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
  // const expected = fs.readFileSync(`${basePath}expectedRecursive.txt`, 'utf8');
  const expected = `
{
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
            key5: value5
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}
`;

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
  // const expected = fs.readFileSync(`${basePath}expectedPlain.txt`, 'utf8');
  const expected = `
Property 'timeout' was updated. From '50' to '20'
Property 'proxy' was removed
Property 'verbose' was added with value: 'true'
`;

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
  // const expected = fs.readFileSync(`${basePath}expectedRecursivePlain.txt`, 'utf8');
  const expected = `
Property 'common.setting2' was removed
Property 'common.setting6.ops' was added with value: 'vops'
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with complex value
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed
Property 'group3' was added with complex value
`;

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
  // const expected = fs.readFileSync(`${basePath}expectedJSON.txt`, 'utf8');
  const expected = `
[
  {
    "name": "host",
    "type": "original",
    "valueBefore": "hexlet.io",
    "valueAfter": "hexlet.io"
  },
  {
    "name": "timeout",
    "type": "updated",
    "valueBefore": "50",
    "valueAfter": "20"
  },
  {
    "name": "proxy",
    "type": "removed",
    "valueBefore": "123.234.53.22"
  },
  {
    "name": "verbose",
    "type": "added",
    "valueAfter": true
  }
]
`;

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
  // const expected = fs.readFileSync(`${basePath}expectedRecursiveJSON.txt`, 'utf8');
  const expected = `
[
  {
    "name": "common",
    "type": "nested",
    "children": [
      {
        "name": "setting1",
        "type": "original",
        "valueBefore": "Value 1",
        "valueAfter": "Value 1"
      },
      {
        "name": "setting2",
        "type": "removed",
        "valueBefore": "200"
      },
      {
        "name": "setting3",
        "type": "original",
        "valueBefore": true,
        "valueAfter": true
      },
      {
        "name": "setting6",
        "type": "nested",
        "children": [
          {
            "name": "key",
            "type": "original",
            "valueBefore": "value",
            "valueAfter": "value"
          },
          {
            "name": "ops",
            "type": "added",
            "valueAfter": "vops"
          }
        ]
      },
      {
        "name": "setting4",
        "type": "added",
        "valueAfter": "blah blah"
      },
      {
        "name": "setting5",
        "type": "added",
        "valueAfter": {
          "key5": "value5"
        }
      }
    ]
  },
  {
    "name": "group1",
    "type": "nested",
    "children": [
      {
        "name": "baz",
        "type": "updated",
        "valueBefore": "bas",
        "valueAfter": "bars"
      },
      {
        "name": "foo",
        "type": "original",
        "valueBefore": "bar",
        "valueAfter": "bar"
      }
    ]
  },
  {
    "name": "group2",
    "type": "removed",
    "valueBefore": {
      "abc": "12345"
    }
  },
  {
    "name": "group3",
    "type": "added",
    "valueAfter": {
      "fee": "100500"
    }
  }
]
`;

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
