import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    CLEAR_ERRORS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_RESET,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_RESET,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
  } from "../constants/userConstants";

    import axios from "axios";
    export const login = (email, password) => async (dispatch) => {
        try {
          dispatch({ type: LOGIN_REQUEST });
      
          const config = { headers: { "Content-Type": "application/json" } };
      
          const { data } = await axios.post(
            `/login`,
            { email, password },
            config
          );
      
          dispatch({ type: LOGIN_SUCCESS, payload: data.user });
        } catch (error) {
          dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
        }
      };
      export const register = (userData) => async (dispatch) => {
        console.log(userData)
        try {
          dispatch({ type: REGISTER_USER_REQUEST });
      
          const config = { headers: { "Content-Type": "multipart/form-data" } };
      
          const { data } = await axios.post(`/register`, userData, config);
          //console.log(data.user)
      
          dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
        } catch (error) {
          dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
          });
        }
      };
      //load user
      export const loadUser = () => async (dispatch) => {
        try {
          dispatch({ type: LOAD_USER_REQUEST });
      
          const { data } = await axios.get(`/me`);
      
          dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
        } catch (error) {
          dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
        }
      };

      //logout
      export const logout = () => async (dispatch) => {
        try {
          await axios.get(`/logout`);
      
          dispatch({ type: LOGOUT_SUCCESS });
        } catch (error) {
          dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
        }
      };

      //update profile
      export const updateProfile = (userData) => async (dispatch) => {
        try {
          dispatch({ type: UPDATE_PROFILE_REQUEST });
      
          const config = { headers: { "Content-Type": "multipart/form-data" } };
      
          const { data } = await axios.put(`/me/update`, userData, config);
      
          dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.sucess
          });
        } catch (error) {
          dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message,
          });
        }
      };
      //update password 

      export const updatePassword = (passwords) => async (dispatch) => {
        try {
          dispatch({ type: UPDATE_PASSWORD_REQUEST });
      
          const config = { headers: { "Content-Type": "application/json" } };
      
          const { data } = await axios.put(
            `/password/update`,
            passwords,
            config
          );
      
          dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.sucess });
        } catch (error) {
          dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message,
          });
        }
      };

      //forgot password

      export const forgotPassword = (email) => async (dispatch) => {
        try {
          dispatch({ type: FORGOT_PASSWORD_REQUEST });
      
          const config = { headers: { "Content-Type": "application/json" } };
      
          const { data } = await axios.post(`/password/forgot`, email, config);
      
          dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
        } catch (error) {
          dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message,
          });
        }
      };
      //reset password

      export const resetPassword = (token, passwords) => async (dispatch) => {
        console.log(token)
        try {
          dispatch({ type: RESET_PASSWORD_REQUEST });
      
          const config = { headers: { "Content-Type": "application/json" } };
      
          const { data } = await axios.put(
            `/password/reset/${token}`,
            passwords,
            config
          );
      
          dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.sucess });
        } catch (error) {
          dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.message,
          });
        }
      };
      
      //get all user
      export const getAllUsers = () => async (dispatch) => {
        try {
          dispatch({ type: ALL_USERS_REQUEST });
          const { data } = await axios.get(`/admin/users`);
      
          dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
        } catch (error) {
          dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
        }
      };
      
//get user details
      export const getUserDetails = (id) => async (dispatch) => {
        try {
          dispatch({ type: USER_DETAILS_REQUEST });
          const { data } = await axios.get(`/admin/user/${id}`);
      
          dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
        } catch (error) {
          dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
        }
      };

//update user
      export const updateUser = (id, userData) => async (dispatch) => {
        console.log(id);
        try {
          dispatch({ type: UPDATE_USER_REQUEST });
      
          const config = { headers: { "Content-Type": "application/json" } };
      
          const { data } = await axios.put(
            `/admin/user/${id}`,
            userData,
            config
          );
          console.log(data)
      
          dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
        } catch (error) {
          dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message,
          });
        }
      };
      
      // Delete User
      export const deleteUser = (id) => async (dispatch) => {
        try {
          dispatch({ type: DELETE_USER_REQUEST });
      
          const { data } = await axios.delete(`/admin/user/${id}`);
      
          dispatch({ type: DELETE_USER_SUCCESS, payload: data });
        } catch (error) {
          dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message,
          });
        }
      };
      
      export const clearErrors = () => async (dispatch) => {
        dispatch({ type: CLEAR_ERRORS });
      };
      