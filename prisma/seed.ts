import { PrismaClient, Status } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Заповнення бази даних тестовими даними...')

  // Очищуємо наявні дані
  await prisma.consultation.deleteMany()

  // Додаємо тестові консультації з розширеними даними
  const consultations = [
    {
      name: 'Олександр Петренко',
      age: '35',
      gender: 'Чоловік',
      complaint: "Болить голова після роботи за комп'ютером. Потрібна консультація невролога.",
      phone: '+380501234567',
      email: 'alex.petrenko@example.com',
      height: 180,
      weight: 75,
      bmi: 23.1,
      examinations: JSON.stringify(['Огляд', 'Аналізи']),
      chronicDiseases: null,
      medications: null,
      painLevel: 6,
      additionalNotes: 'Біль посилюється ввечері',
      status: Status.PENDING,
    },
    {
      name: 'Марія Іванова',
      age: '28',
      gender: 'Жінка',
      complaint: 'Проблеми з травленням, часто болить шлунок після їжі.',
      phone: '+380679876543',
      email: 'maria.ivanova@example.com',
      height: 165,
      weight: 58,
      bmi: 21.3,
      examinations: JSON.stringify(['Огляд', 'Аналізи', 'УЗД']),
      chronicDiseases: 'Гастрит',
      medications: 'Омепразол 20мг щоранку',
      painLevel: 4,
      additionalNotes: null,
      status: Status.IN_PROGRESS,
    },
    {
      name: 'Віктор Коваленко',
      age: '45',
      gender: 'Чоловік',
      complaint: 'Біль в спині при довгому сидінні. Потрібна консультація ортопеда.',
      phone: '+380931234567',
      email: null,
      height: 175,
      weight: 85,
      bmi: 27.8,
      examinations: JSON.stringify(['Огляд', 'Рентген']),
      chronicDiseases: null,
      medications: null,
      painLevel: 7,
      additionalNotes: 'Працює в офісі 8+ годин на день',
      status: Status.COMPLETED,
    },
    {
      name: 'Анна Сидорова',
      age: '52',
      gender: 'Жінка',
      complaint: 'Високий тиск, головокружіння. Потрібна консультація кардіолога.',
      phone: null,
      email: 'anna.sidorova@example.com',
      height: 160,
      weight: 70,
      bmi: 27.3,
      examinations: JSON.stringify(['Огляд', 'ЕКГ', 'Аналізи']),
      chronicDiseases: 'Гіпертонія',
      medications: 'Ліситек 10мг 1 раз на день',
      painLevel: 3,
      additionalNotes: 'Тиск підвищується при стресі',
      status: Status.PENDING,
    },
  ]

  for (const consultation of consultations) {
    await prisma.consultation.create({
      data: consultation,
    })
  }

  console.log('✅ Тестові дані успішно додано!')
}

main()
  .catch((e) => {
    console.error('❌ Помилка при заповненні бази даних:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
