import React from "react";
import { Text, View, StyleSheet, Image, ImageBackground } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";

export default CarOptions = props => {
	const {
		item,
		itemHeight,
		itemWidth,
		slideHeight,
		slideWidth,
		horizontalMargin
	} = props;
	return (
		<View
			style={{
				width: itemWidth,
				height: itemHeight,
				paddingHorizontal: horizontalMargin,
				padding: 10
			}}
		>
			<View style={[styles.cards, { height: slideHeight, width: slideWidth }]}>
				<ImageBackground
					source={{ uri: item.photo }}
					style={{ flex: 1 }}
					imageStyle={{ borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
				>
					<LinearGradient
						colors={["transparent", "transparent", "#1f1f1f"]}
						style={{ height: "100%", flexDirection: "column-reverse" }}
					></LinearGradient>
				</ImageBackground>

				<View style={{ flex: 1, padding: "3%", maxHeight: "50%" }}>
					<View
						style={{
							flex: 1,
							paddingLeft: "3%",
							paddingRight: "3%",
							paddingBottom: "3%"
						}}
					>
						<View style={{ flex: 1, flexDirection: "row", marginBottom: "5%" }}>
							{/* name and type */}

							<View style={{ flex: 4, alignSelf: "center" }}>
								<Text
									style={{
										color: "#000",
										fontSize: wp("4%"),
										fontWeight: "bold"
									}}
								>
									{item.name}
									{"  "}
									<Text style={{ color: "#ADADAD", fontSize: wp("3.5%") }}>
										or similar
									</Text>
								</Text>
							</View>

							<View
								style={{
									flex: 2,
									alignSelf: "center",
									alignContent: "flex-end"
								}}
							>
								<Image
									source={{ uri: item.companyLogo }}
									style={{
										flex: 1,
										alignSelf: "stretch",
										resizeMode: "contain",
										width: undefined,
										height: undefined
									}}
								/>
							</View>
						</View>

						{/* seats */}

						<View style={{ flex: 1, flexDirection: "row" }}>
							<Text style={{ color: "#ADADAD", fontSize: wp("3%") }}>
								{item.type} {item.seats} Seats
							</Text>
						</View>

						{/* bags and deals */}

						<View style={{ flex: 1, flexDirection: "row" }}>
							<Text style={{ color: "#ADADAD", fontSize: wp("3%"), flex: 4 }}>
								{item.lBags} Large {"  "}
								{item.sBags} Small Bags
							</Text>
							<Text
								style={{
									color: "#ADADAD",
									fontSize: wp("3%"),
									flex: 2,
									textAlign: "right"
								}}
							>
								{item.deal}
							</Text>
						</View>

						{/* rating */}

						<View style={{ flex: 1, flexDirection: "row" }}>
							<Text style={{ color: "#ADADAD", fontSize: wp("3%") }}>
								{item.rating} / 10
							</Text>
						</View>

						{/* pickup and price */}

						<View style={{ flex: 1, flexDirection: "row" }}>
							<Text
								style={{
									flex: 2,
									alignContent: "center",
									color: "#ADADAD",
									fontSize: wp("3%")
								}}
							>
								Pick Up :
								<Text style={{ fontWeight: "bold" }}> {item.pickUp} </Text>
							</Text>

							<Text
								style={{
									flex: 1,
									alignContent: "center",
									textAlign: "right",
									color: "#000",
									fontSize: wp("3.25%"),
									fontWeight: "bold"
								}}
							>
								C$ {item.ratePerDay}
								<Text style={{ color: "#ADADAD", fontSize: wp("3%") }}>
									{" "}
									/ Day
								</Text>
							</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cards: {
		flex: 1,
		backgroundColor: "white",
		borderRadius: 25,
		shadowColor: "#ADADAD",
		shadowOffset: { width: 2, height: 3 },
		shadowOpacity: 0.5,
		shadowRadius: 25,
		elevation: 10
	}
});
