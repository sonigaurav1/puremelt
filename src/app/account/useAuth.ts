"use client";

import { useState } from "react";
import { useClerk, useSignIn, useSignUp } from "@clerk/clerk-react";
import type { SignUpResource } from "@clerk/types";
import { toast } from "sonner";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);

    const { signIn, setActive } = useSignIn();
    const { signOut } = useClerk();
    const { signUp } = useSignUp();

    // Safely extract a human-readable message from unknown errors (incl. Clerk errors)
    const getErrorMessage = (err: unknown): string => {
        if (typeof err === "string") return err;
        if (err instanceof Error) return err.message;
        // Clerk often returns { errors: [{ message, code, longMessage? }] }
        if (err && typeof err === "object" && "errors" in err) {
            const anyErr = err as { errors?: Array<{ message?: string; longMessage?: string }>; message?: string };
            const first = anyErr.errors?.[0];
            return first?.longMessage || first?.message || anyErr.message || "An unexpected error occurred.";
        }
        return "An unexpected error occurred.";
    };

    const login = async (email: string, password: string) => {
        if (process.env.NODE_ENV !== 'production') {
            console.debug('login called', email);
        }
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
            if (process.env.NODE_ENV !== 'production') {
                console.debug('signInAttempt:', signInAttempt);
            }
            if (signInAttempt.status === "complete") {
                toast.success("Signed In Successfully!");
                await setActive({ session: signInAttempt.createdSessionId });
                return true;
            }
            return false;
        } catch (err: unknown) {
            if (process.env.NODE_ENV !== 'production') {
                console.error('login error:', err);
            }
            const message = getErrorMessage(err);
            toast.error(message === "Identifier is invalid." ? "Email not found." : message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Flexible registration: returns status and signUp ref for OTP UI
    const register = async ({ firstName, lastName, email, password }: { firstName: string; lastName: string; email: string; password: string }) => {
        if (process.env.NODE_ENV !== 'production') {
            console.debug('register called', { firstName, lastName, email });
        }
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
            if (process.env.NODE_ENV !== 'production') {
                console.debug('signUpAttempt:', signUpAttempt);
            }
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
        } catch (err: unknown) {
            if (process.env.NODE_ENV !== 'production') {
                console.error('register error:', err);
            }
            toast.error(getErrorMessage(err) || "An error occurred during sign-up");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    // OTP verification handler for modal UI
    const verifyEmailOtp = async (signUpRef: SignUpResource, code: string) => {
        setLoading(true);
        try {
            const verifyAttempt = await signUpRef.attemptEmailAddressVerification({ code });
            if (process.env.NODE_ENV !== 'production') {
                console.debug('verifyAttempt:', verifyAttempt);
            }
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
        } catch (err: unknown) {
            toast.error(getErrorMessage(err) || "OTP verification failed");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    // Google OAuth login via redirect (no Clerk UI)
    const googleLogin = async () => {
        try {
            if (!signIn) {
                toast.error("Sign-in is not available.");
                return;
            }
            await signIn.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: '/account',
                redirectUrlComplete: '/account',
            });
        } catch (err: unknown) {
            if (process.env.NODE_ENV !== 'production') {
                console.error('google login error:', err);
            }
            toast.error(getErrorMessage(err) || 'Google sign-in failed');
        }
    };

    // Begin password reset: sends a verification code to the email
    const startPasswordReset = async (email: string) => {
        if (!signIn) {
            toast.error('Password reset is not available.');
            return { success: false };
        }
        setLoading(true);
        try {
            const res = await signIn.create({
                strategy: 'reset_password_email_code',
                identifier: email,
            });
            if (process.env.NODE_ENV !== 'production') {
                console.debug('startPasswordReset:', res);
            }
            toast.success('Password reset code sent to your email.');
            return { success: true };
        } catch (err: unknown) {
            if (process.env.NODE_ENV !== 'production') {
                console.error('startPasswordReset error:', err);
            }
            toast.error(getErrorMessage(err) || 'Failed to start password reset');
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    // Complete password reset with code and new password
    const resetPassword = async (code: string, newPassword: string) => {
        if (!signIn) {
            toast.error('Password reset is not available.');
            return { success: false };
        }
        setLoading(true);
        try {
            const attempt = await signIn.attemptFirstFactor({
                strategy: 'reset_password_email_code',
                code,
                password: newPassword,
            });
            if (process.env.NODE_ENV !== 'production') {
                console.debug('resetPassword attempt:', attempt);
            }
            if (attempt.status === 'complete') {
                toast.success('Password reset successful.');
                await setActive({ session: attempt.createdSessionId });
                return { success: true };
            }
            toast.error('Password reset failed.');
            return { success: false };
        } catch (err: unknown) {
            if (process.env.NODE_ENV !== 'production') {
                console.error('resetPassword error:', err);
            }
            toast.error(getErrorMessage(err) || 'Failed to reset password');
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
        } catch (err: unknown) {
            toast.error(getErrorMessage(err) || "An error occurred during sign-out.");
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        login,
        register,
        verifyEmailOtp,
        googleLogin,
        startPasswordReset,
        resetPassword,
        logout,
    };
};
