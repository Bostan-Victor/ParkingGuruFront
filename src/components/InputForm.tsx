import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, TextInput, View, Dimensions } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; // Import icons from Expo
import { Text } from "../../assets/styles/globalStyles"; // Assuming you're using your global styles

const { width, height } = Dimensions.get("window");

interface InputFormProps {
  phone?: string;
  setPhone?: Dispatch<SetStateAction<string>>;
  email?: string;
  setEmail?: Dispatch<SetStateAction<string>>;
  password?: string;
  setPassword?: Dispatch<SetStateAction<string>>;
  firstName?: string;
  setFirstName?: Dispatch<SetStateAction<string>>;
  lastName?: string;
  setLastName?: Dispatch<SetStateAction<string>>;
  showPhoneInput?: boolean;
  showEmailInput?: boolean;
  showPasswordInput?: boolean;
  showFirstNameInput?: boolean;  // New prop to control the visibility of first name
  showLastNameInput?: boolean;   // New prop to control the visibility of last name
  onSubmit?: () => void;
}

const InputForm: React.FC<InputFormProps> = ({
  phone,
  setPhone,
  email,
  setEmail,
  password,
  setPassword,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  showPhoneInput = true,
  showEmailInput = true,
  showPasswordInput = true,
  showFirstNameInput = true,  // Default to true, can be overridden in LoginPage
  showLastNameInput = true,   // Default to true, can be overridden in LoginPage
  onSubmit,
}) => {
  return (
    <View style={styles.formContainer}>
      {/* Conditional rendering for First Name field */}
      {showFirstNameInput && (
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
      )}

      {/* Conditional rendering for Last Name field */}
      {showLastNameInput && (
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
      )}

      {/* Phone Number Input */}
      {showPhoneInput && (
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
      )}

      {/* Email Input */}
      {showEmailInput && (
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      )}

      {/* Password Input */}
      {showPasswordInput && (
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: "#404040",
    borderRadius: 15,
    marginHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    alignSelf: "center",
    justifyContent: "center",
  },
  inputGroup: {
    marginBottom: height * 0.02,
    width: width * 0.8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    padding: 10,
    color: "#fff",
    backgroundColor: 'red'
  },
});

export default InputForm;
