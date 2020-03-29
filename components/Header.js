import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Color from "../constants/color";

const Header = props => {
	return (
		<View
			style={{
				...styles.headerBase,
				...Platform.select({
					ios: styles.headerIOS,
					android: styles.headerAndroid
				})
			}}>
			<Text style={styles.headerTitle}>{props.title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	headerBase: {
		width: "100%",
		height: 90,
		paddingTop: 36,
		alignItems: "center",
		justifyContent: "center"
	},
	headerIOS: {
		backgroundColor: "white",
		borderBottomColor: "#ccc",
		borderBottomWidth: 1
	},
	headerAndroid: {
		backgroundColor: Color.primary
	},
	headerTitle: {
		color: Platform.OS === "ios" ? Color.primary : "white",
		fontSize: 18,
		fontFamily: "open-sans-bold"
	}
});

export default Header;
