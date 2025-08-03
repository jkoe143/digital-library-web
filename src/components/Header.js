import React from "react";

const Header = ({ toggleModal, nbOfBooks }) => {
  return (
    <header className="header">
      <div className="container">
        <h3> Book List ({nbOfBooks})</h3>
        <button onClick={() => toggleModal(true)} className="btn">
          <i className="bi bi-plus-square"></i> Add New Book
        </button>
      </div>
    </header>
  );
};

export default Header;
