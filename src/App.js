import React, {  useState } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Header from './Layout/Header';
import NotFound from './Layout/NotFound';
import Home from './Layout/Home';
import StudyDeck from './Layout/StudyDeck';
import CreateDeck from './Layout/CreateDeck';
import ViewDeck from './Layout/ViewDeck';
import EditeDeck from './Layout/EditDeck';
import AddCard from './Layout/AddCard';
import EditeCard from './Layout/EditCard';

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {

  const initialFormState = {
    id: '',
    front: '',
    back: '',
    deckId: '',
  };
  
   const initialFormState2 = {
    name: '',
    description: '',
  };
  
  const [formData, setFormData] = useState(initialFormState2);


   const [deck, setDeck] = useState({
    name: 'loading...',
    description: '',
    cards: [],
  });
  
  
  const [newCardData, setNewCardData] = useState(initialFormState);
  
  const initialCardState = { id: '', front: '', back: '', deckId: '' };
  const [deckE, setDeckE] = useState({
    name: 'loading...',
    description: '',
  });
  
  const [editCard, setEditCard] = useState(initialCardState);
  
  const initialState = { name: '', description: '' };
  const [editDeckFormData, setEditDeckFormData] = useState(initialState);
  
  //StudyDeck State
  const initialState2 = {
    deck: { name: 'loading...', cards: [] },
    isCardFlipped: false,
    currentIndex: 0,
  };

  const [studyDeckState, setStudyDeckState] = useState(initialState2);
  //ViewDeck State
  const [deckV, setDeckV] = useState({ name: 'loading...', cards: [] });
  
  
  return (
    <React.Fragment>
      <Header />
      <div className='container'>
        <Switch>
          <Route exact path='/'>
            <Link to='/decks/new'>
              <button className='btn btn-info'>
                <i className='fas fa-plus'></i> Create Deck
              </button>
            </Link>
            <Home />
          </Route>

          <Route exact path='/decks/new'>
            <CreateDeck formData={formData} setFormData={setFormData} initialFormState2={initialFormState2}/>
          </Route>

          <Route exact path='/decks/:deckId/study'>
            <StudyDeck studyDeckState={studyDeckState} setStudyDeckState={setStudyDeckState} initialState2={initialState2}/>
          </Route>

          <Route exact path='/decks/:deckId/edit'>
            <EditeDeck editDeckFormData={editDeckFormData} setEditDeckFormData={setEditDeckFormData} initialState={initialState}/>
          </Route>

          <Route exact path='/decks/:deckId'>
            <ViewDeck deckV={deckV} setDeckV={setDeckV}/>
          </Route>

          <Route exact path='/decks/:deckId/cards/new'>
            <AddCard deck={deck} newCardData={newCardData} setDeck={setDeck} setNewCardData={setNewCardData}/>
          </Route>

          <Route exact path='/decks/:deckId/cards/:cardId/edit'>
          <EditeCard deckE={deckE} setDeckE={setDeckE} editCard={editCard} setEditCard={setEditCard} initialCardState={initialCardState}/>
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;