import React from "react";
import { View, Text } from "react-native";

export default BubbleOptions = props => {
	const { icon } = props;
	const options = [
		["Airlines", "Stops", "Time in", "Time out"],
		["Name", "Price", "Type", "Location"],
		["Suppier", "Price", "Type", "Pickup", "Dropoff"]
	];
	const bubbleJSX = options[icon].map((e, i) => {
		return (
			<View
				style={{
					backgroundColor: "#e1f3ef",
					borderRadius: 25,
					alignSelf: "flex-start",
					margin: "1%"
				}}
				key={i}
			>
				<Text
					style={{
						color: "#5acbcb",
						fontWeight: "bold",
						textAlign: "center",
						padding: "2%"
					}}
				>
					{e}
				</Text>
			</View>
		);
	});
	return (
		<View style={{ flexDirection: "row", padding: (0, "2%") }}>
			{bubbleJSX}
		</View>
	);
};
