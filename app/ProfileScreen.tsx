import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  Linking,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { Container } from "./../assets/styles/globalStyles";
import LineSquare from "./../src/components/LineSquare";
import { useGetUserProfileMutation } from "./../src/services/placeApi";
import { deleteToken } from "./../src/hooks/useToken";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";


const { width } = Dimensions.get("window");
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Profile">;

const ProfilePage: React.FC = () => {
  const [getUserProfile, { data, error, isLoading }] = useGetUserProfileMutation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const navigation = useNavigation<NavigationProp>();
  const [profileImage, setProfileImage] = useState(
    require("./../assets/profile.png")
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleEditPress = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile({});
        console.log(response);
        setFirstName(response.data?.data.getUserProfile.firstName);
        setLastName(response.data?.data.getUserProfile.lastName);
        setEmail(response.data?.data.getUserProfile.email);
        setNumber(response.data?.data.getUserProfile.phoneNumber);
      } catch (err) {
        console.error('Error fetching user profile:', err); 
      }
    };

    fetchUserProfile();
  }, [getUserProfile]);

  // Handle log out action
  const handleLogout = async () => {
    try {
      await deleteToken(); // Call the deleteToken function to remove the access token
      console.log('Token deleted successfully');
      // Optionally navigate the user to the login screen or another page
      navigation.navigate('Login'); // Assuming you have a 'Login' screen
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Handle call center redirection
  const handleCallCenter = () => {
    Linking.openURL("tel:+12345678");
  };

  const handleImageChange = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.assets) {
        const selectedImage = response.assets[0].uri;
        setProfileImage({ uri: selectedImage });
      }
    });
  };

  return (
    <Container style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={handleEditPress} style={styles.editIconButton}>
          <Image source={require("./../assets/editIcon.png")} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleImageChange}>
          <Image source={profileImage} style={styles.profileImage} />
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          {isEditing ? (
            <>
              <TextInput value={firstName} onChangeText={setFirstName} style={styles.editableText} />
              <TextInput value={lastName} onChangeText={setLastName} style={styles.editableText} />
            </>
          ) : (
            <>
              <Text style={styles.nameText}>{firstName}</Text>
              <Text style={styles.nicknameText}>{lastName}</Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.detailsWrapper}>
        <Text style={styles.sectionTitle}>Account details</Text>
        <Text style={styles.phone}>Phone number: {number}</Text>
        <Text style={styles.email}>Email address: {email}</Text>
      </View>

      <View style={styles.spacer} />

      <View style={styles.helpWrapper}>
        <Text style={styles.sectionTitle}>Help and Support</Text>

        {/* Log Out Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <View style={styles.buttonContent}>
            <Image source={require("./../assets/logOut.png")} style={styles.icon} />
            <Text style={styles.buttonText}>Log Out</Text>
            <Image source={require("./../assets/arrows.png")} style={styles.iconRight} />
          </View>
        </TouchableOpacity>

        {/* Call Center Button */}
        <TouchableOpacity style={styles.button} onPress={handleCallCenter}>
          <View style={styles.buttonContent}>
            <Image source={require("./../assets/helpCenter.png")} style={styles.icon} />
            <Text style={styles.buttonText}>Call Center</Text>
            <Image source={require("./../assets/arrows.png")} style={styles.iconRight} />
          </View>
        </TouchableOpacity>
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
  editIconButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
  iconRight: {
    width: 15,
    height: 15,
    marginLeft: "auto",
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
  email: {
    fontSize: 20,
    marginTop: 20,
    color: "white",
    fontWeight: "normal",
    alignSelf: "center", 
  },
  phone: {
    fontSize: 20,
    marginTop: 10,
    color: "white",
    fontWeight: "normal",
    alignSelf: "center", 
  },
  spacer: {
    flex: 1, // This spacer pushes Help and Support to the bottom
  },
  button: {
    backgroundColor: "#797979",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
    marginLeft: 10,
    fontWeight: "bold",
  },
});

export default ProfilePage;
