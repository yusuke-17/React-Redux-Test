import { BookDescription } from "../types/BookDescription";

type BookSearchItemProps = {
  description: BookDescription;
  onBookAdd: (book: BookDescription) => void;
};

const BookSearchItem = (props: BookSearchItemProps) => {
  const { title, authors, thumbnail } = props.description;

  const handleBookAdd = () => {
    props.onBookAdd(props.description);
  };

  return (
    <div className="book-search-item">
      <h2 title="{title}">{title}</h2>
      <div className="authors">{authors}</div>
      {thumbnail ? <img src={thumbnail} alt="" /> : null}
      <div className="add-book" onClick={handleBookAdd}>
        <span>+</span>
      </div>
    </div>
  );
};

export default BookSearchItem;
