"use client";

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface LatestUpdatesPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function LatestUpdatesPagination({ currentPage, totalPages }: LatestUpdatesPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });

    // Scroll directly to the posts section.
    // No jump to the top.
    setTimeout(() => {
      const section = document.getElementById("latest-updates-posts");

      if (section) {
        const offset = 20;

        const top = section.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top,
          behavior: "smooth",
        });
      }
    }, 50);
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-12">
      <Pagination>
        <PaginationContent>
          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              className={currentPage <= 1 ? "pointer-events-none opacity-40" : ""}
              onClick={(e) => {
                e.preventDefault();

                if (currentPage > 1) {
                  goToPage(currentPage - 1);
                }
              }}
            />
          </PaginationItem>

          {/* Pages */}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href="#"
                isActive={pageNumber === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(pageNumber);
                }}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              href="#"
              className={currentPage >= totalPages ? "pointer-events-none opacity-40" : ""}
              onClick={(e) => {
                e.preventDefault();

                if (currentPage < totalPages) {
                  goToPage(currentPage + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
