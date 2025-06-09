import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { CrewMember } from '../types'

export function useCrewMembers() {
  const [crewMembers, setCrewMembers] = useState<CrewMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCrewMembers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('crew_members')
        .select('*')
        .order('name')

      if (error) throw error
      setCrewMembers(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const addCrewMember = async (crewMember: Omit<CrewMember, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('crew_members')
        .insert([crewMember])
        .select()
        .single()

      if (error) throw error
      setCrewMembers(prev => [...prev, data])
      return data
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to add crew member')
    }
  }

  const updateCrewMember = async (id: string, updates: Partial<CrewMember>) => {
    try {
      const { data, error } = await supabase
        .from('crew_members')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setCrewMembers(prev => prev.map(c => c.id === id ? data : c))
      return data
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update crew member')
    }
  }

  const deleteCrewMember = async (id: string) => {
    try {
      const { error } = await supabase
        .from('crew_members')
        .delete()
        .eq('id', id)

      if (error) throw error
      setCrewMembers(prev => prev.filter(c => c.id !== id))
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete crew member')
    }
  }

  useEffect(() => {
    fetchCrewMembers()
  }, [])

  return {
    crewMembers,
    loading,
    error,
    addCrewMember,
    updateCrewMember,
    deleteCrewMember,
    refetch: fetchCrewMembers
  }
}