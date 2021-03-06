import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image
} from 'react-native';
import styles from './album.style';

type AlbumItems = {
  title: string;
  imageURL: string;
  itemId: string;
};

interface AlbumState {
  items: AlbumItems[];
}
export default class Album extends React.Component<{}, AlbumState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    fetch('https://9gag.com/v1/featured-posts')
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          items: response.data.items
        });
      });
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        {this.state.items
          && this.state.items.map((item) => (
            <View style={styles.itemContainer} key={item.itemId}>
              <Text style={styles.itemText}>{item.title}</Text>
              <Image source={{ uri: item.imageURL }} style={{ height: 300, width: '100%' }} />
            </View>
          ))}
      </ScrollView>
    );
  }
}
