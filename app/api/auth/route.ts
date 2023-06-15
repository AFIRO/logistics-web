import { authOptions } from './[...nextauth]/route'

import {getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'

export async function GET(request:Request){
    const session = await getServerSession(authOptions)
    console.log('GET API', session)
    return NextResponse.json({authenticated: !!session})
}