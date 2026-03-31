import { useState } from "react";
import MainLayout from "../layout/MainLayout";
import { AverageBox, BMIResult, CVDRiskBox, ResultBox, SugarResult } from "../data/fn";

const tabs = ["ข้อมูลส่วนตัว", "ความดัน", "เบาหวาน", "CVD", "สรุป"];

export default function Patient() {
    const [activeTab, setActiveTab] = useState(0);


    const [form, setForm] = useState<any>({
        firstName: "สมชาย",
        lastName: "ใจดี",
        age: 45,
        gender: "male",

        weight: 70,
        height: 170,
        waist: 85,

        sbp1: 128,
        dbp1: 82,
        sbp2: 130,
        dbp2: 84,

        sugarFasting: 105,
        sugarRandom: 140,

        smoking: "no",
        alcohol: "no",
    });



    return (
        <MainLayout>
            <h1 className="title mb-4">บันทึกผู้ป่วย</h1>

            {/* Tabs */}
            <div className="flex overflow-x-auto gap-2 mb-4">
                {tabs.map((t, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveTab(i)}
                        className={`
              px-4 py-2 rounded-full text-sm whitespace-nowrap
              ${activeTab === i
                                ? "bg-blue-600 text-white"
                                : "bg-white border text-gray-600"}
            `}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="card">

                {/* 🧾 ทั่วไป */}
                {activeTab === 0 && (
                    <div className="fade-in space-y-3">

                        {/* 🆔 เลขบัตร */}
                        <input className="input" value={form.citizenId} placeholder="เลขบัตรประชาชน"
                            onChange={(e) => setForm({ ...form, citizenId: e.target.value })} />

                        {/* 👤 ชื่อ */}
                        <div className="grid grid-cols-2 gap-2">
                            <input className="input" value={form.firstName} placeholder="ชื่อ"
                                onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                            <input className="input" value={form.lastName} placeholder="นามสกุล"
                                onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                        </div>

                        {/* 🎂 วันเกิด + อายุ */}
                        <div className="grid grid-cols-2 gap-2">

                            {/* วันเกิด */}
                            <input
                                type="date"
                                className="input"
                                value={form.birthDate}
                                onChange={(e) => {
                                    const birthDate = e.target.value;

                                    if (!birthDate) return;

                                    const today = new Date();
                                    const birth = new Date(birthDate);

                                    let age = today.getFullYear() - birth.getFullYear();

                                    // ✅ ปรับให้แม่น (ยังไม่ถึงวันเกิดปีนี้)
                                    const m = today.getMonth() - birth.getMonth();
                                    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                                        age--;
                                    }

                                    setForm({
                                        ...form,
                                        birthDate,
                                        age,
                                    });
                                }}
                            />

                            {/* อายุ (auto) */}
                            <input
                                className="input bg-gray-100"
                                placeholder="อายุ"
                                value={form.age || ""}
                                disabled
                            />

                        </div>

                        {/* 🚻 เพศ */}
                        <div className="flex gap-4 text-sm">
                            <label><input type="radio" name="gender" value={form.gender}
                                onChange={() => setForm({ ...form, gender: "male" })} /> ชาย</label>
                            <label><input type="radio" name="gender" value={form.gender}
                                onChange={() => setForm({ ...form, gender: "female" })} /> หญิง</label>
                        </div>

                        {/* 💍 สถานะ */}
                        <div className="flex flex-wrap gap-3 text-sm">
                            {["โสด", "คู่", "หม้าย", "หย่า", "แยก"].map((s) => (
                                <label key={s}>
                                    <input type="radio" name="status"
                                        onChange={() => setForm({ ...form, status: s })} /> {s}
                                </label>
                            ))}
                        </div>

                        {/* 💼 อาชีพ */}
                        <input className="input" placeholder="อาชีพ" value={form.job}
                            onChange={(e) => setForm({ ...form, job: e.target.value })} />

                        {/* 📍 ที่อยู่ */}
                        <input className="input" placeholder="บ้านเลขที่" value={form.houseNo}
                            onChange={(e) => setForm({ ...form, houseNo: e.target.value })} />
                        <input className="input" placeholder="หมู่" value={form.village}
                            onChange={(e) => setForm({ ...form, village: e.target.value })} />

                        <div className="grid grid-cols-2 gap-2">
                            <input className="input" placeholder="ตำบล" value={form.subdistrict}
                                onChange={(e) => setForm({ ...form, subdistrict: e.target.value })} />
                            <input className="input" placeholder="อำเภอ" value={form.district}
                                onChange={(e) => setForm({ ...form, district: e.target.value })} />
                        </div>

                        <input className="input" placeholder="จังหวัด" value={form.province}
                            onChange={(e) => setForm({ ...form, province: e.target.value })} />

                        {/* 🏥 สิทธิ */}
                        <div className="flex flex-wrap gap-3 text-sm">
                            {["บัตรทอง", "ข้าราชการ", "ประกันสังคม", "ไม่ทราบ"].map((s) => (
                                <label key={s}>
                                    <input type="radio" name="right"
                                        onChange={() => setForm({ ...form, right: s })} /> {s}
                                </label>
                            ))}
                        </div>

                        {/* ⚖️ สุขภาพ */}
                        <div className="grid grid-cols-3 gap-2">
                            <input className="input" placeholder="น้ำหนัก (kg)" value={form.weight}
                                onChange={(e) => setForm({ ...form, weight: e.target.value })} />
                            <input className="input" placeholder="ส่วนสูง (cm)" value={form.height}
                                onChange={(e) => setForm({ ...form, height: e.target.value })} />
                            <input className="input" placeholder="รอบเอว (cm)" value={form.waist}
                                onChange={(e) => setForm({ ...form, waist: e.target.value })} />
                        </div>
                        {/* BMI Result */}
                        {form.weight && form.height && (
                            <BMIResult weight={form.weight} height={form.height} />
                        )}

                    </div>
                )}

                {/* 💓 ความดัน */}
                {activeTab === 1 && (
                    <div className="fade-in space-y-3">
                        <div className="flex flex-wrap justify-end gap-3 text-xs text-gray-500 mt-2">

                            {/* ปกติ */}
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-green-500" />
                                <span>ปกติ &lt;130/80</span>
                            </div>

                            {/* เสี่ยง */}
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                                <span>เสี่ยง ≥130/80</span>
                            </div>

                            {/* สงสัยป่วย */}
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-orange-500" />
                                <span>สงสัย ≥140/90</span>
                            </div>

                            {/* ป่วย */}
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-red-600" />
                                <span>ป่วย ≥180/110</span>
                            </div>

                        </div>
                        {/* <div className="text-[10px] text-gray-400 text-right">
                            **มีการปรับเปลี่ยนเกณฑ์การจำแนแนกความรนแรงชองระดับความดันโลหิต ตามแนวทางการรักษาโรคความตันโลหิตส่งในเวชปฏิบัติทั่วไป พ.ศ. 2567 สมาคมความดันโลหิตสูงแห่งประเทศไทย
                        </div> */}
                        {/* ครั้งที่ 1 */}
                        <div className="card">
                            <div className="font-semibold text-blue-600 mb-2">ครั้งที่ 1</div>

                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    className="input"
                                    type="number"
                                    placeholder="SBP"
                                    value={form.sbp1}
                                    onChange={(e) =>
                                        setForm({ ...form, sbp1: Number(e.target.value) || undefined })
                                    }
                                />
                                <input
                                    className="input"
                                    type="number"
                                    placeholder="DBP"
                                    value={form.dbp1}
                                    onChange={(e) =>
                                        setForm({ ...form, dbp1: Number(e.target.value) || undefined })
                                    }
                                />
                            </div>

                            {form.sbp1 != null && form.dbp1 != null && (
                                <ResultBox
                                    sbp={form.sbp1}
                                    dbp={form.dbp1}
                                    title="ผลครั้งที่ 1"
                                />
                            )}
                        </div>

                        {/* ครั้งที่ 2 */}
                        <div className="card">
                            <div className="font-semibold text-blue-600 mb-2">ครั้งที่ 2</div>

                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    className="input"
                                    type="number"
                                    placeholder="SBP"
                                    value={form.sbp2}
                                    onChange={(e) =>
                                        setForm({ ...form, sbp2: Number(e.target.value) || undefined })
                                    }
                                />
                                <input
                                    className="input"
                                    type="number"
                                    placeholder="DBP"
                                    value={form.dbp2}
                                    onChange={(e) =>
                                        setForm({ ...form, dbp2: Number(e.target.value) || undefined })
                                    }
                                />
                            </div>

                            {form.sbp2 != null && form.dbp2 != null && (
                                <ResultBox
                                    sbp={form.sbp2}
                                    dbp={form.dbp2}
                                    title="ผลครั้งที่ 2"
                                />
                            )}
                        </div>

                        {/* ค่าเฉลี่ย */}
                        {form.sbp1 != null &&
                            form.sbp2 != null &&
                            form.dbp1 != null &&
                            form.dbp2 != null && (
                                <AverageBox
                                    sbp1={form.sbp1}
                                    dbp1={form.dbp1}
                                    sbp2={form.sbp2}
                                    dbp2={form.dbp2}
                                />
                            )}
                    </div>
                )}

                {/* 🍬 เบาหวาน */}
                {activeTab === 2 && (
                    <div className="fade-in space-y-3">
                        <div className="flex flex-wrap justify-end gap-3 text-xs text-gray-500 mt-2">

                            {/* ปกติ */}
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-green-500" />
                                <span>ปกติ ≥70mg%</span>
                            </div>

                            {/* เสี่ยง */}
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                                <span>เสี่ยง ≥100mg%</span>
                            </div>

                            {/* สงสัยป่วย */}
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-orange-500" />
                                <span>สงสัย ≥126mg%</span>
                            </div>
                        </div>


                        {/* ก่อนอาหาร */}

                        <input
                            className="input"
                            type="number"
                            placeholder="ระดับน้ำตาล ก่อนอาหาร (mg/dl)"
                            value={form.sugarFasting}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    sugarFasting: Number(e.target.value) || undefined,
                                })
                            }
                        />

                        {form.sugarFasting != null && (
                            <SugarResult
                                value={form.sugarFasting}
                                type="fasting"
                                title="ก่อนอาหาร"
                            />
                        )}
                        <div className="flex flex-wrap justify-end gap-3 text-xs text-gray-500 mt-2">

                            {/* ปกติ */}
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-green-500" />
                                <span>ปกติ ≥70mg%</span>
                            </div>

                            {/* เสี่ยง */}
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                                <span>เสี่ยง ≥110mg%</span>
                            </div>


                        </div>
                        {/* หลังอาหาร */}
                        <input
                            className="input"
                            type="number"
                            placeholder="ระดับน้ำตาล หลังอาหาร (mg/dl)"
                            value={form.sugarRandom}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    sugarRandom: Number(e.target.value) || undefined,
                                })
                            }
                        />

                        {form.sugarRandom != null && (
                            <SugarResult
                                value={form.sugarRandom}
                                type="random"
                                title="หลังอาหาร"
                            />
                        )}

                        {/* Legend */}
                        <div className="text-xs text-gray-500 mt-2 text-right">
                            *ไม่ระบุ = ตรวจแบบอดอาหาร
                        </div>

                    </div>
                )}

                {/* ❤️ CVD */}
                {activeTab === 3 && (
                    <div className="space-y-3">

                        <select className="input"
                            value={form.smoking}
                            onChange={(e) => setForm({ ...form, smoking: e.target.value })}>
                            <option value="">สูบบุหรี่</option>
                            <option value="yes">สูบ</option>
                            <option value="no">ไม่สูบ</option>
                        </select>

                        <CVDRiskBox
                            age={form.age}
                            sex={form.gender}
                            sbp={
                                form.sbp1 && form.sbp2
                                    ? Math.round((form.sbp1 + form.sbp2) / 2)
                                    : undefined
                            }
                            smoking={form.smoking =="yes"?true:false}
                            diabetes={form.sugarFasting >= 126}
                            waist={form.waist}
                            height={form.height}
                        />


                    </div>
                )}
                {/* 📊 สรุป */}
                {activeTab === 4 && (
                    <div className="fade-in space-y-3 text-sm">

                        {/* 👤 ข้อมูล */}
                        <div>
                            <div>ชื่อ: {form.firstName} {form.lastName}</div>
                            <div>อายุ: {form.age}</div>
                        </div>
                        {form.weight && form.height && (
                            <BMIResult weight={form.weight} height={form.height} />
                        )}
                        {form.sbp1 != null && form.dbp1 != null && (
                            <ResultBox
                                sbp={form.sbp1}
                                dbp={form.dbp1}
                                title="ผลครั้งที่ 1"
                            />
                        )}

                        {form.sbp2 != null && form.dbp2 != null && (
                            <ResultBox
                                sbp={form.sbp2}
                                dbp={form.dbp2}
                                title="ผลครั้งที่ 2"
                            />
                        )}
                        {form.sugarFasting != null && (
                            <SugarResult
                                value={form.sugarFasting}
                                type="fasting"
                                title="ก่อนอาหาร"
                            />
                        )}
                        {form.sugarRandom != null && (
                            <SugarResult
                                value={form.sugarRandom}
                                type="random"
                                title="หลังอาหาร"
                            />
                        )}

                        <CVDRiskBox
                            age={form.age}
                            sex={form.gender}
                            sbp={
                                form.sbp1 && form.sbp2
                                    ? Math.round((form.sbp1 + form.sbp2) / 2)
                                    : undefined
                            }
                            smoking={form.smoking}
                            diabetes={form.sugarFasting >= 126}
                            waist={form.waist}
                            height={form.height}
                        />

                        {/* 🚨 FINAL DECISION */}
                        <div className="card bg-gray-50 border">
                            <div className="font-semibold text-blue-600">
                                สรุปผล
                            </div>

                            <div className="mt-1 font-bold text-red-600">
                                {(
                                    (form.sugarFasting >= 126) ||
                                    (form.sbp1 >= 140 || form.sbp2 >= 140)
                                )
                                    ? "⚠️ ควรส่งต่อแพทย์"
                                    : "✅ เฝ้าระวัง / ปกติ"
                                }
                            </div>
                        </div>

                        {/* 💾 SAVE */}
                        <button className="btn-primary mt-3">
                            บันทึกข้อมูล
                        </button>

                    </div>
                )}

            </div>
        </MainLayout >
    );
}