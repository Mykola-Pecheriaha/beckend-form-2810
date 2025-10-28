import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Status } from '@prisma/client'

// POST — створити нову заявку
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      name, 
      age, 
      gender,
      complaint, 
      phone, 
      email, 
      height,
      weight,
      bmi,
      examinations,
      chronicDiseases,
      medications,
      painLevel,
      additionalNotes
    } = body

    if (!name || !age || !complaint) {
      return NextResponse.json({ error: "Обов'язкові поля: name, age, complaint" }, { status: 400 })
    }

    const ageNum = parseInt(age)
    if (isNaN(ageNum) || ageNum < 0 || ageNum > 150) {
      return NextResponse.json({ error: 'Некоректний вік' }, { status: 400 })
    }

    console.log('📝 Отримані дані:', { 
      name, age, gender, complaint, phone, email, 
      height, weight, bmi, examinations, chronicDiseases, 
      medications, painLevel, additionalNotes 
    })

    // Збереження у базу з новими полями
    const consultation = await prisma.consultation.create({
      data: { 
        name, 
        age, 
        gender: gender ?? null,
        complaint, 
        phone: phone ?? null,
        email: email ?? null,
        height: height ?? null,
        weight: weight ?? null,
        bmi: bmi ?? null,
        examinations: examinations ?? null,
        chronicDiseases: chronicDiseases ?? null,
        medications: medications ?? null,
        painLevel: painLevel ? parseInt(painLevel.toString()) : null,
        additionalNotes: additionalNotes ?? null,
        status: Status.PENDING,
      },
    })
    
    console.log('✅ Консультація створена:', consultation)

    return NextResponse.json({
      success: true,
      message: 'Заявка успішно створена',
      data: consultation,
    })
  } catch (error) {
    console.error('❌ Помилка при створенні консультації:', error)
    
    // Более детальная обработка ошибок Prisma
    if (error instanceof Error) {
      console.error('❌ Повідомлення помилки:', error.message)
      console.error('❌ Стек помилки:', error.stack)
      
      // Специальная обработка для Prisma ошибок
      if (error.message.includes('Prisma')) {
        return NextResponse.json({ 
          error: 'Помилка бази даних', 
          details: process.env.NODE_ENV === 'development' ? error.message : 'Перевірте правильність введених даних' 
        }, { status: 500 })
      }
      
      return NextResponse.json({ 
        error: 'Внутрішня помилка сервера', 
        details: process.env.NODE_ENV === 'development' ? error.message : 'Спробуйте пізніше' 
      }, { status: 500 })
    }
    
    return NextResponse.json({ 
      error: 'Невідома помилка',
      details: 'Неочікувана помилка сервера'
    }, { status: 500 })
  }
}

// GET — отримати всі консультації (адмінка)
export async function GET() {
  try {
    const consultations = await prisma.consultation.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ consultations })
  } catch (error) {
    console.error('❌ Помилка при отриманні консультацій:', error)
    return NextResponse.json({ error: 'Внутрішня помилка сервера' }, { status: 500 })
  }
}
