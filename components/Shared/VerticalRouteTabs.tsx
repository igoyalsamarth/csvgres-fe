"use client"
import { usePathname } from "next/navigation";

export default function VerticalRouteTabs({ routes }: { routes: { name: string, href: string }[] }) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col border-l border-border h-fit">
      {routes.map((route) => (
        <a href={route.href} key={route.name} className={`p-2 hover:border-l-2 ${pathname === route.href ? "border-l-2 border-primary text-foreground" : "border-l-2 border-transparent text-muted-foreground hover:text-foreground duration-150"}`}>
          <p>{route.name}</p>
        </a>
      ))}
    </div>
  )
}