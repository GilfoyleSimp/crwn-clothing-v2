import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component"; 
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const SignUpForm = () => {

    const defaultFormFields = {
        'displayName': '',
        'email': '',
        'password': '',
        'confirmPassword': ''
    };
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value}); //name being what was set as an attribute. 
        // so this is basically setting e.g. displayName = value of the state
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        if (password !== confirmPassword){
            alert("Passwords do not match");
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
             
        } catch(error) {
            if (error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use');
            }
            else{
                console.log('User creation encountered an error', error);
            }
            
        }
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span> Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label = 'Display Name' required type="text" name="displayName" value={displayName} onChange={handleChange}/>

                <FormInput label = 'Email' required type="email" name="email" value={email} onChange={handleChange}/>

                <FormInput label= 'Password' required type="password" name="password" value={password} onChange={handleChange}/>

                <FormInput label='Confirm Password' required type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange}/>

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;