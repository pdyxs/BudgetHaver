// history.js

const ADD_RECORD    = 'budget-haver/history/add-record';

export function addRecord(amount)
{
  return {
    type: ADD_RECORD,
    amount
  };
}

const initialState = {
  
}
