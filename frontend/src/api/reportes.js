import { authFetch } from "./authFetch";

export const getReporteValor = async (params = {}) => {
  const query = new URLSearchParams(params).toString();

  try {
    const data = await authFetch(
      `/api/reportes/valor-inventario/?${query}`
    );
    return data.json();
  } catch (error) {
    console.error("Error cargando reporte de valor:", error);
    return null;
  }
};

export const descargarReporteExcel = async (params = {}) => {
  const query = new URLSearchParams(params).toString();

  const res = await authFetch(
    `/api/reportes/valor-inventario/excel/?${query}`,
    { method: "GET" }
  );

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "reporte_valor.xlsx";
  document.body.appendChild(a);
  a.click();
  a.remove();
};

export const descargarReporteValorPDF = async (params = {}) => {
  const query = new URLSearchParams(params).toString();

  const res = await authFetch(
    `/api/reportes/valor-inventario/pdf/?${query}`,
    { method: "GET" }
  );

  if (!res.ok) throw new Error("Error al descargar PDF");

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "reporte_valor_inventario.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
};