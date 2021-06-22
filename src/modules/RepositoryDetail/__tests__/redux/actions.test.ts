import fetchMock from "jest-fetch-mock";
import { normalizeFilePathTree } from "../../../../utils/helper";
import { decodeBase64toString } from "../../helper";
import { fetchRepositoryDetail, fetchRepositoryReadme } from "../../redux/actions";
import {  RepositoryDetailActionTypes, RepositoryReadmeActionTypes } from '../../redux/actionTypes';
import { fetchRepositoryReadmeApi } from "../../redux/services";

// get repositoryDetail File dree
  
  beforeEach(() => {
    fetchMock.enableMocks();
    fetchMock.resetMocks();
  });

  let payload = {
    username: 'azhr',
    repositoryName:'github'
  };
  
  describe('fetchRepositoryDetail actions', () => {
    beforeEach(() => {
      fetchMock.enableMocks();
      fetchMock.resetMocks();
    });
    it('FETCH_REPOSITORY_DETAIL_SUCCESS when file data successfully fetched', async() => {
      const mockRepositoryFileData = {
        sha: "f5dd9f179cfe51c93ccf54f27b63df23d4a2380e",
        tree: [
          { 
            mode: "100644",
            path: ".gitignore",
            sha: "52d6b91527a88d1c68dee950c86a320c208f3885",
            size: 43,
            type: "blob",
            url: "url",
          },
          { 
            mode: "100644",
            path: "COPYING",
            sha: "52d6b91527a88d1c68dee950c86a320c208f3885",
            size: 43,
            type: "blob",
            url: "url",
          }
        ],
        truncated: false,
      };
  
      fetchMock.mockResponseOnce(JSON.stringify(mockRepositoryFileData),{ status: 200 });
      const normalizeFilePathTreeData = normalizeFilePathTree(mockRepositoryFileData);

      const expectedActions = [
        { type: RepositoryDetailActionTypes.FETCH_REPOSITORY_DETAIL_INIT },
        { type: RepositoryDetailActionTypes.FETCH_REPOSITORY_DETAIL_SUCCESS, payload:normalizeFilePathTreeData },
      ];
             
     const func = fetchRepositoryDetail(payload);  
     const dispatch = jest.fn();
     await func(dispatch); 
     expect(dispatch).toHaveBeenCalledWith(expectedActions[0]);
     expect(dispatch).toHaveBeenCalledWith(expectedActions[1]);
    });
    it('Show files tree fetched error', async() => {
      
      const expectedActions = [
        { type: RepositoryDetailActionTypes.FETCH_REPOSITORY_DETAIL_INIT },
      ];
      fetchMock.mockResponseOnce(JSON.stringify({}),{ status: 401 });
      let func = fetchRepositoryDetail(payload);  
      const dispatch = jest.fn();
      await func(dispatch); 
      expect(dispatch).toHaveBeenCalledWith(expectedActions[0]);
    })
    
    it('fetchRepositoryReadme successfully', async() => {
      
    const mockReadmeData = {
      content: "IyBhemhhcmh1c2Fpbgo=\n",
      encoding: "base64",
    }
      fetchMock.mockResponseOnce(JSON.stringify(mockReadmeData),{ status: 200 });
      const normalizedReadmeData = decodeBase64toString(mockReadmeData);
      const expectedActions = [
        { type: RepositoryReadmeActionTypes.FETCH_REPOSITORY_README_INIT },
        { type: RepositoryReadmeActionTypes.FETCH_REPOSITORY_README_SUCCESS, payload:normalizedReadmeData },
      ];
             
     const func = fetchRepositoryReadme(payload);  
     const dispatch = jest.fn();
     await func(dispatch); 
     expect(dispatch).toHaveBeenCalledWith(expectedActions[0]);
     expect(dispatch).toHaveBeenCalledWith(expectedActions[1]);
    });
    it('Show readme fetched error', async() => {
      
      const expectedActions = [
        { type: RepositoryReadmeActionTypes.FETCH_REPOSITORY_README_INIT },
      ];
      fetchMock.mockResponseOnce(JSON.stringify({}),{ status: 401 });
      
      let func = fetchRepositoryReadme(payload);  
      const dispatch = jest.fn();
      await func(dispatch); 
      expect(dispatch).toHaveBeenCalledWith(expectedActions[0]);
    })
    it('Show readme fetched error', async() => {
      
      const expectedActions = [
        { type: RepositoryReadmeActionTypes.FETCH_REPOSITORY_README_INIT },
      ];
      fetchMock.mockResponseOnce(JSON.stringify({}),{ status: 201 });
      
      let func = fetchRepositoryReadme(payload);  
      const dispatch = jest.fn();
      await func(dispatch); 
      expect(dispatch).toHaveBeenCalledWith(expectedActions[0]);
    });
    
  });
