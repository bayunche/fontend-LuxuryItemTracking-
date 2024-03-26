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
const { width } = Dimensions.get("window");
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
            source={`data:image/jpeg;base64,${itemInfos?.itemImage}`}
            contentFit="contain"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "rgb(236, 236, 231)" },
  imageWrap: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    height: 300,
    width: width * 0.8,
    borderRadius: 10,
  },
});
