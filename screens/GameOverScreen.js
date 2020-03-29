import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	Dimensions,
	ScrollView
} from "react-native";
import Colors from "../constants/color";
import MainButton from "../components/MainButton";

const GameOverScreen = props => {
	return (
		<ScrollView>
			<View style={styles.screen}>
				<Text style={styles.title}>The game is Over !</Text>
				<View style={styles.imageContainer}>
					<Image
						style={styles.image}
						source={require("../assets/success.png")}
					/>
				</View>
				<View style={styles.resultContainer}>
					<Text style={styles.text}>
						Your phone needed{" "}
						<Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
						guess the number{" "}
						<Text style={styles.highlight}>{props.userNumber}</Text>{" "}
					</Text>
				</View>
				<MainButton onPress={props.onRestart}>RESTART GAME</MainButton>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 10
	},
	title: {
		fontFamily: "open-sans-bold",
		fontSize: 30
	},
	text: {
		fontFamily: "open-sans",
		textAlign: "center",
		fontSize: Dimensions.get("window").height < 400 ? 16 : 20
	},
	imageContainer: {
		width: Dimensions.get("window").width * 0.7,
		height: Dimensions.get("window").width * 0.7,
		borderRadius: (Dimensions.get("window").width * 0.7) / 2,
		borderWidth: 3,
		borderColor: "black",
		overflow: "hidden",
		marginVertical: Dimensions.get("window").height / 30
	},
	image: {
		width: "100%",
		height: "100%"
	},
	highlight: {
		color: Colors.primary,
		fontFamily: "open-sans-bold"
	},
	resultContainer: {
		marginHorizontal: 30,
		marginVertical: Dimensions.get("window").height / 60
	}
});
export default GameOverScreen;
