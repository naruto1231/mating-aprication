import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://picsum.photos/seed/myself/300/300' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>あなたの名前</Text>
      <Text style={styles.bio}>自己紹介文をここに書きます</Text>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>プロフィールを編集</Text>
      </TouchableOpacity>

      {/*
        TODO(本番実装時):
        - Spring Boot APIから自分のプロフィールを取得
        - 画像アップロード(AWS S3)
        - ログアウト処理
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  bio: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
    paddingHorizontal: 32,
    textAlign: 'center',
  },
  editButton: {
    marginTop: 24,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF4458',
  },
  editButtonText: {
    color: '#FF4458',
    fontWeight: '600',
  },
});
