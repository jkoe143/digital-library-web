import React from "react";
import { Link } from "react-router-dom";

const Book = ({ book }) => {
  return (
    <li>
      <Link to={`/books/${book.id}`} className="book__item">
        <div className="book__header">
          <div className="book__image">
            {book.photoUrl ? (
              <img
                src={book.photoUrl}
                alt={book.title}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className="placeholder-image"
              style={{ display: book.photoUrl ? "none" : "flex" }}
            >
              <span>No Image</span>
            </div>
          </div>
          <div className="book__details">
            <p className="book_title">{book.title}</p>
            <p className="book_author">{book.author}</p>
          </div>
        </div>
        <div className="book__body">
          <p>
            <span className="label">Publication Date:</span>
            {book.publicationDate}
          </p>
          <p className="book__description">
            <span className="label">Description:</span>
            <span>{book.description}</span>
          </p>
          {book.libraryUrl && (
            <p>
              <i className="bi bi-link-45deg"></i>
              <a
                href={book.libraryUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                Project Gutenberg
              </a>
            </p>
          )}
        </div>
      </Link>
    </li>
  );
};

export default Book;
