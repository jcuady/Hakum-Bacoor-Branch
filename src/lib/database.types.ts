export interface Database {
  public: {
    Tables: {
      services: {
        Row: {
          id: string
          name: string
          price: number
          description: string | null
          created_at: string | null
          updated_at: string | null
          pricing: {
            small: number
            medium: number
            large: number
            extra_large: number
          } | null
        }
        Insert: {
          id?: string
          name: string
          price?: number
          description?: string | null
          created_at?: string | null
          updated_at?: string | null
          pricing?: {
            small: number
            medium: number
            large: number
            extra_large: number
          } | null
        }
        Update: {
          id?: string
          name?: string
          price?: number
          description?: string | null
          created_at?: string | null
          updated_at?: string | null
          pricing?: {
            small: number
            medium: number
            large: number
            extra_large: number
          } | null
        }
      }
      cars: {
        Row: {
          id: string
          plate: string
          model: string
          size: string
          service: string
          status: string
          crew: string[] | null
          created_at: string | null
          updated_at: string | null
          phone: string
          total_cost: number | null
          services: string[] | null
        }
        Insert: {
          id?: string
          plate: string
          model: string
          size: string
          service: string
          status: string
          crew?: string[] | null
          created_at?: string | null
          updated_at?: string | null
          phone: string
          total_cost?: number | null
          services?: string[] | null
        }
        Update: {
          id?: string
          plate?: string
          model?: string
          size?: string
          service?: string
          status?: string
          crew?: string[] | null
          created_at?: string | null
          updated_at?: string | null
          phone?: string
          total_cost?: number | null
          services?: string[] | null
        }
      }
      crew_members: {
        Row: {
          id: string
          name: string
          phone: string | null
          role: string | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          phone?: string | null
          role?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          phone?: string | null
          role?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      service_packages: {
        Row: {
          id: string
          name: string
          description: string | null
          service_ids: string[] | null
          pricing: Record<string, any> | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          service_ids?: string[] | null
          pricing?: Record<string, any> | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          service_ids?: string[] | null
          pricing?: Record<string, any> | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
  }
}