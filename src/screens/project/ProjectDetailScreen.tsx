// ProjectDetailScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AntDesign } from "@expo/vector-icons";
import { updateProjectApi } from "../../services/project";

const ProjectDetailScreen = ({ route }) => {
  const { project } = route.params;
  const [isEditing, setIsEditing] = useState(false);
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, "At least 2 characters!").required("Required!"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await updateProjectApi(project.id, values);
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating project info", error);
      }
    },
  });

  return (
    <SafeAreaView className="flex-1 pt-12 ">
      <View className="flex flex-row items-center justify-between mx-6 ">
        <Text className="text-2xl font-semibold text-blue-700">
          {project.name}
        </Text>
        <View className="flex flex-row">
          {!isEditing && (
            <TouchableOpacity
              className="mr-3"
              onPress={() => setIsEditing(true)}>
              <AntDesign name="edit" size={24} color="blue" />
            </TouchableOpacity>
          )}
          <TouchableOpacity>
            <AntDesign name="delete" size={24} color="blue" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="h-0.5 my-3 bg-gray-200"></View>

      <View className="mx-6">
        <Text className="text-xl font-medium ">Project name</Text>
        {!isEditing && (
          <Text className="py-2 mb-2 text-lg ">{project.name}</Text>
        )}
        {isEditing && (
          <View className="flex flex-row py-2 mb-2 text-lg border-b border-gray-400">
            <TextInput
              className="flex-grow text-lg"
              placeholder={project.name}
              value={formik.values.name}
              onChangeText={formik.handleChange("name")}
            />
            {formik.errors.name && (
              <Text className="m-2 text-red-700">{formik.errors.name}</Text>
            )}
          </View>
        )}
        <Text className="text-xl font-medium ">Description</Text>
        {!isEditing && (
          <Text className="py-2 mb-2 text-lg">{project.description}</Text>
        )}
        {isEditing && (
          <View className="flex flex-row py-2 mb-2 text-lg border-b border-gray-400">
            <TextInput
              className="flex-grow text-lg"
              placeholder={project.description}
              value={formik.values.description}
              onChangeText={formik.handleChange("description")}
            />
          </View>
        )}

        <View className="flex flex-row items-center justify-between my-3">
          {isEditing && (
            <>
              <TouchableOpacity
                className="items-center justify-center h-12 px-8 bg-blue-700 ml-14 rounded-2xl"
                onPress={() => formik.handleSubmit()}>
                <Text className="text-base font-medium text-white ">Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="items-center justify-center h-12 px-6 bg-blue-700 mr-14 rounded-2xl"
                onPress={() => {
                  setIsEditing(false);
                }}>
                <Text className="text-base font-medium text-white ">
                  Cancel
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProjectDetailScreen;
