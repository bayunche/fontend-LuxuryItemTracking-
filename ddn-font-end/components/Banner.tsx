// Banner.tsx
import React, { memo } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { Title, Paragraph } from 'react-native-paper';
import FastImage from 'react-native-fast-image'; // If you've chosen to use react-native-fast-image for caching

interface BannerProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  onPress: () => void; // Define the type of your onPress function
}

const Banner = memo(({ title, subtitle, imageUrl, onPress }: BannerProps) => {
  // Function to handle press event, this could be passed down as a prop as well
  const onPressHandler = () => {
    // Placeholder for your onPress event handling logic
    onPress();
  };

  return (
    <TouchableOpacity onPress={onPressHandler} activeOpacity={0.7}>
      <ImageBackground source={{ uri: imageUrl }} style={styles.image}>
        <View style={styles.overlay}>
          <Title style={styles.title}>{title}</Title>
          <Paragraph style={styles.subtitle}>{subtitle}</Paragraph>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}, arePropsEqual);

// Add a function to determine if props are equal to prevent unnecessary re-renders
function arePropsEqual(prevProps: BannerProps, nextProps: BannerProps) {
  return prevProps.imageUrl === nextProps.imageUrl &&
         prevProps.title === nextProps.title &&
         prevProps.subtitle === nextProps.subtitle;
}

// Styles for the banner
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: Dimensions.get('window').width * 0.5625, // 16:9 aspect ratio
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent overlay for text readability
    padding: 16,
  },
  title: {
    color: 'white',
    fontSize: 24,
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
  },
});

export default Banner;
