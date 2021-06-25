import { normalizedPageNumber, normalizeRepositoryListURL } from "../helper";

describe('RepositoryDetail helper functions',()=>{
  let payload = {
    userId: 'azhrhussain',
    pageNumber: '5'
  };
  it("should return url", () => {
    const url = normalizeRepositoryListURL(payload);
    expect(url).toEqual(
      `http://localhost/users/${payload.userId}/repos?per_page=15&page=${payload.pageNumber}`
    );
  });
  it("should return url condition", () => {
     payload = {
       ...payload,
      pageNumber: "",
    };
    const url = normalizeRepositoryListURL(payload);
    expect(url).toEqual(
      `http://localhost/users/${payload.userId}/repos?per_page=15&page=1`
    );
  });
  
  it("should return payload as pageNumber", () => {
    payload = {
      ...payload,
       pageNumber: "1",
     };
    const normalized = {
      numPages: 0
    }
    const numPages = normalizedPageNumber(normalized.numPages, payload.pageNumber);
    expect(numPages).toEqual(1);
  })
  it("should return numPages", () => {
    const normalized = {
      numPages: 1
    }
    const numPages = normalizedPageNumber(normalized.numPages, payload.pageNumber);
    expect(numPages).toEqual(1);
  })
})