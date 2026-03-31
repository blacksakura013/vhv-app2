
// utils/bp.ts
export const getBPResult = (sbp?: number, dbp?: number) => {
  if (!sbp || !dbp) return "-";

  if (sbp < 120 && dbp < 80) return "ปกติ";
  if (sbp < 140 && dbp < 90) return "เสี่ยง";
  return "สงสัยป่วยต้องส่งต่อ";
};

export const getBPColor = (result: string) => {
  switch (result) {
    case "ปกติ":
      return "text-green-600";
    case "เสี่ยง":
      return "text-yellow-600";
    case "สงสัยป่วยต้องส่งต่อ":
      return "text-red-600";
    default:
      return "text-gray-400";
  }
};
type PropsResultBox = {
  sbp?: number;
  dbp?: number;
  title?: string;
};
export const ResultBox = ({ sbp, dbp, title }: PropsResultBox) => {

  const result = getBPResult(sbp, dbp);
  const color = getBPColor(result);

  if (!sbp || !dbp) return null;

  return (
    <div className="mt-2 text-sm bg-gray-50 p-2 rounded-lg">

      <div className="text-gray-600">
        {title}:
      </div>

      <div className="text-base font-semibold">
        {sbp}/{dbp} mmHg
      </div>

      <div className={`font-bold ${color}`}>
        {result}
      </div>

    </div>
  );
};


type PropsAverageBox = {
  sbp1?: number;
  dbp1?: number;
  sbp2?: number;
  dbp2?: number;
};

export const AverageBox = ({ sbp1, dbp1, sbp2, dbp2 }: PropsAverageBox) => {

  // ❗ ถ้ายังไม่ครบ 2 ครั้ง → ไม่แสดง
  if (!sbp1 || !dbp1 || !sbp2 || !dbp2) return null;

  const avgSBP = Math.round((sbp1 + sbp2) / 2);
  const avgDBP = Math.round((dbp1 + dbp2) / 2);

  const result = getBPResult(avgSBP, avgDBP);
  const color = getBPColor(result);

  return (
    <div className="mt-3 p-4 rounded-xl shadow bg-white border">

      <div className="text-blue-600 font-semibold mb-2">
        ผลเฉลี่ย (Final)
      </div>

      {/* ค่าเฉลี่ย */}
      <div className="text-xl font-bold">
        {avgSBP} / {avgDBP} mmHg
      </div>

      {/* ผล */}
      <div className={`mt-1 text-lg font-bold ${color}`}>
        {result}
      </div>

      {/* legend */}
      <div className="text-xs text-gray-500 mt-2">
        ปกติ &lt;120/80 | เสี่ยง 120-139/80-89 | ส่งต่อ ≥140/90
      </div>

    </div>
  );
};

type Props = {
  sbp?: number;
  dbp?: number;
};

export const RemarkBadge = ({ sbp, dbp }: Props) => {
  if (sbp == null || dbp == null) return null;

  const getStatus = () => {
    if (sbp < 130 && dbp < 80) {
      return {
        text: "ปกติ",
        color: "bg-green-500 text-green-600",
        range: "(<130/85)",
      };
    }

    if (sbp < 140 && dbp < 90) {
      return {
        text: "เสี่ยง",
        color: "bg-yellow-500 text-yellow-600",
        range: "(130-139 / 85-89)",
      };
    }

    return {
      text: "สงสัยป่วยต้องส่งต่อ",
      color: "bg-red-500 text-red-600",
      range: "(≥140/90)",
    };
  };

  const status = getStatus();
  const [dot, textColor] = status.color.split(" ");

  return (
    <div className="flex items-center gap-1 text-xs font-medium">
      {/* 🔴 จุดสี */}
      <span className={`w-2 h-2 rounded-full ${dot}`} />

      {/* 📝 ข้อความ */}
      <span className={textColor}>
        {status.text} {status.range}
      </span>
    </div>
  );
};
type PropsSugarResult = {
  value: number;
  type: "fasting" | "random";
  title: string;
};

export const SugarResult = ({ value, type, title }: PropsSugarResult) => {

  const getResult = () => {
    if (value < 70) return { text: "นอกเกณฑ์", color: "text-gray-500" };

    if (type === "fasting") {
      if (value < 100) return { text: "ปกติ", color: "text-green-600" };
      if (value < 126) return { text: "เสี่ยง", color: "text-yellow-600" };
      return { text: "สงสัยป่วย", color: "text-red-600" };
    }

    if (type === "random") {
      if (value < 110) return { text: "ปกติ", color: "text-green-600" };
      return { text: "เสี่ยง", color: "text-yellow-600" };
    }

    return { text: "-", color: "text-gray-400" };
  };

  const result = getResult();

  return (
    <div className="card">

      {/* header */}
      <div className="flex justify-between items-center mb-1">
        <div className="text-blue-600 font-semibold">
          {title}
        </div>

        <div className={`text-xs font-medium ${result.color}`}>
          ● {result.text}
        </div>
      </div>

      {/* value */}
      <div className="text-lg font-bold">
        {value} mg/dl
      </div>

    </div>
  );
};

