import { View, Image, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useState } from "react";
import styles from "../../assets/styles/login.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import {Link} from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSign = () => { };

  return (
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === "ios"? "padding" : "height"}>
 <ScrollView 
 
      contentContainerStyle={{ flexGrow: 5 }} 
      keyboardShouldPersistTaps="never"
      showsVerticalScrollIndicator={false}
    >
   
    <View style={styles.container}>

      {/* Top Illustration */}
      <View style={styles.topIllustration}>
        <Image
          style={styles.illustrationImage}
          source={require("../../assets/images/i.png")}
          resizeMode="contain"
        />
      </View>

      {/* Card */}
      <View style={styles.card}>

        {/* Form */}
        <View style={styles.formContainer}>

          {/* Email Label */}
          <Text style={styles.label}>Email</Text>

          {/* Input Container */}
          <View style={styles.inputContainer}>
            <Ionicons style={styles.inputIcon} name="mail-outline" size={20} />
            {/* Add your TextInput here */}
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={COLORS.placeholderText}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"

              autoCapitalize="none"

            />
          </View>

        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputContainer}>

            <Ionicons style={styles.Ionicons} name="lock-closed-outline" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={COLORS.placeholderText}
              value={Password}
              onChangeText={setPassword}
              autoCapitalize="none"
              secureTextEntry={!showPassword}  // hides text
            />

            <TouchableOpacity 
            onPress={()=>setShowPassword(!showPassword)}
            style={styles.eyeIcon}
            >
              <Ionicons name={showPassword? "eye-outline" : "eye-off-outline"} size={20} color={COLORS.primary}>

              </Ionicons>

            </TouchableOpacity>


          </View>

        </View>

        <TouchableOpacity style={styles.button} onPress={handleSign} disabled={isLoading}>
         {isLoading ? (<ActivityIndicator color='#fff'></ActivityIndicator>) : <Text style={styles.buttonText}>Login</Text>}
        </TouchableOpacity>
        
      <View style={styles.footer}>
       <Text style={styles.footerText}>Don't have an account?</Text>
       <Link href="/signup" asChild>
       <TouchableOpacity>
        <Text style={styles.link}>Sign Up</Text>
       </TouchableOpacity>
       </Link>
      </View>

      </View>

    </View>
    </ScrollView>
     </KeyboardAvoidingView>
  );
}