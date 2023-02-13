import { useEffect, useState } from "react";
import { Box, FlatList, Icon, VStack } from "native-base";

import firestore from '@react-native-firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import 'moment/locale/pt-br'
moment.locale('pt-br')

import { FeedPostCard } from "@components/FeedPostCard";
import { Header } from "@components/Header";
import { IPost } from "src/interfaces/IPost";
import { useAuth } from "@hooks/useAuth";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ListEmpty } from "@components/ListEmpty";

export function Feed() {
  const [posts, setPosts] = useState<IPost[]>([]);

  const { user } = useAuth();

  const navigator = useNavigation<AppNavigatorRoutesProps>();

  function handleAddPostPress() {
    navigator.navigate('addPost');
  }

  useEffect(() => {
    const subscribe = firestore()
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
          return ({
            id: doc.id,
            ...doc.data(),
          })
        }) as IPost[];
        const parsedData = data.map(post => ({
          ...post,
          createdAt: post.createdAt ? moment(post.createdAt.toDate()).format('DD [de] MMMM [de] YYYY [às] h:mm a') : ''
        }))
        setPosts(parsedData);
      });

    return () => subscribe();
  }, []);

  return (
    <VStack flex={1}>
      <Header title="Feed" />

      {user?.email === 'wlt.junior92@gmail.com' &&
        <Box
          w="100%"
          mb={4}
          px={4}
          alignItems="flex-end"
        >
          <TouchableOpacity
            onPress={handleAddPostPress}
          >
            <Icon
              as={MaterialIcons}
              name="add"
              color="gray.200"
              size={7}
            />
          </TouchableOpacity>
        </Box>
      }

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
          pb={16}
          showsVerticalScrollIndicator={false}
        />
      </Box>
    </VStack>
  );
};
