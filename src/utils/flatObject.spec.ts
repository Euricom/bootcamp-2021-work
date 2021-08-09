import { Json } from '../contexts/TranslationContext';

const flatObject = (source: Record<string, Json>): Record<string, string> => {
  const flattenedJson = {};
  function recurse (cur: Record<string, Json>, prop: string) {
    if (Object(cur) !== cur) {
      flattenedJson[prop] = cur;
    } else {
      for (const curKey in cur) {
        recurse(cur[curKey], prop ? `${prop}.${curKey}` : curKey);
      }
    }
  }
  recurse(source, "");
  return flattenedJson;
};


test('it flattens the single level json object', () => {
  const source = { KEY1: 'value1', KEY2: 'value2' };

  expect(flatObject(source)).toStrictEqual(source);
});

test('it flattens the multi level json object', () => {
  const source = { KEY1: 'value1', KEY2: { SKEY1: 'SValue1', SKEY2: 'SValue2' } };

  expect(flatObject(source)).toStrictEqual({ KEY1: 'value1', 'KEY2.SKEY1': 'SValue1', 'KEY2.SKEY2': 'SValue2' });
});

test('it flattens the deeper multi level json object', () => {
  const source = { KEY1: 'value1', KEY2: { SKEY1: { MSKEY1: 'MSValue1'} } };

  expect(flatObject(source)).toStrictEqual({ KEY1: 'value1', 'KEY2.SKEY1.MSKEY1': 'MSValue1' });
});
