import { decodeBase64toString, normalizeRepositoryDetailURL } from "../helper";

describe('RepositoryDetail helper functions',()=>{
  let payload = {
    username: 'azhr',
    repositoryName:'github'
  };
  let urlString =  '/repos/[username]/[repo]';

  it('normalizeRepositoryDetailURL should return correct url',()=>{
    const url = normalizeRepositoryDetailURL(payload, urlString);
    expect(url).toEqual(`/repos/${payload.username}/${payload.repositoryName}`);
  });
   payload = {
    username: '',
    repositoryName:''
  };
  

  it('normalizeRepositoryDetailURL should return with falback',()=>{
    const url = normalizeRepositoryDetailURL(payload, urlString);
    expect(url).toEqual(`/repos/${payload.username}/${payload.repositoryName}`);
  });

  it('Show error if decodeBase64toString data is null ', async() => {
    const base64 = decodeBase64toString(null);
    expect(base64).toBe('');  
  })
})