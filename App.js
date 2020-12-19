import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Animated,
  TouchableOpacity,
} from 'react-native';

const App = () => {
  const [playerOneClock, setPlayerOneClock] = useState(500);
  const [playerTwoClock, setPlayerTwoClock] = useState(500);
  const [isPlayingOne, setIsPlayingForOne] = useState(false);
  const [isPlayingTwo, setIsPlayingForTwo] = useState(false);
  const [isTurnForOne, setIsTurnForOne] = useState(false);
  const [isTurnForTwo, setIsTurnForTwo] = useState(false);

  const children = (remainingTime) => {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    return `${hours}:${minutes}:${seconds}`;
  };

  const onPressPlay = () => {
    if (isTurnForOne) setIsPlayingForOne(true);
    if (isTurnForTwo) setIsPlayingForTwo(true);
  };

  const onPressPause = () => {
    setIsPlayingForOne(false);
    setIsPlayingForTwo(false);
  };

  const onPressRestart = () => {
    setIsTurnForOne(false);
    setIsTurnForTwo(false);
    setPlayerOneClock(500);
    setPlayerTwoClock(500);
    //setIsPlayingForOne(false);
    //setIsPlayingForTwo(false);
  };

  const onPressPlayerOneTimer = () => {
    setIsTurnForOne(false);
    setIsTurnForTwo(true);
    setIsPlayingForOne(false);
    setIsPlayingForTwo(true);
  };

  const onPressPlayerTwoTimer = () => {
    setIsTurnForOne(true);
    setIsTurnForTwo(false);
    setIsPlayingForOne(true);
    setIsPlayingForTwo(false);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={[styles.box1, styles.box]}>
          <TouchableOpacity onPress={onPressPlayerOneTimer}>
            <CountdownCircleTimer
              // onComplete={() => {
              //   // do your stuff here
              //   return [true, 1500]; // repeat animation in 1.5 seconds
              // }}
              isPlaying={isPlayingOne}
              duration={playerOneClock}
              colors="#A30000">
              {({remainingTime, animatedColor}) => (
                <Animated.Text style={{...styles.remainingTime}}>
                  {children(remainingTime)}
                </Animated.Text>
              )}
            </CountdownCircleTimer>
          </TouchableOpacity>
        </View>
        <View style={[styles.options, styles.box]}>
          <View style={styles.optionItem}>
            <TouchableOpacity onPress={onPressPlay}>
              <Icon
                style={styles.text}
                name="play"
                backgroundColor="#3b5998"></Icon>
            </TouchableOpacity>
          </View>
          <View style={styles.optionItem}>
            <TouchableOpacity onPress={onPressPause}>
              <Icon
                style={styles.text}
                name="pause"
                backgroundColor="#3b5998"></Icon>
            </TouchableOpacity>
          </View>
          <View style={styles.optionItem}>
            <TouchableOpacity onPress={onPressRestart}>
              <Icon
                style={styles.text}
                name="undo"
                backgroundColor="#3b5998"></Icon>
            </TouchableOpacity>
          </View>
          <View style={styles.optionItem}>
            <Icon
              style={styles.text}
              name="cogs"
              backgroundColor="#3b5998"></Icon>
          </View>
        </View>
        <View style={[styles.box2, styles.box]}>
          <TouchableOpacity onPress={onPressPlayerTwoTimer}>
            <CountdownCircleTimer
              isPlaying={isPlayingTwo}
              duration={playerTwoClock}
              // initialRemainingTime={600}
              colors="#A30000"
              // onComplete={() => {
              //   // do your stuff here
              //   return [true, 1500]; // repeat animation in 1.5 seconds
              // }}
            >
              {({remainingTime, animatedColor}) => (
                <Animated.Text style={{...styles.remainingTime}}>
                  {children(remainingTime)}
                </Animated.Text>
              )}
            </CountdownCircleTimer>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: '#fff',
  },
  options: {
    flex: 0.2,
    flexDirection: 'row',
  },
  optionItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: '#999',
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  box1: {
    flex: 0.4,
    backgroundColor: 'red',
    transform: [{rotateZ: '180deg'}],
  },
  box2: {
    flex: 0.4,
    backgroundColor: 'blue',
  },
  remainingTime: {
    fontSize: 46,
    color: '#fff',
  },
});

export default App;
