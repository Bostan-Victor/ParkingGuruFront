import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface BackProfileHeaderProps {
  onBackPress: () => void; // Function to be executed when "Back" is pressed
  onProfilePress: () => void; // Function to be executed when "Profile" is pressed
}

const Navbar: React.FC<BackProfileHeaderProps> = ({
  onBackPress,
  onProfilePress,
}) => {
  return (
    <View style={styles.headerContainer}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <Image
          source={require("../../assets/back-icon.png")} // Replace with your back icon image
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Profile Button */}
      <TouchableOpacity style={styles.profileButton} onPress={onProfilePress}>
        <Image
          source={require("../../assets/profile-icon.png")} // Replace with your profile icon image
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: height * 0.1, // Adjust height for header
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute", // Keep at the top
    top: 0,
    paddingHorizontal: width * 0.05, // Add padding on sides
    zIndex: 10,
  },
  backButton: {
    // Align on the left side
    justifyContent: "center",
    alignItems: "center",
  },
  profileButton: {
    // Align on the right side
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 30, // Adjust the size of the icon
    height: 30,
  },
});

export default Navbar;
