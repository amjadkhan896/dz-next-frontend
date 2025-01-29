import { NextResponse } from 'next/server';
export * from '@/lib/http';
export const get = async () => NextResponse.redirect('/products', 308);
