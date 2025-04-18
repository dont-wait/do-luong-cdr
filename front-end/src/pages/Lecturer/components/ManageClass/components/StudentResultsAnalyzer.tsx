import React, { useState, useEffect, useCallback } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import * as XLSX from "xlsx";
import { getData } from "../../../../../utils/helps";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

type ScoreResult = {
  score: number;
  result: string;
};

interface Student {
  id: string;
  first_name: string;
  last_name: string;
  examList: Record<string, number>;
  cloList: Record<string, ScoreResult>;
  GPA: ScoreResult;
  CDR: ScoreResult;
  result: string;
}

interface Stat {
  name: string;
  passRate: number;
  failRate: number;
  passing: number;
  total: number;
}

interface Props {
  selectedClassId: string;
}

const StudentResultsAnalyzer: React.FC<Props> = ({ selectedClassId }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [examFields, setExamFields] = useState<string[]>([]);
  const [cloFields, setCloFields] = useState<string[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<string>("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [isExporting, setIsExporting] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const keyVal = (obj: any, key: string) =>
    key.includes(".") ? key.split(".").reduce((o, k) => o?.[k], obj) : obj[key];

  useEffect(() => {
    if (!selectedClassId) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getData(`/cdr/grading/${selectedClassId}`);
        const data: Student[] = res.data;

        setStudents(data);
        if (data.length) {
          setExamFields(Object.keys(data[0].examList));
          setCloFields(Object.keys(data[0].cloList));
          computeStats(data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedClassId]);

  const computeStats = useCallback((data: Student[]) => {
    if (!data.length) return;
    const total = data.length;
    const arr: Stat[] = [];

    // Xử lý CLO
    Object.keys(data[0].cloList).forEach((clo) => {
      const passing = data.filter(
        (s) => s.cloList[clo].result === "đạt"
      ).length;
      arr.push({
        name: clo,
        passRate: (passing / total) * 100,
        failRate: 100 - (passing / total) * 100,
        passing,
        total,
      });
    });

    // Xử lý GPA và CDR
    ["GPA", "CDR"].forEach((key) => {
      const passing = data.filter(
        (s) => s[key as keyof Student].result === "Đạt"
      ).length;
      arr.push({
        name: key,
        passRate: (passing / total) * 100,
        failRate: 100 - (passing / total) * 100,
        passing,
        total,
      });
    });

    setStats(arr);
  }, []);

  const sortData = (key: string) => {
    const dir = sortKey === key && sortDir === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortDir(dir);
  };

  const filtered = students
    .filter(
      (s) =>
        s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${s.last_name} ${s.first_name}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = keyVal(a, sortKey) ?? "";
      const bVal = keyVal(b, sortKey) ?? "";
      if (typeof aVal === "string")
        return sortDir === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      return sortDir === "asc" ? aVal - bVal : bVal - aVal;
    });

  const exportExcel = async () => {
    setIsExporting(true);
    try {
      const rows = students.map((s) => {
        const r: any = { Mã: s.id, Họ: s.last_name, Tên: s.first_name };
        examFields.forEach((f) => (r[f] = s.examList[f]));
        cloFields.forEach((f) => {
          r[f] = s.cloList[f].score;
          r[`${f} KQ`] = s.cloList[f].result;
        });
        r["GPA Điểm"] = s.GPA.score;
        r["KQ GPA"] = s.GPA.result;
        r["CDR Điểm"] = s.CDR.score;
        r["KQ CDR"] = s.CDR.result;
        r["Kết quả"] = s.result;
        return r;
      });

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        wb,
        XLSX.utils.json_to_sheet(rows),
        "Dữ liệu"
      );

      const statRows = stats.map((st) => ({
        Chuẩn: st.name,
        Tổng: st.total,
        Đạt: st.passing,
        "Không đạt": st.total - st.passing,
        "%Đạt": st.passRate.toFixed(2),
      }));
      XLSX.utils.book_append_sheet(
        wb,
        XLSX.utils.json_to_sheet(statRows),
        "Thống kê"
      );

      XLSX.writeFile(wb, `KQ_${new Date().toISOString().slice(0, 10)}.xlsx`);
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading) {
    return (
      <div className='fixed top-0 left-[256px] bottom-0 right-0 py-5 bg-[rgba(0,0,0,0.5)] flex flex-col justify-center align-middle'>
        <div
          className='spinner-border text-white relative left-[50%] translate-x-[-50%]'
          role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
        <p className='mt-2 text-white text-center'>
          Đang tải dữ liệu sinh viên...
        </p>
      </div>
    );
  }

  return (
    <div className='container my-4 shadow p-4' style={{ borderRadius: "10px" }}>
      <div className='d-flex justify-content-between align-items-center mb-3 p-4'>
        <h3>Kết quả Sinh viên</h3>
        <div className='d-flex gap-2'>
          <button
            style={{ width: "200px" }}
            className='btn btn-success'
            onClick={exportExcel}
            disabled={isExporting || isLoading}>
            {isExporting ? "Đang Xuất..." : "Xuất Excel"}
          </button>
          <button
            style={{ width: "200px" }}
            className='btn btn-primary'
            onClick={() => setShowStats(!showStats)}>
            {showStats ? "Bảng Điểm" : "Thống Kê"}
          </button>
        </div>
      </div>

      {!showStats ? (
        <>
          <input
            type='text'
            className='form-control mb-3'
            placeholder='Tìm kiếm mã/tên sinh viên...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className='table-responsive shadow-sm'>
            <table className='table table-hover bg-white shadow'>
              <thead className='table-light'>
                <tr className='text-center'>
                  <th onClick={() => sortData("id")}>Mã SV</th>
                  <th onClick={() => sortData("last_name")}>Họ Tên</th>
                  {examFields.map((f) => (
                    <th key={f}>{f}</th>
                  ))}
                  {cloFields.map((f) => (
                    <th key={f}>{f}</th>
                  ))}
                  <th>GPA</th>
                  <th>CDR</th>
                  <th>Kết quả</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id} className='text-center'>
                    <td valign='middle'>{s.id}</td>
                    <td valign='middle'>
                      {s.last_name} {s.first_name}
                    </td>
                    {examFields.map((f) => (
                      <td valign='middle' key={f}>
                        {s.examList[f].toFixed(1)}
                      </td>
                    ))}
                    {cloFields.map((f) => {
                      return (
                        <td key={f}>
                          <div>{s.cloList[f].score.toFixed(1)}</div>
                          <span
                            className={`w-full p-2 badge ${
                              s.cloList[f].result === "đạt"
                                ? "bg-success"
                                : "bg-danger"
                            }`}>
                            {s.cloList[f].result}
                          </span>
                        </td>
                      );
                    })}
                    <td>
                      <div>{s.GPA.score.toFixed(1)}</div>
                      <span
                        className={`w-full p-2 badge ${
                          s.GPA.result === "Đạt" ? "bg-success" : "bg-danger"
                        }`}>
                        {s.GPA.result}
                      </span>
                    </td>
                    <td>
                      <div>{s.CDR.score.toFixed(1)}</div>
                      <span
                        className={`w-full p-2 badge ${
                          s.CDR.result === "Đạt" ? "bg-success" : "bg-danger"
                        }`}>
                        {s.CDR.result}
                      </span>
                    </td>
                    <td>
                      <div>...</div>
                      <span
                        className={`w-full p-2 badge ${
                          s.result === "Đạt" ? "bg-success" : "bg-danger"
                        }`}>
                        {s.result}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <div className='row card-body shadow-sm col-md-12'>
            <div className='col-md-6'>
              <Bar
                data={{
                  labels: stats.map((s) => s.name),
                  datasets: [
                    {
                      label: "Đạt %",
                      data: stats.map((s) => s.passRate),
                      backgroundColor: "rgba(75,192,192,0.6)",
                    },
                    {
                      label: "Không đạt %",
                      data: stats.map((s) => s.failRate),
                      backgroundColor: "rgba(255,99,132,0.6)",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: "TỶ LỆ ĐẠT/KHÔNG ĐẠT TỔNG THỂ",
                    },
                    legend: { position: "top" },
                  },
                  scales: {
                    y: {
                      max: 100,
                      title: { display: true, text: "Tỷ lệ (%)" },
                    },
                  },
                }}
              />
            </div>
            <div className='row col-md-6'>
              <div className='col-md-6'>
                <div className='card shadow-sm h-100'>
                  <div className='card-body'>
                    <h5 className='card-title text-center mb-3'>GPA</h5>
                    <Pie
                      data={{
                        labels: ["Đạt", "Không đạt"],
                        datasets: [
                          {
                            data: [
                              stats.find((s) => s.name === "GPA")?.passRate ||
                                0,
                              stats.find((s) => s.name === "GPA")?.failRate ||
                                0,
                            ],
                            backgroundColor: [
                              "rgba(75,192,192,0.6)",
                              "rgba(255,99,132,0.6)",
                            ],
                          },
                        ],
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className='col-md-6'>
                <div className='card shadow-sm h-100'>
                  <div className='card-body'>
                    <h5 className='card-title text-center mb-3'>CDR</h5>
                    <Pie
                      data={{
                        labels: ["Đạt", "Không đạt"],
                        datasets: [
                          {
                            data: [
                              stats.find((s) => s.name === "CDR")?.passRate ||
                                0,
                              stats.find((s) => s.name === "CDR")?.failRate ||
                                0,
                            ],
                            backgroundColor: [
                              "rgba(75,192,192,0.6)",
                              "rgba(255,99,132,0.6)",
                            ],
                          },
                        ],
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentResultsAnalyzer;
