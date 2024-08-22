import api from './api';
import { CourseType } from './courseService';

export type CategoryType = {
  id: number,
  name: string,
  position: number,
  courses?: Array<CourseType>
};

const categoriesService = {
  async getCategories() {
    try {
      const token = sessionStorage.getItem('onebitflix-token');

      return await api.get('/categories', {headers: {'Authorization': `Bearer ${token}`}})
    } catch (error: any) {
      return error.response;
    }
  },

  async getCategoryWithCourseById(id: number) {
    try {
      const token = sessionStorage.getItem('onebitflix-token');

      return await api.get(`/categories/${id}`, { headers: { 'Authorization': `Bearer ${token}`}});
    } catch (error: any) {
      return error.response;
    }    
  }
};

export default categoriesService;