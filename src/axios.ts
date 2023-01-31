import { useRecoilState } from "recoil";
import { userData } from "./atom";
import { axiosInstance } from "./axiosInstance";

export interface IData {
  [key: string]: {
    _id: string;
    chain: string;
    nft: string;
    title: string;
    thumbnail: string;
    description: string;
    createdAt: string;
    likes: [string];
    unlikes: [string];
    SNS: string;
  };
}

export function getAdminCheck(token: string) {
  const data = axiosInstance.get(`/api/v1/admin/check`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export function getSearch(keyword: string) {
  const data = axiosInstance.get(`/api/v1/nft/search/?keyword=${keyword}`);

  return data;
}

export function getInfoDetail(id: string) {
  const data = axiosInstance.get(`/api/v1/nft/info/${id}`);

  return data;
}

// newblutags API

export function getAllBluecards() {
  const data = axiosInstance.get("/api/bluecards");

  return data;
}

export function getAllProjects() {
  const data = axiosInstance.get("/api/projects");

  return data;
}

export function getNftInfo(nft: string) {
  const data = axiosInstance.get(`/api/bluecards/project/${nft}`);

  return data;
}

export function getUser() {
  const data = axiosInstance.get(`/api/users/`);

  return data;
}

export function UpdateUser() {
  // const data = axiosInstance.get(`/api/users/`);
  const [updatedUser, setUpdatedUser] = useRecoilState(userData);
  axiosInstance.get(`/api/users/`).then((res) => setUpdatedUser(res.data));
  console.log("user info is updated");
  console.log(updatedUser);

  return;
}
