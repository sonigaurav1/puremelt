'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';
import Header from '../../../components/layout/Header';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import Link from 'next/link';
import { useAuth } from '../useAuth';
import { Loader2, UserPlus, Eye, EyeOff, Mail, User } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

const RegisterPage = () => {
  const router = useRouter();
  const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  type ClerkAuthState = { isLoaded: boolean; isSignedIn: boolean };
  const { isLoaded, isSignedIn } = (
    hasClerk
      ? useUser()
      : ({ isLoaded: true, isSignedIn: false } as ClerkAuthState)
  ) as ClerkAuthState;
  const { register, verifyEmailOtp, googleLogin, loading } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [verificationNeeded, setVerificationNeeded] = useState(false);
  // Clerk SignUp resource is provided through useAuth when email verification is required.
  // Use a more specific type instead of 'any' to remove warnings and improve DX.
  const [signUpRef, setSignUpRef] = useState<
    import('@clerk/types').SignUpResource | null
  >(null);
  const [code, setCode] = useState('');

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace('/account');
    }
  }, [isLoaded, isSignedIn, router]);

  const onSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
    const res = await register({ firstName, lastName, email, password });
    if (res?.success) {
      router.replace('/account');
    } else if (res?.needsVerification && res?.signUpRef) {
      setVerificationNeeded(true);
      setSignUpRef(res.signUpRef);
    }
  };

  const onVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpRef) return;
    const res = await verifyEmailOtp(signUpRef, code);
    if (res?.success) router.replace('/account');
  };

  return (
    <div className='min-h-dvh bg-black pt-12 text-white md:pt-0'>
      <Header />
      <section className='flex items-center justify-center px-4 py-16 md:py-24'>
        <div className='w-full max-w-md'>
          {!verificationNeeded ? (
            <div className='rounded-xl border border-amber-200 bg-black/40 p-6 shadow-xl'>
              <div className='mb-6 text-center'>
                <h1 className='text-3xl font-bold'>Create your account</h1>
                <p className='text-amber-400'>
                  Join {process.env.NEXT_PUBLIC_BRAND_NAME || 'us'}
                </p>
              </div>
              <form onSubmit={onSubmitRegister} className='space-y-4'>
                <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                  <div>
                    <label className='mb-2 block text-sm font-medium'>
                      First name
                    </label>
                    <div className='relative'>
                      <User className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-400' />
                      <Input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className='border-amber-200 bg-black pl-9 text-white focus:border-amber-500'
                        placeholder='Name'
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className='mb-2 block text-sm font-medium'>
                      Last name
                    </label>
                    <div className='relative'>
                      <User className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-400' />
                      <Input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className='border-amber-200 bg-black pl-9 text-white focus:border-amber-500'
                        placeholder='Last name name'
                        required
                      />
                    </div>
                  </div>
                </div>
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
                      placeholder='Email'
                      required
                    />
                  </div>
                </div>
                <div className='relative'>
                  <label className='mb-2 block text-sm font-medium'>
                    Password
                  </label>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='border-amber-200 bg-black pr-10 text-white focus:border-amber-500'
                    placeholder='••••••••'
                    required
                  />
                  <button
                    type='button'
                    className='absolute right-2 top-9 text-amber-400'
                    tabIndex={-1}
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label='Toggle password visibility'
                  >
                    {showPassword ? (
                      <EyeOff className='h-5 w-5' />
                    ) : (
                      <Eye className='h-5 w-5' />
                    )}
                  </button>
                </div>
                <div className='relative'>
                  <label className='mb-2 block text-sm font-medium'>
                    Confirm password
                  </label>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className='border-amber-200 bg-black pr-10 text-white focus:border-amber-500'
                    placeholder='••••••••'
                    required
                  />
                  <button
                    type='button'
                    className='absolute right-2 top-9 text-amber-400'
                    tabIndex={-1}
                    onClick={() => setShowConfirmPassword((s) => !s)}
                    aria-label='Toggle confirm password visibility'
                  >
                    {showConfirmPassword ? (
                      <EyeOff className='h-5 w-5' />
                    ) : (
                      <Eye className='h-5 w-5' />
                    )}
                  </button>
                </div>

                <Button
                  type='submit'
                  className='flex w-full items-center justify-center gap-2 bg-amber-400 font-semibold text-black hover:bg-amber-300'
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className='h-4 w-4 animate-spin' />
                  ) : (
                    <UserPlus className='h-4 w-4' />
                  )}
                  Create account
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

                <div className='text-center text-sm'>
                  <span>Already have an account? </span>
                  <Link
                    href='/account/login'
                    className='text-amber-400 underline'
                  >
                    Sign in
                  </Link>
                </div>
              </form>
            </div>
          ) : (
            <div className='rounded-xl border border-amber-200 bg-black/40 p-6 shadow-xl'>
              <div className='mb-6 text-center'>
                <h1 className='text-2xl font-bold'>Verify your email</h1>
                <p className='text-amber-400'>
                  Enter the verification code sent to {email}
                </p>
              </div>
              <form onSubmit={onVerify} className='space-y-4'>
                <Input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className='border-amber-200 bg-black text-white focus:border-amber-500'
                  placeholder='6-digit code'
                  required
                />
                <Button
                  type='submit'
                  className='w-full bg-amber-400 font-semibold text-black hover:bg-amber-300'
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className='h-4 w-4 animate-spin' />
                  ) : (
                    'Verify & continue'
                  )}
                </Button>
                <div className='text-center text-sm'>
                  <button
                    type='button'
                    onClick={() => setVerificationNeeded(false)}
                    className='text-amber-400 underline'
                  >
                    Change email
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
