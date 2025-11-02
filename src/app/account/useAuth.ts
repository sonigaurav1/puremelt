"use client";

import { useState } from "react";
import { useClerk, useSignIn, useSignUp } from "@clerk/clerk-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const { signIn, setActive } = useSignIn();
    const { signOut } = useClerk();
    const { signUp } = useSignUp();

    const login = async (email: string, password: string) => {
        console.log('login called', email);
        if (!signIn) {
            toast.error("Sign-in is not available.");
            return false;
        }
        setLoading(true);
        try {
            const signInAttempt = await signIn.create({
                identifier: email,
                password,
            });
            console.log('signInAttempt:', signInAttempt);
            if (signInAttempt.status === "complete") {
                toast.success("Signed In Successfully!");
                await setActive({ session: signInAttempt.createdSessionId });
                return true;
            }
            return false;
        } catch (error: any) {
            console.error('login error:', error);
            toast.error(
                error?.message === "Identifier is invalid."
                    ? "Email not found."
                    : error?.message || "An error occurred during sign-in."
            );
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Flexible registration: returns status and signUp ref for OTP UI
    const register = async ({ firstName, lastName, email, password }: { firstName: string; lastName: string; email: string; password: string }) => {
        console.log('register called', { firstName, lastName, email });
        if (!signUp) {
            toast.error("Sign-up is not available.");
            return { success: false };
        }
        setLoading(true);
        try {
            const signUpAttempt = await signUp.create({
                emailAddress: email,
                password,
                firstName,
                lastName,
            });
            console.debug('signUpAttempt:', signUpAttempt);
            if (signUpAttempt.status === "complete") {
                toast.success("Account created successfully!");
                if (setActive) {
                    await setActive({ session: signUpAttempt.createdSessionId });
                }
                return { success: true };
            }
            // Handle missing requirements (email verification)
            if (signUpAttempt.status === "missing_requirements" && signUpAttempt.unverifiedFields?.includes('email_address')) {
                await signUp.prepareEmailAddressVerification();
                // Return signUp ref for OTP UI
                return { success: false, needsVerification: true, signUpRef: signUp };
            }
            return { success: false };
        } catch (error: any) {
            console.error('register error:', error);
            toast.error(error?.message || "An error occurred during sign-up");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    // OTP verification handler for modal UI
    const verifyEmailOtp = async (signUpRef: any, code: string) => {
        setLoading(true);
        try {
            const verifyAttempt = await signUpRef.attemptEmailAddressVerification({ code });
            console.debug('verifyAttempt:', verifyAttempt);
            if (verifyAttempt.status === "complete") {
                toast.success("Email verified and account created!");
                if (setActive) {
                    await setActive({ session: verifyAttempt.createdSessionId });
                }
                return { success: true };
            } else {
                toast.error("Email verification failed.");
                return { success: false };
            }
        } catch (error: any) {
            toast.error(error?.message || "OTP verification failed");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await signOut();
            toast.success("Signed Out Successfully!");
        } catch (error) {
            toast.error("An error occurred during sign-out.");
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        login,
        register,
        verifyEmailOtp,
        logout,
    };
};
