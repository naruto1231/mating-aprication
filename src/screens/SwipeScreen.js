import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProfileCard from '../components/ProfileCard';
import { mockProfiles } from '../data/mockProfiles';
import { useAppContext } from '../context/AppContext';

export default function SwipeScreen() {
  const [profiles, setProfiles] = useState(mockProfiles);
  const { addMatch } = useAppContext();

  const removeTopCard = () => {
    setProfiles((prev) => prev.slice(1));
  };

  const handleSwipeLeft = () => {
    removeTopCard();
  };

  const handleSwipeRight = () => {
    const topProfile = profiles[0];
    removeTopCard();

    // デモ用: 50%の確率でマッチさせる(本番は相手の「いいね」有無をAPIで判定)
    if (Math.random() > 0.5) {
      addMatch(topProfile);
      Alert.alert('マッチ成立!🎉', `${topProfile.name}さんとマッチしました`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardArea}>
        {profiles.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>近くに新しい人がいません</Text>
            <Text style={styles.emptySubText}>また後で見に来てね</Text>
          </View>
        ) : (
          profiles
            .map((profile, index) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                isTop={index === 0}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
              />
            ))
            .reverse()
        )}
      </View>

      {profiles.length > 0 && (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.nopeButton]}
            onPress={handleSwipeLeft}
          >
            <Ionicons name="close" size={32} color="#FF3B30" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.likeButton]}
            onPress={handleSwipeRight}
          >
            <Ionicons name="heart" size={30} color="#4CD964" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  cardArea: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  emptySubText: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 24,
    gap: 24,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  nopeButton: {
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  likeButton: {
    borderWidth: 1,
    borderColor: '#4CD964',
  },
});
