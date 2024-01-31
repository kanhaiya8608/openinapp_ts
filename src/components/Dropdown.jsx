import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { AiOutlineDown} from 'react-icons/ai'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dropdown(onLogout) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className='flex'>
        
        <Menu.Button className="flex flex-wrap">
          <img src="/images/me.jpeg" alt="" className='h-10 w-10 rounded-full'/>
          <AiOutlineDown className="mr-2 h-5 w-5 ml-4 mt-3 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit" onClick={onLogout}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}