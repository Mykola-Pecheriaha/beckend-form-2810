import ConsultationForm from '@/components/ConsultationForm'

export default function ConsultationPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Консультація</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Заповніть форму і ми зв&apos;яжемося з вами для консультації
          </p>
        </div>

        <ConsultationForm />
      </div>
    </div>
  )
}
