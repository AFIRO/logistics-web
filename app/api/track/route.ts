import { TrackAndTraceService } from "../../../backend/service/trackandtrace.service";

import { NextResponse } from "next/server";

const service = new TrackAndTraceService();

export async function POST(request: Request) {
  const data = await request.json();
  const res = await service.findById(data.id, data.verification);
  if (res)
    return NextResponse.json(res);

  return NextResponse.json({ status: 404 });
  
}
