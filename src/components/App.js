import { useEffect, useState } from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup'
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getUserInfo()
      .then((user) => {
        setCurrentUser(user);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  const [cardsArray, setCardsArray] = useState([]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    isLiked
      ? api.deleteLike(card._id)
        .then(newCard => {
          setCardsArray(cardsArray => cardsArray.map(c => c._id === card._id ? newCard : c))
        })
        .catch(error => {
          console.log(error);
        })
      : api.setLike(card._id)
        .then(newCard => {
          setCardsArray(cardsArray => cardsArray.map(c => c._id === card._id ? newCard : c))
        })
        .catch(error => {
          console.log(error);
        })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCardsArray(cardsArray => cardsArray.filter(c => {
          if (c._id !== card._id)
            return c;
        }))
      })
      .catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    api.getInitialCards()
      .then((cards) => {
        setCardsArray(cards);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser({ name, about }) {
    api.patchUserInfo({ name, about })
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(error => {
        console.log(error);
      })
  }

  function handleUpdateAvatar(avatarLink) {
    api.patchUserAvatar(avatarLink)
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(error => {
        console.log(error);
      })
  }

  function handleAddPlace({ name, link }) {
    api.addNewCard({ name, link })
      .then((newCard) => {
        setCardsArray([newCard, ...cardsArray]);
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (

    <div className="container">
      <Header />
      <CurrentUserContext.Provider value={currentUser || ''}>
        <Main onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cardsArray}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
        />

        {isEditAvatarPopupOpen &&
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} />
        }

        {isEditProfilePopupOpen &&
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
        }
      </CurrentUserContext.Provider>
      {isAddPlacePopupOpen &&
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />}

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups} />



      <Footer />

    </div>

  );
}

export default App;
