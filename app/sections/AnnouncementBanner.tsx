import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const AnnouncementBanner = () => {
  return (
    <aside aria-label="New website announcement" className="w-full">
      <Link
        href="https://eega.dev/"
        className="group flex min-h-12 w-full items-center justify-center gap-2 bg-gradient-to-r from-violet-700 via-purple-600 to-indigo-700 px-4 py-3 text-center text-sm font-medium text-white shadow-sm transition-[filter] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 sm:text-base"
      >
        <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold uppercase tracking-wider ring-1 ring-inset ring-white/30">
          New
        </span>
        <span>My new website is here — visit eega.dev</span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </Link>
    </aside>
  );
};

export default AnnouncementBanner;