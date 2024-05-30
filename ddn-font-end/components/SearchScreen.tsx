import React, { useCallback, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Card, Text, Button, BottomNavigation, Searchbar } from 'react-native-paper';
import { getItembanner, searchItem } from '../api/item';
import { router, useFocusEffect } from 'expo-router';

type bannerItem = {
  title: string;
  subtitle: string;
  imageUri: string;
}


const BlockchainLuxuryApp = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [dimension, setDimension] = useState(1);
  const [top, setTop] = useState<bannerItem[]>([]);
  const [attention, setAttention] = useState<bannerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchItems, setSearchItems] = useState<bannerItem[]>([]);
  const tops = [
    { title: '奢侈品项链 #1', subtitle: '地板价 0.5 ETH', imageUri: 'https://github.com/bayunche/fontend-LuxuryItemTracking-/blob/2feb88bf37b963dd29c91c8b49987d7ae3b7d0e6/ddn-font-end/assets/images/114644639_p0_master1200.jpg?raw=true' },
    { title: '奢侈品项链 #1', subtitle: '地板价 0.5 ETH', imageUri: 'https://github.com/bayunche/fontend-LuxuryItemTracking-/blob/2feb88bf37b963dd29c91c8b49987d7ae3b7d0e6/ddn-font-end/assets/images/114644639_p0_master1200.jpg?raw=true' },
    { title: '奢侈品项链 #1', subtitle: '地板价 0.5 ETH', imageUri: 'https://github.com/bayunche/fontend-LuxuryItemTracking-/blob/2feb88bf37b963dd29c91c8b49987d7ae3b7d0e6/ddn-font-end/assets/images/114644639_p0_master1200.jpg?raw=true' },

  ];

  const attentions = [
    { title: '收藏品 #1', subtitle: '地板价 1.0 ETH', imageUri: 'https://github.com/bayunche/fontend-LuxuryItemTracking-/blob/6f20269b885c4d5430c20bb58b32e2c56b950c80/ddn-font-end/assets/images/116503726_p0_master1200.jpg?raw=true' },
    { title: '收藏品 #1', subtitle: '地板价 1.0 ETH', imageUri: 'https://github.com/bayunche/fontend-LuxuryItemTracking-/blob/6f20269b885c4d5430c20bb58b32e2c56b950c80/ddn-font-end/assets/images/116503726_p0_master1200.jpg?raw=true' },
    { title: '收藏品 #1', subtitle: '地板价 1.0 ETH', imageUri: 'https://github.com/bayunche/fontend-LuxuryItemTracking-/blob/6f20269b885c4d5430c20bb58b32e2c56b950c80/ddn-font-end/assets/images/116503726_p0_master1200.jpg?raw=true' },

  ];

  const focus = [
    { title: '奢侈品项链 #2', subtitle: '地板价 0.7 ETH', imageUri: 'https://example.com/image3.jpg' },
    { title: '奢侈品项链 #1', subtitle: '地板价 0.5 ETH', imageUri: 'https://example.com/image1.jpg' },
    { title: '奢侈品项链 #1', subtitle: '地板价 0.5 ETH', imageUri: 'https://example.com/image1.jpg' },

  ];
  const renderCards = (items: any) => items.map((item: any, index: number) => (
    <Card key={index} style={styles.card}>
      <Card.Title title={item.title} subtitle={item.subtitle} />
      <Card.Cover source={{ uri: item.imageUri }} />
    </Card>
  ));
  const onChangeSearch = (query: string) => setSearchQuery(query);
  const getLuxuryItemsRecent = async () => {
    // 调用API获取最新奢侈品列表
    let res: any = await getItembanner({
      dimension: dimension,
    })

    console.log(res.data)
    let data = res.data.map((item: any) => {
      // console.log(item.itemImage)
      if (item.value == null) {
        item.value = "0";
      }
      return {
        title: item.itemName,
        subtitle: "地板价 ￥" + item.value || 0,
        imageUri: item.itemImage
      }
    })
    setTop(data);
  }
  const getLuxuryItemsMonth = async () => {
    // 调用API获取近一个月奢侈品列表
    let res: any = await getItembanner({
      dimension: dimension,
      dateRange: 1
    })
    let data = res.data.map((item: any) => {
      if (item.value == null) {
        item.value = "0";
      }
      return {
        title: item.itemName,
        subtitle: "地板价 ￥" + item.value || 0,
        imageUri: item.itemImage
      }
    })
    // console.log(res.data)
    setAttention(data);

  }
  const handleSearch = async () => {
    // 执行搜索操作
    // ...
    let params = {
      searchQuery: searchQuery,
      dimension: dimension,
    }
    let res: any = await searchItem(params);
    console.log(res.data)
    let itemData = res.data.map((item: any) => {
      return {
        title: item.itemName,
        subtitle: "地板价 ￥" + item.value || 0,
        imageUri: item.itemImage
      }
    })
    setSearchItems(itemData);
  }
  useFocusEffect(
    useCallback(() => {
      const getBanner = async () => {
        await getLuxuryItemsRecent();
        await getLuxuryItemsMonth();
      }
      getBanner();
    }, [])

  )
  return (
    <View style={styles.container}>
      {searchItems.length == 0 ? <View>
        <Searchbar
          placeholder="请输入你要搜索的奢侈品名称"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
          onIconPress={() => {
            // 执行搜索操作
            handleSearch();
          }}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          {/* 类别按钮 */}
          <Button onPress={() => {
            setDimension(1);
            getLuxuryItemsRecent();
            getLuxuryItemsMonth();
          }} style={styles.categoryButton}>按时间排序</Button>
          <Button
            onPress={() => {
              setDimension(2);
              getLuxuryItemsRecent();
              getLuxuryItemsMonth();
            }} style={styles.categoryButton}>按A-Z排序</Button>
          {/* ...其他类别按钮 */}

        </ScrollView>
        <View style={{ padding: 14 }}>
          <Button
            onPress={() => {
        router.push('/TraceabilityScreen')
              
            }} mode="elevated" >区块链溯源</Button>
        </View>
        <Text style={styles.sectionTitle}>最近新增奢侈品</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          {renderCards(top.length == 0 ? tops : top)}
        </ScrollView>

        <Text style={styles.sectionTitle}>近一月新增奢侈品</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          {renderCards(attention.length == 0 ? attentions : attention)}
        </ScrollView>

        {/* <Text style={styles.footer}>区块链奢侈品聚焦</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {renderCards(focus)}
      </ScrollView> */}

      </View> : <View>
        <Searchbar
          placeholder="请输入你要搜索的奢侈品名称"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
          onIconPress={() => {
            // 执行搜索操作

          }}
        />


        {searchItems.length != 0 ? <View>
          {searchItems.map((item, index) => {
            return (
              <Card key={index} style={{
                marginHorizontal: 8,
                width: 200, // 可以根据实际需要调整宽度
                height: "80%",
                elevation: 4,
              }}>
                <Card.Title title={item.title} subtitle={item.subtitle} />
                <Card.Cover source={{ uri: item.imageUri }} />
              </Card>
            )
          })}
        </View> : <View>
          <Text>暂无</Text>
        </View>}
      </View>}

    </View>
  )
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  searchbar: {
    margin: 8,
    elevation: 3,
  },
  categories: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  categoryButton: {
    marginHorizontal: 4,
    elevation: 2,
  },
  sectionTitle: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  cardList: {
    paddingHorizontal: 8,
  },
  footer: {
    padding: 20,
    alignSelf: 'auto',
  },
  bottomNavigation: {
    backgroundColor: 'transparent',
    elevation: 0,
  },

  scrollViewContent: {
    flexDirection: 'row',
    padding: 8,

  },

  card: {
    marginHorizontal: 8,
    width: 240, // 可以根据实际需要调整宽度
    height: "80%",
    elevation: 4,
  },


});

export default BlockchainLuxuryApp;
