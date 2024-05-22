import { cn } from "@/lib/utils";
import { ChevronsRight } from "lucide-react";
import React from "react";

export default function Breadcrumbs({ breadcrumbs, className }) {
  return (
    <div className={cn("w-full flex items-center py-2", className)}>
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={index} className="flex items-center">
          {index > 0 && <ChevronsRight className="w-4" />}
          <a
            href={breadcrumb.url}
            className="ml-2 hover:underline transition-all"
          >
            {breadcrumb.label}
          </a>
        </span>
      ))}
    </div>
  );
}
