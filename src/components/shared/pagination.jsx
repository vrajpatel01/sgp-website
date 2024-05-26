import useWindowSize from "@/hooks/useWindowsSize"
import ReactPaginate from "react-paginate"

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

export default function Pagination({ totalPages, setCurrentPage, currentPage }) {
    const windowSize = useWindowSize()
    return (
        <ReactPaginate
            breakLabel={<span>...</span>}
            onPageChange={(e) => setCurrentPage(e)}
            pageRangeDisplayed={windowSize.width < 1000 ? 1 : 5}
            marginPagesDisplayed={windowSize.width < 1000 ? 1 : 2}
            pageCount={totalPages}
            forcePage={currentPage - 1}
            nextLabel={<span className="flex justify-center items-center gap-3 select-none"><span className="hidden sm:block">NEXT</span> <IoIosArrowForward className="text-xl" /></span>}
            previousLabel={<span className="flex justify-center items-center gap-3 select-none"><IoIosArrowBack className="text-xl" /> <span className="hidden sm:block">PREVIOUS</span></span>}
            className="flex justify-end items-center"
            pageClassName="bg-white p-2 w-10 h-10 shadow-sm text-center border-[.5px] border-border select-none"
            previousClassName="bg-white h-10 w-10 sm:w-auto flex justify-center items-center p-2 sm:px-4 border-border border-[.5px] shadow-sm mr-4 text-center rounded-sm hover:bg-secondary-background transition-colors duration-300"
            nextClassName="bg-white h-10 w-10 sm:w-auto flex justify-center items-center p-2 sm:px-4 border-border border-[.5px] shadow-sm ml-4 text-center rounded-sm hover:bg-secondary-background transition-colors duration-300"
            activeClassName="!bg-primary text-white select-none" />
    )
}