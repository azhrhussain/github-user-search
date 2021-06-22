
import { clearUserData } from "../../modules/Search/redux/actions";
import { normalizeError, normalizeFilePathTree, normalizeRepositoryListResponse, normalizeUserDataResponse } from "../helper";
import { ERROR_UNAVAILABLE, ERROR_WITH_STATUS } from './../constants';

describe("helper functions", () => {
 
  //Error with helper text for unhandled errors
  it("Should return an error text", () => {
    //show error message
    let  data = {message: "unhandled error"}
    let status = 404;
    const error = normalizeError(data, status);
    
    expect(error).toBe(data.message);

    //if (status === 200) and message not found
    data = {message: ""}
    status = 200;
    expect(normalizeError(data, status)).toBe(ERROR_UNAVAILABLE);
    
    //error with status code
    data = {message: ""}
    status = 500;
    const errorText = ERROR_WITH_STATUS.replace(':status',status.toString())
    expect(normalizeError(data, status)).toBe(errorText);

    //fallback error message
    expect(normalizeError({}, 0)).toBe(ERROR_UNAVAILABLE);
  });
  // normalizeUserDataResponse with User Interface
  it('Should return normalizeUserDataResponse', ()=>{
  
    const mockUserData = {
      avatar_url: "https://avatars.githubusercontent.com/u/10018893?v=4",
      bio: "Front-end Engineer and at VentureDive",
      blog: "http://azharhusain.com/",
      company: "VentureDive",
      created_at: "2014-12-01T06:28:07Z",
      email: null,
      events_url: "https://api.github.com/users/azhrhussain/events{/privacy}",
      followers: 2,
      followers_url: "https://api.github.com/users/azhrhussain/followers",
      id: 10018893,
      login: "azhrhussain",
      name: "Azhar Hussain",
      public_repos: 28,
    }

    const expectData = {
      login: mockUserData.login || "",
      avatar_url: mockUserData.avatar_url,
      name: mockUserData.name,
      bio: mockUserData.bio,
    }
    expect(normalizeUserDataResponse(mockUserData)).toStrictEqual(expectData);
    
    // return empty
    const emptyUserData = {
      login:  "",
      avatar_url: "",
      name: "",
      bio: "",
    }
    expect(normalizeUserDataResponse({})).toStrictEqual(emptyUserData);
  });

  // normalizeRepositoryListResponse Response = 200 IRepositoryListData Interface
  it('Should return normalizeRepositoryListResponse if response is 200', () => {
    let totalPages = 8;
    const mockRepositoryListHeader = `<https://api.github.com/user/515861/repos?per_page=15&page=2>; rel="next", <https://api.github.com/user/515861/repos?per_page=15&page=${totalPages}>; rel="last"`
    const mockRepositoryListData = [
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

    const normalizeRepositoryListResponseData = normalizeRepositoryListResponse(mockRepositoryListData, mockRepositoryListHeader);
    const expectedNormalizedData = [
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

    let expectedNormizedData = {reposData: expectedNormalizedData, numPages: totalPages};
    expect(normalizeRepositoryListResponseData).toStrictEqual(expectedNormizedData);
    
    //return 0 total pages
    totalPages = 0;
    expectedNormizedData = {reposData: expectedNormalizedData, numPages: totalPages};
    expect(normalizeRepositoryListResponse(mockRepositoryListData,'')).toStrictEqual(expectedNormizedData);
  })
  it('Should return normalizeRepositoryListResponse if response is 200', () => {
    let totalPages = 0;
    const mockRepositoryListHeader = `<https://api.github.com/user/515861/repos?per_page=15&page=2>; rel="next",`
        const mockRepositoryListData = [
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

    const normalizeRepositoryListResponseData = normalizeRepositoryListResponse(mockRepositoryListData, mockRepositoryListHeader);
    const expectedNormalizedData = [
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

    let expectedNormizedData = {reposData: expectedNormalizedData, numPages: totalPages};
    expect(normalizeRepositoryListResponseData).toStrictEqual(expectedNormizedData);
    
  })

  // normalizeFilePathTree and convert to array of string
  it('Should return normalizeFilePathTree in array of strings', () => {
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

    const normalizeFilePathTreeData = normalizeFilePathTree(mockRepositoryFileData);
    const pathTree = [".gitignore", "COPYING",];
    expect(normalizeFilePathTreeData).toStrictEqual(pathTree);
    expect(normalizeFilePathTree({})).toStrictEqual([]);
  });
});