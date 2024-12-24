"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Pagination {
  TotoleCount: any;
  PageSisze: number;
}

const PaginationComponent: React.FC<Pagination> = ({
  TotoleCount,
  PageSisze,
}) => {
  const totalPages = Math.ceil(TotoleCount / PageSisze);

  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1");

  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    // Sync the state with the current query parameter from the URL
    setPage(currentPage);
  }, [currentPage]);

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString()); // Keep existing params
    params.set("page", newPage.toString()); // Update page number

    // Use router.push to update the URL without refreshing the page
    router.push(`?${params.toString()}`);
  };

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
    const params = new URLSearchParams(searchParams.toString()); // Keep existing params

    params.set("page", pageNumber.toString()); // Update page number
    router.push(`?${params.toString()}`);
    // Here, you can fetch the new data based on the selected page (e.g., API call)
  };

  return (
    <div
      className="min-w-full flex justify-center  items-center py-10"
      dir="ltr"
    >
      <div className="flex items-center  gap-5">
        <button
          className="min-w-[48px] min-h-[48px]  bg-[#5a529c] flex justify-center items-center rounded-[4px] transition duration-300 ease-in-out hover:bg-primary700 hover:shadow-lg"
          onClick={() => changePage(page - 1)}
          disabled={page <= 1}
        >
          <ArrowLeft width={24} height={24} className="text-white " />
        </button>

        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <div
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              className={` ${currentPage === pageNumber ? "bg-[#312783] text-white" : "bg-grayscale50 text-grayscale900"}  min-w-[48px] min-h-[48px] rounded-[4px] flex justify-center items-center cursor-pointer transition duration-300 ease-in-out hover:bg-primary700 hover:shadow-lg `}
            >
              <span className="flex justify-center">{pageNumber}</span>
            </div>
          );
        })}

        <button
          disabled={totalPages <= currentPage}
          onClick={() => changePage(page + 1)}
          className="min-w-[48px] min-h-[48px]  bg-[#5a529c] flex justify-center items-center rounded-[4px] transition duration-300 ease-in-out hover:bg-primary700 hover:shadow-lg"
        >
          <ArrowRight width={24} height={24} className="text-white " />
        </button>
      </div>
    </div>
  );
};

export default PaginationComponent;
