"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { AddressFormModal, type Address } from "./AddressForm"
import { AddressCard } from "./AddressCard"

interface AddressSectionProps {
  addresses: Address[]
  onAddAddress: (address: Address) => void
  onEditAddress: (address: Address) => void
  onDeleteAddress: (id: string) => void
  onSetDefault: (id: string) => void
  isLoading?: boolean
}

export const AddressSection = ({
  addresses,
  onAddAddress,
  onEditAddress,
  onDeleteAddress,
  onSetDefault,
  isLoading = false,
}: AddressSectionProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | undefined>()

  const handleEdit = (address: Address) => {
    setEditingAddress(address)
    setModalOpen(true)
  }

  const handleModalSubmit = (formData: Address) => {
    if (editingAddress) {
      onEditAddress({ ...formData, id: editingAddress.id })
    } else {
      onAddAddress(formData)
    }
    setModalOpen(false)
    setEditingAddress(undefined)
  }

  const handleModalClose = (open: boolean) => {
    setModalOpen(open)
    if (!open) {
      setEditingAddress(undefined)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Delivery Addresses</CardTitle>
        <Button
          onClick={() => {
            setEditingAddress(undefined)
            setModalOpen(true)
          }}
          size="sm"
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Address
        </Button>
      </CardHeader>
      <CardContent>
        {addresses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No addresses added yet</p>
            <Button onClick={() => setModalOpen(true)} variant="outline">
              Add Your First Address
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                onEdit={handleEdit}
                onDelete={onDeleteAddress}
                onSetDefault={onSetDefault}
                isLoading={isLoading}
              />
            ))}
          </div>
        )}
      </CardContent>

      <AddressFormModal
        open={modalOpen}
        onOpenChange={handleModalClose}
        onSubmit={handleModalSubmit}
        initialData={editingAddress}
        isLoading={isLoading}
      />
    </Card>
  )
}
