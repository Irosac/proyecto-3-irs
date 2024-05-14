import './style.css'

import {
  finalPrimaryButtons,
  finalSecondaryButtons,
  addInicioClickEvent,
  handleInicioClick
} from './Componets/Header/Buttons/Buttons'

import { createSearchBar } from './Componets/Header/SearchBar/SearchBar'

import { addExploreClickEvent } from './Componets/Hero/Suggestions/Suggestions'

finalPrimaryButtons()
createSearchBar(document.getElementById('searchBar'))
finalSecondaryButtons()
addExploreClickEvent()
addInicioClickEvent()
handleInicioClick()
