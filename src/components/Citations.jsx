'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { useInView } from 'framer-motion'
import { Container } from '@/components/base/Container'
import citationsData from '@/data/citations.json'

const citations = citationsData

function Citation({ title, body, author, doi, image, className, ...props }) {
  let animationDelay = useMemo(() => {
    let possibleAnimationDelays = ['0s', '0.1s', '0.2s', '0.3s', '0.4s', '0.5s']
    return possibleAnimationDelays[
      Math.floor(Math.random() * possibleAnimationDelays.length)
    ]
  }, [])

  return (
    <a href={doi} target="_blank" rel="noreferrer" className="p-2">
      <figure
        className={clsx(
          'group flex flex-row space-x-4 animate-fade-in rounded-3xl bg-white p-6 opacity-0 shadow-md shadow-gray-900/5 hover:shadow-xl',
          className,
        )}
        style={{ animationDelay }}
        {...props}
      >
        <img
          className="max-w-36 object-contain grayscale-[75%] group-hover:grayscale-0"
          src={'/images/publications/' + image}
        />
        <div>
          <blockquote className="text-gray-900">
            <p className="mt-4 text-xs font-semibold leading-6">
              {title}
            </p>
            <p className="mt-3 text-sm leading-7">{body}</p>
          </blockquote>
          <figcaption className="mt-3 text-xs text-gray-600 before:content-['–_']">
            {author}
          </figcaption>
        </div>
      </figure>
    </a>
  )
}

function splitArray(array, numParts) {
  let result = []
  for (let i = 0; i < array.length; i++) {
    let index = i % numParts
    if (!result[index]) {
      result[index] = []
    }
    result[index].push(array[i])
  }
  return result
}

function CitationColumn({ citations, className, citationClassName, msPerPixel = 0 }) {
  let columnRef = useRef(null)
  let [columnHeight, setColumnHeight] = useState(0)
  let duration = `${columnHeight * msPerPixel}ms`

  useEffect(() => {
    if (!columnRef.current) {
      return
    }

    let resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0)
    })

    resizeObserver.observe(columnRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div
      ref={columnRef}
      className={clsx('animate-marquee space-y-8 py-4', className)}
      style={{ '--marquee-duration': duration }}
    >
      {citations.concat(citations).map((citation, citationIndex) => (
        <Citation
          key={citationIndex}
          aria-hidden={citationIndex >= citations.length}
          className={citationClassName?.(citationIndex % citations.length)}
          {...citation}
        />
      ))}
    </div>
  )
}

function CitationGrid() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.4 })
  const columns = splitArray(citations, 2)
  const column1 = columns[0]
  const column2 = columns[1]

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 lg:grid-cols-2"
    >
      {isInView && (
        <>
          <CitationColumn
            citations={[...column1, ...column2]}
            citationClassName={(citationIndex) => clsx(citationIndex >= column1.length && 'md:hidden')}
            msPerPixel={15}
          />
          <CitationColumn
            citations={column2}
            className="hidden lg:block"
            msPerPixel={10}
          />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50" />
    </div>
  )
}

export function Citations() {
  return (
    <section
      id="citations"
      aria-labelledby="citations-title"
      className="pb-16 pt-20 sm:pb-24 sm:pt-32"
    >
      <Container>
        <h2
          id="citations-title"
          className="text-3xl font-medium tracking-tight text-gray-900 sm:text-center"
        >
          Many publications are citing Cytoscape
        </h2>
        <p className="mt-2 text-lg text-gray-600 sm:text-center">
          Thousands of{' '}
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/?term=(cytoscape+OR+ndex+OR+genemania+OR+stringapp+OR+enrichmentmap+OR+wikipathways)"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            researchers
          </a>
          {' '}have used Cytoscape tools and resources.
        </p>
        <CitationGrid />
      </Container>
    </section>
  )
}
