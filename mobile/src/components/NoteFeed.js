import React from 'react';
import { FlatList, View, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';

import NoteComponent from './Note';

// our dummy data
const photos = [
  {
    id: 0,
    url:
      'https://res.cloudinary.com/dgijgcseu/image/upload/v1624532018/insta_clone/image_uploads/cool-icon.jpg_f3395157-e3f1-40bc-8df6-b020d06beaa8.jpg',
    caption: 'Nice Icon',
    createdAt: '2021-06-24T10:53:38.648+00:00',
    user: {
      username: 'ben',
    },
  },
  {
    id: 1,
    url:
      'https://res.cloudinary.com/dgijgcseu/image/upload/v1624532018/insta_clone/image_uploads/cool-icon.jpg_f3395157-e3f1-40bc-8df6-b020d06beaa8.jpg',
    caption: 'Nice Icon',
    createdAt: '2021-06-24T10:53:38.648+00:00',
    user: {
      username: 'ben',
    },
  },
];

// FeedView styled-component definition
const FeedView = styled.View`
  height: 100;
  overflow: hidden;
  margin-bottom: 10px;
`;

const Separator = styled.View`
  height: 1;
  width: 100%;
  background-color: #ced0ce;
`;

const NoteFeed = (props) => {
  return (
    <View>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('Note', {
                id: item.id,
              })
            }
          >
            <FeedView>
              <NoteComponent photo={item} />
            </FeedView>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NoteFeed;
