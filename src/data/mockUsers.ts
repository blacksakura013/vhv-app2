// src/data/mockUsers.ts
export const mockUsers = [
  {
    id: 1,
    firstName: "Admin",
    lastName: "System",
    phone: "0864027789",
    password: "1234",
    role: "admin",
  },
  {
    id: 2,
    firstName: "Officer",
    lastName: "User",
    phone: "0615978938",
    password: "1234",
    role: "officer",
  },
];

export const generatePatients = (count = 100) => {
  const list = [];

  for (let i = 1; i <= count; i++) {
    const age = Math.floor(Math.random() * 40) + 30;
    const sbp1 = Math.floor(Math.random() * 60) + 110;
    const sbp2 = sbp1 + Math.floor(Math.random() * 10);
    const dbp1 = Math.floor(Math.random() * 30) + 70;
    const dbp2 = dbp1 + Math.floor(Math.random() * 5);

    const sugarFasting = Math.floor(Math.random() * 80) + 80;

    list.push({
      id: i,
      name: `ผู้ป่วย ${i}`,
      age,
      gender: i % 2 === 0 ? "male" : "female",

      sbp1,
      dbp1,
      sbp2,
      dbp2,

      sugarFasting,

      smoking: Math.random() > 0.7,
      weight: 60 + Math.random() * 20,
      height: 160 + Math.random() * 15,
      waist: 75 + Math.random() * 15,
    });
  }

  return list;
};