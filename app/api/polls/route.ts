import { NextResponse } from 'next/server';
import { getLatestPoll, voteOnPollOption } from '@/lib/hygraph';

export async function GET() {
  try {
    const poll = await getLatestPoll();
    return NextResponse.json({ poll });
  } catch (err) {
    console.error('Failed GET /api/polls:', err);
    return NextResponse.json({ error: 'Failed to fetch poll' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { optionId } = await request.json();
    if (!optionId) {
      return NextResponse.json({ error: 'optionId is required' }, { status: 400 });
    }
    await voteOnPollOption(optionId);
    const poll = await getLatestPoll();
    return NextResponse.json({ poll });
  } catch (err) {
    console.error('Failed POST /api/polls:', err);
    return NextResponse.json({ error: 'Failed to submit vote' }, { status: 500 });
  }
}
