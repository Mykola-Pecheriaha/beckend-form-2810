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
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const openDetailsModal = (consultation: Consultation) => {
    setSelectedConsultation(consultation)
    setIsModalOpen(true)
  }

  const closeDetailsModal = () => {
    setSelectedConsultation(null)
    setIsModalOpen(false)
  }

  const getStatusColor = (status: Status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
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
      default:
        return status
    }
  }

  // Компонент модального окна с деталями
  const DetailsModal = () => {
    if (!isModalOpen || !selectedConsultation) return null

    const parseExaminations = (examinations: string | null) => {
      if (!examinations) return []
      try {
        return JSON.parse(examinations)
      } catch {
        return examinations.split(',').map((item) => item.trim())
      }
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Детальна інформація про пацієнта
              </h2>
              <button
                onClick={closeDetailsModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Основна інформація */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
                  Основна інформація
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Ім&apos;я
                  </label>
                  <p className="text-gray-900 dark:text-white">{selectedConsultation.name}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Вік
                  </label>
                  <p className="text-gray-900 dark:text-white">{selectedConsultation.age} років</p>
                </div>

                {selectedConsultation.gender && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Стать
                    </label>
                    <p className="text-gray-900 dark:text-white">{selectedConsultation.gender}</p>
                  </div>
                )}

                {selectedConsultation.phone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Телефон
                    </label>
                    <p className="text-gray-900 dark:text-white">{selectedConsultation.phone}</p>
                  </div>
                )}

                {selectedConsultation.email && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <p className="text-gray-900 dark:text-white">{selectedConsultation.email}</p>
                  </div>
                )}
              </div>

              {/* Медична інформація */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
                  Медична інформація
                </h3>

                {(selectedConsultation.height ||
                  selectedConsultation.weight ||
                  selectedConsultation.bmi) && (
                  <div className="grid grid-cols-3 gap-4">
                    {selectedConsultation.height && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Ріст
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          {selectedConsultation.height} см
                        </p>
                      </div>
                    )}
                    {selectedConsultation.weight && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Вага
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          {selectedConsultation.weight} кг
                        </p>
                      </div>
                    )}
                    {selectedConsultation.bmi && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          ІМТ
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          {selectedConsultation.bmi.toFixed(1)}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {selectedConsultation.painLevel !== null &&
                  selectedConsultation.painLevel !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Рівень болю (0-10)
                      </label>
                      <div className="flex items-center space-x-2">
                        <p className="text-gray-900 dark:text-white text-lg font-semibold">
                          {selectedConsultation.painLevel}
                        </p>
                        <div className="flex space-x-1">
                          {[...Array(10)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-3 h-3 rounded-full ${
                                i < selectedConsultation.painLevel!
                                  ? 'bg-red-500'
                                  : 'bg-gray-300 dark:bg-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                {selectedConsultation.examinations && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Обстеження
                    </label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {parseExaminations(selectedConsultation.examinations).map(
                        (exam: string, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                          >
                            {exam}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

                {selectedConsultation.chronicDiseases && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Хронічні захворювання
                    </label>
                    <p className="text-gray-900 dark:text-white bg-red-50 dark:bg-red-900/20 p-2 rounded">
                      {selectedConsultation.chronicDiseases}
                    </p>
                  </div>
                )}

                {selectedConsultation.medications && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Ліки що приймає
                    </label>
                    <p className="text-gray-900 dark:text-white bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
                      {selectedConsultation.medications}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Скарга та додаткова інформація */}
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Скарга
                </label>
                <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  {selectedConsultation.complaint}
                </p>
              </div>

              {selectedConsultation.additionalNotes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Додаткові примітки
                  </label>
                  <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    {selectedConsultation.additionalNotes}
                  </p>
                </div>
              )}
            </div>

            {/* Статус та дати */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Статус:
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedConsultation.status)}`}
                    >
                      {getStatusText(selectedConsultation.status)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <p>
                      Створено: {new Date(selectedConsultation.createdAt).toLocaleString('uk-UA')}
                    </p>
                    <p>
                      Оновлено: {new Date(selectedConsultation.updatedAt).toLocaleString('uk-UA')}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <select
                    value={selectedConsultation.status}
                    onChange={(e) => {
                      updateStatus(selectedConsultation.id, e.target.value as Status)
                      setSelectedConsultation({
                        ...selectedConsultation,
                        status: e.target.value as Status,
                      })
                    }}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="PENDING">Очікує</option>
                    <option value="IN_PROGRESS">В процесі</option>
                    <option value="COMPLETED">Завершено</option>
                  </select>

                  <button
                    onClick={closeDetailsModal}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
                  >
                    Закрити
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
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
                    <button
                      onClick={() => openDetailsModal(consultation)}
                      className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Детали
                    </button>

                    <select
                      value={consultation.status}
                      onChange={(e) => updateStatus(consultation.id, e.target.value as Status)}
                      className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="PENDING">Очікує</option>
                      <option value="IN_PROGRESS">В процесі</option>
                      <option value="COMPLETED">Завершено</option>
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

        {/* Модальное окно с деталями */}
        <DetailsModal />
      </div>
    </div>
  )
}
