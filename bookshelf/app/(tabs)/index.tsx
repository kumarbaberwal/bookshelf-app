import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import React, { startTransition, useEffect, useState } from 'react'
import { styles } from '@/assets/styles/home.styles'
import { useAuthStore } from '@/store/authStore'
import { API_URL } from '@/constants/api';
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons';
import { formatPublishDate } from '@/libs/utils';
import { colors } from '@/constants/colors';
import Loader from '@/components/Loader';

export default function Home() {
  const { token } = useAuthStore();
  const [books, setBooks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)


  // const fetchBooks = async (pageNum = 1, refresh = false) => {
  //   try {
  //     if (refreshing) setRefreshing(true);
  //     else if (pageNum === 1) setLoading(true);

  //     const response = await fetch(`${API_URL}/books?page=${pageNum}&limit=5`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       }
  //     })

  //     const data = await response.json();

  //     if (!response.ok) throw new Error(data.message || 'Failed to fetch books!');


  //     const uniqueBooks = refresh || pageNum === 1 ? data.books :
  //       Array.from(new Set([...books, ...data.books].map((book) => book._id))).map((id) => [...books, ...data.books].find((book) => book._id === id))

  //     setBooks(uniqueBooks);

  //     // setBooks((prevBooks) => [...prevBooks, ...data.books])
  //     setHasMore(pageNum < data.totalPages);
  //     setPage(pageNum + 1);
  //   } catch (error) {
  //     console.log(error)
  //   } finally {
  //     if (refreshing) setRefreshing(false);
  //     else if (pageNum === 1) setLoading(false)
  //   }
  // }


  const fetchBooks = async (pageNum = 1, refresh = false) => {
    try {
      if (refresh) setRefreshing(true);
      else if (pageNum === 1) setLoading(true);

      const response = await fetch(`${API_URL}/books?page=${pageNum}&limit=5`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch books!');

      setBooks((prevBooks) => {
        if (refresh || pageNum === 1) return data.books;
        return [...prevBooks, ...data.books]; // Append new books
      });

      setHasMore(data.books.length > 0); // Check if there are more books
      setPage(pageNum); // Correctly update page number
    } catch (error) {
      console.log(error);
    } finally {
      if (refresh) setRefreshing(false);
      else if (pageNum === 1) setLoading(false);
    }
  };



  useEffect(() => {
    fetchBooks();
  }, [])


  const handleLoadmore = async () => {
    if (hasMore && !loading && !refreshing) {
      await fetchBooks(page + 1);
    }
  }

  const renderItem = ({ item }: any) => {
    return (
      <View
        style={styles.bookCard}
      >
        <View
          style={styles.bookHeader}
        >

          <View
            style={styles.userInfo}
          >
            <Image
              source={item.user.profileImage}
              style={styles.avatar}
            />
            <Text
              style={styles.username}
            >
              {item.user.username}
            </Text>
          </View>
        </View>
        <View
          style={styles.bookImageContainer}
        >
          <Image
            source={item.image}
            style={styles.bookImage}
            contentFit='cover'
          />
        </View>
        <View
          style={styles.bookDetails}
        >
          <Text
            style={styles.bookTitle}
          >
            {item.title}
          </Text>
          <View
            style={styles.ratingContainer}
          >
            {renderRatingStars(item.rating)}
          </View>
          <Text
            style={styles.caption}
          >
            {item.caption}
          </Text>
          <Text
            style={styles.date}
          >
            Shared on {formatPublishDate(item.createdAt)}
          </Text>
        </View>
      </View>
    )
  }

  const renderRatingStars = (rating: number) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          name={i <= rating ? 'star' : 'star-outline'}
          key={i}
          size={16}
          color={i <= rating ? '#f4b400' : 'gray'}
          style={{ marginRight: 2 }}
        />
      )
    }
    return stars;
  }


  if (loading && !refreshing) return <Loader />

  return (
    <View
      style={styles.container}
    >
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={[colors.primary]}
            tintColor={colors.primary}
            onRefresh={() => {
              fetchBooks(1, true);
            }}
          />
        }
        ListHeaderComponent={
          <View
            style={styles.header}
          >
            <Text
              style={styles.headerTitle}
            >
              BookShelf 📚
            </Text>
            <Text
              style={styles.headerSubtitle}
            >
              Discover great reads from the community 🌟
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View
            style={styles.emptyContainer}
          >
            <Ionicons
              name={'book-outline'}
              size={60}
              color={colors.textSecondary}
            />
            <Text
              style={styles.emptyText}
            >
              No recommendations yet!
            </Text>
            <Text
              style={styles.emptySubtext}
            >
              Be the first to share a book 📚
            </Text>
          </View>
        }
        ListFooterComponent={
          hasMore && books.length > 0 ?
            (
              <ActivityIndicator
                style={styles.footerLoader}
                size={'small'}
                color={colors.primary}
              />
            ) :
            (
              null
            )
        }
        onEndReached={handleLoadmore}
        onEndReachedThreshold={0.1}
      />
    </View>
  )
}