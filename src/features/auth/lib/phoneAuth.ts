// lib/phoneAuth.ts
import { auth } from './firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';

declare global {
    interface Window {
        recaptchaVerifier: RecaptchaVerifier;
        confirmationResult: ConfirmationResult;
    }
}

export const setupRecaptcha = (containerId: string) => {
    if (typeof window !== 'undefined') {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
            size: 'invisible',
            callback: () => {
                console.log('reCAPTCHA solved');
            },
            'expired-callback': () => {
                console.log('reCAPTCHA expired');
            }
        });
    }
};

export const sendOTP = async (phoneNumber: string) => {
    try {
        const formattedPhoneNumber = phoneNumber.startsWith('+977')
            ? phoneNumber
            : `+977${phoneNumber}`;

        const confirmationResult = await signInWithPhoneNumber(
            auth,
            formattedPhoneNumber,
            window.recaptchaVerifier
        );

        window.confirmationResult = confirmationResult;
        return { success: true };
    } catch (error) {
        console.error('Error sending OTP:', error);
        return { success: false, error };
    }
};

export const verifyOTP = async (otp: string) => {
    try {
        const result = await window.confirmationResult.confirm(otp);
        return { success: true, user: result.user };
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return { success: false, error };
    }
};