import { FeedPostCard, FeedPostProps } from "@components/FeedPostCard";
import { Header } from "@components/Header";
import { Box, FlatList, VStack } from "native-base";

type PostProps = FeedPostProps & {
  id: string;
}

const posts: PostProps[] = [
  {
    id: '1',
    user: {
      name: 'Walter Júnior',
      avatar: 'https://github.com/wltjunior92.png',
    },
    createdAt: new Date(),
    video: '_qvz-NZ84Wo',
    message: 'Integer nec purus et metus luctus accumsan. Vivamus lacinia velit nulla, eu auctor sem consectetur nec. Nunc iaculis maximus tellus'
  },
  {
    id: '2',
    user: {
      name: 'Walter Júnior',
      avatar: 'https://github.com/wltjunior92.png',
    },
    createdAt: new Date(),
    image: 'https://instagram.fbsb10-1.fna.fbcdn.net/v/t39.30808-6/325771681_859818045347369_3315741636833105777_n.png?stp=dst-png_e15_fr_s1080x1080&_nc_ht=instagram.fbsb10-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=AxrQQs02g0UAX-HA27u&tn=iuJqY1uAKog9rRDk&edm=APU89FAAAAAA&ccb=7-5&oh=00_AfDFRZiAZKhjIWM83CFlyKNsXC-fd_xD-VRyxYKVAcJFLA&oe=63EACD70&_nc_sid=86f79a'
  },
  {
    id: '3',
    user: {
      name: 'Walter Júnior',
      avatar: 'https://github.com/wltjunior92.png',
    },
    createdAt: new Date(),
    message: 'Integer nec purus et metus luctus accumsan. Vivamus lacinia velit nulla, eu auctor sem consectetur nec. Nunc iaculis maximus tellus',
    image: 'https://instagram.fbsb10-1.fna.fbcdn.net/v/t39.30808-6/327119530_6044577828897814_2965696075711198079_n.png?stp=dst-jpg_e15_fr_s1080x1080&_nc_ht=instagram.fbsb10-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=jmlihey34cIAX9eKIui&edm=AOQ1c0wAAAAA&ccb=7-5&oh=00_AfAvJV9-Q-wTNVFcKINI2dqtt62PQzRakcoZ8xe7SE4zIg&oe=63E9DD37&_nc_sid=8fd12b'
  }
]

export function Feed() {
  return (
    <VStack flex={1}>
      <Header title="Feed" />

      <Box
        flex={1}
      >
        <FlatList
          keyExtractor={({ id }) => id}
          data={posts}
          renderItem={({ item }) => (
            <FeedPostCard
              user={item.user}
              createdAt={item.createdAt}
              image={item.image}
              message={item.message}
              video={item.video}
            />
          )}
          pb={16}
          showsVerticalScrollIndicator={false}
        />
      </Box>
    </VStack>
  );
};
