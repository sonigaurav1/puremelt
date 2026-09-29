import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  children?: React.ReactNode;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  description,
  confirmLabel = 'Yes',
  cancelLabel = 'No',
  onConfirm,
  onCancel,
  children
}) => {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {typeof description === 'string' && (
            <DialogDescription>{description}</DialogDescription>
          )}
          {/* If no string description and no children, render an empty description for a11y */}
          {typeof description !== 'string' && !children && (
            <DialogDescription />
          )}
        </DialogHeader>
        <hr />
        {typeof description !== 'string' && description}
        {children}
        <DialogFooter className='mx-auto'>
          <DialogClose asChild>
            <Button
              variant='outline'
              className='mr-20 rounded-full border border-black bg-transparent px-10 text-black transition-all hover:bg-black hover:text-white'
              onClick={onCancel}
            >
              {cancelLabel}
            </Button>
          </DialogClose>
          <Button
            variant='destructive'
            className='rounded-full bg-amber-600 px-10 text-white transition-all hover:bg-amber-700'
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
