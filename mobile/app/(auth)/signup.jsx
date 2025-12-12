import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from "react-native";
import styles from "../../assets/styles/signup.styles";
import COLORS from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";
import { useAuthStore } from "../../store/authStore.js";




export default function Signup() {
    

    const [username, setusername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
  

 const store = useAuthStore();





    const handleSignUp = async () => {
        const result = await store.register(username, email, password);
        if (!result.success) Alert.alert("Error", result.error);
    };


    return (

        <KeyboardAvoidingView style={{ flex: 1, }} behavior={Platform.OS === "ios" ? "padding" : "height" }>
            <ScrollView
            keyboardShouldPersistTaps="never"
            > 
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.title}>BookWorm</Text>
                    <Text style={styles.subtitle}>Share your favorite reads</Text>

                    <View style={{ marginTop: 10 }}></View>

                    <Text style={styles.label}>Username</Text>
                    <View style={styles.inputContainer}>

                        <Ionicons style={styles.eyeIcon} name="person-outline" color={COLORS.primary} size={20}> </Ionicons>
                        <TextInput style={styles.input} placeholder="John Doe"
                         value={username}
                            onChangeText={setusername}
                            ></TextInput>

                    </View>


                    <View style={{ marginTop: 10 }}></View>

                    <Text style={styles.label}>Email</Text>
                    <View style={styles.inputContainer}>

                        <Ionicons style={styles.eyeIcon} name="mail-outline" color={COLORS.primary} size={20}> </Ionicons>
                        <TextInput style={styles.input} placeholder="JohnDoe@gmail.com" 
                        onChangeText={setEmail} value={email}
                        ></TextInput>

                    </View>


                    <View style={{ marginTop: 10 }}></View>

                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputContainer}>

                        <Ionicons style={styles.eyeIcon} name="lock-closed-outline" color={COLORS.primary} size={20}> </Ionicons>
                        <TextInput style={styles.input} placeholder="John Doe" secureTextEntry={!showPassword}
                         value={password}
                            onChangeText={setPassword}
                            ></TextInput>
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Ionicons style={styles.eyeIcon} name={showPassword ? "eye-outline" : "eye-off-outline"} color={COLORS.primary} size={20}> </Ionicons>
                        </TouchableOpacity>



                    </View>
                    <View style={{ marginTop: 10 }}></View>
                    <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={store.isLoading}>
                        {store.isLoading ? (<ActivityIndicator color='#fff'></ActivityIndicator>) : <Text style={styles.buttonText}>Login</Text>}
                    </TouchableOpacity>
                    <View style={{ marginTop: 10 }}></View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account?</Text>

                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={styles.link}>Login</Text>
                        </TouchableOpacity>
                    </View>


                </View>




            </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}