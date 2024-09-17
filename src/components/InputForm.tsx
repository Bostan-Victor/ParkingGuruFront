import React, { Dispatch, SetStateAction } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  Alert,
  TouchableOpacity,
} from "react-native";

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
  onSubmit: () => void; // Function to trigger submission from the parent
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
  onSubmit,
}) => {
  // Function to handle phone number input
  const handlePhoneChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, ""); // Allow only numbers
    if (numericValue.length <= 9) {
      setPhone && setPhone(numericValue); // Limit to 9 digits
    }
  };

  // Validation logic
  const validateInputs = () => {
    if (!firstName || firstName.trim() === "") {
      Alert.alert("Invalid First Name", "First name cannot be empty.");
      return false;
    }

    if (!lastName || lastName.trim() === "") {
      Alert.alert("Invalid Last Name", "Last name cannot be empty.");
      return false;
    }

    const phoneRegex = /^\d{1,9}$/; // Up to 9 digits
    if (showPhoneInput && !phoneRegex.test(phone || "")) {
      Alert.alert(
        "Invalid Phone",
        "Phone number should contain up to 9 digits."
      );
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (showEmailInput && !emailRegex.test(email || "")) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleFormSubmit = () => {
    if (validateInputs()) {
      // Trigger the parent onSubmit function
      onSubmit();
    }
  };

  return (
    <View style={styles.formContainer}>
      {/* First Name Input */}
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName ? setFirstName : () => {}}
        />
      </View>

      {/* Last Name Input */}
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName ? setLastName : () => {}}
        />
      </View>

      {showPhoneInput && (
        <View style={styles.inputGroup}>
          <View style={styles.phoneInputContainer}>
            <TextInput
              style={styles.phoneInput}
              placeholder="Phone number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={handlePhoneChange}
            />
          </View>
        </View>
      )}

      {showEmailInput && (
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail ? setEmail : () => {}}
          />
        </View>
      )}

      {showPasswordInput && (
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword ? setPassword : () => {}}
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
    marginBottom: height * 0.03,
    width: width * 0.8,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  phoneInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    padding: 10,
    color: "#fff",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    padding: 10,
    color: "#fff",
  },
  submitButton: {
    backgroundColor: "#F0C10B",
    paddingVertical: height * 0.02,
    borderRadius: 5,
    alignItems: "center",
    marginTop: height * 0.02,
  },
  submitButtonText: {
    color: "#000",
    fontSize: width * 0.045,
    fontWeight: "bold",
  },
});

export default InputForm;
