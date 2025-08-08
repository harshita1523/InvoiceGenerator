from fastapi import FastAPI;

app=FastAPI()

@app.get("/")
def root():
    return {"helloooo"+"world!"}

items=[]

@app.post("/generate-invoice")
def generate_invoice():
    return {"hehyy i recieved your requesttt....."}