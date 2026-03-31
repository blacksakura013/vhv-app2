// src/pages/Register.tsx
import { useState } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState<any>({});

  const handleSubmit = () => {
    if (!form.firstName || !form.lastName || !form.phone || !form.password) {
      alert("กรอกข้อมูลให้ครบ");
      return;
    }

    try {
      register(form);
      alert("สมัครสำเร็จ");
      navigate("/");
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow">

        <h2 className="text-xl text-blue-600 font-bold mb-4 text-center">
          Register
        </h2>

        <input className="input" placeholder="ชื่อ"
          onChange={(e)=>setForm({...form, firstName:e.target.value})}/>
        <input className="input" placeholder="นามสกุล"
          onChange={(e)=>setForm({...form, lastName:e.target.value})}/>
        <input className="input" placeholder="เบอร์"
          onChange={(e)=>setForm({...form, phone:e.target.value})}/>
        <input className="input" type="password" placeholder="รหัสผ่าน"
          onChange={(e)=>setForm({...form, password:e.target.value})}/>

        <input className="input" placeholder="ที่อยู่"
          onChange={(e)=>setForm({...form, address:e.target.value})}/>
        <input className="input" placeholder="อำเภอ"
          onChange={(e)=>setForm({...form, district:e.target.value})}/>
        <input className="input" placeholder="ตำบล"
          onChange={(e)=>setForm({...form, subdistrict:e.target.value})}/>
        <input className="input" placeholder="จังหวัด"
          onChange={(e)=>setForm({...form, province:e.target.value})}/>
        <input className="input" placeholder="รหัสไปรษณีย์"
          onChange={(e)=>setForm({...form, zipcode:e.target.value})}/>

        <button onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg mt-2">
          สมัครสมาชิก
        </button>
      </div>
    </div>
  );
}