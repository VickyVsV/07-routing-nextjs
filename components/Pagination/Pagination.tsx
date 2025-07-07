import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  currentPage: number; // индекс страницы с 0 или 1 (в зависимости от реализации)
  onPageChange: (selected: number) => void; // функция принимает число
}

export default function Pagination({ pageCount, currentPage, onPageChange }: PaginationProps) {
  if (pageCount <= 1) return null;//Она не рендерит компонент пагинации, если общее количество страниц (pageCount) равно 1 или 0.

  return (
    <ReactPaginate
      previousLabel={"← Previous"}
      nextLabel={"Next →"}
      breakLabel={"..."}
      pageCount={pageCount}
      forcePage={currentPage}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={(event) => onPageChange(event.selected)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      disabledClassName={css.disabled}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      previousClassName={css.pageItem}
      previousLinkClassName={css.pageLink}
      nextClassName={css.pageItem}
      nextLinkClassName={css.pageLink}
      breakClassName={css.pageItem}
      breakLinkClassName={css.pageLink}
    />
  );
}