import { useState, useEffect } from "react";
import { CrudFormClass } from "../../../../class/CrudFormClass";
import CrudForm from "../../../../components/CrudForm";
import { CrudFromField, Obj } from "../../../../types/types";
import { getData } from "../../../../utils/helps";
import { PLO_API, PLO_DETAIL_API } from "../../../../api/apiUrl";
import { PK } from "../../../../api/primaryKey";
import { useToast } from "../../../../hook/useToast";

const PloDetail = () => {
  const [plo, setPlo] = useState<Obj[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchCurriculums = async () => {
      try {
        const plos = await getData(PLO_API);
        setPlo(plos);
      } catch {
        showToast("Error fetching!", "error");
      }
    };
    fetchCurriculums();
  }, [showToast]);

  const inputFields: CrudFromField[] = [
    CrudFormClass.create({
      key: PK.PLO_DETAIL_API,
      label: "Plo Detail ID",
      type: "text",
      isRequired: true,
      isVisible: true,
    }),
    CrudFormClass.create({
      key: "plo_detail_name",
      label: "Plo Detail Name",
      type: "text",
      isRequired: true,
      isVisible: true,
    }),
    CrudFormClass.create({
      key: "plo_content",
      label: "Plo Detail Content",
      type: "text",
      isRequired: true,
      isVisible: true,
    }),
    CrudFormClass.create({
      key: "plo_id",
      label: "Plo ID",
      type: "text",
      isRequired: true,
      isVisible: true,
      isDropBox: true,
      dataDrop: plo,
      dropLabel: "plo_name",
    }),
  ];
  return (
    <CrudForm inputFields={inputFields} url={PLO_DETAIL_API} isFilter={true} />
  );
};

export default PloDetail;
