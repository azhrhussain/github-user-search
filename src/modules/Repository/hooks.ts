
import { useHistory } from 'react-router-dom';

 export const useHandleClickNext = (page:number, numPages: number) => {
  const history = useHistory();
  
 return () => {
   if(page < numPages) {
      history.push({ search: `?page=${page + 1}` });
    }
 };
}

export const useHandleClickPrevious = (page: number) => {
  const history = useHistory();
  return ()=>{  
  if (page > 1) {
    history.push({ search: `?page=${page - 1}` });
    }
  }
};