import useAuthStore from "../store/authStore"
import { useState } from "react";
import useEditProfile from "../hooks/useEditProfile";
import { useTranslation } from 'react-i18next';
import { toast } from "react-toastify"
import { EmailAuthProvider, updatePassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { reauthenticateWithCredential } from "firebase/auth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Profile = () => {

    const { t } = useTranslation();
    const authUser = useAuthStore((state) => state.user)
    const { editProfile } = useEditProfile();

    const [isEmailFocused, setEmailFocused] = useState(false);
    const [isNameFocused, setNameFocused] = useState(false);
    const [isSurnameFocused, setSurnameFocused] = useState(false);
    const [isOldPasswordFocused, setOldPasswordFocused] = useState(false);
    const [isNewPasswordFocused, setNewPasswordFocused] = useState(false);
    const [isPhoneFocused, setPhoneFocused] = useState(false);

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const toggleOldPasswordVisibility = () => {
        setShowOldPassword(!showOldPassword)
    }

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };



    const [inputs, setInputs] = useState({
        name: authUser?.name || "",
        surname: authUser?.surname || "",
        oldPassword: "",
        newPassword: "",
        phone: authUser?.phone || "",
    });

    const handleEditProfile = async () => {

        const { oldPassword, newPassword } = inputs;

        const credential = EmailAuthProvider.credential(authUser.email, oldPassword)

        try {
            // await reauthenticateWithCredential(auth.currentUser, credential);
            if (oldPassword === newPassword && oldPassword !== "" && newPassword !== "") {
                toast.error("New password cannot be the same as the old one.");
                return;
            }

            if (newPassword !== "") {
                toast.error("Please provide a new password");
                return;
            }
            await updatePassword(auth.currentUser, newPassword);
            toast.success("Password changed successfully")

            await editProfile({
                name: inputs.name,
                surname: inputs.surname,
                email: inputs.email,
                phone: inputs.phone
            });

            localStorage.setItem("user-info", JSON.stringify(inputs));
            toast.success("Changes saved")
        } catch (error) {
            toast.error("Error updating password. Please try again.")
        }


    }



    return (
        <div className="bg-white py-40 px-4">
            <div className="max-w-screen-md mx-auto">
                <h1 className="text-3xl font-bold mb-6">{t('profile.title')}</h1>
                <div className="relative mb-5">
                    <input
                        className="input-field border border-gray-300 rounded-md mb-5 px-4 py-2 w-full focus:outline-none focus:border-primary focus:placeholder-transparent"
                        type="email"
                        name="email"
                        value={authUser.email}
                        onChange={handleInputChange}
                        onFocus={() => setEmailFocused(true)}
                        onBlur={() => setEmailFocused(false)}
                        disabled
                    />
                    <label
                        className={`absolute left-4 transform -translate-y-1/2 transition-all duration-300 ${isEmailFocused || authUser.email ? '-top-0 text-sm bg-white px-2 text-gray-400' : 'top-1/2 -translate-y-1/2 text-gray-500'
                            }`}
                        htmlFor="email"
                    >
                        {t('profile.email')}
                    </label>
                </div>
                <div className="relative mb-5">
                    <input
                        className="input-field border border-gray-300 rounded-md mb-5 px-4 py-2 w-full focus:outline-none focus:border-primary"
                        type="text"
                        name="name"
                        value={inputs.name}
                        onChange={handleInputChange}
                        onFocus={() => setNameFocused(true)}
                        onBlur={() => setNameFocused(false)}
                    />
                    <label
                        className={`absolute left-4 -mt-3 transition-all duration-300 ${isNameFocused || inputs.name ? '-top-0 text-sm bg-white px-2 text-gray-400' : 'top-1/2 -translate-y-1/2 text-gray-500'
                            }`}
                        htmlFor="name"
                    >
                        {t('profile.name')}
                    </label>
                </div>
                <div className="relative mb-5">
                    <input
                        className="input-field border border-gray-300 rounded-md mb-5 px-4 py-2 w-full focus:outline-none focus:border-primary"
                        type="text"
                        name="surname"
                        value={inputs.surname}
                        onChange={handleInputChange}
                        onFocus={() => setSurnameFocused(true)}
                        onBlur={() => setSurnameFocused(false)}
                    />
                    <label
                        className={`absolute left-4 -mt-3 transition-all duration-300 ${isSurnameFocused || inputs.surname ? '-top-0 text-sm bg-white px-2 text-gray-400' : 'top-1/2 -translate-y-1/2 text-gray-500'
                            }`}
                        htmlFor="name"
                    >
                        {t('profile.surname')}
                    </label>
                </div>
                <div className="relative mb-5">
                    <input
                        className="input-field border border-gray-300 rounded-md mb-5 px-4 py-2 w-full focus:outline-none focus:border-primary"
                        type="text"
                        name="phone"
                        value={inputs.phone}
                        onChange={handleInputChange}
                        onFocus={() => setPhoneFocused(true)}
                        onBlur={() => setPhoneFocused(false)}
                    />
                    <label
                        className={`absolute left-4 -mt-3 transition-all duration-300 ${isPhoneFocused || inputs.phone ? '-top-0 text-sm bg-white px-2 text-gray-400' : 'top-1/2 -translate-y-1/2 text-gray-500'
                            }`}
                        htmlFor="name"
                    >
                        {t('profile.phone')}
                    </label>
                </div>
                <div className="relative mb-5">
                    <input required
                        className="input-field border border-gray-300 rounded-md mb-5 px-4 py-2 w-full focus:outline-none focus:border-primary"
                        type={showOldPassword ? "text" : "password"}
                        name="oldPassword"
                        onChange={handleInputChange}
                        onFocus={() => setOldPasswordFocused(true)}
                        onBlur={() => setOldPasswordFocused(false)}
                    />
                    <button type="button" onClick={toggleOldPasswordVisibility} className="absolute inset-y-0 right-0 flex items-center mr-3 -mt-5 text-gray-400 cursor-pointer">
                        {showOldPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                    <label
                        className={`absolute left-4 -mt-3 transition-all duration-300 ${isOldPasswordFocused || inputs.oldPassword ? '-top-0 text-sm bg-white px-2 text-gray-400' : 'top-1/2 -translate-y-1/2 text-gray-500'
                            }`}
                        htmlFor="name"
                    >
                        {t('profile.oldPassword')}
                    </label>
                </div>
                <div className="relative mb-5">
                    <input
                        className="input-field border border-gray-300 rounded-md mb-5 px-4 py-2 w-full focus:outline-none focus:border-primary"
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        onChange={handleInputChange}
                        onFocus={() => setNewPasswordFocused(true)}
                        onBlur={() => setNewPasswordFocused(false)}
                    />
                    <label
                        className={`absolute left-4 -mt-3 transition-all duration-300 ${isNewPasswordFocused || inputs.newPassword ? '-top-0 text-sm bg-white px-2 text-gray-400' : 'top-1/2 -translate-y-1/2 text-gray-500'
                            }`}
                        htmlFor="name"
                    >
                        {t('profile.newPassword')}
                    </label>
                    <button type="button" onClick={toggleNewPasswordVisibility} className="absolute inset-y-0 right-0 flex items-center mr-3 -mt-5 text-gray-400 cursor-pointer">
                        {showNewPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                </div>
                <button onClick={handleEditProfile} className="bg-secondary text-white py-3 px-8 rounded-md hover:bg-primary duration-300 mt-6 w-1/3">{t('profile.submit')}</button>
                <div className="flex items-center mt-6">
                </div>
            </div>
        </div>
    )
}

export default Profile
