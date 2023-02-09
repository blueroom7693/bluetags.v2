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
  background-color: ${(props) => props.theme.Bg0dp}; ;
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
    searchNFT();
  };
  //프로젝트 검색
  const {
    isLoading,
    error,
    data: searchedProject,
    refetch: searchNFT,
  } = useQuery(
    ["Searched", query],
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

  // const {
  //   isLoading,
  //   data: searchedProject,
  //   refetch: searchNFT,
  // } = useQuery("searchedProject", getSearchProjects);

  // console.log(searchedProject);
  // console.log(isLoading, 45464546);

  // axios.get("https://www.bluetags.app/api/search/bluecards?q=azu").then((e) => {
  //   if (e.data) {
  //     console.log(e.data);
  //   }
  // });
  // axios
  //   .get("https://www.bluetags.app/api/search/projects?q=bor")
  //   .then((e) => console.log(e.data));
  // const azu = "azu";
  // const data = getSearchProjects(azu);
  // console.log(data.data);

  return isLoading && !searchedProject ? (
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
                <SearchedResult>searched Proejects</SearchedResult>
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
    // backgroundColor: "black",
  },
});

export default Search;
