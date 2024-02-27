import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Card, Text, Button, BottomNavigation, Searchbar } from 'react-native-paper';

const BlockchainLuxuryApp = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query: string) => setSearchQuery(query);




  return (
    <View style={styles.container}>
    <Searchbar
      placeholder="搜索区块链奢侈品"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={styles.searchbar}
    />
    
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContent}
    >
      {/* 类别按钮 */}
      <Button style={styles.categoryButton}>艺术</Button>
      <Button style={styles.categoryButton}>游戏</Button>
      {/* ...其他类别按钮 */}
    </ScrollView>

    <Text style={styles.sectionTitle}>今日顶级区块链交易</Text>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContent}
    >
      {/* 交易卡片 */}
      <Card style={styles.card}>
        <Card.Title title="奢侈品项链 #1" subtitle="地板价 0.5 ETH" />
        <Card.Content>
          <Text>24小时交易量：100 ETH</Text>
        </Card.Content>
      </Card>
      {/* ...其他交易卡片 */}
    </ScrollView>

    <Text style={styles.sectionTitle}>值得注意的区块链收藏</Text>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContent}
    >
      {/* 收藏卡片 */}
      <Card style={styles.card}>
        <Card.Title title="收藏品 #1" subtitle="地板价 1.0 ETH" />
        <Card.Content>
          <Text>总交易量：500 ETH</Text>
        </Card.Content>
      </Card>
      {/* ...其他收藏卡片 */}
    </ScrollView>

    <Text style={styles.footer}>区块链奢侈品聚焦</Text>
  </View>
  );
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
    alignSelf: 'center',
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
    width: 150, // 可以根据实际需要调整宽度
    height:"100%",
    elevation: 4,
  },

});

export default BlockchainLuxuryApp;
