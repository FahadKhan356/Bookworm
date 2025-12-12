import { View, Text,TouchableOpacity, FlatList } from 'react-native'
import { Image } from 'expo-image'
import styles from "../../assets/styles/home.styles.js"
import COLORS from '../../constants/colors'
import { useAuthStore } from '../../store/authStore'
import { useEffect, useState } from 'react'

export default function Home () {
const {user,logout}=useAuthStore();

const [books, setBooks]= useState([]);
const [loader, setLoader]= useState(false);
const [refresh, setRefresh]= useState(false);
const [hasMore, setHasMore]= useState(false);
const [pageNum, setPageNum]= useState(1);

const {token}=useAuthStore();

{/* */}
{/*fetch books */}

const fetchBooks = async() =>{

try{


if(refresh) {setRefresh(true);

  }else if(pageNum ==1 ){
    setLoader(true)
  }

  const response = await fetch(`http://192.168.43.187:3001/api/books?page=${pageNum}&limit=2`, {
    headers:{
      "Authorization": `Bearer ${token}` }
  });

const data = await response.json();
if(!response.ok) throw new Error(data.message || "Something went Wrong");

//todo
// setBooks([...books, ...data.books]);

//fetch books unique each time to avoid redundant data
const uniqueBooks = 
refresh || pageNum==1 ? data.books :
Array.from(new Set([...books, ...data.books].map((book)=>book._id).map((id)=> [...books, ...data.books].find((book)=>book._id==id) )));
setBooks(uniqueBooks);

}catch(error){
  console.log("Error",error);
}finally{
  if(refresh){
    await sleep(800);
    setRefresh(false);
  }else{
    setLoader(false)
  }
}
}

useEffect(()=>{fetchBooks()},[])

{/*handle load more data */}
 const handleLoadMore =()=>{
  if(hasMore && !loader && !refresh){
    setPageNum(pageNum + 1);
  }
 }

{/*render item componened, custom componenet to show items in flat/list */}
const renderItem=({item})=>(
  <View style={styles.bookCard}>
    <View style={styles.bookHeader}>
      <View style={styles.userInfo}>
      <Image source={{uri: item.user.profileImage}} style={styles.avatar}/>
      <Text style={styles.username}>{item.user.username}</Text>
</View>
    </View>

<View style={styles.bookImageContainer}>
  <Image source={item.image} style={styles.bookImage} contentFit='cover'></Image>
</View>

  </View>
);





  return (
    <FlatList
     data={books}
     renderItem={renderItem}
      keyExtractor={(item)=>item._id} 
      contentContainerStyle={styles.listContainer}
       showsVerticalScrollIndicator={false}>

       <TouchableOpacity on></TouchableOpacity>
      
    </FlatList>
   
  )
}