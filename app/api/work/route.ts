import { type NextRequest, NextResponse } from "next/server";
import work from "./work.json";
import { WorkExperienceModel } from "@/app/sections/Work";

export async function GET(request: NextRequest) {
  const json: WorkExperienceModel[] = work;

  return NextResponse.json(json);
}
