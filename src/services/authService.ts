import api from './api';

interface RegisterParams {
  firstName: string,
  lastName: string,
  phone: string,
  birth: string,
  email: string,
  password: string
}

interface LoginParams {
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
  },

  async login(params: LoginParams) {
    try {
      const res = await api.post("/auth/login", params);

      if(res.status === 200) {
        sessionStorage.setItem("onebitflix-token", res.data['access_token']);
      }

      return res;
    } catch (error: any) {
      if([400, 401].includes(error.response.status)) {
        return error.response;
      }

      return error;
    }
  }
}

export default authService;