type PropsBMIResult = {
  weight: number;
  height: number;
};

export const BMIResult = ({ weight, height }: PropsBMIResult) => {
  const h = height / 100;
  const bmi = weight / (h * h);

  const getResult = () => {
    if (bmi < 18.5) return { text: "ผอม", color: "text-blue-500" };
    if (bmi < 23) return { text: "ปกติ", color: "text-green-600" };
    if (bmi < 25) return { text: "ท้วม", color: "text-yellow-500" };
    if (bmi < 30) return { text: "อ้วน", color: "text-orange-500" };
    return { text: "อ้วนมาก", color: "text-red-600" };
  };

  const result = getResult();

  return (
    <div className="card mt-2">

      <div className="flex justify-between items-center mb-1">
        <div className="text-blue-600 font-semibold">
          BMI
        </div>

        <div className={`text-xs font-medium ${result.color}`}>
          ● {result.text}
        </div>
      </div>

      <div className="text-lg font-bold">
        {bmi.toFixed(1)}
      </div>

    </div>
  );
};

// src/services/cvRisk.service.ts

 
type Input = {
  age: number;
  sex: "male" | "female";
  sbp: number;
  smoking: boolean;
  diabetes: boolean;
  waist: number;
  height: number;
};

export const calculateThaiCVRisk = (input: Input) => {
  const {
    age,
    sex,
    sbp,
    smoking,
    diabetes,
    waist,
    height,
  } = input;

  // normalize
  const SEX = sex === "male" ? 1 : 0;
  const SMOKING = smoking ? 1 : 0;
  const DM = diabetes ? 1 : 0;

  const ratio = waist / height;

  // 🔥 Full Score (ตรงสูตร)
  const fullScore =
    0.079 * age +
    0.128 * SEX +
    0.019350987 * sbp +
    0.58454 * DM +
    3.512566 * ratio +
    0.459 * SMOKING;

  // 🔥 Risk %
  const risk =
    (1 - Math.pow(0.978296, Math.exp(fullScore - 7.720484))) * 100;

  const percent = +risk.toFixed(2);

  return {
    percent,
    level: getRiskLevel(percent),
    fullScore,
  };
};

// 🎯 ระดับความเสี่ยง (ใช้จริง)
const getRiskLevel = (risk: number) => {
  if (risk < 10) return "ต่ำ";
  if (risk < 20) return "ปานกลาง";
  return "สูง";
};

type PropsCVDRiskBox = {
  age?: number;
  sex?: "male" | "female";
  sbp?: number; // ใช้ค่าเฉลี่ย
  smoking?: boolean;
  diabetes?: boolean;
  totalCholesterol?: number;
  waist?: number;
  height?: number;
};
 
export const CVDRiskBox = ({
  age,
  sex,
  sbp,
  smoking = false,
  diabetes = false,
  totalCholesterol,
  waist,
  height,
}: PropsCVDRiskBox) => {

  // ✅ guard (ถูกต้อง)
  if (age == null || sex == null || sbp == null) {
    return (
      <div className="card text-sm text-gray-400 text-center">
        กรุณากรอกข้อมูลให้ครบ (อายุ / เพศ / ความดัน)
      </div>
    );
  }

  const result = calculateThaiCVRisk({
    age,
    sex,
    sbp,
    smoking,
    diabetes,
    totalCholesterol,
    waist,
    height,
  });

  const getColor = () => {
    switch (result.level) {
      case "ต่ำ":
        return "text-green-600";
      case "ปานกลาง":
        return "text-yellow-600";
      default:
        return "text-red-600";
    }
  };

  const getBg = () => {
    switch (result.level) {
      case "ต่ำ":
        return "bg-green-50";
      case "ปานกลาง":
        return "bg-yellow-50";
      default:
        return "bg-red-50";
    }
  };

  return (
    <div className={`card ${getBg()}`}>

      {/* header */}
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold text-blue-600">
          CVD Risk (10 ปี)
        </div>

        <div className={`text-xs font-medium ${getColor()}`}>
          ● {result.level}
        </div>
      </div>

      {/* value */}
      <div className="text-3xl font-bold">
        {result.percent} %
      </div>

      {/* progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded mt-2">
        <div
          className={`h-2 rounded ${
            result.level === "ต่ำ"
              ? "bg-green-500"
              : result.level === "ปานกลาง"
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
          style={{ width: `${Math.min(result.percent, 100)}%` }}
        />
      </div>

      {/* hint */}
      <div className="text-xs text-gray-500 mt-2">
        ความเสี่ยงโรคหัวใจและหลอดเลือดใน 10 ปี
      </div>

      {/* legend */}
      <div className="flex justify-end gap-3 text-xs text-gray-400 mt-2">
        <span className="text-green-600">● ต่ำ &lt;10%</span>
        <span className="text-yellow-600">● ปานกลาง 10-20%</span>
        <span className="text-red-600">● สูง &gt;20%</span>
      </div>

    </div>
  );
};