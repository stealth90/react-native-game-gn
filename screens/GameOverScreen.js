import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

const GameOverScreen = props => {
	return (
		<View style={styles.screen}>
			<Text style={styles.title}>The game is Over !</Text>
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={require("../assets/success.png")} />
			</View>
			<Text style={styles.text}>Number of rounds: {props.roundsNumber}</Text>
			<Text style={styles.text}>Number was : {props.userNumber}</Text>
			<Button title="NEW GAME" onPress={props.onRestart} />
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	title: {
		fontFamily: "open-sans-bold",
		fontSize: 30
	},
	text: {
		fontFamily: "open-sans"
	},
	imageContainer: {
		width: 300,
		height: 300,
		borderRadius: 150,
		borderWidth: 3,
		borderColor: "black",
		overflow: "hidden",
		marginVertical: 30
	},
	image: {
		width: "100%",
		height: "100%"
	}
});
export default GameOverScreen;
