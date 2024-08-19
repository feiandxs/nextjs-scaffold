import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') || 'Guest';

  return NextResponse.json({ message: `Hello, ${name}!` });
}

interface PostData {
  name?: string;
  email?: string;
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    // 处理 JSON 数据
    const jsonData: PostData = await request.json();
    return NextResponse.json({
      message: 'JSON data received',
      data: jsonData,
    });
  } if (contentType?.includes('application/x-www-form-urlencoded')) {
    // 处理表单数据
    const formData = await request.formData();
    const name = formData.get('name') as string | null;
    const email = formData.get('email') as string | null;

    return NextResponse.json({
      message: 'Form data received',
      data: { name, email },
    });
  }
  return NextResponse.json({ error: 'Unsupported content type' }, { status: 415 });
}
