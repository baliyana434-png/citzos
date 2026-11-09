import { NextResponse } from 'next/server';
import { LiveFeedCrawler } from '@/services/liveFeedCrawler';
import { rateLimiter } from '@/lib/rateLimiter';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';
    const limit = rateLimiter.consume(`live_sync:${ip}`, 10, 60 * 1000, 60 * 1000);
    if (!limit.allowed) {
      return NextResponse.json(
        { success: false, message: 'Too many sync requests. Please try again shortly.' },
        { status: 429 }
      );
    }

    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country') || 'IN';
    const data = await LiveFeedCrawler.fetchRealFeeds(country);
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: 'Sync failed',
      },
      { status: 500 }
    );
  }
}
