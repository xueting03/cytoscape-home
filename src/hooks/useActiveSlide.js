import { useEffect } from 'react'

export function useActiveSlide(slideContainerRef, slideRefs, setActiveIndex) {
  useEffect(() => {
    if (!slideContainerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            setActiveIndex(slideRefs.current.indexOf(entry.target))
            break
          }
        }
      },
      {
        root: slideContainerRef.current,
        threshold: 0.6,
      }
    )

    slideRefs.current.forEach((slide) => {
      if (slide) observer.observe(slide)
    })

    return () => observer.disconnect()
  }, [])
}
