import {
  StyleSheet,
  Dimensions,
  ImageProps,
  TouchableWithoutFeedback,
  ListRenderItemInfo,
  Image
} from "react-native";

// import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from "./Themed";
import { Card, List } from "@ui-kitten/components";
import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Icon,
  IconElement,
  Layout,
  Spinner,
} from "@ui-kitten/components";
const { width, height } = Dimensions.get("window");

const data = new Array(8).fill({
  title: "Item",
});
export const HomeScreenList = (): React.ReactElement => {
  const renderItemHeader = (
    headerProps:any,
    info: ListRenderItemInfo<{ title: string }>
  ): React.ReactElement => (
    <View {...headerProps}>
    </View>
  );

  const renderItemFooter = (footerProps:any): React.ReactElement => (
    <Text {...footerProps}>By Wikipedia</Text>
  );
  const renderItem = (info:any): React.ReactElement => (
    <Card
      style={styles.item}
      status="basic"
      header={(headerProps) => renderItemHeader(headerProps, info)}
      footer={renderItemFooter}
    >
     
      <Text>
       
      </Text>
    </Card>
  );
  return (
    <List
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={data}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 320,
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  item: {
    marginVertical: 4,
  },
});
