'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, GoogleOneTap } from '@clerk/clerk-react';
import Header from '../../../components/layout/Header';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../useAuth';
import {
  Loader2,
  Mail,
  Lock,
  KeyRound,
  LogIn,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

// Tailwind-only styles; the previous CSS file has been removed.

const LoginPage = () => {
  const router = useRouter();
  // Only invoke Clerk hooks when a publishable key is present to avoid
  // build-time prerender errors when Clerk isn't configured.
  const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  type ClerkAuthState = { isLoaded: boolean; isSignedIn: boolean };
  const { isLoaded, isSignedIn } = (
    hasClerk
      ? useUser()
      : ({ isLoaded: true, isSignedIn: false } as ClerkAuthState)
  ) as ClerkAuthState;
  const { login, googleLogin, loading, startPasswordReset, resetPassword } =
    useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [resetMode, setResetMode] = useState(false);
  const [resetRequested, setResetRequested] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace('/account');
    }
  }, [isLoaded, isSignedIn, router]);

  const onSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) router.replace('/account');
  };

  const onStartReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetEmail = resetEmail || email;
    if (!targetEmail) return;
    const res = await startPasswordReset(targetEmail);
    if (res.success) setResetRequested(true);
  };

  const onCompleteReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) return;
    const res = await resetPassword(resetCode, newPassword);
    if (res.success) router.replace('/account');
  };

  return (
    <div className='min-h-dvh bg-black pt-12 text-white md:pt-0'>
      <Header />
      <section className='flex items-center justify-center px-4 py-16 md:py-24'>
        <div className='w-full max-w-md'>
          {!resetMode ? (
            <div className='rounded-xl border border-amber-200 bg-black/40 p-6 shadow-xl'>
              <div className='mb-6 text-center'>
                <h1 className='text-3xl font-bold'>Sign in</h1>
                <p className='text-amber-400'>Welcome back</p>
              </div>
              <form onSubmit={onSubmitLogin} className='space-y-4'>
                {/* Google One Tap surface (auto appears if enabled in Clerk dashboard) */}
                {hasClerk && isLoaded && !isSignedIn && <GoogleOneTap />}
                <div>
                  <label className='mb-2 block text-sm font-medium'>
                    Email
                  </label>
                  <div className='relative'>
                    <Mail className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-400' />
                    <Input
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='border-amber-200 bg-black pl-9 text-white focus:border-amber-500'
                      placeholder='you@example.com'
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className='mb-2 block text-sm font-medium'>
                    Password
                  </label>
                  <div className='relative'>
                    <Lock className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-400' />
                    <Input
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className='border-amber-200 bg-black pl-9 text-white focus:border-amber-500'
                      placeholder='••••••••'
                      required
                    />
                  </div>
                </div>

                <Button
                  type='submit'
                  className='flex w-full items-center justify-center gap-2 bg-amber-400 font-semibold text-black hover:bg-amber-300'
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className='h-4 w-4 animate-spin' />
                  ) : (
                    <LogIn className='h-4 w-4' />
                  )}
                  Sign in
                </Button>

                <div className='animate-gradient-shift relative rounded-[24px] bg-[linear-gradient(90deg,#4285f4_0%,#ea4335_25%,#fbbc04_50%,#34a853_75%,#4285f4_100%)] bg-[length:200%_100%] p-1'>
                  <Button
                    onClick={googleLogin}
                    type='button'
                    className='relative flex w-full items-center gap-2 rounded-[20px] bg-[#303134] px-7 py-5 text-base font-medium text-[#e8eaed] transition-colors hover:bg-[#3c4043] active:bg-[#292a2d] [&_svg]:!h-8 [&_svg]:!w-8'
                  >
                    <div className='flex shrink-0 items-center justify-center'>
                      <FcGoogle />
                    </div>
                    <span className='text-xl font-medium tracking-wide'>
                      Sign in with Google
                    </span>
                  </Button>
                </div>

                <div className='flex items-center justify-between text-sm'>
                  <button
                    type='button'
                    className='text-amber-400 underline'
                    onClick={() => setResetMode(true)}
                  >
                    Forgot password?
                  </button>
                  <Link
                    href='/account/register'
                    className='text-amber-400 underline'
                  >
                    Create an account
                  </Link>
                </div>
              </form>
            </div>
          ) : (
            <div className='rounded-xl border border-amber-200 bg-black/40 p-6 shadow-xl'>
              <div className='mb-6 text-center'>
                <h1 className='text-2xl font-bold'>Reset password</h1>
                <p className='text-amber-400'>
                  We will email you a verification code
                </p>
              </div>

              {!resetRequested ? (
                <form onSubmit={onStartReset} className='space-y-4'>
                  <div>
                    <label className='mb-2 block text-sm font-medium'>
                      Email
                    </label>
                    <div className='relative'>
                      <Mail className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-400' />
                      <Input
                        type='email'
                        value={resetEmail || email}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className='border-amber-200 bg-black pl-9 text-white focus:border-amber-500'
                        placeholder='you@example.com'
                        required
                      />
                    </div>
                  </div>
                  <div className='flex gap-2'>
                    <Button
                      type='button'
                      variant='outline'
                      className='border-amber-200 text-amber-200 hover:bg-amber-50/10'
                      onClick={() => setResetMode(false)}
                    >
                      <ArrowLeft className='mr-2 h-4 w-4' /> Back to sign in
                    </Button>
                    <Button
                      type='submit'
                      className='flex-1 bg-amber-400 font-semibold text-black hover:bg-amber-300'
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      ) : (
                        <KeyRound className='mr-2 h-4 w-4' />
                      )}
                      Send code
                    </Button>
                  </div>
                </form>
              ) : (
                <form onSubmit={onCompleteReset} className='space-y-4'>
                  <div>
                    <label className='mb-2 block text-sm font-medium'>
                      Verification code
                    </label>
                    <Input
                      value={resetCode}
                      onChange={(e) => setResetCode(e.target.value)}
                      className='border-amber-200 bg-black text-white focus:border-amber-500'
                      placeholder='6-digit code'
                      required
                    />
                  </div>
                  <div>
                    <label className='mb-2 block text-sm font-medium'>
                      New password
                    </label>
                    <Input
                      type='password'
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className='border-amber-200 bg-black text-white focus:border-amber-500'
                      placeholder='••••••••'
                      required
                    />
                  </div>
                  <div>
                    <label className='mb-2 block text-sm font-medium'>
                      Confirm new password
                    </label>
                    <Input
                      type='password'
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className='border-amber-200 bg-black text-white focus:border-amber-500'
                      placeholder='••••••••'
                      required
                    />
                  </div>
                  <Button
                    type='submit'
                    className='flex w-full items-center justify-center gap-2 bg-amber-400 font-semibold text-black hover:bg-amber-300'
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className='h-4 w-4 animate-spin' />
                    ) : (
                      <CheckCircle2 className='h-4 w-4' />
                    )}
                    Reset password
                  </Button>
                </form>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
