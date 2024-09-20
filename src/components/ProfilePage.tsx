import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { Container } from "../../assets/styles/globalStyles";

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

  const icons = [
    require("../../assets/personalInfo.png"),
    require("../../assets/walletSetings.png"),
    require("../../assets/registerCar.png"),
    require("../../assets/verifyAccount.png"),
  ];

  const helpIcons = [
    require("../../assets/helpCenter.png"),
    require("../../assets/logOut.png"),
  ];

  return (
    <Container style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={handleEditPress} style={styles.editButton}>
          <Text style={styles.editButtonText}>
            {isEditing ? "Save" : "Edit"}
          </Text>
        </TouchableOpacity>

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

        <Text
          style={[
            styles.verifiedText,
            { color: isVerified ? "#00BFFF" : "#FF6347" },
          ]}
        >
          {isVerified ? "Verified" : "Not Verified"}
        </Text>
      </View>

      {/* Account Details Section */}
      <View style={styles.detailsWrapper}>
        <Text style={styles.accountDetailsText}>Account details</Text>

        {/* Grey Square with 4 Lines */}
        <View style={styles.detailsContainer}>
          {[
            "Personal info",
            "Wallet settings",
            "Register car",
            "Verify account",
          ].map((detail, index) => (
            <View key={index} style={styles.detailRow}>
              {/* Left Icon */}
              <Image source={icons[index]} style={styles.detailIcon} />
              {/* Text */}
              <Text style={styles.detailText}>{detail}</Text>
              {/* Right Icon */}
              <Image
                source={require("../../assets/arrows.png")}
                style={styles.detailIcon}
              />
            </View>
          ))}
        </View>
      </View>

      {/* Help and Support Section */}
      <View style={styles.helpWrapper}>
        <Text style={styles.helpText}>Help and support</Text>

        {/* Grey Square with 2 Lines */}
        <View style={styles.helpContainer}>
          {["Help center", "Log out"].map((detail, index) => (
            <View key={index} style={styles.detailRow}>
              {/* Left Icon */}
              <Image source={helpIcons[index]} style={styles.detailIcon} />
              {/* Text */}
              <Text style={styles.detailText}>{detail}</Text>
              {/* Right Icon */}
              <Image
                source={require("../../assets/arrows.png")}
                style={styles.detailIcon}
              />
            </View>
          ))}
        </View>
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
    backgroundColor: "#D3D3D3",
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
    color: "#000",
  },
  nicknameText: {
    fontSize: 16,
    color: "#666",
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
  verifiedText: {
    position: "absolute",
    bottom: 10,
    right: 15,
    fontSize: 14,
    fontWeight: "bold",
  },
  editButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
    backgroundColor: "#F0C10B",
    borderRadius: 5,
  },
  editButtonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },
  detailsWrapper: {
    paddingTop: 30,
    width: width * 0.9,
  },
  accountDetailsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
    textAlign: "left",
  },
  detailsContainer: {
    width: "100%",
    backgroundColor: "#D3D3D3",
    borderRadius: 15,
    padding: 15,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
  },
  detailText: {
    fontSize: 16,
    color: "#000",
    flex: 1,
    marginHorizontal: 5,
  },
  detailIcon: {
    width: 30,
    height: 30,
  },
  helpWrapper: {
    paddingTop: 30,
    width: width * 0.9,
  },
  helpText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
    textAlign: "left",
  },
  helpContainer: {
    width: "100%",
    backgroundColor: "#D3D3D3",
    borderRadius: 15,
    padding: 15,
  },
});

export default ProfilePage;
