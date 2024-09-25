import React, { Dispatch, SetStateAction } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Dimensions,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; // Import icons from Expo
import { Text } from "../../assets/styles/globalStyles"; // Assuming you're using your global styles

const { width, height } = Dimensions.get("window");

interface InputFormProps {
  phone?: string;
  setPhone?: Dispatch<SetStateAction<string>>;
}

const InputFormPhone: React.FC<InputFormProps> = ({
  phone,
  setPhone,
}) => {
  // Function to handle phone number input with formatting (123-456-789)
  const handlePhoneChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, ""); // Allow only numbers
    if (numericValue.length <= 9) {
      setPhone && setPhone(numericValue); // Set phone without formatting, just the raw number
    }
  };

  return (
    <View style={styles.formContainer}>
      {/* Phone Number Input */}
      <View style={styles.inputGroup}>
        <View style={styles.phoneInputContainer}>
          {/* Phone Icon */}
          <MaterialIcons name="phone" size={24} color="#F0C10B" style={styles.icon} />
          <TextInput
            style={styles.phoneInput}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={handlePhoneChange}
            maxLength={9} // Max length is 9 digits
          />
        </View>
      </View>
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
    width: width * 0.8,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  phoneInput: {
    flex: 1,
    color: "#fff",
    fontSize: 18,
    marginLeft: 10, // Space between the icon and input
  },
  icon: {
    marginRight: 10,
  },
});

export default InputFormPhone;
