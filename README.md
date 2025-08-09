# Invoice Generator - Fullstack Application

[![React](https://img.shields.io/badge/Frontend-React-blue)](https://reactjs.org/)  
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-green)](https://fastapi.tiangolo.com/)  
[![WeasyPrint](https://img.shields.io/badge/PDF-WeasyPrint-orange)](https://weasyprint.org/)  

---

## 🚀 Project Overview

This is a **professional GST-compliant Invoice Generator** fullstack web application built with React on the frontend and FastAPI on the backend. It allows users to fill in invoice details dynamically and generate a downloadable PDF invoice.

The app supports dynamic product line items, proper validation, and seamless PDF generation and download.

---

## 🔗 Live Demo

Check out the live demo here:  
[https://invoicegenerator-client.onrender.com/](https://invoicegenerator-client.onrender.com/)

## 🎯 Features

- Dynamic, reusable form components built using **React Hook Form** with validation
- Dynamic addition/removal of product line items with a clean UI
- Backend API built with **FastAPI** for generating PDF invoices using **WeasyPrint** and **Jinja2** templating
- PDF is returned as a downloadable file blob from backend to frontend
- Full deployment on Render for both frontend and backend services
- Responsive, modern UI with error & success handling

---

## 🛠 Tech Stack

| Layer       | Technologies Used                            |
|-------------|---------------------------------------------|
| Frontend   | React, React Hook Form, TypeScript, Tailwind CSS, Axios |
| Backend    | FastAPI, Pydantic, Jinja2 Templates, WeasyPrint, Uvicorn |
| Deployment | Render (Frontend & Backend as separate services) |

---

## 📝 Frontend Details: React Form

- The form is built with **React Hook Form** for easy validation and state management.
- A generic `CustomForm` component renders fields dynamically based on config.
- The `DynamicFieldArray` component handles arrays of product line items, allowing users to add/remove rows dynamically.
- Validation is enforced using patterns and required flags.
- On submit, form data is sent as JSON to the FastAPI backend.
- On success, the backend responds with a PDF blob URL, and the user can download the invoice.

---

## 🔧 Backend Details: FastAPI & PDF Generation

- The backend exposes an API endpoint `/generate-invoice` which accepts invoice data via POST.
- Uses **Pydantic** models to validate request data.
- The invoice HTML template is rendered using **Jinja2** templates.
- **WeasyPrint** converts the rendered HTML invoice into a PDF.
- The PDF is sent back as a streamed file response for frontend to download.

---

## 📦 Setup & Running Locally

### Frontend (React)

```bash
cd client
npm install
npm run dev
```


### Backend (React)

```bash
cd server
pip install -r requirements.txt
uvicorn main:app --reload
```




