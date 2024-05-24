import { Text, View } from "../Themed";

import { StyleSheet } from "react-native";

import React, { useState, useEffect, useCallback, useRef } from "react";
// RefreshControl
import ZoomableImage from "../AnimateScroll";
import { useFocusEffect } from "expo-router";
import { itemInfoType, useItemStore } from "../../zustand/store";
import { getItemDetail, refreshItemValuaction } from "../../api/item";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { Image } from "expo-image";
import { Dimensions } from "react-native";
import { ActivityIndicator, Icon, Title, TouchableRipple } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import moment from "moment"
import Toast from "react-native-root-toast";
const { width } = Dimensions.get("window");

function ItemValue({ value, itemId, }: { value: string | undefined | number, itemId: string | undefined }) {
  const refreshValue = async () => {
    if (itemId) {
      try {
        await refreshItemValuaction({ itemId })
        Toast.show("刷新奢侈品估值信息成功", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        })
      } catch (error) {
        console.log(error)
        Toast.show("刷新奢侈品估值信息失败", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,

        })
      }
    }

  }

  return (
    <View
      style={{
        padding: 16,
        paddingBottom: 0,
        backgroundColor: "#F4F3F4",
        borderTopEndRadius: 16,
        borderTopLeftRadius: 16,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ fontSize: 24 }}>￥{value || 1}</Text>

      <TouchableRipple
        onPress={() => {
          refreshValue()

        }}
        borderless
      >
        <View style={{
          backgroundColor: "#F4F3F4",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Icon size={16} source="refresh"></Icon>
          <Text>刷新奢侈品估值信息</Text>
        </View>
      </TouchableRipple>

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
  const getLogisticsStatus = (status: number | string | undefined) => {
    if (!status) {
      return "--";
    }
    let newStatus = Number(status);
    switch (newStatus) {
      case 0:
        return "已开始运输";
      case 1:
        return "运输中";
      case 2:
        return "已到达目的地";
      case 3:
        return "运输出错";
      default:
        return "--";
        break;
    }
  }
  return (
    <View style={{ backgroundColor: "#ECE9EC", marginTop: 16, borderRadius: 16 }}>
      <Title
        style={{
          alignContent: "center",
          justifyContent: "center",
          marginBottom: 16,
          borderRadius: 8,
          opacity: 0.9,
          textAlign: "center"
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
            物品配送起始点： {info?.startPoint} 至 {info?.endPoint}
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
            运输状态：{getLogisticsStatus(info?.logistics_status)}
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
            运输日期：{info?.TransportDate
              ? `${info?.TransportDate}` : '--'}
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
            最新运输记录位于区块链的第 {info?.logisticsInfoBlockNumber?.toString()} 区块上
          </Text>
        </View>

      </TouchableRipple>
    </View>
  )
}

function ItemSalesInfo({ info }: { info: itemInfoType | undefined }) {
  return (
    <View style={{ backgroundColor: "#ECE9EC", marginTop: 16, borderRadius: 16 }}>
      <Title
        style={{
          alignContent: "center",
          justifyContent: "center",
          marginBottom: 16,
          borderRadius: 8,
          opacity: 0.9,
          textAlign: "center"

        }}
      >
        销售信息
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
            销售时间： {moment(info?.salesTime).format('YYYY-MM-DD HH:mm:ss')}
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
            销售价格：{info?.salesPrice}
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
            分销渠道：{info?.distributionChannel}
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
            销售渠道：{info?.salesOutlet}
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
            最新销售记录位于区块链的第 {info?.salesInfoBlockNumber?.toString()} 区块上
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
    let dateTime = info.itemDate
    return moment(dateTime).format('YYYY-MM-DD HH:mm:ss')
  }

  return (
    <View style={styles.description}>
      <TouchableRipple
        style={{ paddingBottom: 21 }}
        borderless
        onPress={() => console.log("Pressed")}
      >
        <View style={{ borderRadius: 16 }}>
          <ItemValue value={info?.value} itemId={info?.itemId}></ItemValue>
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
          textAlign: "center"

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
            更新者： {info?.updater}
          </Text>
        </View>
      </TouchableRipple>
      {info?.hasChange && <TouchableRipple
        style={{ paddingBottom: 21, backgroundColor: "#D84315", padding: 8, }}
        borderless
        onPress={() => console.log("Pressed")}
      >
        <View style={{ justifyContent: "center", borderRadius: 16, flexDirection: 'row', backgroundColor: '#D84315', }}>
          <Icon source="alert-circle-outline" color="" size={20} />
          <View style={{
            flexDirection: 'column',
            backgroundColor: "#D84315",
          }}>
            <Text
              style={{
                fontSize: 16,
              }}
            >
              物品信息已被所有者更改

            </Text>
            <Text
              style={{
                fontSize: 16,
              }}>
              点击可查看更改记录
            </Text>
          </View>
        </View>
      </TouchableRipple>}
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
            品牌： {info?.brand}
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
            型号： {info?.model}
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
            物品位于区块链的第 {info?.blockNumber?.toString()} 区块上
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
            物品估值原因： {info?.reason}
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
      {info?.status == 2 || info?.status == 3 && <ItemTansportInfo info={info} />}
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
                displayQRcode ? `${itemInfos?.qrcode}` : itemInfos?.itemImage
              }
              contentFit="contain"
              placeholder={require("../../assets/images/115668636_p0_master1200.jpg")}
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
    flex: 1
  },
  imageWrap: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
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
    marginBottom: 10,
  },
  image: {
    height: 220,
    width: width * 0.8,
    borderRadius: 10,
  },
});
