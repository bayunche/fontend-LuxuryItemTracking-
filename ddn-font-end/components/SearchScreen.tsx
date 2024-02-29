import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Card, Text, Button, BottomNavigation, Searchbar } from 'react-native-paper';


const BlockchainLuxuryApp = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const top = [
    { title: '奢侈品项链 #1', subtitle: '地板价 0.5 ETH', imageUri: 'https://example.com/image1.jpg' },
    { title: '奢侈品项链 #1', subtitle: '地板价 0.5 ETH', imageUri: 'https://example.com/image1.jpg' },
    { title: '奢侈品项链 #1', subtitle: '地板价 0.5 ETH', imageUri: 'https://example.com/image1.jpg' },

    // 添加更多对象...
  ];
  
  const attention = [
    { title: '收藏品 #1', subtitle: '地板价 1.0 ETH', imageUri: 'https://example.com/image2.jpg' },
    { title: '收藏品 #1', subtitle: '地板价 1.0 ETH', imageUri: 'https://example.com/image2.jpg' },
    { title: '收藏品 #1', subtitle: '地板价 1.0 ETH', imageUri: 'https://example.com/image2.jpg' },

    // 添加更多对象...
  ];
  
  const focus = [
    { title: '奢侈品项链 #2', subtitle: '地板价 0.7 ETH', imageUri: 'https://example.com/image3.jpg' },
    { title: '奢侈品项链 #1', subtitle: '地板价 0.5 ETH', imageUri: 'https://example.com/image1.jpg' },
    { title: '奢侈品项链 #1', subtitle: '地板价 0.5 ETH', imageUri: 'https://example.com/image1.jpg' },

    // 添加更多对象...
  ];
  const renderCards = (items:any) => items.map((item:any, index:number) => (
    <Card key={index} style={styles.card}>
      <Card.Title title={item.title} subtitle={item.subtitle} />
      <Card.Cover source={{ uri: item.imageUri }} />
    </Card>
  ));
  const onChangeSearch = (query: string) => setSearchQuery(query);
  return <View style={styles.container}>
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
    {renderCards(top)}
  </ScrollView>

  <Text style={styles.sectionTitle}>值得注意的区块链收藏</Text>
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.scrollViewContent}
  >
    {renderCards(attention)}
  </ScrollView>

  <Text style={styles.footer}>区块链奢侈品聚焦</Text>
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.scrollViewContent}
  >
    {renderCards(focus)}
  </ScrollView>
</View>
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
    width: 180, // 可以根据实际需要调整宽度
    height:"80%",
    elevation: 4,
  },
 

});

export default BlockchainLuxuryApp;
