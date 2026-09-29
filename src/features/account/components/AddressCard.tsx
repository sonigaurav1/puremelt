'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Trash2, Edit2, CheckCircle2 } from 'lucide-react';
import React, { useState } from 'react';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import type { Address } from './AddressForm';

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
  isLoading?: boolean;
}

export const AddressCard = ({
  address,
  onEdit,
  onDelete,
  onSetDefault,
  isLoading = false
}: AddressCardProps) => {
  const [showDelete, setShowDelete] = useState(false);
  return (
    <>
      <Card className='overflow-hidden border border-border transition-shadow hover:shadow-md'>
        <div className='p-6'>
          <div className='mb-4 flex items-start justify-between'>
            <div className='flex items-start gap-3'>
              <MapPin className='mt-0.5 h-5 w-5 flex-shrink-0 text-primary' />
              <div>
                <h3 className='font-semibold text-foreground'>
                  {address.name}
                </h3>
                <p className='text-sm text-muted-foreground'>{address.phone}</p>
              </div>
            </div>
            {address.isDefault && (
              <Badge className='flex items-center gap-1 bg-primary text-primary-foreground'>
                <CheckCircle2 className='h-3 w-3' />
                Default
              </Badge>
            )}
          </div>

          <div className='mb-4 space-y-1 text-sm text-muted-foreground'>
            <p>{address.street}</p>
            <p>
              {address.city}, {address.state} {address.postalCode}
            </p>
          </div>

          <div className='flex gap-2'>
            <Button
              size='sm'
              variant='outline'
              onClick={() => onEdit(address)}
              disabled={isLoading}
              className='flex-1'
            >
              <Edit2 className='mr-2 h-4 w-4' />
              Edit
            </Button>
            {!address.isDefault && (
              <Button
                size='sm'
                variant='ghost'
                onClick={() => address.id && onSetDefault(address.id)}
                disabled={isLoading}
                className='hover:text-primary-color hover:underline'
              >
                Set as Default
              </Button>
            )}
            <Button
              size='sm'
              variant='ghost'
              onClick={() => setShowDelete(true)}
              disabled={isLoading}
              className='text-destructive hover:text-destructive'
            >
              <Trash2 className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </Card>
      <ConfirmDialog
        open={showDelete}
        title='Confirm Deletion'
        confirmLabel='Yes'
        cancelLabel='No'
        onConfirm={() => {
          setShowDelete(false);
          if (address.id) onDelete(address.id);
        }}
        onCancel={() => setShowDelete(false)}
      >
        <div className='space-y-1 text-left'>
          <div className='font-semibold'>{address.name}</div>
          <div>{address.street}</div>
          <div>
            {address.city}, {address.state} {address.postalCode}
          </div>
          <div>Nepal</div>
          <div>Phone number: {address.phone}</div>
          <div className='mt-3 text-xs text-muted-foreground'>
            Please note: Deleting this address will not delete any pending
            orders being shipped to this address. To ensure uninterrupted
            fulfillment of future orders, please update any wishlists, subscribe
            and save settings and periodical subscriptions using this address.
          </div>
        </div>
      </ConfirmDialog>
    </>
  );
};
