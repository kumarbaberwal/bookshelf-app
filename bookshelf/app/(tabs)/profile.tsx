import { View, Text, TouchableOpacity, ToastAndroid, FlatList, Alert, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'expo-router';
import { API_URL } from '@/constants/api';
import { styles } from '@/assets/styles/profile.styles';
import ProfileHeader from '@/components/ProfileHeader';
import Logout from '@/components/Logout';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { Image } from 'expo-image';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Loader from '@/components/Loader';

export default function Profile() {
  const [books, setBooks] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false)
  const router = useRouter()
  const { token, logout } = useAuthStore();
  const [deletedBookId, setDeletedBookId] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setIsLoading(true)

      const response = await fetch(`${API_URL}/books/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Failed to fetch user books');

      setBooks(data);

    } catch (error) {
      console.log('Error fetching data: ', error)
      ToastAndroid.show('Failed to load profile data. Pull down to refresh.', ToastAndroid.LONG)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const renderRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={14}
          color={i <= rating ? '#f4b400' : colors.textSecondary}
          style={{ marginRight: 2 }}
        />
      )
    }
    return stars;
  }

  const confirmDelete = (bookId: string) => {
    Alert.alert("Delete Recommendation", "Are you sure you want to delete this recommendation?", [
      { text: "Cancel", style: 'cancel' },
      { text: "Delete", style: 'destructive', onPress: () => handleDeleteBook(bookId) }
    ])
  }

  const handleDeleteBook = async (bookId: string) => {
    try {
      setDeletedBookId(bookId)
      const response = await fetch(`${API_URL}/books/${bookId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete book");
      setBooks(books.filter((book) => book._id !== bookId))
      ToastAndroid.show("Recommendation deleted successfully", ToastAndroid.SHORT)
    } catch (error) {
      ToastAndroid.show(error instanceof Error ? error.message : String(error) || 'Failed to delete recommendation', ToastAndroid.SHORT)
    } finally {
      setDeletedBookId(null)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }


  if (isLoading && !refreshing) return <Loader />

  const renderBookItem = ({ item }: any) => (
    <View
      style={styles.bookItem}
    >
      <Image
        source={item.image}
        style={styles.bookImage}
      />
      <View
        style={styles.bookInfo}
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
          style={styles.bookCaption}
          numberOfLines={2}
        >
          {item.caption}
        </Text>
        <Text
          style={styles.bookDate}
        >
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => confirmDelete(item._id)}
        style={styles.deleteButton}
      >
        {
          deletedBookId === item._id ? (
            <ActivityIndicator size={'small'} color={colors.primary} />
          ) : (
            <Ionicons
              name={'trash-outline'}
              size={20}
              color={colors.primary}
            />
          )
        }
      </TouchableOpacity>
    </View>
  )

  return (
    <View
      style={styles.container}
    >
      <ProfileHeader />
      <Logout />

      {/* Your Recommendations */}
      <View
        style={styles.booksHeader}
      >
        <Text
          style={styles.booksTitle}
        >
          Your Recommendations 📚
        </Text>
        <Text
          style={styles.booksCount}
        >
          {books.length} books
        </Text>
      </View>

      <FlatList
        data={books}
        keyExtractor={(item) => item._id}
        renderItem={renderBookItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.booksList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          <View
            style={styles.emptyContainer}
          >
            <Ionicons
              name={'book-outline'}
              size={50}
              color={colors.textSecondary}
            />
            <Text
              style={styles.emptyText}
            >
              No recommendations
            </Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push('/create')}
            >
              <Text
                style={styles.addButtonText}
              >
                Add Your First Book
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  )
}