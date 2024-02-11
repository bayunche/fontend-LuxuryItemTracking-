import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Avatar } from 'react-native-paper';

// Define the shape of the data for each collection
type CollectionItem = {
  id: string;
  name: string;
  floorPrice: number;
  volume: number;
  volumeChange: number;
  isVerified: boolean;
  imageUrl: string;
};

// Mock data array to simulate the data we would receive from an API
const mockData: CollectionItem[] = [
  // Populate with mock data based on the image provided
];

// Define a component for rendering each item in the banner using React Native Paper components
const BannerItem: React.FC<{ item: CollectionItem }> = ({ item }) => {
  const volumeChangeColor = item.volumeChange < 0 ? 'red' : 'green';
  const verifiedIcon = item.isVerified ? 'check-decagram' : 'alert-circle-outline'; // Placeholder for verified icon

  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.imageUrl }} />
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>Floor Price: {item.floorPrice} ETH</Paragraph>
        <Paragraph style={{ color: volumeChangeColor }}>
          {item.volumeChange < 0 ? '' : '+'}{item.volumeChange}%
        </Paragraph>
      </Card.Content>
      <Avatar.Icon size={24} icon={verifiedIcon} />
    </Card>
  );
};

// Define the main banner component
const HomeBanner: React.FC = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {mockData.map(item => (
        <BannerItem key={item.id} item={item} />
      ))}
    </ScrollView>
  );
};

// StyleSheet for the component
const styles = StyleSheet.create({
  card: {
    // Style for the card
    marginRight: 10, // Add space between cards
  },
  // ... Additional styles if needed
});

export default HomeBanner;
