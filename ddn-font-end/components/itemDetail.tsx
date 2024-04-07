import { Text, View } from "./Themed";

import { StyleSheet } from "react-native";

import React, { useState, useEffect, useCallback, useRef } from "react";
// RefreshControl
import ZoomableImage from "./AnimateScroll";
import { useFocusEffect } from "expo-router";
import { itemInfoType, useItemStore } from "../zustand/store";
import { getItemDetail } from "../api/item";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { Image } from "expo-image";
import { Dimensions } from "react-native";
import { ActivityIndicator, Title, TouchableRipple } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import moment from "moment"
const { width } = Dimensions.get("window");

function ItemValue({ value }: { value: string | undefined | number }) {
  return (
    <View
      style={{
        padding: 16,
        paddingBottom: 0,
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
        padding: 16,
        paddingTop: 0,

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

function ItemTansportInfo({ info }: { info: itemInfoType | undefined }) {
  return (
    <View>
      <Title
        style={{
          alignContent: "center",
          justifyContent: "center",
          marginBottom: 16,
          borderRadius: 8,
          opacity: 0.9,
        }}
      >
        物流信息
      </Title>
      <TouchableRipple
        style={{ paddingTop: 16, paddingBottom: 32, backgroundColor: "#F4F3F4", padding: 8, borderTopEndRadius: 16, borderTopStartRadius: 16 }}

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
            物品配送起始点{info?.startPoint}至{info?.endPoint}
          </Text>
        </View>
      </TouchableRipple>
      <TouchableRipple
        style={{ paddingBottom: 21, backgroundColor: "#F4F3F4", padding: 8, }}
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
            配送方式：{info?.TransportWay}
          </Text>
        </View>
      </TouchableRipple>
      <TouchableRipple
        style={{ paddingBottom: 21, backgroundColor: "#F4F3F4", padding: 8, }}

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
            运输单号：{info?.TransportNumber}
          </Text>
        </View>
      </TouchableRipple>
      <TouchableRipple
        style={{ paddingBottom: 21, backgroundColor: "#F4F3F4", padding: 8, }}

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
            运输公司：{info?.TransportCompany}
          </Text>
        </View>
      </TouchableRipple>
      <TouchableRipple
        style={{ paddingBottom: 21, backgroundColor: "#F4F3F4", padding: 8, borderBottomEndRadius: 16, borderBottomStartRadius: 16 }}
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
            运输日期：{info?.TransportDate
              ? moment(info?.TransportDate).format("YYYY-MM-DD") : '--'}
          </Text>
        </View>
      </TouchableRipple>
    </View>
  )
}

function ItemSalesInfo({ info }: { info: itemInfoType | undefined }) {
  return (
    <View>
      <Title
        style={{
          alignContent: "center",
          justifyContent: "center",
          marginBottom: 16,
          borderRadius: 8,
          opacity: 0.9,
        }}
      >
        销售信息
      </Title>
      <TouchableRipple
        style={{ paddingBottom: 21, backgroundColor: "#F4F3F4", padding: 8, borderBottomEndRadius: 16, borderBottomStartRadius: 16 }}
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
            销售时间：{info?.salesTime
              ? moment(info?.salesTime).format("YYYY-MM-DD") : '--'}
          </Text>
        </View>
      </TouchableRipple>
    </View>

  )
}


const wait = (timeout: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function ItemInfoDescription({ info }: { info: itemInfoType | undefined }) {
  const getStatus = (status: number | string | undefined) => {
    if (!status) {
      return "--";
    }
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

  const getTime = () => {

    if (!info?.itemDate) {
      return "--"
    }
    let dateTime = Number(info.itemDate)
    return moment.unix(dateTime).format('YYYY-MM-DD HH:mm:ss')
  }
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
        style={{ paddingTop: 16, paddingBottom: 16, backgroundColor: "#F4F3F4", padding: 8, borderTopEndRadius: 16, borderTopStartRadius: 16 }}
        borderless
        onPress={() => console.log("Pressed")}
      >
        <View style={{ justifyContent: "center", }}>
          <Text
            style={{
              fontSize: 16,
              backgroundColor: "#F4F3F4",

            }}
          >
            当前状态： {getStatus(info?.status)}
          </Text>
        </View>
      </TouchableRipple>
      <TouchableRipple
        style={{ paddingBottom: 21, backgroundColor: "#F4F3F4", padding: 8, }}
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
            创建者： {info?.creater}
          </Text>
        </View>
      </TouchableRipple>
      <TouchableRipple
        style={{ paddingBottom: 21, backgroundColor: "#F4F3F4", padding: 8, }}
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
            位于区块链的第 {info?.blockNumber?.toString()} 区块上
          </Text>
        </View>
      </TouchableRipple>
      <TouchableRipple
        style={{ paddingBottom: 21, backgroundColor: "#F4F3F4", padding: 8, borderBottomEndRadius: 16, borderBottomStartRadius: 16 }}
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
            物品注册时间 ：{getTime()}
          </Text>
        </View>
      </TouchableRipple>
      {info?.status == 2 && <ItemTansportInfo info={info} />}
      {info?.status == 3 && <ItemSalesInfo info={info} />}
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
  const [displayQRcode, setDisplayQRcode] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);
  // const isMounted = useRef(false);
  useFocusEffect(
    useCallback(() => {
      const params = { itemId };
      getItemInfo(params);
      return () => {
        setItemInfos(undefined);
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <TouchableRipple onPress={() => {
          setDisplayQRcode(!displayQRcode)
        }}>
          <View style={styles.imageWrap}>
            <Image
              style={styles.image}
              source={
                displayQRcode ? `${itemInfos?.qrcode}` : `data:image/jpeg;base64,${itemInfos?.itemImage}`
              }
              contentFit="contain"
              placeholder={require("../assets/images/115668636_p0_master1200.jpg")}
            />
          </View>
        </TouchableRipple>
        <ItemInfoDescription info={itemInfos}></ItemInfoDescription>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
  imageWrap: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    paddingBottom:0
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
