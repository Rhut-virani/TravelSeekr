import React from "react";
import { StyleSheet, View } from "react-native";
import Selections from "./components/Selections";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function App() {
	return (
		<View style={styles.container}>
			<Selections />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: hp("100%")
	}
});
