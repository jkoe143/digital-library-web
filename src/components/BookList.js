import React from "react";
import Book from "./Book";

const BookList = ({ data, currentPage, getAllBooks }) => {
  return (
    <>
      {data?.content?.length === 0 && (
        <div>No Books. Please add a new book</div>
      )}

      <ul className="book__list">
        {data?.content?.length > 0 &&
          data.content.map((book) => <Book book={book} key={book.id} />)}
      </ul>

      {data?.content?.length > 0 && data?.totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => getAllBooks(currentPage - 1)}
            className={0 === currentPage ? "disabled" : ""}
            disabled={0 === currentPage}
          >
            &laquo;
          </button>

          {data &&
            [...Array(data.totalPages).keys()].map((page, index) => (
              <button
                onClick={() => getAllBooks(page)}
                className={currentPage === page ? "active" : ""}
                key={page}
              >
                {page + 1}
              </button>
            ))}

          <button
            onClick={() => getAllBooks(currentPage + 1)}
            className={data.totalPages === currentPage + 1 ? "disabled" : ""}
            disabled={data.totalPages === currentPage + 1}
          >
            &raquo;
          </button>
        </div>
      )}
    </>
  );
};

export default BookList;
