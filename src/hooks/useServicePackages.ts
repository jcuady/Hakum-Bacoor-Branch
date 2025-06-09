import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { ServicePackage } from '../types'

export function useServicePackages() {
  const [servicePackages, setServicePackages] = useState<ServicePackage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchServicePackages = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('service_packages')
        .select('*')
        .order('name')

      if (error) throw error
      setServicePackages(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const addServicePackage = async (servicePackage: Omit<ServicePackage, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('service_packages')
        .insert([servicePackage])
        .select()
        .single()

      if (error) throw error
      setServicePackages(prev => [...prev, data])
      return data
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to add service package')
    }
  }

  const updateServicePackage = async (id: string, updates: Partial<ServicePackage>) => {
    try {
      const { data, error } = await supabase
        .from('service_packages')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setServicePackages(prev => prev.map(s => s.id === id ? data : s))
      return data
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update service package')
    }
  }

  const deleteServicePackage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('service_packages')
        .delete()
        .eq('id', id)

      if (error) throw error
      setServicePackages(prev => prev.filter(s => s.id !== id))
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete service package')
    }
  }

  useEffect(() => {
    fetchServicePackages()
  }, [])

  return {
    servicePackages,
    loading,
    error,
    addServicePackage,
    updateServicePackage,
    deleteServicePackage,
    refetch: fetchServicePackages
  }
}