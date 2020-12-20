import React, {useState, useEffect} from 'react';
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
  const [playerOneKey, setPlayerOneKey] = useState(0);
  const [playerTwoKey, setPlayerTwoKey] = useState(0);
  const [playerOneMoves, setPlayerOneMoves] = useState(0);
  const [playerTwoMoves, setPlayerTwoMoves] = useState(0);
  const [playerOneClock, setPlayerOneClock] = useState(5 * 60 * 60);
  const [playerTwoClock, setPlayerTwoClock] = useState(5 * 60 * 60);
  const [playerOneRemainingTime, setPlayerOneRemainingTime] = useState(
    3600 * 5,
  );
  const [playerTwoRemainingTime, setPlayerTwoRemainingTime] = useState(
    3600 * 5,
  );
  const [isPlayingOne, setIsPlayingForOne] = useState(false);
  const [isPlayingTwo, setIsPlayingForTwo] = useState(false);
  const [isTurnForOne, setIsTurnForOne] = useState(false);
  const [isTurnForTwo, setIsTurnForTwo] = useState(false);

  const children = (remainingTime) => {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    useEffect(() => {
      if (isTurnForOne) {
        setPlayerOneRemainingTime(remainingTime);
        setPlayerOneClock(remainingTime);
      }
      if (isTurnForTwo) {
        setPlayerTwoRemainingTime(remainingTime);
        setPlayerTwoClock(remainingTime);
      }
    }, [setPlayerOneRemainingTime, setPlayerTwoRemainingTime, remainingTime]);

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

    setPlayerOneKey(5 * 3600);
    setPlayerOneRemainingTime(5 * 3600);
    setPlayerOneClock(5 * 3600);
    setPlayerOneMoves(0);

    setPlayerTwoKey(5 * 3600);
    setPlayerTwoRemainingTime(5 * 3600);
    setPlayerTwoClock(5 * 3600);
    setPlayerTwoMoves(0);

    setIsPlayingForOne(false);
    setIsPlayingForTwo(false);
  };

  const onPressPlayerOneTimer = () => {
    setIsTurnForOne(false);
    setIsTurnForTwo(true);
    setIsPlayingForOne(false);
    setIsPlayingForTwo(true);
    setPlayerOneKey(playerOneRemainingTime + 2);
    setPlayerOneRemainingTime(playerOneRemainingTime + 2);
    setPlayerOneMoves((moves) => moves + 1);
  };

  const onPressPlayerTwoTimer = () => {
    setIsTurnForOne(true);
    setIsTurnForTwo(false);
    setIsPlayingForOne(true);
    setIsPlayingForTwo(false);
    setPlayerTwoKey(playerTwoRemainingTime + 2);
    setPlayerTwoRemainingTime(playerTwoRemainingTime + 2);
    setPlayerTwoMoves((moves) => moves + 1);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={[styles.box1, styles.box]}>
          <TouchableOpacity onPress={onPressPlayerOneTimer}>
            <CountdownCircleTimer
              key={playerOneKey}
              onComplete={() => {
                // do your stuff here
                return [false, 1500]; // repeat animation in 1.5 seconds
              }}
              isPlaying={isPlayingOne}
              duration={playerOneClock}
              initialRemainingTime={playerOneRemainingTime}
              colors="#0e0e0e">
              {({remainingTime, animatedColor}) => (
                <Animated.Text>
                  <View style={styles.timer}>
                    <Text>Moves: {playerOneMoves}</Text>
                    <Text style={{...styles.remainingTime}}>
                      {children(remainingTime)}
                    </Text>
                  </View>
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
              key={playerTwoKey}
              isPlaying={isPlayingTwo}
              duration={playerTwoClock}
              initialRemainingTime={playerTwoRemainingTime}
              colors="#0e0e0e"
              onComplete={() => {
                // do your stuff here
                return [false, 1500]; // repeat animation in 1.5 seconds
              }}>
              {({remainingTime, animatedColor}) => (
                <Animated.Text>
                  <View style={styles.timer}>
                    <Text>Moves: {playerTwoMoves}</Text>
                    <Text style={{...styles.remainingTime}}>
                      {children(remainingTime)}
                    </Text>
                  </View>
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
    backgroundColor: '#946f51',
    transform: [{rotateZ: '180deg'}],
  },
  box2: {
    flex: 0.4,
    backgroundColor: '#F0D9B5',
  },
  remainingTime: {
    fontSize: 46,
    color: '#0e0e0e',
  },
  timer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
