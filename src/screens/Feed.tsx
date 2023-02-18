import { useCallback, useState } from "react";
import { Box, FlatList, VStack, useToast } from "native-base";

import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import moment from 'moment';
import 'moment/locale/pt-br'
moment.locale('pt-br')

import { FeedPostCard } from "@components/FeedPostCard";
import { Header } from "@components/Header";
import { IPost } from "src/interfaces/IPost";
import { useAuth } from "@hooks/useAuth";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ListEmpty } from "@components/ListEmpty";
import { Loading } from "@components/Loading";
import { ScreenActions } from "@components/ScreenActions";

export function Feed() {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [lastPost, setLastPost] = useState<FirebaseFirestoreTypes.DocumentData>();

  const [totalPosts, setTotalPosts] = useState(0);

  // Status de inscrição provisório
  const [validSubscription, setValidSubscription] = useState(false);

  const { isAdmin } = useAuth();

  const navigator = useNavigation<AppNavigatorRoutesProps>();

  const toast = useToast();

  function handleAddPostPress() {
    navigator.navigate('addPost');
  }

  async function loadMorePosts() {
    if (!validSubscription) return;
    if (posts.length < totalPosts) {
      setIsLoading(true)
      firestore()
        .collection('posts')
        .orderBy('createdAt', 'desc')
        .limit(10)
        .startAfter(lastPost)
        .get()
        .then(response => {
          const data = response.docs.map(doc => {
            return ({
              id: doc.id,
              ...doc.data(),
            })
          }) as IPost[];
          const parsedData = data.map(post => ({
            ...post,
            createdAt: post.createdAt ? moment(post.createdAt.toDate()).format('DD [de] MMMM [de] YYYY [às] h:mm a') : ''
          }))

          setLastPost(response.docs.pop())
          setPosts(prevState => [...prevState, ...parsedData]);
        })
        .catch(error => toast.show({
          title: 'Não foi possível carregar mais posts.',
          placement: 'top',
          bg: 'red.500'
        }))
        .finally(() => setIsLoading(false));
    }
  }

  useFocusEffect(useCallback(() => {
    setIsLoading(true)
    firestore()
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .count()
      .get().then(response => {
        setTotalPosts(response.data().count)
      })

    firestore()
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get()
      .then(response => {
        const data = response.docs.map(doc => {
          return ({
            id: doc.id,
            ...doc.data(),
          })
        }) as IPost[];
        const parsedData = data.map(post => ({
          ...post,
          createdAt: post.createdAt ? moment(post.createdAt.toDate()).format('DD [de] MMMM [de] YYYY [às] h:mm a') : ''
        }))

        setLastPost(response.docs.pop())
        setPosts(parsedData);
      })
      .catch(error => toast.show({
        title: 'Não foi possível carregar os posts.',
        placement: 'top',
        bg: 'red.500'
      }))
      .finally(() => setIsLoading(false));
  }, []));

  return (
    <VStack flex={1}>
      <Header title="Feed" from="feed" />

      <ScreenActions
        onActionPress={handleAddPostPress}
        itensCount={`${posts.length} de ${totalPosts}`}
      />

      <Box
        flex={1}
      >
        <FlatList
          keyExtractor={({ id }) => id}
          data={posts}
          renderItem={({ item }) => (
            <FeedPostCard
              id={item.id}
              userUid={item.userUid}
              userName={item.userName}
              userAvatarUrl={item.userAvatarUrl}
              createdAt={item.createdAt}
              imageUrl={item.imageUrl}
              message={item.message}
              videoUrl={item.videoUrl}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty
              message="Nenhum post encontrado 🤔"
            />
          )}
          onEndReached={loadMorePosts}
          pb={16}
          showsVerticalScrollIndicator={false}
        />
      </Box>

      {isLoading &&
        <Loading
          maxH={16}
        />
      }
    </VStack>
  );
};
