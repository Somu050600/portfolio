import { ImageResponse } from "next/og";
import Navabr from "./sections/Navabr";
import Hero from "./sections/Hero";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "About Somu's Portfolio";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <>
        <Navabr />
        <Hero />
      </>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
