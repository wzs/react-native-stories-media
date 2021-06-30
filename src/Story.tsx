/* eslint-disable react/no-unused-prop-types */
import React, {useState} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import Video from 'react-native-video';
import {StoryType} from '.';

const ScreenWidth = Dimensions.get('window').width;

type Props = {
  story: StoryType;
  onVideoLoaded?: (Object) => void;
  onImageLoaded?: () => void;
  pause: boolean;
  isLoaded?: boolean;
  isNewStory?: boolean;
};
const Story = (props: Props) => {
  const {story} = props;
  const {url, type} = story || {};
  const [isPortation, setIsPortation] = useState(false);
  const [heightScaled, setHeightScaled] = useState(231);

  return (
    <View style={styles.container}>
      {/* {!props.isLoaded && (
      <View style={styles.loading}>
        <ActivityIndicator color="white" />
      </View>
      )} */}
      {type === 'image' ? (
        <Image
          source={{uri: url}}
          onLoadEnd={props.onImageLoaded}
          style={styles.content}
          resizeMode="contain"
          // width={ScreenWidth}
        />
      ) : (
        <Video
          source={{uri: url}}
          paused={props.pause || props.isNewStory}
          onLoad={item => {
            const {width, height} = item.naturalSize;
            const heightScaled = height * (ScreenWidth / width);
            let isPortrait = height > width;
            setIsPortation(height > width);
            setHeightScaled(heightScaled);
            props.onVideoLoaded(item);
          }}
          style={
            isPortation
              ? [styles.contentVideoPortation, {height: heightScaled}]
              : [styles.contentVideo, {height: heightScaled}]
          }
          resizeMode={'stretch'}
        />
      )}
    </View>
  );
};

//  720 405 231.42857142857142

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {width: '100%', height: '100%', flex: 1},
  contentVideo: {
    width: ScreenWidth + 20,
    //aspectRatio: 1,
    backgroundColor: '#000',
    //flex: 1,
    height: 231,
  },
  contentVideoPortation: {
    width: ScreenWidth + 20,
    //aspectRatio: 1,
    backgroundColor: '#000',
    //flex: 1,
    height: 231,
  },
  imageContent: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  loading: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Story;
