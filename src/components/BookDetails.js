import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getBook, deleteBook } from "../api/BookService";
import { toastError, toastSuccess } from "../api/ToastService";

const BookDetail = ({ updateBook, updateImage, getAllBooks }) => {
  const inputRef = useRef();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    id: "",
    title: "",
    author: "",
    publicationDate: "",
    description: "",
    photoUrl: "",
    libraryUrl: "",
  });

  const { id } = useParams();

  const fetchBook = async (id) => {
    try {
      const { data } = await getBook(id);
      setBook(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const selectImage = () => {
    inputRef.current.click();
  };

  const updatePhoto = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("id", id);
      await updateImage(formData);
      setBook((prev) => ({
        ...prev,
        photoUrl: `${prev.photoUrl}?updated_at=${new Date().getTime()}`,
      }));

      if (getAllBooks) {
        getAllBooks();
      }

      toastSuccess("Photo updated");
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const onChange = (event) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };

  const onUpdateBook = async (event) => {
    event.preventDefault();
    try {
      await updateBook(book);
      fetchBook(id);
    } catch (error) {
      console.log("Update error:", error);
      toastError(
        "Failed to update book: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const onDeleteBook = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this book? This action cannot be undone."
      )
    ) {
      try {
        await deleteBook(id);
        toastSuccess("Book deleted successfully!");
        if (getAllBooks) {
          getAllBooks();
        }
        navigate("/books");
      } catch (error) {
        console.log("Delete error:", error);
        toastError(
          "Failed to delete book: " +
            (error.response?.data?.message || error.message)
        );
      }
    }
  };

  useEffect(() => {
    fetchBook(id);
  }, [id]);

  return (
    <>
      <Link to={"/books"} className="link">
        <i className="bi bi-arrow-left"></i> Back to list
      </Link>
      <div className="profile">
        <div className="profile__details">
          {book.photoUrl ? (
            <img src={book.photoUrl} alt={book.title} />
          ) : (
            <div
              style={{
                width: "150px",
                height: "200px",
                backgroundColor: "#e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                color: "#666",
                fontSize: "0.9rem",
              }}
            >
              No Image
            </div>
          )}
          <div className="profile__metadata">
            <p className="profile__name">{book.title}</p>
            <p className="profile__muted">JPG, GIF, or PNG. Max size of 10MG</p>
            <button onClick={selectImage} className="btn">
              <i className="bi bi-cloud-upload"></i> Change Photo
            </button>
          </div>
        </div>
        <div className="profile__settings">
          <div>
            <form onSubmit={onUpdateBook} className="form">
              <div className="user-details">
                <input
                  type="hidden"
                  defaultValue={book.id}
                  name="id"
                  required
                />
                <div className="input-box">
                  <span className="details">Title</span>
                  <input
                    type="text"
                    value={book.title}
                    onChange={onChange}
                    name="title"
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Author</span>
                  <input
                    type="text"
                    value={book.author}
                    onChange={onChange}
                    name="author"
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Publication Date</span>
                  <input
                    type="text"
                    value={book.publicationDate}
                    onChange={onChange}
                    name="publicationDate"
                    required
                  />
                </div>
                <div className="input-box description-box">
                  <span className="details">Description</span>
                  <textarea
                    value={book.description}
                    onChange={onChange}
                    name="description"
                    required
                    rows="5"
                  />
                </div>
                <div className="input-box">
                  <span className="details">Library URL (Auto-generated)</span>
                  <input
                    type="url"
                    value={book.libraryUrl}
                    onChange={onChange}
                    name="libraryUrl"
                    placeholder="Auto-generated from title"
                    readOnly
                  />
                </div>
              </div>
              <div className="form_footer">
                <button type="submit" className="btn">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={onDeleteBook}
                >
                  Delete Book
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <form style={{ display: "none" }}>
        <input
          type="file"
          ref={inputRef}
          onChange={(event) => updatePhoto(event.target.files[0])}
          name="file"
          accept="image/*"
        />
      </form>
    </>
  );
};

export default BookDetail;
