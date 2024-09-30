import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormField = ({
  name,
  value,
  handleChange,
  keyboardType,
  customStyles,
  isEditable = true,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${customStyles}`}>
      <Text className="text-base text-black font-semibold">{name}</Text>
      <View className="w-full flex-row items-center h-12 px-4 bg-white-100 border-2 border-slate-500 rounded-md focus:border-slate-400">
        <TextInput
          className="flex-1 font-medium text-base"
          value={value}
          placeholder={name}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChange}
          keyboardType={keyboardType}
          secureTextEntry={
            (name === "Password" ||
              name === "संकेतशब्द" ||
              name === "पासवर्ड") &&
            !showPassword
          }
          editable={isEditable}
        />

        {(name === "Password" ||
          name === "संकेतशब्द" ||
          name === "पासवर्ड") && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="h-6 w-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
