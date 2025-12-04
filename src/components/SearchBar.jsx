import { useEffect, useState, useRef } from 'react'
import clsx from 'clsx'
import { geneManiaOrganisms } from '@/app/shared/common'

import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'


/**
 * SearchBar component for entering gene symbols, pathways, or any other search terms.
 */
export function SearchBar({
  id,
  placeholder,
  initialText = '',
  initialOrganismTaxon = '9606', // Default to human
  showOrganismSelector = false,
  onTextChange,
  onOrganismChange,
  onSubmit,
  className
}) {
  const [text, setText] = useState(initialText)
  const [selectedOrganism, setSelectedOrganism] = useState(geneManiaOrganisms.find(org => org.taxon === initialOrganismTaxon))
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)
  
  // Set the initial text when the component mounts
  useEffect(() => {
    if (initialText) {
      // Set the text input value and notify parent component
      setText(initialText)
      onTextChange?.(initialText)
    }
  }, [initialText, onTextChange])

  // Set the initial organism when the component mounts
  useEffect(() => {
    const initialSelectedOrganism = geneManiaOrganisms.find(org => org.taxon === initialOrganismTaxon)
    if (initialSelectedOrganism) {
      setSelectedOrganism(initialSelectedOrganism)
    }
  }, [initialOrganismTaxon])

  // Add event listener for clicks outside the dropdown
  useEffect(() => {
    if (!showOrganismSelector || !dropdownOpen) return
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      const dropdownMenu = document.getElementById('organismDropdownMenu')
      if (dropdownMenu && !dropdownMenu.contains(event.target)) {
        setDropdownOpen(false)
        setFocusedIndex(-1)
      }
    }
    // Add event listener to document and any modal dialog
    document.addEventListener('click', handleClickOutside)
    const dialog = document.querySelector('[data-headlessui-state="open"]')
    if (dialog) {
      dialog.addEventListener('click', handleClickOutside)
    }
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showOrganismSelector, dropdownOpen])

  // Reset focused index when dropdown closes
  useEffect(() => {
    if (!dropdownOpen) {
      setFocusedIndex(-1)
    }
  }, [dropdownOpen])

  const handleTextChange = (event) => {
    const newText = event.target.value
    setText(newText)
    onTextChange?.(newText)
  }

  const handleOrganismSelect = (value) => {
    const org = geneManiaOrganisms.find(org => org.taxon === value)
    if (org) {
      setSelectedOrganism(org)
      setDropdownOpen(false)
      setFocusedIndex(-1)
      onOrganismChange?.(org)
      // Return focus to input
      inputRef.current?.focus()
    }
  }

  const handleOrganismClick = (event) => {
    const value = event.currentTarget.getAttribute('data-value')
    if (value) {
      handleOrganismSelect(value)
    }
  }

  const handleDropdownClick = (event) => {
    event.stopPropagation() // Prevent click from propagating to document
    setDropdownOpen((open) => !open)
  }

  const handleDropdownKeyDown = (event) => {
    if (!dropdownOpen) {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
        event.preventDefault()
        setDropdownOpen(true)
        setFocusedIndex(geneManiaOrganisms.findIndex(org => org.taxon === selectedOrganism.taxon))
      }
      return
    }

    switch (event.key) {
      case 'Escape':
        event.preventDefault()
        setDropdownOpen(false)
        setFocusedIndex(-1)
        break
      case 'ArrowDown':
        event.preventDefault()
        setFocusedIndex((prev) => 
          prev < geneManiaOrganisms.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        event.preventDefault()
        setFocusedIndex((prev) => prev > 0 ? prev - 1 : prev)
        break
      case 'Home':
        event.preventDefault()
        setFocusedIndex(0)
        break
      case 'End':
        event.preventDefault()
        setFocusedIndex(geneManiaOrganisms.length - 1)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (focusedIndex >= 0) {
          handleOrganismSelect(geneManiaOrganisms[focusedIndex].taxon)
        }
        break
    }
  }

  // Scroll focused item into view
  useEffect(() => {
    if (focusedIndex >= 0 && dropdownRef.current) {
      const focusedElement = dropdownRef.current.children[focusedIndex]
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      }
    }
  }, [focusedIndex])

  const handleSubmit = (event) => {
    if (text?.trim() !== '') {
      event.preventDefault()
      event.stopPropagation()
      onSubmit?.({ terms: text.trim().split(/\s+/).filter(term => term.length > 0), organism: selectedOrganism })
    } else {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  const inputClassName = clsx(
    'w-full pr-12 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm',
    'border border-gray-300 rounded-md transition duration-300 ease focus:border-complement-500 focus:outline-none focus:ring-complement-500 shadow-sm focus:shadow',
    `${showOrganismSelector ? 'pl-20' : 'pl-4'}`,
    className,
  )

  return (
    <div className="w-full min-w-[200px]">
      <div className="relative">
      {showOrganismSelector && (
        <div className="absolute top-1 left-1 flex items-center">
          <button
            id="searchDropdownButton"
            type="button"
            onClick={handleDropdownClick}
            onKeyDown={handleDropdownKeyDown}
            className="z-10 min-w-16 border-r py-1 px-1.5 text-center flex items-center text-sm transition-all text-slate-600 focus:outline-none focus:ring-2 focus:ring-complement-500 rounded-l"
            aria-label={`Selected organism: ${selectedOrganism.name}. Press Enter to change.`}
            aria-expanded={dropdownOpen}
            aria-haspopup="listbox"
          >
            <span
              id="searchDropdownLabel"
              className="text-ellipsis overflow-hidden"
            >
              <img
                src={selectedOrganism.image}
                alt=""
                className="inline-block h-6 w-6 mr-1 saturate-0"
              />
            </span>
            <span className="flex-grow"/>
            <ChevronDownIcon className="h-5 w-5 ml-1" aria-hidden="true" />
          </button>
        {dropdownOpen && (
          <div
            id="organismDropdownMenu"
<<<<<<< Updated upstream
            className="z-10 min-w-[280px] absolute top-10 -left-1 w-full bg-white border border-slate-200 rounded-md shadow-lg scrollbar-hide"
            style={{ maxHeight: '130px', overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
=======
            role="listbox"
            aria-label="Select organism"
            className="z-10 min-w-[280px] absolute top-10 -left-1 w-full bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-auto"
>>>>>>> Stashed changes
          >
            <div className="p-2 text-xs text-gray-500 border-b">
              <kbd>↑</kbd> <kbd>↓</kbd> Navigate • <kbd>Enter</kbd> Select • <kbd>Esc</kbd> Close
            </div>
            <ul id="searchDropdownOptions" ref={dropdownRef}>
            {geneManiaOrganisms.map((org, index) => (
              <li
                key={org.taxon}
                role="option"
                aria-selected={selectedOrganism.taxon === org.taxon}
                data-value={org.taxon}
                onClick={handleOrganismClick}
                className={clsx(
                  'px-4 py-2 text-slate-600 text-sm cursor-pointer',
                  {
                    'bg-complement-200': focusedIndex === index,
                    'hover:bg-complement-100': focusedIndex !== index,
                  }
                )}
              >
                <div className="flex items-center">
                  <img src={org.image} alt="" className="h-6 w-6 flex-shrink-0 rounded-full saturate-0" />
                  <span
                    className={clsx(`ml-3 block truncate`, {
                      'font-semibold': selectedOrganism.taxon === org.taxon,
                      'font-normal': selectedOrganism.taxon !== org.taxon,
                    })}
                  >
                    {org.name}
                  </span>
                {selectedOrganism.taxon === org.taxon && (
                  <span className="ml-auto pl-2 text-complement-500">
                    <CheckIcon aria-hidden="true" className="h-5 w-5" />
                  </span>
                )}
                </div>
              </li>
            ))}
            </ul>
          </div>
        )}
        </div>
      )}
        <form onSubmit={handleSubmit}>
          <label htmlFor={id} className="sr-only">Search terms</label>
          <input
            ref={inputRef}
            id={id}
            type="text"
            value={text || ''}
            placeholder={placeholder || 'Enter your search term here...'}
            onChange={handleTextChange}
            className={inputClassName}
            aria-describedby={showOrganismSelector ? 'searchDropdownButton' : undefined}
          />
          <button
            disabled={!text || text.trim() === ''}
            type="submit"
            className="absolute inset-y-1 right-1 w-9 h-9 flex items-center justify-center rounded-2xl hover:bg-gray-100 active:bg-gray-200 fill-complement-500 disabled:pointer-events-none disabled:fill-gray-400 focus:outline-none focus:ring-2 focus:ring-complement-500"
            aria-label="Submit search"
          >
            <MagnifyingGlassIcon
              aria-hidden="true"
              className="h-6 w-6 fill-inherit"
            />
          </button>
        </form>
      </div>
    </div>
  )
}

export default SearchBar