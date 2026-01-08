import { Fragment, useState } from 'react'
import { Tab } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'

import { usePrevious } from '@/hooks/usePrevious'
import { useDebouncedCallback } from 'use-debounce'
import { BrowserFrame } from '@/components/BrowserFrame'
import { CircleBackground } from '@/components/CircleBackground'
import features from '@/shared/primary-features-list'

export default function FeaturesDesktop() {
  const [changeCount, setChangeCount] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const prevIndex = usePrevious(selectedIndex)
  const isForwards = prevIndex === undefined ? true : selectedIndex > prevIndex

  const onChange = useDebouncedCallback(
    (index) => {
      setSelectedIndex(index)
      setChangeCount((count) => count + 1)
    },
    100,
    { leading: true }
  )

  return (
    <Tab.Group
      as="div"
      className="grid grid-cols-12 items-center gap-8 lg:gap-16 xl:gap-24"
      selectedIndex={selectedIndex}
      onChange={onChange}
      vertical
    >
      {/* LEFT SIDE: Feature List */}
      <Tab.List className="relative z-10 order-last col-span-6 space-y-6">
        {features.map((feature, index) => (
          <div
            key={feature.name}
            className="relative rounded-2xl transition-colors hover:bg-gray-800/30"
          >
            {index === selectedIndex && (
              <motion.div
                layoutId="activeBackground"
                className="absolute inset-0 bg-gray-800"
                initial={{ borderRadius: 16 }}
              />
            )}

            <div className="relative z-10 p-8">
              <feature.icon className="h-8 w-8" />
              <h3 className="mt-6 text-lg font-semibold text-white">
                <Tab className="text-left ui-not-focus-visible:outline-none">
                  <span className="absolute inset-0 rounded-2xl" />
                  {feature.name}
                </Tab>
              </h3>
              <p className="mt-2 text-sm text-gray-400">{feature.description}</p>
            </div>
          </div>
        ))}
      </Tab.List>

      {/* RIGHT SIDE: Animated Screen */}
      <div className="relative col-span-6">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <CircleBackground color="#13B5C8" className="animate-spin-slower" />
        </div>
        <BrowserFrame className="z-10 mx-auto w-full max-w-[366px]">
          <Tab.Panels as={Fragment}>
            <AnimatePresence initial={false} custom={{ isForwards, changeCount }}>
              {features.map(
                (feature, index) =>
                  selectedIndex === index && (
                    <Tab.Panel
                      static
                      key={feature.name + changeCount}
                      className="col-start-1 row-start-1 flex focus:outline-offset-[32px] ui-not-focus-visible:outline-none"
                    >
                      <feature.screen
                        animated
                        custom={{ isForwards, changeCount }}
                      />
                    </Tab.Panel>
                  )
              )}
            </AnimatePresence>
          </Tab.Panels>
        </BrowserFrame>
      </div>
    </Tab.Group>
  )
}
