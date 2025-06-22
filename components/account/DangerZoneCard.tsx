import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface DangerZoneCardProps {
  onDeleteAccount: () => void;
}

const DangerZoneCard: React.FC<DangerZoneCardProps> = ({ onDeleteAccount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  function closeModal() {
    setIsOpen(false);
    setConfirmText('');
  }

  function openModal() {
    setIsOpen(true);
  }

  const isConfirmButtonEnabled = confirmText === 'DELETE';

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg border-2 border-red-500">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-red-900">
          Danger Zone
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-red-500">
          Irreversible actions related to your account.
        </p>
      </div>
      <div className="border-t border-red-200 px-4 py-5 sm:p-0">
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-red-500">
            Delete Account
          </dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 text-right">
            <button
              type="button"
              onClick={openModal}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete Account
            </button>
          </dd>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Confirm Account Deletion
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      This action is irreversible. All your data, including conversations, usage logs, and subscription information, will be permanently deleted.
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      To confirm, please type <code className="font-bold text-red-600">DELETE</code> in the box below.
                    </p>
                    <input
                      type="text"
                      className="mt-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                      value={confirmText}
                      onChange={(e) => setConfirmText(e.target.value)}
                      placeholder="Type DELETE to confirm"
                    />
                  </div>

                  <div className="mt-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white ${
                        isConfirmButtonEnabled ? 'bg-red-600 hover:bg-red-700' : 'bg-red-300 cursor-not-allowed'
                      } focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2`}
                      onClick={() => {
                        if (isConfirmButtonEnabled) {
                          onDeleteAccount();
                          closeModal();
                        }
                      }}
                      disabled={!isConfirmButtonEnabled}
                    >
                      Confirm Deletion
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default DangerZoneCard;