export const exportToCSV = (data: any) => {
  const headers = Object.keys(data).join(",");
  const values = Object.values(data).join(",");

  const csv = headers + "\n" + values;

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `patient_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};