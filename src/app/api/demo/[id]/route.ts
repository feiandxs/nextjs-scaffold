import { NextRequest, NextResponse } from 'next/server';

interface UpdateData {
  name?: string;
  email?: string;
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const data: UpdateData = await request.json();

  return NextResponse.json({
    message: `Updated item ${id}`,
    data,
  });
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const data: UpdateData = await request.json();

  return NextResponse.json({
    message: `Partially updated item ${id}`,
    data,
  });
}
