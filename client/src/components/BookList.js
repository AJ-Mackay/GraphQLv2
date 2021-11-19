import React, { useState } from 'react';
import { useQuery } from 'react-apollo';

import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

const DisplayBooks = ({ loading, error, data, selectedBook }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;
  return data.books.map((book) => {
    return (
      <li key={book.id} onClick={() => selectedBook(book.id)}>
        {book.name}
      </li>
    );
  });
};

const BookList = (props) => {
  const [selected, setSelected] = useState(null);
  const { loading, error, data } = useQuery(getBooksQuery);
  const selectedBook = (id) => setSelected(id);

  return (
    <div>
      <ul id="book-list">
        <DisplayBooks
          loading={loading}
          error={error}
          data={data}
          selectedBook={selectedBook}
        />
      </ul>
      <BookDetails bookId={selected} />
    </div>
  );
};

export default BookList;
