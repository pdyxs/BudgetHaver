import Saveable from './';

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

beforeAll(() => {
  global.cordova = {
    plugin: "hmmm"
  };
})

test('make a saveable', () => {
  var newSaveable = new Saveable(
    'test',
    {
      useCloud: true,
      initialSaveable: {
        hello: 'world'
      }
    }
  );

  console.log(newSaveable);

  console.log(localStorage);

  expect(1 + 2).toBe(3);
});
