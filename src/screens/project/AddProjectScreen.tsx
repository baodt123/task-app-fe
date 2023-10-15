import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { createProjectApi } from "../../services/project";

const AddProjectScreen = ({navigation}) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "At least 2 characters!")
      .required("Required!"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await createProjectApi(values);
        Alert.alert("Message", "Create project success!");
        navigation.navigate("Project");
      } catch (error) {
        Alert.alert("Message", "Project name already used");
      }
    },
  });
  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <View className="flex flex-row items-center justify-between mx-6 ">
        <Text className="text-2xl font-semibold text-blue-700">Project</Text>
      </View>
      <View className="h-0.5 my-3 bg-gray-200"></View>
      <View className="mx-6">
        <Text className="text-xl font-medium ">Name</Text>
        <View className="flex flex-row py-2 mb-2 text-lg border-b border-gray-400">
          <TextInput
            className="flex-grow text-lg"
            placeholder="Project name"
            value={formik.values.name}
            onChangeText={formik.handleChange("name")}
          />
          {formik.errors.name && (
            <Text className="m-2 text-red-700">{formik.errors.name}</Text>
          )}
        </View>
        <Text className="text-xl font-medium ">Description</Text>
        <TextInput
          className="py-2 mb-2 text-lg border-b border-gray-400"
          placeholder="Description"
          value={formik.values.description}
          onChangeText={formik.handleChange("description")}
        />
        <TouchableOpacity
          className="items-center justify-center p-2.5 my-2 bg-blue-700 rounded-xl"
          onPress={() => formik.handleSubmit()}>
          <Text className="text-xl font-medium text-white">Create Project</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddProjectScreen