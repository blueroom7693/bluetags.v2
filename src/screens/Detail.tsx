import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { getNftInfo } from "../axios";
import SmallHCard from "../components/card/SmallHCard";
import SquareCard from "../components/card/SquareCard";
import { LinearGradient } from "expo-linear-gradient";

//INTERFACE
interface IData {
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
}

export interface IInfo {
  data: IData;
}
interface IData {
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
}
//CSS
const Container = styled.FlatList`
  background-color: ${(props) => props.theme.Bg0dp};
  display: flex;
  flex: 1;
`;
const Header = styled.View`
  align-items: center;
  /* background-color: black; */
  /* opacity: 1; */
  height: 294px;
  width: 428px;
  margin-top: -40px;
  justify-content: flex-end;
`;
const ProjectLogo = styled.Image`
  height: 294px;
  width: 428px;
  margin-top: -40px;
  position: absolute;
  z-index: -1;
`;
const ProjectName = styled.Text`
  font-size: 25px;
  color: ${(props) => props.theme.Bg0dp};
  margin-bottom: 20px;
  font-weight: 700;
`;
const SnsContaier = styled.View`
  flex-direction: row;
  justify-content: center;
`;
const SnsImage = styled.Image`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  margin: 10px;
`;

const SubTotalContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 60px;
  padding-right: 60px;
  height: 120px;
  background-color: rgba(55, 51, 255, 0.02);
`;
const SubContainer = styled.View`
  flex-direction: column;
  align-items: center;
`;
const SubText = styled.Text`
  font-size: 13px;
  font-weight: 700;
  color: ${(props) => props.theme.Text0dp};
`;
const SubText2 = styled.Text`
  font-size: 12px;
  font-weight: 400;
  color: ${(props) => props.theme.Text0dp};
`;

//MAIN
const Detail = ({ navigation: { setOptions }, route: { params } }) => {
  //GETDATA
  const search = params.title
    .toLowerCase()
    .replace(/ /gi, "")
    .replace(/-/gi, "")
    .replace(/`/gi, "");
  const { isLoading: isLoadingNft, data: searchedData } = useQuery<IInfo>(
    ["searchedData"],
    () => getNftInfo(search)
  );
  //SETDATA
  const [data, setData] = useState<IData[]>();
  useEffect(() => {
    if (!isLoadingNft) {
      // console.log("from here");
      // console.log(Object.values(searchedData?.data));
      setData(Object.values(searchedData?.data.bluecards));
    }
  }, [isLoadingNft, searchedData]);
  // console.log(searchedData);
  // console.log(data);
  //RETURN
  return (
    <Container
      ListHeaderComponent={
        <>
          {/* HEADER */}
          {/* <LinearGradient
            colors={["#4c669f", "#3b5998", "#192f6a"]}
            style={styles.linearGradient}
          >
            <Text style={styles.buttonText}>Sign in with Facebook</Text>
          </LinearGradient> */}
          <ProjectLogo
            source={require("../assets/images/azukiWall.webp")}
          ></ProjectLogo>
          <LinearGradient
            // Background Linear Gradient
            colors={["transparent", "rgba(37, 124, 255, 0.7)"]}
            style={styles.background}
          />
          <Header>
            {/* <ProjectLogo source={{ uri: params.logoUrl }}></ProjectLogo> */}
            <ProjectName>{params.title}</ProjectName>
          </Header>
          <SubTotalContainer>
            <SubContainer>
              <SubText>Chain 73</SubText>
              <SubText2>Lowest Cost</SubText2>
            </SubContainer>
            <SubContainer>
              <SubText>6,433</SubText>
              <SubText2>Holder</SubText2>
            </SubContainer>
            <SubContainer>
              <SubText>3.6K</SubText>
              <SubText2>Follower</SubText2>
            </SubContainer>
          </SubTotalContainer>
          {/* SNS */}
          <SnsContaier>
            <TouchableOpacity>
              <SnsImage
                source={{
                  uri: "https://storage.googleapis.com/opensea-static/Logomark/Logomark-White.png",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <SnsImage
                source={{
                  uri: "https://e1.pngegg.com/pngimages/916/717/png-clipart-clay-os-6-a-macos-icon-discord-round-blue-icon.png",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <SnsImage
                source={{
                  uri: "https://assets.stickpng.com/images/5a2fe3efcc45e43754640848.png",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <SnsImage
                source={{
                  uri: "https://seeklogo.com/images/F/facebook-icon-circle-logo-09F32F61FF-seeklogo.com.png",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <SnsImage
                source={{
                  uri: "https://toppng.com/uploads/preview/instagram-logo-circle-11549679754rhbcorxntv.png",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <SnsImage
                source={{
                  uri: "https://etherscan.io/images/brandassets/etherscan-logo-circle.png",
                }}
              />
            </TouchableOpacity>
          </SnsContaier>
        </>
      }
      data={data}
      keyExtractor={(item) => item.id}
      // contentContainerStyle={{ paddingHorizontal: 20 }}
      renderItem={({ item }) => (
        <SmallHCard
          createdAt={item.createdAt}
          nft={item.project.title}
          thumbnail={item.thumbnail}
          title={item.title}
          chain={item.project.chain}
          SNS={item.sns}
          fullData={item}
        ></SmallHCard>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 294,
    marginTop: -40,
  },
  button: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
});

export default Detail;
