import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const SearchInput = ({
  name,
  value,
  handleChange,
  keyboardType,
  customStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="w-full flex-row items-center h-16 px-4 bg-black-100 border-2 border-slate-500 rounded-xl focus:border-secondary-200 space-x-4">
      <TextInput
        className="flex-1 text-white mt-0.5 font-regular text-base"
        value={value}
        placeholder="Search for a video"
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChange}
        secureTextEntry={name === "Password" && !showPassword}
      />

      <TouchableOpacity>
        <Image source={icons.search} resizeMode="contain" className="h-6 w-6" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
