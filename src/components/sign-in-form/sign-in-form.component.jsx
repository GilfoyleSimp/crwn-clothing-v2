import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth,
signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component"; 
import './sign-in-form.styles.scss';
import Button from "../button/button.component";

const SignInForm = () => {

    const defaultFormFields = {
        'email': '',
        'password': ''
    };
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value}); //name being what was set as an attribute. 
        // so this is basically setting e.g. displayName = value of the state
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async() => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    const handleSubmit = async(event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();
             
        } catch(error) {
            switch (error.code){
                case 'auth/wrong-password':
                    alert("Incorrect password for email");
                    break;
                case 'auth/user-not-found':
                    alert("No user associated with this email")
                    break;
                default:
                    console.log(error);
            }

        }
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span> Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label = 'Email' required type="email" name="email" value={email} onChange={handleChange}/>

                <FormInput label= 'Password' required type="password" name="password" value={password} onChange={handleChange}/>
                
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type='button' onClick={signInWithGoogle} buttonType='google'>Google sign in</Button> 
                </div>
                
            </form>
        </div>
    )
}

export default SignInForm;