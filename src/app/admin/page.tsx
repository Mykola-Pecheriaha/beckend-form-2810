'use client'
import { useEffect, useState } from 'react'
import { Status } from '@prisma/client'

interface Consultation {
  id: number
  name: string
  age: string
  gender?: string | null
  complaint: string
  phone?: string | null
  email?: string | null
  height?: number | null
  weight?: number | null
  bmi?: number | null
  examinations?: string | null
  chronicDiseases?: string | null
  medications?: string | null
  painLevel?: number | null
  additionalNotes?: string | null
  status: Status
  createdAt: string
  updatedAt: string
}

export default function AdminPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchConsultations()
  }, [])

  const fetchConsultations = async () => {
    try {
      const response = await fetch('/api/consultations')
      const data = await response.json()
      setConsultations(data.consultations || data || [])
    } catch (error) {
      console.error('Error fetching consultations:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: number, status: Status) => {
    try {
      const response = await fetch(`/api/consultations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        fetchConsultations() // Перезагружаем данные
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const deleteConsultation = async (id: number) => {
    if (!confirm('Ви впевнені, що хочете видалити цю консультацію?')) {
      return
    }

    try {
      const response = await fetch(`/api/consultations/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchConsultations() // Перезагружаем данные
      }
    } catch (error) {
      console.error('Error deleting consultation:', error)
    }
  }

  const getStatusColor = (status: Status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const getStatusText = (status: Status) => {
    switch (status) {
      case 'PENDING':
        return 'Очікує'
      case 'IN_PROGRESS':
        return 'В процесі'
      case 'COMPLETED':
        return 'Завершено'
      case 'CANCELLED':
        return 'Скасовано'
      default:
        return status
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Завантаження...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Панель адміністратора
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Управління заявками на консультації
          </p>
        </div>

        {consultations.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Поки що заявок немає
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Коли хтось надішле заявку, вона з&apos;явиться тут
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {consultations.map((consultation) => (
              <div
                key={consultation.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {consultation.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Вік: {consultation.age} років
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        consultation.status
                      )}`}
                    >
                      {getStatusText(consultation.status)}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Скарга:</h4>
                  <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-3 rounded">
                    {consultation.complaint}
                  </p>
                </div>

                {(consultation.phone || consultation.email) && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Контактна інформація:
                    </h4>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      {consultation.phone && <p>📞 {consultation.phone}</p>}
                      {consultation.email && <p>📧 {consultation.email}</p>}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Створено: {new Date(consultation.createdAt).toLocaleString('uk-UA')}
                  </div>

                  <div className="flex space-x-2">
                    <select
                      value={consultation.status}
                      onChange={(e) => updateStatus(consultation.id, e.target.value as Status)}
                      className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="PENDING">Очікує</option>
                      <option value="IN_PROGRESS">В процесі</option>
                      <option value="COMPLETED">Завершено</option>
                      <option value="CANCELLED">Скасовано</option>
                    </select>

                    <button
                      onClick={() => deleteConsultation(consultation.id)}
                      className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Видалити
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
