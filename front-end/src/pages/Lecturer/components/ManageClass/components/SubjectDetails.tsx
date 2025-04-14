import { Subject } from "../../../../../types/types";

const SubjectDetails = ({ subject }: { subject: Subject }) => {
  return (
    <div className='bg-white rounded-lg p-4 mb-4 card-shadow'>
      <h5 className='text-lg font-semibold border-b pb-2 mb-3'>
        Subject Information
      </h5>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <p className='mb-2'>
            <span className='font-medium'>Subject Name:</span>{" "}
            {subject.subject_name}
          </p>
          <p className='mb-2'>
            <span className='font-medium'>Subject ID:</span> {subject.id}
          </p>
        </div>
        <div>
          <p className='mb-2'>
            <span className='font-medium'>Theoretical Credits:</span>{" "}
            {subject.theoretical_credits}
          </p>
          <p className='mb-2'>
            <span className='font-medium'>Practical Credits:</span>{" "}
            {subject.practical_credits}
          </p>
        </div>
      </div>
      {subject.description && (
        <div className='mt-3'>
          <p className='font-medium mb-1'>Description:</p>
          <p className='text-gray-700 '>{subject.description}</p>
        </div>
      )}
    </div>
  );
};

export default SubjectDetails;
