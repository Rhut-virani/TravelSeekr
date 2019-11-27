import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from "react-native-responsive-screen";
import FlightOptions from "./sections/FlightOptions";
import HotelOptions from "./sections/HotelOptions";
import CarOptions from "./sections/CarOptions";

const horizontalMargin = 10;
const sliderWidth = wp("100%");
const slideWidth = wp("80%");
const slideHeight = hp("32%");
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = slideHeight + horizontalMargin * 4;

export default function OptionCards(props) {
	const { icon, tripData, service, currentItem, _currentSelection } = props;
	const items = tripData;
	let firstItem = 0;
	items.forEach((e, i) => {
		if (e.id === currentItem.id) {
			firstItem = i;
		}
	});

	const components = [FlightOptions, HotelOptions, CarOptions];
	_renderItem = ({ item }) => {
		const Component = components[icon];
		return (
			<Component
				item={item}
				itemHeight={itemHeight}
				itemWidth={itemWidth}
				slideHeight={slideHeight}
				slideWidth={slideWidth}
				horizontalMargin={horizontalMargin}
			/>
		);
	};
	return (
		<View style={styles.container}>
			<Carousel
				firstItem={firstItem}
				data={items || []}
				itemWidth={itemWidth}
				sliderWidth={sliderWidth}
				onSnapToItem={index => {
					_currentSelection(service, items[index]);
				}}
				activeSlideAlignment="center"
				inactiveSlideOpacity={1}
				inactiveSlideScale={1}
				renderItem={this._renderItem}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: "1%"
	}
});
