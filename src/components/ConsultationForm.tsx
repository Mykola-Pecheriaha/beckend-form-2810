'use client'

import { useState, useEffect } from 'react'

export default function ConsultationForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    height: '',
    weight: '',
    complaint: '',
    examinations: [] as string[],
    hasChronicDiseases: false,
    chronicDiseases: '',
    takesMedications: false,
    medications: '',
    painLevel: 0,
    additionalNotes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [bmi, setBmi] = useState<number | null>(null)

  // Вычисление ИМТ
  useEffect(() => {
    if (formData.height && formData.weight) {
      const heightInM = parseInt(formData.height) / 100
      const weightInKg = parseInt(formData.weight)
      if (heightInM > 0 && weightInKg > 0) {
        const calculatedBmi = weightInKg / (heightInM * heightInM)
        setBmi(calculatedBmi)
      } else {
        setBmi(null)
      }
    } else {
      setBmi(null)
    }
  }, [formData.height, formData.weight])

  const getBmiStatus = (bmi: number) => {
    if (bmi < 18.5) return { text: 'Недостатня вага', color: 'text-blue-600' }
    if (bmi < 25) return { text: 'Нормальна вага', color: 'text-green-600' }
    if (bmi < 30) return { text: 'Надлишкова вага', color: 'text-yellow-600' }
    return { text: 'Ожиріння', color: 'text-red-600' }
  }

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      // Валидация обязательных полей на клиенте
      if (!formData.name.trim() || !formData.age.trim() || !formData.complaint.trim()) {
        setMessage('Заповніть всі обов\'язкові поля')
        setIsSubmitting(false)
        return
      }

      const submitData = {
        name: formData.name.trim(),
        age: formData.age.trim(),
        complaint: formData.complaint.trim(),
        gender: formData.gender || undefined,
        phone: formData.phone || undefined,
        email: formData.email || undefined,
        height: formData.height ? parseInt(formData.height) : undefined,
        weight: formData.weight ? parseInt(formData.weight) : undefined,
        bmi: bmi ? Math.round(bmi * 10) / 10 : undefined,
        examinations: formData.examinations.length > 0 ? JSON.stringify(formData.examinations) : undefined,
        chronicDiseases: formData.hasChronicDiseases && formData.chronicDiseases ? formData.chronicDiseases : undefined,
        medications: formData.takesMedications && formData.medications ? formData.medications : undefined,
        painLevel: formData.painLevel > 0 ? parseInt(formData.painLevel.toString()) : undefined,
        additionalNotes: formData.additionalNotes || undefined,
      }

      console.log('Відправляємо дані:', submitData)

      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })

      console.log('Статус відповіді:', response.status)
      
      const result = await response.json()
      console.log('Результат сервера:', result)

      if (response.ok) {
        setMessage('Заявка успішно створена!')
        setFormData({
          name: '',
          age: '',
          gender: '',
          phone: '',
          email: '',
          height: '',
          weight: '',
          complaint: '',
          examinations: [],
          hasChronicDiseases: false,
          chronicDiseases: '',
          takesMedications: false,
          medications: '',
          painLevel: 0,
          additionalNotes: '',
        })
        setBmi(null)
      } else {
        console.error('Server error:', result)
        setMessage(result.error || result.details || 'Сталася помилка')
      }
    } catch (error) {
      setMessage('Помилка підключення до сервера')
      console.error('Network error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement
      setFormData((prev) => ({ ...prev, [name]: target.checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleExaminationChange = (examination: string) => {
    setFormData((prev) => ({
      ...prev,
      examinations: prev.examinations.includes(examination)
        ? prev.examinations.filter((item) => item !== examination)
        : [...prev.examinations, examination],
    }))
  }

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
        Форма консультації
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Інформація про пацієнта */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            👤 Інформація про пацієнта
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ім&apos;я *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="Введіть ваше ім'я"
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Вік *
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="0"
                max="150"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="Введіть ваш вік"
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Стать
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              >
                <option value="">Оберіть стать</option>
                <option value="Чоловік">Чоловік</option>
                <option value="Жінка">Жінка</option>
              </select>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Телефон
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="+380XXXXXXXXX"
              />
            </div>

            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ріст (см)
              </label>
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                min="50"
                max="250"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="Введіть ріст"
              />
            </div>

            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Вага (кг)
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                min="1"
                max="500"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="Введіть вагу"
              />
            </div>
          </div>

          {/* Індекс маси тіла */}
          {bmi && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                Індекс маси тіла (ІМТ)
              </h4>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {bmi.toFixed(1)}
              </div>
              <div className={`text-sm ${getBmiStatus(bmi).color} font-medium`}>
                {getBmiStatus(bmi).text}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Нормальна вага: 18.5-24.9 • Формула: вага/(ріст²)
              </div>
            </div>
          )}
        </div>

        {/* Скарги пацієнта */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            📝 Скарги пацієнта
          </h3>
          
          <div>
            <label htmlFor="complaint" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Опишіть скарги *
            </label>
            <textarea
              id="complaint"
              name="complaint"
              value={formData.complaint}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none"
              placeholder="Опишіть скарги"
            />
          </div>
        </div>

        {/* Обстеження */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            🧪 Які маєте обстеження
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {['Огляд', 'Аналізи', 'ЕКГ', 'Рентген', 'УЗД', 'КТ', 'МРТ'].map((exam) => (
              <label key={exam} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.examinations.includes(exam)}
                  onChange={() => handleExaminationChange(exam)}
                  className="mr-2 text-blue-600 focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{exam}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Медична історія */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            🩺 Медична історія
          </h3>
          
          <div className="space-y-4">
            {/* Хронічні хвороби */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Чи є хронічні хвороби?
              </label>
              <div className="flex space-x-4 mb-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasChronicDiseases"
                    checked={formData.hasChronicDiseases}
                    onChange={() => setFormData(prev => ({ ...prev, hasChronicDiseases: true }))}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Так</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasChronicDiseases"
                    checked={!formData.hasChronicDiseases}
                    onChange={() => setFormData(prev => ({ ...prev, hasChronicDiseases: false, chronicDiseases: '' }))}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Ні</span>
                </label>
              </div>
              {formData.hasChronicDiseases && (
                <textarea
                  name="chronicDiseases"
                  value={formData.chronicDiseases}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none"
                  placeholder="якщо так то відкривається поле і хворий сам вписує"
                />
              )}
            </div>

            {/* Ліки */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Чи приймає ліки постійно?
              </label>
              <div className="flex space-x-4 mb-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="takesMedications"
                    checked={formData.takesMedications}
                    onChange={() => setFormData(prev => ({ ...prev, takesMedications: true }))}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Так</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="takesMedications"
                    checked={!formData.takesMedications}
                    onChange={() => setFormData(prev => ({ ...prev, takesMedications: false, medications: '' }))}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Ні</span>
                </label>
              </div>
              {formData.takesMedications && (
                <textarea
                  name="medications"
                  value={formData.medications}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none"
                  placeholder="якщо так то відкривається поле і хворий сам вписує які ліки приймає"
                />
              )}
            </div>

            {/* Рівень болю */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Рівень болю (1-10)
              </label>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Немає болю (0)</span>
                <input
                  type="range"
                  name="painLevel"
                  min="0"
                  max="10"
                  value={formData.painLevel}
                  onChange={handleChange}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
                />
                <span className="text-sm text-gray-500">Нестерпний біль (10)</span>
              </div>
              <div className="text-center mt-2">
                <span className="text-lg font-semibold text-blue-600">
                  Поточний: {formData.painLevel}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Додаткові коментарі */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            💬 Додаткові коментарі
          </h3>
          
          <div>
            <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Додаткові замітки
            </label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none"
              placeholder="Додаткові замітки"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg"
        >
          {isSubmitting ? 'Надсилання...' : 'Надіслати заявку'}
        </button>
      </form>

      {message && (
        <div
          className={`mt-6 p-4 rounded-md text-center ${
            message.includes('успішно')
              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
              : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  )
}