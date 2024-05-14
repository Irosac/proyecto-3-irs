import './SearchBar.css'
const apiKey = 'ai0qAGImiDYEsMUSqJXaRakJnTTQcV1rwCPh75QTQZs'

import {
  showRandomOptions,
  selectRandomOptions
} from '../../Hero/Suggestions/Suggestions'

// Función para crear la barra de búsqueda
export const createSearchBar = (nodopadre = document.body) => {
  const bar = document.createElement('input')
  bar.type = 'text'
  bar.placeholder = ' 🔍 Buscar'

  // Añadir un evenlistener al input para que se vacíe al hacer click
  bar.addEventListener('keydown', async (event) => {
    // Verifica si la tecla presionada es Enter (código de tecla 13)
    if (event.key === 'Enter' || event.keyCode === 13) {
      // Detén la propagación para evitar cualquier otro comportamiento predeterminado
      event.preventDefault()
      // Obtén el valor ingresado en la barra de búsqueda
      const query = event.target.value
      // Realiza una búsqueda utilizando la función 'fetchPhotos'
      const photos = await fetchPhotos(query)
      // Maneja los resultados de la búsqueda
      handleSearchResults(photos)
    }
  })
  bar.addEventListener('click', () => {
    bar.value = ''
  })
  nodopadre.appendChild(bar)
}

// Función para realizar una solicitud a la API de Unsplash, fetch(url,options), fetch devuelve una promesa que se cumple con un objeto Response que representa la respuesta del servidor. Luego, se puede utilizar el método then para procesar la respuesta y el método catch para manejar cualquier error.

export const fetchPhotos = (query) => {
  // Esta url me busca solo imágenes cuadradas jiji <3
  const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}&orientation=landscape`

  // const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}`

  return fetch(url)
    .then((response) => {
      // Verifica si la respuesta es exitosa
      if (!response.ok) {
        throw new Error('Error al obtener fotos de Unsplash :(')
      }
      // Convierte la respuesta a formato JSON
      return response.json()
    })
    .then((data) => {
      // Devuelve los resultados de la búsqueda (fotos)
      return data.results
    })
    .catch((error) => {
      console.error('Error fetching photos from Unsplash:', error)
      return []
    })
}

// Función para transformar los resultados a imágenes en mi web
export const handleSearchResults = (photos) => {
  const imagesContainer = document.querySelector('.images')
  const suggestionsDiv = document.querySelector('.suggestions')
  const messageParagraph = document.querySelector('p.message')
  const input = document.querySelector('#searchBar input')
  messageParagraph.style.display = 'block'
  imagesContainer.innerHTML = ''

  if (photos.length === 0) {
    console.log(
      'Mensaje:',
      'Esta búsqueda no tiene resultados, prueba con estas sugerencias'
    )
    messageParagraph.innerHTML =
      'Esta búsqueda no tiene resultados, prueba con alguna de estas sugerencias;'
    const randomOptions = selectRandomOptions()
    showRandomOptions(randomOptions)
    setTimeout(() => {
      input.value = ''
    }, 1500)
  } else {
    suggestionsDiv.innerHTML = ''
    messageParagraph.innerHTML = ''
    messageParagraph.style.display = 'none'
    photos.forEach((photo) => {
      const img = document.createElement('img')
      img.src = photo.urls.small
      img.alt = photo.alt_description || 'Foto de Unsplash'
      imagesContainer.appendChild(img)
    })
  }
}

// Función para obtener imágenes aleatorias de Unsplash

export const fetchRandomPhotos = (count = 10) => {
  const url = `https://api.unsplash.com/photos/random?count=${count}&client_id=${apiKey}&orientation=squarish`

  // const url = `https://api.unsplash.com/photos/random?count=${count}&client_id=${apiKey}`
  // Uso fetch para hacer la solicitud (.then(response), then json, then data chatch error)
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          'Error al obtener fotos aleatorias de Unsplash aleatorias'
        )
      }
      return response.json()
    })
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.error('Error fetching random photos from Unsplash:', error)
      return []
    })
}
