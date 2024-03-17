import { doc, updateDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";
import { firestore } from "../firebase.config";

const useEditProfile = () => {
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);

  const editProfile = async (inputs) => {
    if (!authUser) return;

    const userDocRef = doc(firestore, "users", authUser.uid);

    const updatedUser = {
      ...authUser,
      name: inputs.name || authUser.name,
      surname: inputs.surname || authUser.surname,
      email: inputs.email || authUser.email,
      password: inputs.password || authUser.password,
      phone: inputs.phone || authUser.phone,
    };

    await updateDoc(userDocRef, updatedUser);
    localStorage.setItem("user-info", JSON.stringify(updatedUser));
    setAuthUser(updatedUser);
    alert("Промените са запазени успешно.");
  };

  return { editProfile };
};

export default useEditProfile;