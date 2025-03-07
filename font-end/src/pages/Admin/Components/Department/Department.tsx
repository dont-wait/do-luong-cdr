import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

interface DepartmentsProps {
  openModal: () => void;
}

const Departments: React.FC<DepartmentsProps> = ({ openModal }) => {
  return (
    <section id='departments-section'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold'>Manage Departments</h2>
        <button
          onClick={openModal}
          className='px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center'>
          <FontAwesomeIcon icon={faPlus} className='mr-2' /> Add Department
        </button>
      </div>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden'>
        <div className='p-4 border-b dark:border-gray-700'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search departments...'
              className='w-full md:w-80 pl-10 pr-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
            <FontAwesomeIcon
              icon={faSearch}
              className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
            />
          </div>
        </div>
        {/* Add table here */}
      </div>
    </section>
  );
};

export default Departments;
