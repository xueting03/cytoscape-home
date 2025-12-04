import { useState, useEffect } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { Button } from '@/components/base/Button'
import { SearchBar } from '@/components/SearchBar'
import { Header } from '@/components/Header'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

// Import the new components from their correct locations
import { GeneManiaCard } from '@/components/results/GeneManiaCard'
import { NDExCard } from '@/components/results/NDExCard'
import { WikiPathwaysCard } from '@/components/results/WikiPathwaysCard'
import { TutorialsCard } from '@/components/results/TutorialsCard'

const resultTypes = {
  gene: 'Gene Analysis',
  pathway: 'Pathway Search',
  tutorial: 'Tutorial Search',
}

export function Results({ open = false, data, searchEngine, onClose }) {
  const [localData, setLocalData] = useState(data)

  const type = localData?.type
  const terms = localData?.terms || []
  const organism = localData?.organism

  // Update local data when props change
  useEffect(() => {
    if (data) {
      setLocalData(data)
    }
  }, [data])

  const handleSubmit = (newData) => {
    setLocalData({ type, terms: newData.terms, organism: newData.organism })
  }

  const handleWhatElseClick = () => {
    onClose()
    window.location.href = '/#genes'
  }

  return (
    <Transition show={open}>
      <Dialog className="relative z-10 w-full" onClose={() => void 0 /* Modal behavior */}>
        <div className="fixed inset-0 z-10 w-screen h-screen">
          <div className="flex w-full h-full items-end justify-center text-center sm:items-center">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="flex flex-col w-full h-full text-left transition-all px-0 bg-gray-50">
                <Header />
                
                {/* Search Header Bar */}
                <div className="flex-initial md:px-4 px-2 md:pb-0 pb-2 bg-white border-b border-gray-200 drop-shadow-sm z-20">
                  <div className="flex flex-row sm:items-start items-center justify-center lg:space-x-10 md:space-x-6 space-x-4 max-w-7xl mx-auto md:pt-5 pt-2 text-gray-400">
                    <a aria-label="Home" onClick={onClose} className="cursor-pointer">
                      <Button variant="text" className="mt-2 text-gray-900 hover:text-complement-500 sm:hidden">
                        <ArrowLeftIcon className="w-5" />
                      </Button>
                    </a>
                    <div className="w-full max-w-4xl text-left">
                      <SearchBar
                        initialText={terms?.join(' ')}
                        initialOrganismTaxon={organism?.taxon}
                        showOrganismSelector={type === 'gene'}
                        onSubmit={handleSubmit}
                        className="bg-white drop-shadow-sm border-gray-300"
                      />
                      <div className="mt-2 text-sm text-gray-400 lg:text-left text-right hidden md:block pb-2">
                        <span className="lg:inline hidden">This is a demonstration of the Cytoscape ecosystem.&nbsp;&nbsp;</span>
                        <a onClick={handleWhatElseClick} className="text-complement-500 hover:underline cursor-pointer">
                          Find out what else you can do...
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex flex-col lg:flex-row items-stretch lg:items-start lg:justify-center flex-grow py-6 xl:px-0 md:px-4 px-2 bg-gray-50 lg:space-x-6 lg:space-y-0 space-y-6 overflow-y-auto overflow-x-hidden">
                  
                  {(type === 'gene' || type === 'pathway') && (
                    <>
                      <div className="max-w-7xl w-full flex flex-col items-center justify-center lg:items-start space-y-6">
                        {type === 'gene' && organism && (
                          <GeneManiaCard genes={terms} organism={organism} />
                        )}
                        <NDExCard genes={terms} />
                      </div>
                      
                      <div className="max-w-7xl w-full lg:max-w-[580px]">
                        <WikiPathwaysCard terms={terms} searchEngine={searchEngine} />
                      </div>
                    </>
                  )}

                  {type === 'tutorial' && (
                    <div className="max-w-7xl w-full">
                      <TutorialsCard terms={terms} searchEngine={searchEngine} />
                    </div>
                  )}

                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}