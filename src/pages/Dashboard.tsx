// src/pages/Dashboard.tsx

import { useMemo, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { calculateThaiCVRisk } from "../data/fn";
import { generatePatients } from "../data/mockUsers";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

export default function Dashboard() {
  const [search, setSearch] = useState("");

  // 📦 mock data
  const patients = useMemo(() => generatePatients(100), []);

  // 🎯 avg BP
  const getAvgBP = (p: any) =>
    Math.round((p.sbp1 + p.sbp2) / 2);

  // 🔥 1. process data (สำคัญสุด)
  const processed = useMemo(() => {
    return patients.map((p) => {
      const avg = getAvgBP(p);

      const risk = calculateThaiCVRisk({
        age: p.age,
        sex: p.gender,
        sbp: avg,
        smoking: p.smoking,
        diabetes: p.sugarFasting >= 126,
        waist: p.waist,
        height: p.height,
      });

      return {
        ...p,
        avgBP: avg,
        risk,
      };
    });
  }, [patients]);

  // 🔍 2. filter
  const filtered = useMemo(() => {
    return processed.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [processed, search]);

  // 📊 3. summary
  const summary = useMemo(() => {
    const s = {
      low: 0,
      mid: 0,
      high: 0,
      veryHigh: 0,
      danger: 0,
    };

    processed.forEach((p) => {
      switch (p.risk.level) {
        case "ต่ำ": s.low++; break;
        case "ปานกลาง": s.mid++; break;
        case "สูง": s.high++; break;
        case "สูงมาก": s.veryHigh++; break;
        case "อันตราย": s.danger++; break;
      }
    });

    return s;
  }, [processed]);

  // 📊 4. age chart
  const ageData = useMemo(() => {
    const groups: any = {
      "30-39": 0,
      "40-49": 0,
      "50-59": 0,
      "60+": 0,
    };

    processed.forEach((p) => {
      if (p.age < 40) groups["30-39"]++;
      else if (p.age < 50) groups["40-49"]++;
      else if (p.age < 60) groups["50-59"]++;
      else groups["60+"]++;
    });

    return Object.keys(groups).map((k) => ({
      name: k,
      value: groups[k],
    }));
  }, [processed]);

  // 🥧 5. gender chart
  const genderData = useMemo(() => {
    let male = 0, female = 0;

    processed.forEach((p) => {
      if (p.gender === "male") male++;
      else female++;
    });

    return [
      { name: "ชาย", value: male },
      { name: "หญิง", value: female },
    ];
  }, [processed]);

  // 🎯 color helper
  const getColor = (level: string) => {
    switch (level) {
      case "ต่ำ": return "text-green-600";
      case "ปานกลาง": return "text-yellow-500";
      case "สูง": return "text-orange-500";
      case "สูงมาก": return "text-red-500";
      default: return "text-red-700";
    }
  };

  return (
    <MainLayout>
      <h1 className="title mb-4">Dashboard</h1>

      {/* 🔍 Search */}
      <input
        className="input mb-3"
        placeholder="ค้นหาชื่อ..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 📊 Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4 text-center text-sm">
        <div className="card">
          <div className="text-green-600">ต่ำ</div>
          <div className="text-xl font-bold">{summary.low}</div>
        </div>
        <div className="card">
          <div className="text-yellow-500">ปานกลาง</div>
          <div className="text-xl font-bold">{summary.mid}</div>
        </div>
        <div className="card">
          <div className="text-orange-500">สูง</div>
          <div className="text-xl font-bold">{summary.high}</div>
        </div>
        <div className="card">
          <div className="text-red-500">สูงมาก</div>
          <div className="text-xl font-bold">{summary.veryHigh}</div>
        </div>
        <div className="card">
          <div className="text-red-700">อันตราย</div>
          <div className="text-xl font-bold">{summary.danger}</div>
        </div>
      </div>

      {/* 📊 Charts */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">

      <div className="card shadow-sm border border-gray-100">
  {/* header */}
  <div className="flex justify-between items-center mb-3">
    <div>
      <div className="text-sm text-gray-400">สถิติผู้ป่วย</div>
      <div className="font-semibold text-blue-600">
        ผู้ป่วยตามช่วงอายุ
      </div>
    </div>

    <div className="text-xs text-gray-400">
      รวม {ageData.reduce((a, b) => a + b.value, 0)} คน
    </div>
  </div>

  {/* chart */}
  <ResponsiveContainer width="100%" height={260}>
    <BarChart data={ageData} barSize={30}>
      
      <XAxis
        dataKey="name"
        tick={{ fontSize: 12 }}
        axisLine={false}
        tickLine={false}
      />

      <YAxis
        tick={{ fontSize: 12 }}
        axisLine={false}
        tickLine={false}
      />

      <Tooltip
        cursor={{ fill: "rgba(59,130,246,0.08)" }}
        formatter={(v: any) => [`${v} คน`, "จำนวน"]}
      />

      <Bar
        dataKey="value"
        radius={[8, 8, 0, 0]}
        className="fill-blue-500"
      >
        {/* label บนแท่ง */}
        {ageData.map((entry, index) => (
          <text
            key={index}
            x={0}
            y={0}
            dy={-5}
            fill="#1f2937"
            fontSize={12}
            textAnchor="middle"
          />
        ))}
      </Bar>

    </BarChart>
  </ResponsiveContainer>
</div>

        {/* 🥧 Gender */}
        <div className="card">
          <div className="font-semibold mb-2 text-blue-600">
            สัดส่วนเพศ
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={genderData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {genderData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.name === "ชาย" ? "#3b82f6" : "#ec4899"}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(v: any) => `${v} คน`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* 📋 Table */}
      <div className="card overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">ชื่อ</th>
              <th>อายุ</th>
              <th>BP</th>
              <th>น้ำตาล</th>
              <th>CVD %</th>
              <th>สถานะ</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{p.name}</td>
                <td>{p.age}</td>
                <td>{p.avgBP}</td>
                <td>{p.sugarFasting}</td>
                <td>{p.risk.percent}%</td>
                <td className={getColor(p.risk.level)}>
                  ● {p.risk.level}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </MainLayout>
  );
}