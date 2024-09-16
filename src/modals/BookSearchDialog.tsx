import { BookDescription } from "../types/BookDescription";
import BookSearchItem from "./BookSearchItem";

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setTitle, setAuthor, fetchBooks } from "../slices/searchSlice";

type BookSearchDialogProps = {
  maxResults: number;
  onBookAdd: (book: BookDescription) => void;
};

const BookSearchDialog = (props: BookSearchDialogProps) => {
  const dispatch = useAppDispatch();
  const { title, author, books, isSearching } = useAppSelector(
    (state) => state.search
  );

  const handleSearchClick = () => {
    if (!title && !author) {
      alert("タイトルまたは著者名を入力してください");
      return;
    }
    dispatch(fetchBooks({ title, author, maxResults: props.maxResults }));
  };

  const handleBookAdd = (book: BookDescription) => {
    props.onBookAdd(book);
  };

  const bookItems = books.map((book, idx) => {
    return (
      <BookSearchItem
        key={idx}
        description={book}
        onBookAdd={(book) => handleBookAdd(book)}
      />
    );
  });

  return (
    <div className="dialog">
      <div className="operation">
        <div className="conditions">
          <input
            type="text"
            value={title}
            onChange={(e) => dispatch(setTitle(e.target.value))}
            placeholder="タイトルで検索"
          />
          <input
            type="text"
            value={author}
            onChange={(e) => dispatch(setAuthor(e.target.value))}
            placeholder="著者名で検索"
          />
        </div>
        <div className="button-like" onClick={handleSearchClick}>
          検索
        </div>
      </div>
      <div className="search-results">
        {isSearching ? "検索中..." : bookItems}
      </div>
    </div>
  );
};

export default BookSearchDialog;
