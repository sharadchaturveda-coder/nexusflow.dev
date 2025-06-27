import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

export default function FAQ() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-600 to-yellow-400 bg-clip-text text-transparent tracking-tight mb-4 pb-4">
          You Ask.<br />We Auto-Reply
        </h2>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          Some answers are better when they're expected.
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white/30 backdrop-blur-lg border border-white/20 px-4 py-4 text-left text-lg font-bold text-gray-800 hover:bg-white/50 focus:outline-none focus-visible:ring focus-visible:ring-magenta focus-visible:ring-opacity-75">
                <span>Can I integrate my existing WhatsApp number?</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-magenta`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-lg text-gray-600">
                Yes, you can connect your existing WhatsApp Business API number to Nexus Flow AI.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white/30 backdrop-blur-lg border border-white/20 px-4 py-4 text-left text-lg font-bold text-gray-800 hover:bg-white/50 focus:outline-none focus-visible:ring focus-visible:ring-magenta focus-visible:ring-opacity-75">
                <span>Is there a free trial?</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-magenta`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-lg text-gray-600">
                Yes, we offer a free forever plan with a limited number of replies to get you started.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white/30 backdrop-blur-lg border border-white/20 px-4 py-4 text-left text-lg font-bold text-gray-800 hover:bg-white/50 focus:outline-none focus-visible:ring focus-visible:ring-magenta focus-visible:ring-opacity-75">
                <span>How do you bill for usage?</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-magenta`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-lg text-gray-600">
                We have a pay-as-you-go model. You are billed based on the number of tokens used, and you can track your usage in real-time from the dashboard.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </section>
  );
}
