import {useQuery} from '@tanstack/react-query';
import {api} from './axiosClient';
import {getBlogResponse} from '../types/Blog';

const GetBlogQuery = () => {
  return useQuery<getBlogResponse, Error>({
    queryKey: ['GET_BLOG'],
    queryFn: () => {
      const params = {limit: '20'};
      return api.get('/v4/blogs/', {params: params});
    },
  });
};

export const AppServices = {
  GetBlogQuery,
};
