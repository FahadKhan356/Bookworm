import { View, Text, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import styles from "../../assets/styles/home.styles.js"
import COLORS from '../../constants/colors'
import { useAuthStore } from '../../store/authStore'
import { useEffect, useState } from 'react'
import { formatPublishDate } from '../../lib/utils.js'




export default function Home() {

  const { user, logout } = useAuthStore();
  useEffect(() => { fetchBooks() }, []);

  const [books, setBooks] = useState([]);
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPageNum] = useState(1);

  const { token } = useAuthStore();



  {/* */ }
  {/*fetch books */ }

  const fetchBooks = async (pageNum = 1, refresh=false) => {



    try {


      if (refresh) {
        setRefresh(true);

      } else if (pageNum === 1) {
        setLoader(true)
      }

      const response = await fetch(`http://192.168.43.187:3001/api/books?page=${pageNum}&limit=2`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went Wrong");


      //todo
      // setBooks([...books, ...data.books]);

      //fetch books unique each time to avoid redundant data
      const uniqueBooks =
        refresh || pageNum == 1 ? data.books :
          Array.from(new Set([...books, ...data.books].map((book) => book._id).map((id) => [...books, ...data.books].find((book) => book._id == id))));
      setBooks(uniqueBooks);
      setHasMore(pageNum < data.totalPages);
      setPageNum(pageNum);

    } catch (error) {
      console.log("Error", error);
    } finally {
      if (refresh) {
        await sleep(800);
        setRefresh(false);
      } else {
        setLoader(false)
      }
    }
  }



  {/*handle load more data */ }
  const handleLoadMore = async () => {
    console.log(" haldle load more called")
    if (hasMore && !loader && !refresh) {
      console.log("inside handle load more");
      await fetchBooks(page + 1);
    }
  }



  {/*render item componened, custom componenet to show items in flat/list */ }
  const renderItem = ({ item }) => (
    <View style={styles.bookCard}>
      <View style={styles.bookHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: item.user.profileImage }} style={styles.avatar} />
          <Text style={styles.username}>{item.user.username}</Text>
          <TouchableOpacity onPress={() => { }}>
            <Text>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bookImageContainer}>
        <Image source={item.image} style={styles.bookImage} contentFit="cover" />
      </View>

      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <View style={styles.ratingContainer}>{renderRatingStars(item.rating)}</View>
        <Text style={styles.caption}>{item.caption}</Text>
        <Text style={styles.date}>shared on {formatPublishDate(item.createdAt)}</Text>


      </View>
    </View>
  );

  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={16}
          color={i <= rating ? "#f4b400" : COLORS.textSecondary}
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };






  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => fetchBooks(1, true)}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}

        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>BookWorm 🐛</Text>
            <Text style={styles.headerSubtitle}>Discover great reads from the community👇</Text>
          </View>
        }
        ListFooterComponent={
          hasMore && books.length > 0 ? (
            <ActivityIndicator style={styles.footerLoader} size="small" color={COLORS.primary} />
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="book-outline" size={60} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>No recommendations yet</Text>
            <Text style={styles.emptySubtext}>Be the first to share a book!</Text>
          </View>
        }



      />






    </View>



  )
}