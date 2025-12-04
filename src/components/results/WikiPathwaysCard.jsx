import { useState, useEffect } from 'react'
import { Marker } from "react-mark.js"
import { ArrowTurnDownRightIcon } from '@heroicons/react/20/solid'
import { WikiPathwaysLogo } from '@/components/Logos'
import { LoadingMessage } from '@/components/base/Loading'
import { ResultCard } from './ResultCard'

export function WikiPathwaysCard({ terms, searchEngine }) {
  const [results, setResults] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (searchEngine) {
      const res = searchEngine.searchPathways(terms.join(' '))
      setResults(res)
      setLoading(false)
    }
  }, [terms, searchEngine])

  return (
    <ResultCard
      logo={<WikiPathwaysLogo className="h-8 w-8" />}
      title="WikiPathways"
      url="https://www.wikipathways.org"
      caption={results && results.length > 0 ? `${results.length} results` : 'No results'}
      isLoading={loading}
      className="text-left min-w-[580px] lg:max-w-[580px] max-w-full"
    >
      <ul className="space-y-2 min-h-64 relative">
        {loading && (
          <LoadingMessage className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        )}
        
        {results && results.map(({ id, title, organisms, annotations, description, url, terms }, idx) => (
          <li key={idx} className="p-2 flex items-start space-x-4 border-b border-gray-100 last:border-0">
            <div className="flex-shrink-0">
              <a href={`https://www.wikipathways.org${url}`} target='_blank' rel='noreferrer'>
                <img
                  src={`https://www.wikipathways.org/assets/img/${id}/${id}-thumb.png`}
                  alt={`${title} thumbnail`}
                  className="w-32 h-auto rounded border border-gray-200" 
                />
              </a>
            </div>
            <div>
              <h3 className="font-medium">
                <a
                  href={`https://www.wikipathways.org${url}`}
                  target='_blank'
                  rel='noreferrer'
                  className="hover:underline hover:underline-offset-2 text-complement-500"
                >
                  {title}
                </a>
              </h3>
              <div className="text-sm font-light text-gray-400">
                {id} &mdash; <i>{organisms.join(', ')}</i>
              </div>
              <div className="mt-2 flex text-gray-400">
                <div className="mr-1 text-gray-400">
                  <ArrowTurnDownRightIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">
                    <Marker mark={terms} options={{ className: 'bg-inherit font-bold text-inherit' }}>
                      {annotations}
                    </Marker>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <Marker mark={terms} options={{ className: 'bg-inherit font-bold' }}>
                      {description.length > 200 ? `${description.slice(0, 200)}...` : description}
                    </Marker>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </ResultCard>
  )
}