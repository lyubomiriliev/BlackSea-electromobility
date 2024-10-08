import { Link, useNavigate } from "react-router-dom"
import { BlackSeaLogo, logoBlackSea } from "../assets"
import { useEffect, useState } from "react"

import useLogin from "../hooks/useLogin"
import { useTranslation } from 'react-i18next';
import i18n from "../i18n";

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

import useAuthStore from "../store/authStore";

const Login = () => {

    const { t } = useTranslation();
    const { handleUserLogin } = useLogin();
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    })

    const authUser = useAuthStore((state) => state.user)


    const [rememberUser, setRememberUser] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [isEmailFocused, setEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("rememberedUser");
        if (storedUser) {
            setInputs((prevInputs) => ({
                ...prevInputs,
                email: storedUser,
            }));
            setRememberUser(true);
        }
    }, [])

    useEffect(() => {

        const updateErrorMessages = () => {
            const newErrors = {};

            if (errors.email) {
                if (errors.email === "emailRequired") {
                    newErrors.email = t("loginError.emailRequired");
                } else if (errors.email === "emailInvalid") {
                    newErrors.email = t("loginError.invalidEmail");
                }
            }

            if (errors.password) {
                if (errors.password === "passwordRequired") {
                    newErrors.password = t("loginError.passwordRequired");
                } else if (errors.password === "passwordInvalid") {
                    newErrors.password = t("loginError.passwordInvalid");
                }
            }

            setErrors(newErrors);
        };

        updateErrorMessages();
    }, [t])


    const isValidEmail = (email) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    };

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$/;



    const handleInputBlur = (e) => {
        const { name, value } = e.target;
        let errorMessage = "";

        switch (name) {
            case 'email':
                if (!value.trim()) {
                    errorMessage = t("loginError.emailRequired");
                    setEmailFocused(false)
                } else if (!isValidEmail(value)) {
                    errorMessage = t("loginError.invalidEmail");
                }
                break;
            case 'password':
                if (!value.trim()) {
                    errorMessage = t("loginError.passwordRequired")
                    setIsPasswordFocused(false);
                } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$/.test(value)) {
                    errorMessage = t("registerError.passwordInvalid");
                }
                break;
            default:
                break;
        }

        setErrors(prevErrors => ({
            ...prevErrors, [name]: errorMessage
        }));
    };

    const handleInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let formIsValid = true;
        const newErrors = {};

        if (!inputs.email.trim()) {
            newErrors.email = t("loginError.emailRequired");
            formIsValid = false;
        } else if (!isValidEmail(inputs.email)) {
            newErrors.email = t("loginError.invalidEmail");
            formIsValid = false;
        }

        if (!inputs.password.trim()) {
            newErrors.password = t("loginError.passwordRequired");
            formIsValid = false;
        } else if (!passwordRegex.test(inputs.password)) {
            newErrors.password = t("loginError.passwordInvalid")
            formIsValid = false;
        }

        setErrors(newErrors);
        if (formIsValid) {
            handleUserLogin(inputs);
            if (rememberUser) {
                localStorage.setItem("rememberedUser", inputs.email);
            } else {
                localStorage.removeItem("rememberedUser");
            }
        }

    }

    const handleForgotPassword = () => {
        navigate("/forgot-password")
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }



    return (
        <div>
            <div className="min-h-screen flex justify-center items-start px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full">
                    <div>
                        <div className="flex justify-center py-10 space-x-4">
                                <button onClick={() => i18n.changeLanguage('en')} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary duration-300">EN</button>
                                <button onClick={() => i18n.changeLanguage('bg')} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary duration-300">BG</button>
                            </div>
                        <img className="h-40 w-auto mx-auto" src={BlackSeaLogo} alt="mainLogo" />
                        <div className="flex items-center gap-10 w-full justify-center">
                            
                        </div>
                        <div className="mt-6">
                            <form className="mt-8 flex flex-col" onSubmit={handleSubmit} noValidate>
                                <div className="relative mb-5">
                                    <input
                                        required
                                        className="input-field border border-gray-300 rounded-md mb-5 px-4 py-2 w-full focus:outline-none focus:border-primary focus:placeholder-transparent"
                                        type="email"
                                        name="email"
                                        value={inputs.email}
                                        onChange={handleInputChange}
                                        onFocus={() => setEmailFocused(true)}
                                        onBlur={handleInputBlur}
                                    />
                                    <label
                                        className={`absolute left-4 -mt-3 transition-all duration-300  ${isEmailFocused || inputs.email ? 'top-1 text-sm bg-white px-2 text-primary' : 'left-4 -mt-3 translate-y-5 text-gray-400'
                                            }`}
                                        htmlFor="email"
                                    >
                                        {t('login.email')}
                                    </label>
                                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                                    <div className="relative mb-5">
                                        <input required
                                            className="input-field border border-gray-300 rounded-md mb-5 px-4 py-2 w-full focus:outline-none focus:border-primary focus:placeholder-transparent"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            onChange={handleInputChange}
                                            onFocus={() => setIsPasswordFocused(true)}
                                            onBlur={handleInputBlur}
                                        />
                                        <label
                                            className={`absolute left-4 -mt-3 transition-all duration-300  ${isPasswordFocused || inputs.password ? 'top-1 text-sm bg-white px-2 text-primary' : 'left-4 -mt-3 translate-y-5 text-gray-400'
                                                }`}
                                            htmlFor="email"
                                        >
                                            {t('login.password')}
                                        </label>
                                        <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 bottom-6 flex items-center mr-3 -mt-5 text-gray-400 cursor-pointer">
                                            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                        </button>
                                        <div className="flex justify-center items-center">
                                        <label htmlFor="rememberUser">{t("login.signedIn")}</label>
                                        <input className="ml-2" type="checkbox" id="rememberUser" checked={rememberUser} onChange={(e) => setRememberUser(e.target.checked)} />
                                    </div>
                                    </div>
                                    {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

                                    <button type="submit" className="bg-primary text-white text-base mt-5 py-3 px-20 tracking-wide rounded-md flex mx-auto hover:bg-secondary duration-300">{t('login.login')}</button>
                                </div>
                            </form>
                            <div className="flex mx-auto py-2 text-secondary font-bold">
                                <button className="flex mx-auto py-2 text-black font-bold" onClick={handleForgotPassword}>{t('login.forgotPassword')}</button>
                            </div>
                            <Link to="/register" className="font-medium ">
                                <button className="flex mx-auto py-2 text-secondary font-bold">{t('login.noProfile')}</button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )

}
export default Login