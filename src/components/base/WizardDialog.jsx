import { Fragment, useRef, useEffect } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Button } from '@/components/base/Button'
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export function WizardDialog({
  open = false,
  totalSteps = 0,
  step = -1,
  title,
  submitLabel,
  children,
  onClose,
  onPrevious,
  onNext,
  canContinue = false,
}) {
  const closeButtonRef = useRef(null)
  const nextButtonRef = useRef(null)

  // Auto-focus close button when dialog opens
  useEffect(() => {
    if (open && closeButtonRef.current) {
      setTimeout(() => {
        closeButtonRef.current?.focus()
      }, 100)
    }
  }, [open])

  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    // Don't interfere with input fields
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      return
    }

    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        onClose()
        break
      case 'Enter':
        e.preventDefault()
        if (canContinue) {
          onNext()
        }
        break
      case 'ArrowLeft':
        e.preventDefault()
        if (step > 0) {
          onPrevious()
        } else if (step === 0) {
          onClose()
        }
        break
      case 'ArrowRight':
        e.preventDefault()
        if (canContinue && step < totalSteps - 1) {
          onNext()
        }
        break
    }
  }

  return (
    <Transition show={open} as={Fragment}>
      <Dialog 
        className="relative z-10" 
        onClose={() => void 0 /**(make it modal)**/}
        onKeyDown={handleKeyDown}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-0 text-center sm:items-center sm:p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform w-full rounded-t-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:max-w-lg sm:p-6 sm:rounded-lg">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    ref={closeButtonRef}
                    type="button"
                    className="rounded-xl bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-complement-500 focus:ring-offset-2"
                    onClick={onClose}
                    aria-label="Close dialog (press Escape)"
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div>
                  <div className="-mt-2.5 text-center sm:text-left">
                    <DialogTitle as="h3" className="mb-6 text-base font-semibold leading-6 text-gray-900">
                      {title}
                    </DialogTitle>
                    <div className="mt-2">
                      {children}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-5 gap-3 sm:mt-6">
                  <Button
                    variant="outline"
                    className="inline-flex gap-2 min-w-32"
                    onClick={step >= 0 ? onPrevious : onClose}
                    aria-label={step >= 0 ? 'Previous step (press ← or Left Arrow)' : 'Cancel'}
                  >
                    {step >= 0 && (
                      <ChevronLeftIcon className="-ml-1 h-6 w-6" aria-hidden="true" />
                    )}
                    <span>{step >= 0 ? 'Previous' : 'Cancel'}</span>
                  </Button>
                  <Button
                    ref={nextButtonRef}
                    variant="solid"
                    color="gray"
                    disabled={!canContinue}
                    className="inline-flex gap-2 min-w-32"
                    onClick={onNext}
                    aria-label={
                      step === totalSteps - 1
                        ? `${submitLabel || 'Submit'} (press Enter or → or Right Arrow)`
                        : 'Next step (press Enter or → or Right Arrow)'
                    }
                  >
                    <span>{step === totalSteps - 1 ? submitLabel || 'Submit' : 'Next'}</span>
                    <ChevronRightIcon className="h-6 w-6" aria-hidden="true" />
                  </Button>
                </div>

                {/* Keyboard hints */}
                <div className="mt-4 text-center text-xs text-gray-500" aria-live="polite">
                  <span className="inline-flex items-center gap-2 flex-wrap justify-center">
                    <span className="inline-flex items-center gap-1">
                      <kbd>←</kbd> Previous
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="inline-flex items-center gap-1">
                      <kbd>→</kbd> Next
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="inline-flex items-center gap-1">
                      <kbd>Enter</kbd> Continue
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="inline-flex items-center gap-1">
                      <kbd>Esc</kbd> Close
                    </span>
                  </span>
                </div>

                {/* Step indicator for screen readers */}
                <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
                  Step {step + 1} of {totalSteps}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}