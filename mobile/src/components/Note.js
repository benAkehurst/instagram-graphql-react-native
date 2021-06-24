import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { format } from 'date-fns';

const NoteView = styled.ScrollView`
  padding: 10px;
`;

const ImageViewer = styled.Image`
  height: 50px;
`;

const NoteComponent = ({ photo }) => {
  return (
    <NoteView>
      <ImageViewer source={{ uri: photo.url }} />
      <Text>{photo.caption}</Text>
      <Text>{format(new Date(photo.createdAt), 'MMM do')}</Text>
    </NoteView>
  );
};

export default NoteComponent;
