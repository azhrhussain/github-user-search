import fetchMock from "jest-fetch-mock";
import {  UserActionTypes } from '../../redux/actionTypes';
import {
  getUserInit,
  getUserSuccess,
  getUserFailure,
  clearUserData,
  getUser
} from '../../redux/actions';
import {UserActions} from '../../redux/actionTypes';

// get user
const getUserInProgressPayload:UserActions = {
  type: UserActionTypes.GET_USER_INIT,
};
const getUserSuccessPayload:UserActions ={
  type: UserActionTypes.GET_USER_SUCCESS,
  payload: {
    login: 'azhrhussain',
    name: 'Azhr Hussain',
    bio: 'senior front end engineer', 
    avatar_url: 'http://www.azhrhussain'
  },
};
const getUserFailurePayload:UserActions ={
  type: UserActionTypes.GET_USER_FAILURE,
  error: 'An error occurred',
};
const clearUserDataPayload: UserActions ={
  type: UserActionTypes.CLEAR_USER_DATA,
};

describe('test cases for getUser actions', () => {
  it('test case for getUser in progress', () => {
    const getUserInProgressResponse = getUserInit();
    expect(getUserInProgressResponse.type).toEqual(
      getUserInProgressPayload.type,
    );
  });
  
  it('test case for clearUserData', () => {
    const clearUserDataResponse = clearUserData();
    expect(clearUserDataResponse.type).toEqual(
      clearUserDataPayload.type,
    );
  });

  it('test case for getUser success', () => {
    const getUserSuccessResponse = getUserSuccess(getUserSuccessPayload.payload);
    expect(getUserSuccessResponse.type).toEqual(
      getUserSuccessPayload.type,
    );
    expect(getUserSuccessResponse.payload).toEqual(
      getUserSuccessPayload.payload,
    );
  });

  it('test case for getUser fail', () => {
    const getUserFailureResponse = getUserFailure(
      getUserFailurePayload.error,
    );
    expect(getUserFailureResponse.type).toEqual(
      getUserFailurePayload.type,
    );
    expect(getUserFailureResponse).toEqual(
      getUserFailurePayload,
    );
  });

  
  });
  
  beforeEach(() => {
    fetchMock.enableMocks();
    fetchMock.resetMocks();
  });
  
  describe('getUser actions', () => {
    it('GET_USER_SUCCESS when getUser successfully fetched', async() => {
      const payload = 'azhrhussain';
      const data = { 
                login: 'azhrhussain',
                name: 'Azhar Hussain',
                bio: 'senior front end engineer', 
                avatar_url: 'http://www.azhrhussain'
               };
     
      const expectedActions = [
        { type: UserActionTypes.CLEAR_USER_DATA },
        { type: UserActionTypes.GET_USER_INIT },
        { type: UserActionTypes.GET_USER_SUCCESS, payload:data },
              ];
      fetchMock.mockResponseOnce(JSON.stringify(data),{ status: 200 });
      let func = getUser(payload);  
      const dispatch = jest.fn();
      await func(dispatch); 
      expect(dispatch).toHaveBeenCalledWith(expectedActions[0]);
      expect(dispatch).toHaveBeenCalledWith(expectedActions[1]);
      expect(dispatch).toHaveBeenCalledWith(expectedActions[2]);
     
    })
    it('Uncaught Error Throw getUser', async() => {
      const payload = 'azhrhussain';
      const data = { 
                login: 'azhrhussain',
                name: 'Azhar Hussain',
                bio: 'senior front end engineer', 
                avatar_url: 'http://www.azhrhussain'
               };
     
      const expectedActions = [
        { type: UserActionTypes.CLEAR_USER_DATA },
        { type: UserActionTypes.GET_USER_INIT },
        { type: UserActionTypes.GET_USER_SUCCESS, payload:data },
              ];
      fetchMock.mockResponseOnce(JSON.stringify(data),{ status: 400 });
      let func = getUser(payload);  
      const dispatch = jest.fn();
      await func(dispatch); 
      expect(dispatch).toHaveBeenCalledWith(expectedActions[0]);
      expect(dispatch).toHaveBeenCalledWith(expectedActions[1]);
     
    })
  
  it('GET_USER_FAILURE when getUser have an error', async() => {
    const payload = 'azhrhussain';
    
    const expectedActions = [
        { type: UserActionTypes.CLEAR_USER_DATA },
        { type: UserActionTypes.GET_USER_INIT },
        { type: UserActionTypes.GET_USER_FAILURE, error: 'Request failed' },
      ];
  
      fetchMock.mockReject(new Error('Request failed'));
      let func = getUser(payload);  
      const dispatch = jest.fn();
      await func(dispatch); 
      expect(dispatch).toHaveBeenCalledWith(expectedActions[0]);
      expect(dispatch).toHaveBeenCalledWith(expectedActions[1]);
      expect(dispatch).toHaveBeenCalledWith(expectedActions[2]);
    });
  });