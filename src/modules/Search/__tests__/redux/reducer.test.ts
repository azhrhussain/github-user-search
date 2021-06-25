import userReducer from '../../redux/reducer';
import {  UserActionTypes } from './../../redux/actionTypes';

const initialState = {
  login: "",
  avatar_url: "",
  name: "",
  bio: "",
  isLoading: false,
  error: "",
};

// get userReducer
describe('test cases for getUser reducer', () => {

  it('Should return getUser in INIT state', () => {
    const reducerInProgressResponse = userReducer(initialState, {
      type: UserActionTypes.GET_USER_INIT,
    });
    expect(reducerInProgressResponse.isLoading).toEqual(true);
  });

  it('Should return getUser success state', () => {
    
    const testPayload = { 
      login: "azhrhussain",
      avatar_url: "my-url",
      name: "Azhar Hussain",
      bio: "my bio",
     };
    const reducerSuccessResponse = userReducer(initialState, {
      type: UserActionTypes.GET_USER_SUCCESS,
      payload:testPayload
    });
    expect(reducerSuccessResponse.isLoading).toEqual(false);
    expect(reducerSuccessResponse.login).toEqual(testPayload.login);
    expect(reducerSuccessResponse.name).toEqual(testPayload.name);
    expect(reducerSuccessResponse.avatar_url).toEqual(testPayload.avatar_url);
    expect(reducerSuccessResponse.bio).toEqual(testPayload.bio);
    expect(reducerSuccessResponse.error).toEqual("");
  });

  it('Should return getUser error state', () => {
    const reducerFailureResponse = userReducer(initialState, {
      type: UserActionTypes.GET_USER_FAILURE,
      error:  'An error occurred',
    });
    expect(reducerFailureResponse.isLoading).toEqual(false);
    expect(reducerFailureResponse.error).toEqual('An error occurred');

  });
  
  it('Should clear user data', () => {
    const reducerClearUserDataResponse = userReducer(initialState, {
      type: UserActionTypes.CLEAR_USER_DATA,
    });
    expect(initialState.isLoading).toEqual(false);
    expect(initialState.error).toEqual('');
    expect(initialState.login).toEqual("");
    expect(initialState.name).toEqual("");
    expect(initialState.avatar_url).toEqual("");
    expect(initialState.bio).toEqual("");
  });
  it('should return the default state', () => {
    const state = userReducer(undefined, {type: UserActionTypes.DEFAULT});
    expect(state).toEqual(initialState);
  });

});