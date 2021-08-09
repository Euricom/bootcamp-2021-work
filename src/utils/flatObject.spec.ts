import { Json } from '../contexts/TranslationContext';

const flatObject = (source: Record<string, Json>, path? = '', target: Record<string, string>): Record<string, string> => {
  console.log(Object.entries(source));
  const test = Object.entries(source).reduce((prev, cur) => {
    console.log(cur[0]);
    if (typeof cur[1] === 'string') return { ...prev, [cur[0]]: cur[1] };

    const currentPath =

    return flatObject(cur[1], );
  }, {});
  console.log(test);
  // const test = Object.entries(source).map((value) => {
  //   if (typeof value[1] !== 'string') {

  //   }
  // });
  // console.log(test);
  // return source;
};

test('it flattens the single level json object', () => {
  const source = { KEY1: 'value1', KEY2: 'value2' };

  expect(flatObject(source)).toStrictEqual(source);
});

test.only('it flattens the multi level json object', () => {
  const source = { KEY1: 'value1', KEY2: { SKEY1: 'SValue1' } };

  expect(flatObject(source)).toStrictEqual({ KEY1: 'value1', 'KEY2.SKEY1': 'SValue1' });
});
