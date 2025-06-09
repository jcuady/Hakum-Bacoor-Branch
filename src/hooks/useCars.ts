import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Car } from '../types'

export function useCars() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCars = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setCars(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const addCar = async (car: Omit<Car, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .insert([car])
        .select()
        .single()

      if (error) throw error
      setCars(prev => [data, ...prev])
      return data
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to add car')
    }
  }

  const updateCar = async (id: string, updates: Partial<Car>) => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setCars(prev => prev.map(c => c.id === id ? data : c))
      return data
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update car')
    }
  }

  const deleteCar = async (id: string) => {
    try {
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', id)

      if (error) throw error
      setCars(prev => prev.filter(c => c.id !== id))
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete car')
    }
  }

  useEffect(() => {
    fetchCars()
  }, [])

  return {
    cars,
    loading,
    error,
    addCar,
    updateCar,
    deleteCar,
    refetch: fetchCars
  }
}