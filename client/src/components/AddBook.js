import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { getBooksQuery } from '../queries/queries';

const AddBook = (props) => {
  const { loading, error, data } = useQuery(props.getAuthorsQuery);
  const [addNewBook, { _loading, _error }] = useMutation(props.addBookMutation);
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  const displayAuthors = (props) => {
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    if (data.loading) {
      return <option disabled>Loading Authors...</option>;
    } else {
      return data.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (_loading) return 'Loading...';
    if (_error) return `Error! ${error.message}`;
    addNewBook({
      variables: {
        name: name,
        genre: genre,
        authorId: authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
        />
      </div>

      <div className="field">
        <label>Author:</label>
        <select
          value={authorId}
          onChange={(event) => setAuthorId(event.target.value)}
        >
          <option>Select author</option>
          {displayAuthors(props)}
        </select>
      </div>

      <button>+</button>
    </form>
  );
};

export default AddBook;
