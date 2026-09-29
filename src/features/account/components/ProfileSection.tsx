'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { User } from 'lucide-react';
import { isInputEmpty } from '../helpers';
import { toast } from 'sonner';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
}

interface ProfileSectionProps {
  data: ProfileData;
  onSave: (data: ProfileData) => void;
  isLoading?: boolean;
}

export const ProfileSection = ({
  data,
  onSave,
  isLoading = false
}: ProfileSectionProps) => {
  const [formData, setFormData] = useState(data);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleSave = () => {
    if (isInputEmpty(formData.phone)) {
      toast.error('Phone number cannot be empty.');
      return;
    } // Prevent setting empty phone number
    if (isInputEmpty(formData.name)) {
      toast.error('Name cannot be empty.');
      return;
    }
    if (isInputEmpty(formData.email)) {
      toast.error('Email cannot be empty.');
      return;
    }
    onSave(formData);
    setIsDirty(false);
  };

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0'>
        <div className='flex items-center gap-2'>
          <User className='h-5 w-5 text-primary' />
          <CardTitle>Personal Information</CardTitle>
        </div>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='grid gap-6 sm:grid-cols-2'>
          <div>
            <label className='mb-2 block text-sm font-medium'>Full Name</label>
            <Input
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder='Full name'
            />
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium'>Email</label>
            <Input
              type='email'
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder='Email'
            />
          </div>
        </div>

        <div>
          <label className='mb-2 block text-sm font-medium'>Phone</label>
          <Input
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder='Phone'
          />
        </div>

        <div className='flex justify-end gap-3 border-t border-border pt-4'>
          {isDirty && (
            <Button
              variant='outline'
              onClick={() => {
                setFormData(data);
                setIsDirty(false);
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
          <Button onClick={handleSave} disabled={!isDirty || isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
