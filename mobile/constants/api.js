export const API_URL =  "http://192.168.43.187:3001"; // "http://192.168.43.187:3001/api";  //192.168.43.187

// import { create } from "zustand";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API_URL } from "../constants/api";

// export const useAuthStore = create((set) => ({
//   user: null,
//   token: null,
//   isLoading: false,


//   register: async (username, email, password) => {
//     set({ isLoading: true });
//     try {
//       const response = await fetch("http://192.168.100.40:3001/api/authentication/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username,
//           email,
//           password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) throw new Error(data.message || "Something went wrong");

//       await AsyncStorage.setItem("user", JSON.stringify(data.user));
//       await AsyncStorage.setItem("token", data.token);

//       set({ token: data.token, user: data.user, isLoading: false });

//       return { success: true };
//     } catch (error) {
//       set({ isLoading: false });
//       return { success: false, error: error.message };
//     }
//   },

  

  
// }));