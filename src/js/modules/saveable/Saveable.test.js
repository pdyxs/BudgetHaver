import Saveable from './Saveable';

test('blank saveable', () => {
  var save = new Saveable('name');

  expect(save.name).toBe('name');
  expect(save.chunks).toEqual([]);
});

test('single chunk, unsaved', () => {
  var data = {
    hello: 'there',
    thisIsGoingToBe: 4,
    array: [
      32
    ]
  };

  var save = new Saveable('name', [
    {
      defaults: {
        ...data
      }
    }
  ]);

  expect(save.chunks.length).toBe(1);
  expect(save.chunks[0].initialState).toEqual(data);
  expect(save.initialState).toEqual(data);
});

test('two chunks, unsaved', () => {
  var data1 = {
    hello: 'there',
    thisIsGoingToBe: 4,
    array: [
      32
    ]
  };
  var data2 = {
    hello: 'here',
    object: {
      with: 'values'
    }
  };

  var save = new Saveable('name', [
    {
      defaults: {
        ...data1
      }
    },
    {
      defaults: {
        ...data2
      }
    }
  ]);

  expect(save.chunks.length).toBe(2);
  expect(save.chunks[0].initialState).toEqual(data1);
  expect(save.chunks[1].initialState).toEqual(data2);
  expect(save.initialState).toEqual({...data1, ...data2});
});
