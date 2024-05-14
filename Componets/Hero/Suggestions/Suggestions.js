import './Suggestions.css'
import {
  fetchPhotos,
  handleSearchResults
} from '../../Header/SearchBar/SearchBar'

// Lista de recomendaciones de búsqueda aleatorias
const searchOptions = [
  'Naturaleza',
  'Ciudad',
  'Comida',
  'Viajes',
  'Arte',
  'Arquitectura',
  'Animales',
  'Moda',
  'Tecnología',
  'Deportes',
  'Música',
  'Libros',
  'Películas',
  'Historia',
  'Ciencia'
]

// Función para elegir 3 opciones aleatoriamente.
export const selectRandomOptions = () => {
  const randomOptions = []
  const optionsCopy = [...searchOptions]

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * optionsCopy.length)
    const randomOption = optionsCopy.splice(randomIndex, 1)[0]
    randomOptions.push(randomOption)
  }
  return randomOptions
}

// Función para crear Buttons de opciones aleatorias
export const showRandomOptions = (options) => {
  const suggestions = document.getElementById('suggestions')
  const optionContainer = document.createElement('div')
  optionContainer.classList.add('random-options')

  const closeButton = document.createElement('button')
  closeButton.classList.add('closeButton')
  closeButton.textContent = '✖️'
  closeButton.addEventListener('click', () => {
    optionContainer.innerHTML = ''
  })
  options.forEach((option) => {
    const optionElement = document.createElement('button')
    optionElement.textContent = option
    optionElement.classList.add('random-option')

    optionElement.addEventListener('click', async () => {
      const photos = await fetchPhotos(option)
      handleSearchResults(photos)
    })

    optionContainer.appendChild(optionElement)
  })
  optionContainer.appendChild(closeButton)
  // Limpiar el div de sugerencias antes de agregar nuevas opciones
  while (suggestions.firstChild) {
    suggestions.removeChild(suggestions.firstChild)
  }
  // Agregar el contenedor de opciones al div de sugerencias
  suggestions.appendChild(optionContainer)
}

// Función para manejar el evento de clic en el botón "Explorar"
const handleExploreClick = () => {
  const randomOptions = selectRandomOptions()
  showRandomOptions(randomOptions)
}

// Función para añadir el evento de clic al botón "Explorar"
export const addExploreClickEvent = () => {
  const parentDiv = document.getElementById('primaryButtons')
  const exploreButton = parentDiv.children[1]
  exploreButton.addEventListener('click', handleExploreClick)
}

// Quiero hacer una cosa aquí
