import React, { useEffect, useRef } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { readDeck, readCard, updateCard } from '../utils/api';
import CardForm from './CardForm';

function EditCard({deckE, setDeckE, editCard, setEditCard, initialCardState}) {
  const mountedRef = useRef(false);
  const { deckId, cardId } = useParams();
  const history = useHistory();



  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);


  useEffect(() => {
    async function getCardDeck() {
      const abortController = new AbortController();
      const cardResponse = await readCard(cardId, abortController.signal);
      const deckResponse = await readDeck(deckId, abortController.signal);
      setEditCard(cardResponse);
      setDeckE(deckResponse);
    }
    getCardDeck();
  }, [deckId, cardId, setDeckE, setEditCard]);

  const changeHandler = ({ target }) => {
    setEditCard((currentState) => ({
      ...currentState,
      [target.name]: target.value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await updateCard(editCard);
    setEditCard(initialCardState);
    history.push(`/decks/${deckId}`);
  };

  return (
    <React.Fragment>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/'>
              <i className='fas fa-home'></i> Home
            </Link>
          </li>
          <li className='breadcrumb-item'>
            <Link to={`/decks/${deckId}`}>{deckE.name}</Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h1 className='text-center'>Edit Card</h1>
      <CardForm
        changeHandler={changeHandler}
        submitHandler={submitHandler}
        newCardData={editCard}
        deckId={deckId}
      />
    </React.Fragment>
  );
}

export default EditCard;