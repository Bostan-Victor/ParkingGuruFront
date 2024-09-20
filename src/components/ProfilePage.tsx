import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { Container } from "../../assets/styles/globalStyles";
import LineSquare from "./LineSquare"; // Import the new component

const { width } = Dimensions.get("window");

const ProfilePage: React.FC = () => {
  const [name, setName] = useState("John Johnson");
  const [nickname, setNickname] = useState("@johndoe");
  const [isVerified] = useState(true);
  const [profileImage, setProfileImage] = useState(
    require("../../assets/profile.png")
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleEditPress = () => {
    setIsEditing(!isEditing);
  };

  const handleImageChange = () => {
    const options = {
      mediaType: "photo" as const,
    };

    launchImageLibrary(options, (response) => {
      if (response.assets) {
        const selectedImage = response.assets[0].uri;
        setProfileImage({ uri: selectedImage });
      }
    });
  };

  // Data for Account Details section
  const accountDetails = [
    {
      text: "Personal info",
      iconLeft: require("../../assets/personalInfo.png"),
      iconRight: require("../../assets/arrows.png"),
    },
    {
      text: "Wallet settings",
      iconLeft: require("../../assets/walletSetings.png"),
      iconRight: require("../../assets/arrows.png"),
    },
    {
      text: "Register car",
      iconLeft: require("../../assets/registerCar.png"),
      iconRight: require("../../assets/arrows.png"),
    },
    {
      text: "Verify account",
      iconLeft: require("../../assets/verifyAccount.png"),
      iconRight: require("../../assets/arrows.png"),
    },
  ];

  // Data for Help and Support section
  const helpSupport = [
    {
      text: "Help center",
      iconLeft: require("../../assets/helpCenter.png"),
      iconRight: require("../../assets/arrows.png"),
    },
    {
      text: "Log out",
      iconLeft: require("../../assets/logOut.png"),
      iconRight: require("../../assets/arrows.png"),
    },
  ];

  return (
    <Container style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        {/* Edit Icon */}
        <TouchableOpacity
          onPress={handleEditPress}
          style={styles.editIconButton}
        >
          <Image
            source={require("../../assets/editIcon.png")}
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* Profile Picture */}
        <TouchableOpacity onPress={handleImageChange}>
          <Image source={profileImage} style={styles.profileImage} />
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          {isEditing ? (
            <>
              <TextInput
                value={name}
                onChangeText={setName}
                style={styles.editableText}
              />
              <TextInput
                value={nickname}
                onChangeText={setNickname}
                style={styles.editableText}
              />
            </>
          ) : (
            <>
              <Text style={styles.nameText}>{name}</Text>
              <Text style={styles.nicknameText}>{nickname}</Text>
            </>
          )}
        </View>

        {/* Conditionally render Verified Icon */}
        {isVerified && (
          <Image
            source={require("../../assets/verifiedIcon.png")}
            style={styles.verifiedIcon}
          />
        )}
      </View>

      {/* Account Details Section */}
      <View style={styles.detailsWrapper}>
        <Text style={styles.sectionTitle}>Account details</Text>
        <LineSquare lines={accountDetails} />
      </View>

      {/* Spacer to push Help and Support to the bottom */}
      <View style={styles.spacer} />

      {/* Help and Support Section */}
      <View style={styles.helpWrapper}>
        <Text style={styles.sectionTitle}>Help and Support</Text>
        <LineSquare lines={helpSupport} />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282424",
    alignItems: "center",
  },
  profileContainer: {
    width: width * 0.9,
    backgroundColor: "#797979",
    borderRadius: 15,
    padding: 20,
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  nicknameText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginTop: 5,
  },
  editableText: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 5,
    color: "#000",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#FFF",
    marginRight: 10,
  },
  verifiedIcon: {
    position: "absolute",
    bottom: 10,
    right: 15,
    width: 25,
    height: 25,
  },
  editIconButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
  detailsWrapper: {
    paddingTop: 30,
    width: width * 0.9,
  },
  helpWrapper: {
    paddingBottom: 30,
    width: width * 0.9,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "left",
  },
  spacer: {
    flex: 1, // Spacer to push Help and Support to the bottom
  },
});

export default ProfilePage;
