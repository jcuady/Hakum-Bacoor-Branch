export type CarSize = 'small' | 'medium' | 'large' | 'extra_large'
export type CarStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled'

export interface Service {
  id: string
  name: string
  price: number
  description?: string
  pricing: {
    small: number
    medium: number
    large: number
    extra_large: number
  }
  created_at?: string
  updated_at?: string
}

export interface Car {
  id: string
  plate: string
  model: string
  size: CarSize
  service: string
  status: CarStatus
  crew?: string[]
  phone: string
  total_cost?: number
  services?: string[]
  created_at?: string
  updated_at?: string
}

export interface CrewMember {
  id: string
  name: string
  phone?: string
  role?: string
  is_active?: boolean
  created_at?: string
  updated_at?: string
}

export interface ServicePackage {
  id: string
  name: string
  description?: string
  service_ids?: string[]
  pricing?: Record<string, any>
  is_active?: boolean
  created_at?: string
  updated_at?: string
}