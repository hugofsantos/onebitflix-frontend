import api from "./api";

interface UpdateUserParams {
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
}

const profileService = {
  async fetchCurrentProfile() {
    try {
      const token = sessionStorage.getItem("onebitflix-token");

      return (await api.get("/users/account", {headers: {'Authorization': `Bearer ${token}`}}))?.data;
    } catch (error: any) {
      return error.response;
    }
  },

  async updateUser(params: UpdateUserParams) {
    try {
      const token = sessionStorage.getItem("onebitflix-token");

      return (await api.put("/users/current", 
        params,
        { headers: { 'Authorization': `Bearer ${token}` } })
      )?.status;
    } catch (error: any) {
      if([400, 401].includes(error.response?.status))
        return error.response;

      return error;
    }
  }
};

export default profileService;