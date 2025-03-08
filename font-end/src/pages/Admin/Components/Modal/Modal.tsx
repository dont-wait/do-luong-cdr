import React from "react";

interface ModalProps {
  title: string;
  onClose: () => void;
  onSave: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, onSave }) => {
  return (
    <div className='modal fixed inset-0 z-50 overflow-y-auto'>
      <div className='flex items-center justify-center min-h-screen px-4'>
        <div
          className='fixed inset-0 bg-black opacity-50'
          onClick={onClose}></div>
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md z-10 slide-in'>
          <div className='flex justify-between items-center border-b dark:border-gray-700 p-4'>
            <h3 className='text-lg font-semibold'>{title}</h3>
            <button onClick={onClose}>
              <i className='fas fa-times text-gray-400 hover:text-gray-500'></i>
            </button>
          </div>
          <div className='p-4'>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSave();
              }}>
              <div className='mb-4'>
                <label className='block text-sm font-medium mb-1'>
                  Department ID
                </label>
                <input
                  type='text'
                  className='w-full rounded-lg border dark:border-gray-600 dark:bg-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-sm font-medium mb-1'>
                  Department Name
                </label>
                <input
                  type='text'
                  className='w-full rounded-lg border dark:border-gray-600 dark:bg-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
              </div>
              <div className='flex justify-end mt-6'>
                <button
                  type='button'
                  onClick={onClose}
                  className='px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg mr-2'>
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg'>
                  Save Department
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
