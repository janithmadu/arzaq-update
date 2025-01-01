"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowArcRight } from "@phosphor-icons/react";

const Breadcrumb = ({ children}:{children: React.ReactNode;}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Filter out language prefixes
  const segments =
    pathname?.split("/").filter((segment) => segment && !["en", "ar"].includes(segment)) || [];

  // Convert query parameters to breadcrumb segments
  const queryEntries = Array.from(searchParams.entries());
  if (queryEntries.length > 0) {
    queryEntries.forEach(([key, value]) => {
      segments.push(`${key}: ${value}`);
    });
  }

  return (
    <nav aria-label="breadcrumb" className="mb-3 flex justify-between">
      <ol className="flex flex-wrap items-center text-sm text-gray-600">
        <li>
          <Link href="/" className="hover:underline font-bold">
            Home
          </Link>
        </li>
        {segments.map((segment, index) => {
          const isQueryParam = segment.includes(":");
          const path = isQueryParam
            ? undefined // Query params don't form part of the path
            : `/${segments.slice(0, index + 1).join("/")}`;

          return (
            <li
              key={index}
              className={`flex items-center ${
                index === segments.length - 1 ? "w-full sm:w-auto mt-2 sm:mt-0" : ""
              }`}
            >
              <span className="mx-2">
                <ArrowArcRight />
              </span>
              {isQueryParam ? (
                <span className="text-gray-500">{segment}</span>
              ) : (
                <Link
                  href={path || "#"}
                  className={`${
                    index === segments.length - 1 ? "font-semibold" : "hover:underline"
                  }`}
                >
                  {decodeURIComponent(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>

      {
        children
      }
    </nav>
  );
};

export default Breadcrumb;
