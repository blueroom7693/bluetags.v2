import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { RecoilState, useRecoilState, useRecoilValue } from "recoil";
import { isLogined, allSubscirbeProject, token, userData } from "../atom";
import { response } from "../constants/response";
import { axiosInstance } from "./../axiosInstance";

interface IContext {
  isLogin: boolean;
  user: any;
}

export interface IUser {
  _id: string;
  username: string;
  name: string;
  password: string;
  admin: boolean;
  favoriteNft: [string];
  likes: [string];
}

export const DataContext = createContext<IContext>({} as IContext);

const DataProvider = ({ children }: any) => {
  const userToken = useRecoilValue(token);
  const [isLogin, setIsLogin] = useRecoilState(isLogined);
  const [subscribedProject, setSubscribedProject] =
    useRecoilState(allSubscirbeProject);
  const [user, setUser] = useRecoilState(userData);

  useEffect(() => {
    async function getUser() {
      if (userToken !== "undefined") {
        const data = await axiosInstance
          .get(`/api/users`)
          .then((response) => {
            setUser(response.data);
            console.log(
              "im here im hereim hereim hereim hereim hereim hereim hereim hereim hereim hereim hereim here"
            );
            console.log(user);
            // console.log(response.data);
            setSubscribedProject(response.data.subscribe);
            setSubscribedProject(
              response.data.subscribe.map((v) =>
                v
                  .toLowerCase()
                  .replace(/ /gi, "")
                  .replace(/-/gi, "")
                  .replace(/`/gi, "")
              )
            );
          })
          .catch((error) => {
            if (error.response.data.name === "TokenExpiredError") {
              setUser(null);
            }
          });
      }
    }
    getUser();
  }, [userToken]);

  return (
    <DataContext.Provider value={{ isLogin, user }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
