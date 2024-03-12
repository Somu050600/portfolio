import { type NextRequest, NextResponse } from "next/server";
import projects from "./projects.json";

export async function GET(request: NextRequest) {
  return NextResponse.json(projects);
}
