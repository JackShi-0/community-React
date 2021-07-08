import axios from "axios";
import {
  AUTH_USER,
  UNAUTH_USER,
  LOGIN_MODAL_SHOW,
  LOGIN_MODAL_HIDE
} from "./types";

const ROOT_URL = "https://www.easy-mock.com/mock/590766877a878d73716e4067/mock";

// 登录
export const signinUser = ({ userName, password }) => dispatch => {
  return new Promise((resolve, reject) => {
    // 提交用户账号密码到服务器
    axios({
      url: ROOT_URL + "/login",
      params: { userName, password }
    })
      .then(response => {
        const { data } = response;
        if (data.success) {
          // 保存请求成功返回数据
          localStorage.setItem("token", data.result.token);
          // 更新 store 中的值，用户有权限
          dispatch({ type: AUTH_USER });
          resolve(data || { success: "ok" });
        }
      })
      //  如果请求失败
      //  报错展示出来
      .catch(err => {
        reject(err);
      });
  });
};

// 登出
export const signoutUser = () => dispatch => {
  return new Promise(resolve => {
    localStorage.removeItem("token");
    dispatch({ type: UNAUTH_USER });
    resolve();
  });
};

// 登录模态框展示
export const loginModalShow = () => dispatch => {
  dispatch({ type: LOGIN_MODAL_SHOW });
};

// 登录模态框关闭
export const loginModalhide = () => dispatch => {
  dispatch({ type: LOGIN_MODAL_HIDE });
};
