import { GST_REGEX, type FieldConfig } from "../utils/CutsomFormHelpers";
import CustomForm from "./CustomForm";

const InvoiceForm = () => {
  const onSubmit = () => {};

  const formconfig: FieldConfig[] = [
    {
      name: "seller_name",
      label: "Seller Name",
      type: "text",
      placeholder: "Enter seller name",
      required: true,
      section: "Seller Details",
    },
    {
      name: "seller_address",
      label: "Seller Address",
      type: "text",
      placeholder: "Enter seller address",
      required: true,
      section: "Seller Details",
    },
    {
      name: "seller_gst",
      label: "Seller GST Number",
      type: "text",
      pattern: GST_REGEX,
      placeholder: "Enter GST number",
      section: "Seller Details",
    },

    {
      name: "buyer_name",
      label: "Buyer Name",
      type: "text",
      placeholder: "Enter buyer name",
      required: true,
      section: "Buyer Details",
    },
    {
      name: "buyer_address",
      label: "Buyer Address",
      type: "text",
      placeholder: "Enter buyer address",
      required: true,
      section: "Buyer Details",
    },
    {
      name: "buyer_gst",
      label: "Buyer GST Number",
      type: "text",
      pattern: GST_REGEX,
      placeholder: "Enter GST number",
      section: "Buyer Details",
    },
    {
      name: "invoice_number",
      label: "Invoice Number",
      type: "text",
      placeholder: "Enter invoice number",
      required: true,
      section: "Invoice Details",
    },
    {
      name: "invoice_date",
      label: "Invoice Date",
      type: "date",
      required: true,
      section: "Invoice Details",
    },

    // {
    //   name: "products",
    //   label: "Product Line Items",
    //   type: "dynamic",
    //   fields: [
    //     { name: "product_name", label: "Product Name", type: "text", placeholder: "Enter product name", required: true },
    //     { name: "quantity", label: "Quantity", type: "number", placeholder: "Enter quantity", required: true },
    //     { name: "rate", label: "Rate per Unit", type: "number", placeholder: "Enter rate", required: true },
    //     { name: "tax", label: "Tax %", type: "number", placeholder: "Enter tax percentage" }
    //   ]
    // }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-200 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Page Heading */}
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

        {/* Form */}
        <CustomForm
          onSubmit={onSubmit}
          questions={formconfig}
          sectionwiseForm
          columns={2}
          sectionColumns={{
            "Seller Details": 3,
            "Buyer Details": 3,
            "Invoice Info": 2,
          }}
        />
      </div>
    </div>
  );
};

export default InvoiceForm;
