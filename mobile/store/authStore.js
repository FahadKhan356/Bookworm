import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {API_URL} from "../constants/api";

export const useAuthStore = create((set) => ({

    user: null,
    token: null,
    isLoading: false,

    register: async (username, email, password) => {
        set({ isLoading: true });
        try {


            const response = await fetch(`${API_URL}/api/authentication/register`, { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    username,
                    email,
                    password
                }),
            })
            const data = await response.json();

            if (!response.ok) throw new Error(data.message || "Something went wrong");

            await AsyncStorage.setItem("user", JSON.stringify(data.user));
            await AsyncStorage.setItem("token", data.token);
            set({ token: data.token, user: data.user, isLoading: false });


            return { success: true };

        } catch (error) {
            set({ isLoading: false });
            console.log("failed ");
            return { success: false, error: error.message }

        }


    },

    checkAuth: async ()=>{
     
     
    try{
        const userToken = await AsyncStorage.getItem("token");
        const userJson = await AsyncStorage.getItem("user");
        const user = userJson ? JSON.parse(userJson) : null;
  
         set({ user: user, token: userToken});
         console.log(`inside checkAuth user : ${user.username} | token : ${userToken}`);

     }catch(error){
        console.log("Error",error);
     }
    },

//logout
logout: async ()=>{
    

    try{
     await AsyncStorage.removeItem("user");
     await AsyncStorage.removeItem("token");
     set({token:null, user:null});

console.log("Logout user");
    }catch(error){
        console.log(error);
    }
},

//login

login: async(email , password)=>{
    set({isLoading:true});
try{
const response = await fetch(`http://192.168.43.187:3001/api/authentication/login`,{
    method:"POST",
    headers:{
 "Content-type": "application/json",
    },
    body:JSON.stringify({
     email,
     password,
    }),
}
);

const data=await response.json();
if(!response.ok){
    throw new Error( data.message  || "Error in Login" );
}
await AsyncStorage.setItem("user", JSON.stringify(data.user)); 
await AsyncStorage.setItem("token", data.token);

console.log(`user : ${JSON.stringify(data.user)} | token : ${data.token}`),

set({ user: data.user, token: data.token });
   set({isLoading:false});
return {"success":true};


}catch(error){
       set({isLoading:false});
    console.log("Error in Login", error);

    return {"success":false};

}
}

})
);