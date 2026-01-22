import { useRef, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { GeneManiaLogo } from '@/components/Logos'
import { LoadingMessage } from '@/components/base/Loading'
import { ErrorState } from '@/components/base/ErrorSate'
import { ResultCard } from './ResultCard'
import { createGeneManiaQueryOptions } from '@/app/shared/queryOptions'
import { useGeneManiaCytoscape } from '@/hook/useGeneManiaCytoscape'

export function GeneManiaCard({ genes, organism }) {
  const isMounted = useRef(false)

  // Ensure we track mounting to avoid queries on unmounted components
  useEffect(() => {
    isMounted.current = true
    return () => { isMounted.current = false }
  }, [])

  const { data, error, isFetching } = useQuery(createGeneManiaQueryOptions(
    genes,
    organism?.id,
    isMounted.current && genes?.length > 0 && organism?.id > 0
  ))

  // Use our new custom hook for the graph logic
  useGeneManiaCytoscape('genemania-cy', data)

  const href = `https://genemania.org/search/${organism?.name.toLowerCase().replace(' ', '-')}/${genes.join('/')}`

  return (
    <ResultCard
      logo={<GeneManiaLogo className="h-8 w-8" />}
      title="GeneMANIA"
      url={href}
      caption={data?.resultGenes?.length === 0 ? 'No results' : `${data?.resultGenes?.length || 0} result genes`}
      isLoading={isFetching}
      error={error}
    >
      <div className="relative w-full mt-2 ring-4 ring-black ring-opacity-5 rounded-lg">
        {/* Graph Container */}
        <div id="genemania-cy" className={`w-full h-96 ${isFetching ? 'invisible' : ''}`} />
        
        {isFetching && (
          <LoadingMessage className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        )}
        
        {error && <ErrorState message={error.message || 'Unable to fetch network'} />}
      </div>
    </ResultCard>
  )
}