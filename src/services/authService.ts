import api from './api';

interface RegisterParams {
  firstName: string,
  lastName: string,
  phone: string,
  birth: string,
  email: string,
  password: string
}

const authService = {
  async register(params: RegisterParams) {
    try {
      return await api.post("/auth/register", params);
    } catch (error: any) {
      if (error.response.status === 400) {
        return error.response;
      }
      
      return error;
    }
  }
}

export default authService;