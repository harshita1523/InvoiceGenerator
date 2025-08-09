import { useState } from "react";
import api from "../api/axios";
import CustomForm from "./CustomForm";
import { invoiceFormConfig } from "./invoice.config";

const InvoiceForm = () => {
  const [urlState, setUrlState] = useState({
    url: "",
    loading: false,
    error: "",
    success: false,
  });

  const onSubmit = async (formData:any) => {
    setUrlState({ loading: true, success: false, error: "", url: "" });

    try {
      const { data } = await api.post("/generate-invoice", formData, {
        responseType: "blob",
      });

      const file = new Blob([data], { type: "application/pdf" });
      const fileUrl = URL.createObjectURL(file);

      setUrlState((prev) => ({ ...prev, url: fileUrl, success: true }));
    } catch (error: any) {
      setUrlState({
        url: "",
        loading: true,
        error: error.message,
        success: false,
      });
    } finally {
      setUrlState((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-200 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-blue-700">
            Invoice Generator
          </h1>
          <p className="text-gray-600 mt-2">
            Create professional GST-compliant invoices quickly and easily.
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Hosted by{" "}
            <span className="font-semibold text-blue-600">Harshita Rajpal</span>
          </p>
        </div>

        <div className="max-w-md mx-auto my-6 space-y-4 text-center">
          {urlState.loading && (
            <p className="text-blue-600 font-medium">
              Generating invoice, please wait...
            </p>
          )}

          {urlState.error && (
            <p className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              Error: {urlState.error}
            </p>
          )}
          {urlState.success && (
            <div className="p-4 bg-green-100 border border-green-400 text-green-800 rounded-md">
              <p className="text-lg font-semibold mb-3">
                Invoice generated successfully!
              </p>
              {urlState.url && (
                <a
                  href={urlState.url}
                  download="invoice.pdf"
                  className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
                >
                  Download Invoice
                </a>
              )}
            </div>
          )}
        </div>

        <CustomForm
          onSubmit={onSubmit}
          questions={invoiceFormConfig}
          sectionwiseForm
          columns={2}
          sectionColumns={{
            "Seller Details": 3,
            "Buyer Details": 3,
            "Invoice Info": 2,
            "Product Details": 1,
          }}
        />
      </div>
    </div>
  );
};

export default InvoiceForm;
