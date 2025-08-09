import tempfile
from typing import List, Optional
from fastapi import FastAPI;
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from jinja2 import Environment, FileSystemLoader
from pydantic import BaseModel, Field
from weasyprint import HTML

app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
def root():
    return {"helloooo"+"world!"}

class Product(BaseModel):
    product_name:str=Field(...,min_length=1)
    quantity:int =Field(...,gt=0)
    rate:float=Field(..., gt=0)
    tax:float=Field(...,ge=0)
    amount:Optional[float]=None

class Invoice(BaseModel):
    buyer_name:str
    buyer_address:str
    buyer_gst:str
    seller_gst:str
    seller_name:str
    seller_address:str
    invoice_number:str
    invoice_date:str
    products:List[Product]
    grand_total:Optional[float]=0

templates_env = Environment(loader=FileSystemLoader("templates"))
templates_env.globals['enumerate'] = enumerate

@app.post("/generate-invoice")
def generate_invoice(data:Invoice):

    grand_total=0
    for product  in data.products:
        product.amount=(product.quantity*product.rate)+product.tax
        grand_total+=product.amount
    data.grand_total=grand_total

    template=templates_env.get_template("invoice-template.html")
    html_content=template.render(**data.dict())

    with tempfile.NamedTemporaryFile(delete=False,suffix=".pdf") as tmp_pdf:
        HTML(string=html_content).write_pdf(tmp_pdf.name)
        pdf_path=tmp_pdf.name
    return FileResponse(pdf_path,media_type="application/pdf",filename="invoice.pdf")