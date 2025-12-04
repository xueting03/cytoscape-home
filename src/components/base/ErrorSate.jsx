import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'

export function ErrorState({ message }) {
  return (
    <span className="w-full flex items-start justify-center text-red-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <ExclamationTriangleIcon className="w-5 h-5 mt-0.5" />
      <span className="ml-2 font-light">
        {message || 'Unable to fetch data'}
      </span>
    </span>
  )
}