import { useState, useEffect } from "react";
import CrudForm from "../../../../components/CrudForm";
import { CrudFromField, Obj } from "../../../../types/types";
import { getData } from "../../../../utils/helps";
import { CLO_API, PLO_API } from "../../../../api/apiUrl";
import { useToast } from "../../../../hook/useToast";

const PloClo = () => {
  const [plo, setPlo] = useState<Obj[]>([]);
  const [clo, setClo] = useState<Obj[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchCurriculums = async () => {
      try {
        const plos = await getData(PLO_API);
        setPlo(plos);

        const clos = await getData(CLO_API);
        setClo(clos);
      } catch {
        showToast("Error fetching!", "error");
      }
    };
    fetchCurriculums();
  }, [showToast]);

  const inputFields: CrudFromField[] = [
    CrudFormClass.create({
      key: "plo_id",
      label: "PLO ID",
      type: "text",
      isRequired: true,
      isVisible: true,
      isDropBox: true,
      dataDrop: plo,
      dropLabel: "plo_name",
    }),
    CrudFormClass.create({
      key: "clo_id",
      label: "CLO ID",
      type: "text",
      isRequired: true,
      isVisible: true,
      isDropBox: true,
      dataDrop: clo,
      dropLabel: "clo_name",
    }),
  ];
  return <CrudForm inputFields={inputFields} url={CLO_API} isFilter={true} />;
};

export default PloClo;
