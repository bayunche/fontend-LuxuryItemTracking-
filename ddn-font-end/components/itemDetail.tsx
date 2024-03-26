import { Text, View } from "./Themed";

import { StyleSheet } from "react-native";

import React, { useState, useEffect, useCallback, useRef } from "react";

import ZoomableImage from "./AnimateScroll";
import { useFocusEffect } from "expo-router";
import { itemInfoType, useItemStore } from "../zustand/store";
import { getItemDetail } from "../api/item";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "expo-image";
// ScrollView

function itemTitle() {
  const { setItemId, itemId, getItemInfo, itemInfo } = useItemStore(
    (state) => ({
      setItemId: state.setItemId,
      itemId: state.itemId,
      getItemInfo: state.getItemInfo,
      itemInfo: state.itemInfo,
    })
  );
}

export default function ViewItem() {
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
    }, [])
  );
  useEffect(() => {
    setItemInfos(itemInfo);
    console.log("set");
  }, [itemInfo]);
  useEffect(() => {
    //  console.log(JSON.parse(JSON.stringify(itemInfos)))
  }, [itemInfos]);
  return (
    <View style={styles.container}>
      {itemInfos?.itemImage && (
        <ZoomableImage uri={itemInfo.itemImage}></ZoomableImage>
      )}
     

      <ScrollView></ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 300,
  },
});
