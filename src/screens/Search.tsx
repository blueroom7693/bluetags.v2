import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
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

const Search = ({ navigation }) => {
  //set query
  const [query, setQuery] = useState("");
  const onChangeText = (text: string) => setQuery(text);
  //onsubmit
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchProject();
    searchBluecards();
  };
  //프로젝트 검색
  const {
    isLoading,
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
  } = useQuery(
    ["SearchedBluecards", query],
    async () => {
      const { data } = await axios.get(
        `https://www.bluetags.app/api/search/bluecards?q=${query}&previous=undefined`
      );
      return data;
    },
    {
      enabled: false,
    }
  );

  console.log(searchedBluecards);

  return isLoading || !searchedProject ? (
    <SafeAreaView style={styles.container}>
      <BigContainer>
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
      </BigContainer>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.container}>
      <BigContainer>
        <Container
          ListHeaderComponent={
            <View>
              <HeaderContainer>
                <BackButton>
                  <Ionicons
                    name="arrow-back"
                    size={22}
                    color="black"
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
              <View>
                <SearchedResult>Projects</SearchedResult>
              </View>
            </View>
          }
          data={searchedProject.projects}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NFTproject fullData={item} title={item.title} />
          )}
        />
      </BigContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Search;
