import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from "react-native";
import styles from "../../assets/styles/signup.styles";
import COLORS from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";


export default function Signup() {

const [showPassword, setShowPassword]=useState(false);


    return (

        <KeyboardAvoidingView style={{ flex: 1, }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.title}>BookWorm</Text>
                    <Text style={styles.subtitle}>Share your favorite reads</Text>

                    <View style={{ marginTop: 10 }}></View>

                    <Text style={styles.label}>Username</Text>
                    <View style={styles.inputContainer}>

                        <Ionicons style={styles.eyeIcon} name="person-outline" color={COLORS.primary}size={20}> </Ionicons>
                        <TextInput style={styles.input} placeholder="John Doe"></TextInput>

                    </View>


                    <View style={{ marginTop: 10 }}></View>

                    <Text style={styles.label}>Email</Text>
                    <View style={styles.inputContainer}>

                        <Ionicons style={styles.eyeIcon} name="mail-outline" color={COLORS.primary} size={20}> </Ionicons>
                        <TextInput style={styles.input} placeholder="JohnDoe@gmail.com"></TextInput>

                    </View>


                    <View style={{ marginTop: 10 }}></View>

                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputContainer}>

                        <Ionicons style={styles.eyeIcon} name="lock-closed-outline" color={COLORS.primary} size={20}> </Ionicons>
                        <TextInput style={styles.input} placeholder="John Doe" secureTextEntry={!showPassword} ></TextInput>
                        <TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
                            <Ionicons style={styles.eyeIcon} name={showPassword? "eye-outline" : "eye-off-outline"} color={COLORS.primary} size={20}> </Ionicons>
                        </TouchableOpacity>



                    </View>
                     <View style={{ marginTop: 10 }}></View>
                     <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                     </TouchableOpacity>
                      <View style={{ marginTop: 10 }}></View>

                      <View style={styles.footer }>
                      <Text style={styles.footerText}>Already have an account?</Text>
                      
                       <TouchableOpacity onPress={()=>router.back()}>
                        <Text style={styles.link}>Login</Text>
                     </TouchableOpacity>
                      </View>


                </View>




            </View>
        </KeyboardAvoidingView>
    )
}