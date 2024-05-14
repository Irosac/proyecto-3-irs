import './Buttons.css'

const createPrimaryButton = (
  NameButton = 'NameButton1',
  nodopadre = document.body
) => {
  const button = document.createElement('button')
  button.textContent = NameButton
  button.classList.add('primaryButton')
  nodopadre.appendChild(button)
}

export const createSecondaryButton = (
  imgSrc = '',
  nodopadre = document.body
) => {
  const button2 = document.createElement('button')
  button2.classList.add('secondaryButtons')
  const img = document.createElement('img')
  img.src = imgSrc
  button2.appendChild(img)
  nodopadre.appendChild(button2)
}

export const finalPrimaryButtons = () => {
  createPrimaryButton('Inicio', document.getElementById('primaryButtons'))
  createPrimaryButton('Explorar', document.getElementById('primaryButtons'))
  createPrimaryButton('Crear', document.getElementById('primaryButtons'))
}

export const finalSecondaryButtons = () => {
  createSecondaryButton(
    'Assets/campana.png',
    document.getElementById('secondaryButtons')
  )
  createSecondaryButton(
    'Assets/chat.png',
    document.getElementById('secondaryButtons')
  )
  createSecondaryButton(
    'Assets/user.png',
    document.getElementById('secondaryButtons')
  )
}

import { fetchRandomPhotos, handleSearchResults } from '../SearchBar/SearchBar'

// Función para manejar el evento de clic en el botón "Inicio", debo definirla antes ya que abajo la utilizo en un arrow function.

export const handleInicioClick = async () => {
  const photos = await fetchRandomPhotos(10)
  handleSearchResults(photos)
}

// Función para añadir el evento de clic al botón "Inicio"
export const addInicioClickEvent = () => {
  const inicioButton = document.querySelector('#primaryButtons button')
  inicioButton.addEventListener('click', () => {
    const suggestionsDiv = document.querySelector('.suggestions')
    suggestionsDiv.innerHTML = ''
    handleInicioClick()
  })
}
