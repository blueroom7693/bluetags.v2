import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { getSearch, getSearchBluecards, getSearchProjects } from "../axios";
import SmallHCard from "../components/card/SmallHCard";
import Loader from "../components/Loader";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { axiosInstance } from "../axiosInstance";
import NFTproject from "../components/card/NFTproject";

const Container = styled.FlatList`
  background-color: ${(props) => props.theme.Bg0dp};
`;
const BigContainer = styled.View`
  background-color: ${(props) => props.theme.Bg0dp};
  flex: 1;
  padding-left: 10px;
  padding-right: 10px;
`;
const ProjectContainer = styled.View`
  background-color: ${(props) => props.theme.Bg0dp};
  height: auto;
`;

const BackButton = styled.TouchableOpacity``;

const HeaderContainer = styled.View`
  margin-top: 40px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 30px;
`;

const SearchBar = styled.TextInput`
  background-color: ${(props) => props.theme.Bg0dp};
  padding: 3px 10px;
  border-radius: 4px;
  width: 80%;
  border-width: 1px;
  margin-left: 5px;
  margin-right: 5px;
`;

const SearchedResult = styled.Text`
  font-size: 26px;
  font-weight: 300;
  font-family: "SpoqaHanSansNeo-Regular";
  color: ${(props) => props.theme.Text0dp};
`;

const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.Bg0dp};
`;

const Search = ({ navigation }) => {
  //set query
  const [query, setQuery] = useState("");
  const onChangeText = (text: string) => setQuery(text);
  //버튼 누를때만 실행
  const [submitted, setSubmitted] = useState(false);
  //버튼 제출
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchProject();
    searchBluecards();
    console.log("nonono");
  };

  //프로젝트 검색
  const {
    isLoading: isLoadingProjects,
    error,
    data: searchedProject,
    refetch: searchProject,
  } = useQuery(
    ["SearchedProject", query],
    async () => {
      const { data } = await axios.get(
        `https://www.bluetags.app/api/search/projects?q=${query}`
      );
      return data;
    },
    {
      enabled: false,
    }
  );

  // 블루카드 검색

  const {
    isLoading: isLoadingBluecards,
    data: searchedBluecards,
    refetch: searchBluecards,
    fetchNextPage,
  } = useInfiniteQuery(
    ["SearchedBluecards", query],
    async ({ pageParam }) => {
      const previous = pageParam || "undefined";
      const { data } = await axios.get(
        `https://www.bluetags.app/api/search/bluecards?q=${query}&previous=${previous}`
      );
      return data;
    },
    {
      getNextPageParam: (currentPage) => {
        const nextPageId =
          currentPage.bluecards[currentPage.bluecards.length - 1]?.id;
        return nextPageId || undefined;
      },
      enabled: false,
    }
  );

  const loadMore = () => {
    if (
      searchedBluecards.pages[searchedBluecards.pages.length - 1].bluecards
        .length === 10
    ) {
      fetchNextPage();
    }
    // alert("load more!");
  };

  return (
    <SafeArea>
      <HeaderContainer>
        <BackButton>
          <Ionicons
            name="arrow-back"
            size={24}
            color="#0075ff"
            onPress={() => navigation.goBack()}
          />
        </BackButton>
        <SearchBar
          placeholder="Search for NFT Project"
          placeholderTextColor="grey"
          returnKeyType="search"
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
        />
      </HeaderContainer>
      {!isLoadingProjects && !isLoadingBluecards ? (
        <BigContainer>
          <Container
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <ProjectContainer>
                <SearchedResult>Projects</SearchedResult>
                {!isLoadingProjects && searchedProject
                  ? searchedProject.projects.map((project, index) => (
                      <NFTproject fullData={project} key={index} />
                    ))
                  : null}

                <SearchedResult>Bluecards</SearchedResult>
              </ProjectContainer>
            }
            data={searchedBluecards?.pages.map((page) => page.bluecards).flat()}
            // data={searchedBluecards.bluecards}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <SmallHCard fullData={item}></SmallHCard>}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            disableVirtualization={false}
          />
        </BigContainer>
      ) : null}
    </SafeArea>
  );
};

export default Search;
