import "./App.css";
import BookRow from "./organisms/BookRow";
import { BookDescription } from "./types/BookDescription";
import { modalStyles } from "./styles/modalStyle";

import { RootState } from "./store/store";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { addBook, updateBookMemo, deleteBook } from "./slices/booksSlice";
import { open, close } from "./slices/modalSlice";

import Modal from "react-modal";
import BookSearchDialog from "./modals/BookSearchDialog";

Modal.setAppElement("#root");

const App = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state: RootState) => state.books.books);
  const isOpen = useAppSelector((state: RootState) => state.modal.isOpen);

  const handleAddClick = (book: BookDescription) => {
    dispatch(addBook(book));
    dispatch(close());
  };

  const handleBookMemoChange = (id: number, memo: string) => {
    dispatch(updateBookMemo({ id, memo }));
  };

  const handleBookDelete = (id: number) => {
    dispatch(deleteBook(id));
  };

  const bookRows = books.map((book) => {
    return (
      <BookRow
        key={book.id}
        book={book}
        onMemoChange={(id, memo) => {
          handleBookMemoChange(id, memo);
        }}
        onDelete={(id) => {
          handleBookDelete(id);
        }}
      />
    );
  });

  return (
    <div className="App">
      <section className="nav">
        <h1>読みたい本リスト</h1>
        <div className="button-like" onClick={() => dispatch(open())}>
          本を追加
        </div>
      </section>
      <section className="main">{bookRows}</section>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => dispatch(close())}
        style={modalStyles}
      >
        <BookSearchDialog
          maxResults={20}
          onBookAdd={(b) => {
            handleAddClick(b);
          }}
        />
      </Modal>
    </div>
  );
};

export default App;
