import {authReducer} from '../../reducers/authReducer';
import { types } from '../../types/types';


describe("Test: Review all case of auth Reducer", () => {
  test("should has done a correct login", () => {

    const initialState = {};
    const action = {
        type: types.login,
        payload: {
            uid: 'abc',
            displayName: 'Said'
        }
    }
    const state = authReducer(initialState, action);

    expect(state).toEqual({
        uid: 'abc',
        name: 'Said'
    });
  });
  test("should has done a correct logout", () => {

    const initialState = {
        uid: 'abc',
        displayName: 'Said'
    };
    const action = {
        type: types.logout,
    }
    const state = authReducer(initialState, action);

    expect(state).toEqual({});
  });

  test("should has the same state with a wrong action", () => {

    const initialState = {
        uid: 'abc',
        displayName: 'Said'
    };
    const action = {
        type: 'bad type'
    }
    const state = authReducer(initialState, action);

    expect(state).toEqual(initialState);
  });
});
