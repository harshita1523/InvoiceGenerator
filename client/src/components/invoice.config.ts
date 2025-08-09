import { GST_REGEX, type FieldConfig } from "../utils/CutsomFormHelpers";

export const invoiceFormConfig: FieldConfig[] = [
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
      required: true,

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
      required: true,

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

    {
      name: "products",
      label: "Product Line Items",
      type: "dynamic",
      section: "Product Details",
      fields: [
        {
          name: "product_name",
          label: "Product Name",
          type: "text",
          placeholder: "Enter product name",
          required: true,
        },
        {
          name: "quantity",
          label: "Quantity",
          type: "number",
          placeholder: "Enter quantity",
          required: true,
        },
        {
          name: "rate",
          label: "Rate per Unit",
          type: "number",
          placeholder: "Enter rate",
          required: true,
        },
        {
          name: "tax",
          label: "Tax %",
          type: "number",
          placeholder: "Enter tax percentage",
        },
      ],
    },
  ];