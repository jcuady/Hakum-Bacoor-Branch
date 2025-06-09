import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Service } from '../types'

export function useServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchServices = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('name')

      if (error) throw error
      setServices(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const addService = async (service: Omit<Service, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .insert([service])
        .select()
        .single()

      if (error) throw error
      setServices(prev => [...prev, data])
      return data
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to add service')
    }
  }

  const updateService = async (id: string, updates: Partial<Service>) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setServices(prev => prev.map(s => s.id === id ? data : s))
      return data
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update service')
    }
  }

  const deleteService = async (id: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id)

      if (error) throw error
      setServices(prev => prev.filter(s => s.id !== id))
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete service')
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  return {
    services,
    loading,
    error,
    addService,
    updateService,
    deleteService,
    refetch: fetchServices
  }
}