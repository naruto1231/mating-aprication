import React, { useRef } from 'react';
import { Animated, PanResponder, StyleSheet, Text, View, Image, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

export default function ProfileCard({ profile, onSwipeLeft, onSwipeRight, isTop }) {
  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => isTop,
      onPanResponderMove: (evt, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (evt, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe('left');
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const forceSwipe = (direction) => {
    const x = direction === 'right' ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      direction === 'right' ? onSwipeRight() : onSwipeLeft();
      position.setValue({ x: 0, y: 0 });
    });
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  const likeOpacity = position.x.interpolate({
    inputRange: [0, SWIPE_THRESHOLD],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = position.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const animatedStyle = isTop
    ? {
        ...position.getLayout(),
        transform: [{ rotate }],
      }
    : {};

  return (
    <Animated.View
      style={[styles.card, animatedStyle]}
      {...(isTop ? panResponder.panHandlers : {})}
    >
      <Image source={{ uri: profile.image }} style={styles.image} />

      {isTop && (
        <>
          <Animated.View style={[styles.badge, styles.likeBadge, { opacity: likeOpacity }]}>
            <Text style={styles.badgeText}>LIKE</Text>
          </Animated.View>
          <Animated.View style={[styles.badge, styles.nopeBadge, { opacity: nopeOpacity }]}>
            <Text style={styles.badgeText}>NOPE</Text>
          </Animated.View>
        </>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{profile.name}, {profile.age}</Text>
        <Text style={styles.bio}>{profile.bio}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.9,
    height: '75%',
    top: '5%',
    left: SCREEN_WIDTH * 0.05,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  bio: {
    fontSize: 14,
    color: '#eee',
    marginTop: 4,
  },
  badge: {
    position: 'absolute',
    top: 40,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 3,
    borderRadius: 8,
  },
  likeBadge: {
    left: 20,
    borderColor: '#4CD964',
    transform: [{ rotate: '-20deg' }],
  },
  nopeBadge: {
    right: 20,
    borderColor: '#FF3B30',
    transform: [{ rotate: '20deg' }],
  },
  badgeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
});
