import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";

const { width, height } = Dimensions.get("window");

interface NavigationBarProps {
  pages: { name: string; route: string }[]; // Array of pages with name and route
}

const NavigationBar: React.FC<NavigationBarProps> = ({ pages }) => {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const navigation = useNavigation();
  const translateX = useState(new Animated.Value(width))[0]; // Animate the panel from right

  // Toggle the side panel
  const togglePanel = () => {
    if (isPanelVisible) {
      Animated.timing(translateX, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsPanelVisible(false));
    } else {
      setIsPanelVisible(true);
      Animated.timing(translateX, {
        toValue: width * 0.4, // Adjust the width of the panel
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      {/* Icon in the top right corner */}
      <TouchableOpacity style={styles.iconContainer} onPress={togglePanel}>
        <Image
          source={require("../../assets/Menu.png")} // Replace with your three-line PNG image
          style={styles.menuIcon}
        />
      </TouchableOpacity>

      {/* Animated panel */}
      {isPanelVisible && (
        <Animated.View
          style={[styles.sidePanel, { transform: [{ translateX }] }]}
        >
          {pages.map((page, index) => (
            <TouchableOpacity
              key={index}
              style={styles.pageLink}
              onPress={() => {
                togglePanel();
                navigation.navigate(page.route as never);
              }}
            >
              <Text style={styles.pageText}>{page.name}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10,
  },
  iconContainer: {
    padding: 10,
    marginTop: height * 0.05, // Adjust top margin as per need
    marginRight: width * 0.05,
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  sidePanel: {
    position: "absolute",
    top: 0,
    right: 0,
    width: width * 0.6, // Panel width (adjust as necessary)
    height: height,
    backgroundColor: "#333",
    paddingTop: height * 0.05,
  },
  pageLink: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  pageText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default NavigationBar;
