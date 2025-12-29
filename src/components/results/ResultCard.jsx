import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'

const CardTitle = ({ logo, title, url }) => (
  <div className="flex items-center">
    {logo}
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="flex items-start group"
    >
      <h3 className="ml-4 font-semibold text-gray-900 group-hover:text-complement-500">{title}</h3>
      <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1 mt-0.5 fill-gray-400 group-hover:fill-complement-500" />
    </a>
  </div>
)

export function ResultCard({ logo, title, url, caption, isLoading, error, children, className }) {
  return (
    <div className={`min-w-12 w-full flex-grow p-4 rounded-xl shadow-lg shadow-gray-200 ${error ? 'border-double border-4 border-red-100' : 'border border-gray-200'} ${className}`}>
      <CardTitle logo={logo} title={title} url={url} />
      <p className="mt-2 text-right text-xs text-gray-600">
        {!isLoading && !error ? (
          <>{caption || <>&nbsp;</>}</>
        ) : (
          <>&nbsp;</>
        )}
      </p>
      <div className="mt-2 ring-4 ring-black ring-opacity-5 rounded-lg">
        {children}
      </div>
    </div>
  )
}