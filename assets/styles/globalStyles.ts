// src/styles/globalStyles.js
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.light};
`;

export const Text = styled.Text`
  font-size: 16px;
  color: #333;
`;

export const Button = styled.TouchableOpacity`
  padding: 10px;
  background-color: #007bff;
  border-radius: 5px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;
