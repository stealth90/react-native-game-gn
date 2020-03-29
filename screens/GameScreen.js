import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MainButton from "../components/MainButton";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import Colors from "../constants/color";

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNum = Math.floor(Math.random() * (max - min)) + min;
	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
};

const renderListItem = (value, numberOfRound) => {
	return (
		<View style={styles.listItem} key={value}>
			<Text style={styles.text}>Round :{numberOfRound}</Text>
			<Text style={styles.text}>
				Guesses :<Text style={styles.guessesNumber}>{value}</Text>
			</Text>
		</View>
	);
};

const GameScreen = props => {
	const { userChoice, onGameOver } = props;
	const initialGuess = generateRandomBetween(1, 100, props.userChoice);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [pastGuesses, setPastGuesses] = useState([initialGuess]);
	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(pastGuesses.length);
		}
	}, [currentGuess, userChoice, onGameOver]);

	const handlerNextGuess = direction => {
		if (
			(direction === "lower" && currentGuess < props.userChoice) ||
			(direction === "greater" && currentGuess > props.userChoice)
		) {
			Alert.alert("Dont' lie!", "You know that is wrong...", [
				{ text: "Sorry", style: "cancel" }
			]);
			return;
		}
		direction === "lower"
			? (currentHigh.current = currentGuess)
			: (currentLow.current = currentGuess + 1);
		const nextNumber = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess
		);
		setCurrentGuess(nextNumber);
		//setRounds(curRounds => curRounds + 1);
		setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
	};
	return (
		<View style={styles.screen}>
			<Text>Opponen't Guess</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<MainButton
					onPress={() => {
						handlerNextGuess("lower");
					}}>
					<Ionicons name="md-remove" size={24} color="white" />
				</MainButton>
				<MainButton
					onPress={() => {
						handlerNextGuess("greater");
					}}>
					<Ionicons name="md-add" size={24} color="white" />
				</MainButton>
			</Card>
			<View style={styles.list}>
				<ScrollView>
					{pastGuesses.map((guess, index) =>
						renderListItem(guess, pastGuesses.length - index)
					)}
				</ScrollView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center"
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
		width: 400,
		maxWidth: "90%"
	},
	text: {
		fontFamily: "open-sans-bold",
		fontSize: 18
	},
	list: {
		flex: 1,
		width: "80%"
	},
	guessesNumber: {
		color: Colors.primary
	},
	listItem: {
		flexDirection: "row",
		borderColor: "#ccc",
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: "white",
		justifyContent: "space-around"
	}
});
export default GameScreen;
