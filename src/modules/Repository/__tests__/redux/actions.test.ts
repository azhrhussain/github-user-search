import fetchMock from "jest-fetch-mock";
import {  FetchRepositoryListActionTypes } from '../../redux/actionTypes';
import {
  fetchRepositoryListInit,
  fetchRepositoryListSuccess,
  fetchRepositoryListFailure,
  fetchRepositoryList
} from '../../redux/actions';
import {RepositoryListActions} from '../../redux/actionTypes';
// get repository list
const fetchRepositoryListInitPayload:RepositoryListActions = {
  type: FetchRepositoryListActionTypes.FETCH_USER_REPOSITORY_INIT
};
const fetchRepositoryListSuccessPayload:RepositoryListActions ={
  type: FetchRepositoryListActionTypes.FETCH_USER_REPOSITORY_SUCCESS,
  payload: {
    reposData: [{
      id: 2,
      name: 'Azhar Hussain',
      login: 'azhrhussain',
      description: 'my description'
    }],
    numPages: 8,
  },
};
const fetchRepositoryListFailurePayload:RepositoryListActions ={
  type: FetchRepositoryListActionTypes.FETCH_USER_REPOSITORY_FAILURE,
  error: 'An error occurred',
};

describe('test cases for fetchRepositoryList actions', () => {
  it('test case for fetchRepositoryList in progress', () => {
    const fetchRepositoryListInitResponse = fetchRepositoryListInit();
    expect(fetchRepositoryListInitResponse.type).toEqual(
      fetchRepositoryListInitPayload.type,
    );
  });
  

  it('test case for fetchRepositoryList success', () => {
    const getUserSuccessResponse = fetchRepositoryListSuccess(fetchRepositoryListSuccessPayload.payload);
    expect(getUserSuccessResponse.type).toEqual(
      fetchRepositoryListSuccessPayload.type,
    );
    expect(getUserSuccessResponse.payload).toEqual(
      fetchRepositoryListSuccessPayload.payload,
    );
  });

  it('test case for fetchRepositoryList fail', () => {
    const fetchRepositoryListFailureResponse = fetchRepositoryListFailure(
      fetchRepositoryListFailurePayload.error,
    );
    expect(fetchRepositoryListFailureResponse.type).toEqual(
      fetchRepositoryListFailurePayload.type,
    );
    expect(fetchRepositoryListFailureResponse).toEqual(
      fetchRepositoryListFailurePayload,
    );
  });

  
  });
  
  beforeEach(() => {
    fetchMock.enableMocks();
    fetchMock.resetMocks();
  });

  let payload = {
    userId: 'ali',
    pageNumber: '1'
  };

  let mockRepositoryListData = [
  {
    description: "Apple Cinema Display Control Utility for Linux",
    id: 142731046,
    name: "acdcontrol",
    owner: {login: "ali", id: 515861},
    private: false,
  },
  {
    description: "Apple Cinema Display Control Utility for Linux",
    id: 152585,
    name: "acdcontrol2",
    owner: {login: "ali", id: 515861},
    private: false,
  }
  ];
  let expectedNormalizedData = [
  {
    id: 142731046,
    name: 'acdcontrol',
    login: "ali",
    description: "Apple Cinema Display Control Utility for Linux"
  },
  {
    id: 152585,
    name: 'acdcontrol2',
    login: "ali",
    description: "Apple Cinema Display Control Utility for Linux"
  }
  ];
  let totalPages = 1;
  
  describe('fetchRepositoryList actions', () => {
    it('FETCH_USER_REPOSITORY_SUCCESS when fetchRepositoryList successfully fetched', async() => {
      
    fetchMock.mockResponseOnce(JSON.stringify(mockRepositoryListData),{ status: 200 });
    let expectedNormized = {reposData: expectedNormalizedData, numPages: totalPages};
    const expectedActions = [
      { type: FetchRepositoryListActionTypes.FETCH_USER_REPOSITORY_INIT },
      { type: FetchRepositoryListActionTypes.FETCH_USER_REPOSITORY_SUCCESS, payload:expectedNormized },
    ];
             
    let func = fetchRepositoryList(payload);  
     const dispatch = jest.fn();
     await func(dispatch); 
     expect(dispatch).toHaveBeenCalledWith(expectedActions[0]);
     expect(dispatch).toHaveBeenCalledWith(expectedActions[1]);
    });
    it('Show error if data is empty', async() => {
      
      const expectedActions = [
        { type: FetchRepositoryListActionTypes.FETCH_USER_REPOSITORY_INIT },
      ];
      fetchMock.mockResponseOnce(JSON.stringify([]),{ status: 200 });
      let func = fetchRepositoryList(payload);  
      const dispatch = jest.fn();
      await func(dispatch); 
      expect(dispatch).toHaveBeenCalledWith(expectedActions[0]);
    })
    it('Show error status >= 200 && status < 300', async() => {
      
      const expectedActions = [
        { type: FetchRepositoryListActionTypes.FETCH_USER_REPOSITORY_INIT },
      ];
      fetchMock.mockResponseOnce(JSON.stringify([]),{ status: 400 });
      let func = fetchRepositoryList(payload);  
      const dispatch = jest.fn();
      await func(dispatch); 
      expect(dispatch).toHaveBeenCalledWith(expectedActions[0]);
    })
   
  });
