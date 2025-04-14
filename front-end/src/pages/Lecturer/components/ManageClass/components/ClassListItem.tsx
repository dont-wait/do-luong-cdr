import { Subject, Class } from "../../../../../types/types";

interface classListItemProps {
  classItem: Class;
  subject: Subject;
  isSelected: boolean;
  onClick: () => void;
}

const ClassListItem = ({
  classItem,
  subject,
  isSelected,
  onClick,
}: classListItemProps) => {
  return (
    <li
      className={`list-group-item cursor-pointer ${isSelected ? "active" : ""}`}
      onClick={onClick}>
      <div className='d-flex justify-content-between align-items-center'>
        <div>
          <h6 className='mb-1 font-medium'>{classItem.id}</h6>
          <p className='text-sm mb-0'>
            {subject?.subject_name || "Loading..."}
          </p>
        </div>
        <i
          className={`fas ${
            isSelected ? "fa-chevron-down" : "fa-chevron-right"
          }`}></i>
      </div>
    </li>
  );
};

export default ClassListItem;
