import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const userRegister = async (user) => {
  try {
    const response = await axios.post(`${base_url}/users/`, user, {
      withCredentials: true,
    });
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};

const userLogin = async (user) => {
  try {
    const response = await axios.post(`${base_url}/users/auth`, user, {
      withCredentials: true,
    });
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const userLogout = async () => {
  try {
    const response = await axios.post(
      `${base_url}/users/logout`,
      {},
      { withCredentials: true }
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const getUserWishlist = async () => {
  try {
    const response = await axios.get(`${base_url}user/wishlist`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to fetch blog data. Please try again.";
    throw new Error(errorMessage);
  }
};

const updateUser = async (updateUserData) => {
  try {
    const response = await axios.put(
      `${base_url}/users/profile`,
      updateUserData,
      {
        withCredentials: true,
      }
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const forgotPasswordEmailSend = async (email) => {
  try {
    const response = await axios.post(
      `${base_url}/users/forgot-password`,
      email
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (resetPasswordData) => {
  try {
    const response = await axios.put(
      `${base_url}/users/reset-password/${resetPasswordData.token}`,
      { password: resetPasswordData.password }
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const getUsers = async () => {
  try {
    const response = await axios.get(`${base_url}/users/`, {
      withCredentials: true,
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const userService = {
  userRegister,
  userLogin,
  userLogout,
  updateUser,
  getUserWishlist,
  forgotPasswordEmailSend,
  resetPassword,
  getUsers,
};

export default userService;
