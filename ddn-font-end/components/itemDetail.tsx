import { Text, View } from "./Themed";

import { StyleSheet } from "react-native";

import React, { useState, useEffect, useCallback, useRef } from "react";

import ZoomableImage from "./AnimateScroll";
import { useFocusEffect } from "expo-router";
import { itemInfoType, useItemStore } from "../zustand/store";
import { getItemDetail } from "../api/item";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "expo-image";
import { Dimensions } from "react-native";
import { ActivityIndicator, Title, TouchableRipple } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
const { width } = Dimensions.get("window");

function ItemValue({ value }: { value: string | undefined | number }) {
  return (
    <View
      style={{
        padding: 8,
        backgroundColor: "#F4F3F4",
        borderTopEndRadius: 16,
        borderTopLeftRadius: 16,
      }}
    >
      <Text style={{ fontSize: 24 }}>${value || 1}</Text>
    </View>
  );
}

function ItemTitle({ title }: { title: string | undefined }) {
  return (
    <View
      style={{
        padding: 8,
        backgroundColor: "#F4F3F4",
        borderBottomEndRadius: 16,
        borderBottomLeftRadius: 16,
      }}
    >
      <Text
        style={{
          includeFontPadding: false,

          fontSize: 20,
        }}
      >
        {title}
      </Text>
    </View>
  );
}

function ItemInfoDescription({ info }: { info: itemInfoType | undefined }) {
  const getStatus = (status: number | string | undefined) => {
    if (!status) {
      return "--";
    }
    console.log(status);
    let newStatus = Number(status);
    switch (newStatus) {
      case 1:
        return "已注册";
      case 2:
        return "已运输";
      case 3:
        return "已销售";
      case 4:
        return "已封存";

      default:
        break;
    }
  };

  return (
    <View style={styles.description}>
      <TouchableRipple
        style={{ paddingBottom: 21 }}
        borderless
        onPress={() => console.log("Pressed")}
      >
        <View style={{ borderRadius: 16 }}>
          <ItemValue value={info?.value}></ItemValue>
          <ItemTitle title={info?.itemName}></ItemTitle>
        </View>
      </TouchableRipple>
      <Title
        style={{
          alignContent: "center",
          justifyContent: "center",

          marginBottom: 16,
          borderRadius: 8,
          opacity: 0.9,
        }}
      >
        物品基本信息
      </Title>
      <TouchableRipple
        style={{ paddingBottom: 21, backgroundColor: "#F4F3F4" }}
        borderless
        onPress={() => console.log("Pressed")}
      >
        <View style={{ justifyContent: "center", borderRadius: 16 }}>
          <Text
            style={{
              fontSize: 16,
              backgroundColor: "#F4F3F4",
              borderRadius: 16,
            }}
          >
            当前状态： {getStatus(info?.status)}
          </Text>
        </View>
      </TouchableRipple>
    </View>
  );
}
export default function ViewItem() {
  const isFocused = useIsFocused();
  const { setItemId, itemId, getItemInfo, itemInfo } = useItemStore(
    (state) => ({
      setItemId: state.setItemId,
      itemId: state.itemId,
      getItemInfo: state.getItemInfo,
      itemInfo: state.itemInfo,
    })
  );
  const [itemInfos, setItemInfos] = useState<itemInfoType | undefined>(
    undefined
  );
  // const isMounted = useRef(false);
  useFocusEffect(
    useCallback(() => {
      const params = { itemId };
      getItemInfo(params);
      return () => {
        setItemInfos(undefined);
        console.log("Screen was unfocused");
      };
    }, [])
  );
  useEffect(() => {
    setItemInfos(itemInfo);
  }, [itemInfo]);
  useEffect(() => {
    //  console.log(JSON.parse(JSON.stringify(itemInfos)))
  }, [itemInfos]);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageWrap}>
          <Image
            style={styles.image}
            source={
              isFocused ? `data:image/jpeg;base64,${itemInfos?.itemImage}` : ""
            }
            contentFit="contain"
            placeholder={require("../assets/images/115668636_p0_master1200.jpg")}
          />
        </View>
        <ItemInfoDescription info={itemInfos}></ItemInfoDescription>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageWrap: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  descriptionItem: {
    flexDirection: "column",
    backgroundColor: "#ECE9EC",
    justifyContent: "space-between",
  },
  title: {},
  description: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#ECE9EC",
    marginLeft: 10,
    marginRight: 10,
  },
  image: {
    height: 300,
    width: width * 0.8,
    borderRadius: 10,
  },
});
