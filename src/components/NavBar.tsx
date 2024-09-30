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
  onBackPress?: () => void; // Optional function to be executed when "Back" is pressed
  onProfilePress?: () => void; // Optional function to be executed when "Profile" is pressed
}

const Navbar: React.FC<BackProfileHeaderProps> = ({
  onBackPress,
  onProfilePress,
}) => {
  return (
    <View style={styles.headerContainer}>
      {/* Conditionally render Back Button */}
      {onBackPress && (
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Image
            source={require("../../assets/back-icon.png")} // Replace with your back icon image
            style={styles.icon}
          />
        </TouchableOpacity>
      )}

      {/* Conditionally render Profile Button */}
      {onProfilePress && (
        <TouchableOpacity style={styles.profileButton} onPress={onProfilePress}>
          <Image
            source={require("../../assets/profile-icon.png")} // Replace with your profile icon image
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: height * 0.1, // Adjust height for header
    flexDirection: "row",
    justifyContent: "space-between", // Ensure back and profile buttons stay on left and right
    alignItems: "center",
    position: "absolute", // Keep at the top
    top: 0,
    paddingHorizontal: width * 0.05, // Add padding on sides
    zIndex: 10,
  },
  backButton: {
    position: "absolute",
    left: width * 0.05, // Align back button to the left with padding
    justifyContent: "center",
    alignItems: "center",
  },
  profileButton: {
    position: "absolute",
    right: width * 0.05, // Align profile button to the right with padding
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 30, // Adjust the size of the icon
    height: 30,
  },
});

export default Navbar;
