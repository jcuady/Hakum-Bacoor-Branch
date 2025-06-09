import React, { useState } from 'react'
import { Plus, Edit, Trash2, Package } from 'lucide-react'
import { useServicePackages } from '../hooks/useServicePackages'
import { useServices } from '../hooks/useServices'
import type { ServicePackage } from '../types'

export function PackagesPage() {
  const { servicePackages, loading, error, addServicePackage, updateServicePackage, deleteServicePackage } = useServicePackages()
  const { services } = useServices()
  const [showForm, setShowForm] = useState(false)
  const [editingPackage, setEditingPackage] = useState<ServicePackage | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    service_ids: [] as string[],
    pricing: {},
    is_active: true
  })

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      service_ids: [],
      pricing: {},
      is_active: true
    })
    setEditingPackage(null)
    setShowForm(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingPackage) {
        await updateServicePackage(editingPackage.id, formData)
      } else {
        await addServicePackage(formData)
      }
      resetForm()
    } catch (err) {
      console.error('Error saving service package:', err)
    }
  }

  const handleEdit = (pkg: ServicePackage) => {
    setFormData({
      name: pkg.name,
      description: pkg.description || '',
      service_ids: pkg.service_ids || [],
      pricing: pkg.pricing || {},
      is_active: pkg.is_active ?? true
    })
    setEditingPackage(pkg)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service package?')) {
      try {
        await deleteServicePackage(id)
      } catch (err) {
        console.error('Error deleting service package:', err)
      }
    }
  }

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      service_ids: prev.service_ids.includes(serviceId)
        ? prev.service_ids.filter(id => id !== serviceId)
        : [...prev.service_ids, serviceId]
    }))
  }

  if (loading) return <div className="flex justify-center py-8">Loading...</div>
  if (error) return <div className="text-red-600 py-8">Error: {error}</div>

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Service Packages</h1>
          <p className="mt-2 text-sm text-gray-700">
            Create and manage service packages with bundled services.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Package
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {editingPackage ? 'Edit Service Package' : 'Add New Service Package'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Package Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Included Services</label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`service-${service.id}`}
                        checked={formData.service_ids.includes(service.id)}
                        onChange={() => handleServiceToggle(service.id)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`service-${service.id}`} className="ml-2 block text-sm text-gray-900">
                        {service.name} (${service.price})
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                  Active
                </label>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700"
                >
                  {editingPackage ? 'Update' : 'Add'} Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {servicePackages.map((pkg) => (
          <div key={pkg.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Package className="w-8 h-8 text-gray-400 mr-3" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{pkg.name}</h3>
                    <p className="text-sm text-gray-500">
                      {pkg.service_ids?.length || 0} services included
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(pkg)}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(pkg.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {pkg.description && (
                <p className="mt-2 text-sm text-gray-600">{pkg.description}</p>
              )}
              <div className="mt-4">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  pkg.is_active 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {pkg.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              {pkg.service_ids && pkg.service_ids.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-medium text-gray-700 mb-2">Included Services:</p>
                  <div className="space-y-1">
                    {pkg.service_ids.map((serviceId) => {
                      const service = services.find(s => s.id === serviceId)
                      return service ? (
                        <div key={serviceId} className="text-xs text-gray-600">
                          • {service.name}
                        </div>
                      ) : null
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}