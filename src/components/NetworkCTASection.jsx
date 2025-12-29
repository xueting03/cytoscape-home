import { CursorArrowRaysIcon, CpuChipIcon, CubeTransparentIcon } from '@heroicons/react/20/solid'
import { Button } from '@/components/base/Button'
import { HoverPopover } from './base/HoverPopover'
import networkFeaturesData from '@/data/networkFeatures.json'

const tagLine = 'Visualize and analyze with ease';
const title = 'Start with a network';
const description = `Take your network to the next level by easily performing relevant analyses.  Quickly edit and style your network to make it publication-ready.`;

const iconMap = {
  CursorArrowRaysIcon,
  CpuChipIcon,
  CubeTransparentIcon
}

const features = networkFeaturesData.map(feature => ({
  ...feature,
  icon: iconMap[feature.icon]
}))

export function NetworkCTASection() {
  return (
    <section id="networks" className="pb-16 pt-20 sm:pb-24 sm:pt-32 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <div className="col-span-2">
            <h2 className="text-base/7 font-semibold text-primary-500">
              {tagLine}
            </h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              {title}
            </p>
            <p className="mt-6 text-base/7 text-gray-700">
              {description}
            </p>
          </div>
          <dl className="col-span-3 grid grid-cols-1 gap-x-8 gap-y-10 text-base/7 text-gray-600 sm:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="font-semibold text-gray-900">
                  <feature.icon aria-hidden="true" className="absolute top-1 left-0 size-5 text-primary-500"/>
                  {feature.name}
                </dt>
                <dd className="mt-2">{feature.description}</dd>
                <dd className="mt-2 flex items-center">
                  <a href={feature.tutorialLink} target="_blank">
                    <Button variant="outline" color="primary">
                      <span className="text-center">Learn more</span>
                    </Button>
                  </a>
                  <HoverPopover
                    content={<span>This is where a screenshot would go.</span>}
                  >
                    <a href={feature.toolLink} target="_blank">
                      <Button color="secondary" className="ml-1">
                        <span className="text-center font-normal underline">Or use {feature.tool}</span>
                      </Button>
                    </a>
                  </HoverPopover>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}