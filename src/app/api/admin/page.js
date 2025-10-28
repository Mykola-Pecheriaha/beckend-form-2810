'use client'
import { useEffect, useState } from 'react'

export default function AdminPage() {
  const [consultations, setConsultations] = useState([])

  useEffect(() => {
    fetch('/api/consultations')
      .then((res) => res.json())
      .then((data) => setConsultations(data.consultations || []))
  }, [])

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Заявки на консультацію</h1>
      {consultations.length === 0 ? (
        <p>Поки що заявок немає</p>
      ) : (
        <ul className="space-y-3">
          {consultations.map((c) => (
            <li key={c.id} className="border rounded-lg p-4">
              <p>
                <b>Ім’я:</b> {c.name}
              </p>
              <p>
                <b>Вік:</b> {c.age}
              </p>
              <p>
                <b>Скарга:</b> {c.complaint}
              </p>
              <p>
                <b>Дата:</b> {new Date(c.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
