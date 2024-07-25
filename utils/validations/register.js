import * as Yup from "yup";

export  const registerValidation = Yup.object({
    name: Yup.string()
        .required("What's your name ?")
        .min(2, "First name must be between 2 and 16 characters.")
        .max(16, "First name must be between 2 and 16 characters.")
        .matches(/^[aA-zZ]/, "Numbers and special characters are not allowed."),
    email: Yup.string()
        .required(
            "You'll need this when you log in and if you ever need to reset your password."
        )
        .email("Enter a valid email address."),
    password: Yup.string()
        .required(
            "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
        )
        .min(6, "Password must be atleast 6 characters.")
        .max(36, "Password can't be more than 36 characters"),
    conf_password: Yup.string()
        .required("Confirm your password.")
        .oneOf([Yup.ref("password")], "Passwords must match."),
});