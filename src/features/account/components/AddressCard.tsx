"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Trash2, Edit2, CheckCircle2 } from "lucide-react"
import type { Address } from "./AddressForm"

interface AddressCardProps {
  address: Address
  onEdit: (address: Address) => void
  onDelete: (id: string) => void
  onSetDefault: (id: string) => void
  isLoading?: boolean
}

export const AddressCard = ({ address, onEdit, onDelete, onSetDefault, isLoading = false }: AddressCardProps) => {
  return (
    <Card className="overflow-hidden border border-border hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground">{address.name}</h3>
              <p className="text-sm text-muted-foreground">{address.phone}</p>
            </div>
          </div>
          {address.isDefault && (
            <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Default
            </Badge>
          )}
        </div>

        <div className="space-y-1 mb-4 text-sm text-muted-foreground">
          <p>{address.street}</p>
          <p>
            {address.city}, {address.state} {address.postalCode}
          </p>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => onEdit(address)} disabled={isLoading} className="flex-1">
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
          {!address.isDefault && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => address.id && onSetDefault(address.id)}
              disabled={isLoading}
            >
              Set as Default
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => address.id && onDelete(address.id)}
            disabled={isLoading}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
