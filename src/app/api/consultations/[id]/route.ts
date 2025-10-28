import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Status } from '@prisma/client'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/consultations/[id] - получить консультацию по ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const consultationId = parseInt(id)

    if (isNaN(consultationId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    const consultation = await prisma.consultation.findUnique({
      where: { id: consultationId },
    })

    if (!consultation) {
      return NextResponse.json({ error: 'Consultation not found' }, { status: 404 })
    }

    return NextResponse.json(consultation)
  } catch (error) {
    console.error('Error fetching consultation:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH /api/consultations/[id] - обновить статус консультации
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const consultationId = parseInt(id)

    if (isNaN(consultationId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    const body = await request.json()
    const { status } = body

    // Валидация статуса
    if (!Object.values(Status).includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const consultation = await prisma.consultation.update({
      where: { id: consultationId },
      data: { status },
    })

    return NextResponse.json({
      success: true,
      message: 'Статус консультації оновлено',
      data: consultation,
    })
  } catch (error) {
    console.error('Error updating consultation:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/consultations/[id] - удалить консультацию
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const consultationId = parseInt(id)

    if (isNaN(consultationId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    await prisma.consultation.delete({
      where: { id: consultationId },
    })

    return NextResponse.json({
      success: true,
      message: 'Консультацію видалено',
    })
  } catch (error) {
    console.error('Error deleting consultation:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
