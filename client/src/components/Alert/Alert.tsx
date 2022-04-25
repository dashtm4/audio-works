import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Transition } from '@headlessui/react';

import { ALERT_TYPES } from '@constants/alert';
import { removeAlert } from '@store/slices/alert';
import { getAlertState } from '@store/selectors';
import { CloseIcon } from '@assets/svgs';

const ALERT_STYLE = {
  [ALERT_TYPES.success]: 'bg-green-600 text-white',
  [ALERT_TYPES.error]: 'bg-red-600 text-white',
};

export function Alert() {
  const dispatch = useDispatch();
  const { alertType, message, isVisible, closeTimestamp } = useSelector(getAlertState);

  const handleRemoveAlert = () => dispatch(removeAlert());

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (new Date().getTime() >= closeTimestamp) {
        dispatch(removeAlert());
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [closeTimestamp]);

  return (
    <div className="fixed inset-0 flex items-start justify-end p-6 pointer-events-none">
      <Transition
        show={isVisible}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={`flex w-full max-w-sm p-4 overflow-hidden pointer-events-auto pl-7 shadow-md ${
            ALERT_STYLE[ALERT_TYPES[alertType]]
          }`}
        >
          <div className="flex-1">{message}</div>
          <div className="flex flex-shrink-0 ml-4">
            <button className="inline-flex" onClick={handleRemoveAlert}>
              <CloseIcon />
            </button>
          </div>
        </div>
      </Transition>
    </div>
  );
}
