import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
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
  const data = axiosInstance.get(
    `/api/bluecards/project/${nft}?previous=undefined`
  );

  return data;
}

export function getUser() {
  const data = axiosInstance.get(`/api/users/`);

  return data;
}

export function useUser() {
  const { isLoading: isLoadingUser, data: User } = useQuery(
    ["userData"],
    getUser
  );
  return { user: User?.data, isLoading: !User && !isLoadingUser };
}

export function getSubscribeBluecard(userId: string) {
  const data = axiosInstance.get(`/api/bluecards?user=${userId}`);

  return data;
}

export function getSearchBluecards(keyword: string) {
  const data = axiosInstance.get(`/api/search/bluecards?q=${keyword}`);

  return data;
}

// export function getSearchProjects(keyword: string) {
//   const data = axiosInstance.get(`/api/search/projects?q=${keyword}`);

//   return data;
// }
export function getSearchProjects(keyword: string) {
  const data = axiosInstance.get(`/api/search/projects?q=azu`);

  return data;
}
