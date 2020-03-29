import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	Button,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
	Dimensions,
	ScrollView,
	KeyboardAvoidingView
} from "react-native";

import Card from "../components/Card";
import Color from "../constants/color";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";

const StartGameScreen = props => {
	const [enteredValue, setEnteredValue] = useState("");
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState();
	const [buttonWidth, setButtonWidth] = useState(
		Dimensions.get("window").width / 4
	);

	const handlerNumberInput = inputText => {
		setEnteredValue(inputText.replace(/[^0-9]/g, ""));
	};

	const handlerResetInput = () => {
		setEnteredValue("");
		setConfirmed(false);
	};

	useEffect(() => {
		const updateLayout = () => {
			setButtonWidth(Dimensions.get("window").width / 4);
		};

		Dimensions.addEventListener("change", updateLayout);
		return () => {
			Dimensions.removeEventListener("change", updateLayout);
		};
	});

	const handlerConfirmInput = () => {
		const chosenNumber = parseInt(enteredValue);
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert(
				"Invalid number!",
				"Number has to be a number between 1 and 99",
				[{ text: "OK", style: "destructive", onPress: handlerResetInput }]
			);
			return;
		}
		setConfirmed(true);
		setSelectedNumber(parseInt(chosenNumber));
		setEnteredValue("");
		Keyboard.dismiss();
	};
	let confirmedOutput;

	if (confirmed) {
		confirmedOutput = (
			<Card style={styles.summaryContainer}>
				<Text>You selected</Text>
				<NumberContainer>{selectedNumber}</NumberContainer>
				<MainButton onPress={() => props.onStartGame(selectedNumber)}>
					START GAME
				</MainButton>
			</Card>
		);
	}

	return (
		<ScrollView>
			<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
				<TouchableWithoutFeedback
					onPress={() => {
						Keyboard.dismiss();
					}}>
					<View style={styles.screen}>
						<Text style={styles.title}>Start a New Game!</Text>
						<Card style={styles.inputContainer}>
							<Text>Select a Number</Text>
							<Input
								keyboardType="number-pad"
								autoCorrect={false}
								maxLength={2}
								autoCapitalize="none"
								blurOnSubmit
								style={styles.input}
								onChangeText={handlerNumberInput}
								value={enteredValue}
							/>
							<View style={styles.buttonContainer}>
								<View style={{ width: buttonWidth }}>
									<Button
										color={Color.accent}
										title="Reset"
										onPress={handlerResetInput}
									/>
								</View>
								<View style={styles.button}>
									<Button
										color={Color.primary}
										title="Confirm"
										onPress={handlerConfirmInput}
									/>
								</View>
							</View>
						</Card>
						{confirmedOutput}
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center"
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
		fontFamily: "open-sans-bold"
	},
	inputContainer: {
		width: "80%",
		maxWidth: "95%",
		minWidth: 300,
		alignItems: "center"
	},
	buttonContainer: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		paddingHorizontal: 15
	},
	/* button: {
		//width: 100
		width: Dimensions.get("window").width / 4
	}, */
	input: {
		minWidth: 50,
		textAlign: "center"
	},
	summaryContainer: {
		marginTop: 20,
		alignItems: "center"
	}
});
export default StartGameScreen;
