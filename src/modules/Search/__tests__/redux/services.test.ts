

import '@testing-library/jest-dom/extend-expect';
import {getUserApi} from '../../redux/services';
import fetchMock from "jest-fetch-mock";


describe('test cases for getUserApi call', () => {
  const payload = 'azhrhussain';
  const mocData = { 
    login: 'azhrhussain',
    name: 'Azhr Hussain',
    bio: 'senior front end engineer', 
    avatar_url: 'http://www.azhrhussain'
   };
   
    beforeEach(() => {
      fetchMock.enableMocks();
      fetchMock.resetMocks();
    });
    
    it('getUser should return data',async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mocData));
      const response = await getUserApi(payload);
      const data = await response.json();
      expect(data).toEqual(mocData);
    });
  
});
