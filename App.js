import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fetchFonts = () => {
	return Font.loadAsync({
		"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
		"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
	});
};

const App = () => {
	const [userNumber, setUserNumber] = useState();
	const [guessRounds, setGuessRounds] = useState(0);
	const [dataLoaded, setDataLoaded] = useState(false);

	if (!dataLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setDataLoaded(true)}
				onError={err => console.log(err)}
			/>
		);
	}

	const handlerNewGame = () => {
		setGuessRounds(0);
		setUserNumber(null);
	};

	const handlerStartGame = selectedNumber => {
		setUserNumber(selectedNumber);
		setGuessRounds(0);
	};

	const handlerGameOver = numOfRounds => {
		setGuessRounds(numOfRounds);
	};
	let content = <StartGameScreen onStartGame={handlerStartGame} />;

	if (userNumber && guessRounds <= 0) {
		content = (
			<GameScreen userChoice={userNumber} onGameOver={handlerGameOver} />
		);
	} else if (guessRounds > 0) {
		content = (
			<GameOverScreen
				roundsNumber={guessRounds}
				userNumber={userNumber}
				onRestart={handlerNewGame}
			/>
		);
	}
	return (
		<SafeAreaView style={styles.screen}>
			<Header title="Guess a Number" />
			{content}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1
	}
});

export default App;
