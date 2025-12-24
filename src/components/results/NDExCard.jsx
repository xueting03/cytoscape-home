import { useQuery } from '@tanstack/react-query'
import { NDExLogo } from '@/components/Logos'
import { LoadingMessage } from '@/components/base/Loading'
import { ErrorState } from '@/components/base/ErrorSate'
import { ResultCard } from './ResultCard'
import { createNDExQueryOptions } from '@/app/shared/queryOptions'

export function NDExCard({ genes }) {
  const { data, error, isFetching } = useQuery(createNDExQueryOptions(
    genes,
    genes?.length > 0
  ))

  const href = `https://www.ndexbio.org/index.html#/search?searchType=All&searchString=${genes.join('%20')}&searchTermExpansion=false`

  const caption = data && data.networks?.length > 0 
    ? `${data.networks.length < data.numFound ? 'Top ' : '' }${data.networks.length} results` 
    : 'No results'

  return (
    <ResultCard
      logo={<NDExLogo className="h-8 w-8" />}
      title="NDEx"
      url={href}
      caption={caption}
      isLoading={isFetching}
      error={error}
      className="lg:max-w-3xl"
    >
      <div className="min-h-64 overflow-x-auto relative">
        {isFetching && (
          <LoadingMessage className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        )}
        
        {error && <ErrorState message={error.message || 'Unable to fetch networks'} />}

        {!isFetching && !error && data?.networks?.length > 0 && (
          <table className="w-full min-w-max divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Network</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Owner</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Nodes</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Edges</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
            {data.networks.map((net) => (
              <tr key={net.externalId}>
                <td className="max-w-96 text-wrap px-3 py-2 text-left text-sm text-gray-500">
                  <a
                    href={`https://www.ndexbio.org/viewer/networks/${net.externalId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline hover:underline-offset-2 text-complement-500"
                  >
                    {net.name}
                  </a>
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{net.owner}</td>
                <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500">{net.nodeCount}</td>
                <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500">{net.edgeCount}</td>
              </tr>
            ))}
            </tbody>
          </table>
        )}
      </div>
    </ResultCard>
  )
}