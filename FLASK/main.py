import json
import time
import operator #sort
from flask import Flask,render_template,make_response
from flask import request,jsonify
from flask_cors import CORS
import requests
import csv
from csv import DictWriter
import os
from email.message import EmailMessage
import ssl
import smtplib

from PyPDF2 import PdfReader,PdfWriter

def emailsender(email_receiver,email_receiver_name,bookname):
    email_sender = 'virtuallibrary2023@gmail.com'
    email_password = "zjddwxucirycnwfh"
    subject = "Book Recommendation - "+bookname
    body = "Dear "+email_receiver_name+""",

I hope this email finds you well. I just wanted to let you know that you are currently reading the book book_name_virtual in the virtual library and I am finding it to be a very useful resource for learning.

If you are also interested in learning book_name_virtual, I would highly recommend this book. It  covers a range of topics.

I hope you find this recommendation helpful. Let me know if you have any questions about the book or suggest book at virtuallibrary2023@gmail.com.

Best regards,
Virtual library""".replace("book_name_virtual",bookname)
    em = EmailMessage()
    em['From'] = email_sender
    em['To'] = email_receiver
    em['subject'] = subject
    em.set_content(body)

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(email_sender, email_password)
        smtp.sendmail(email_sender, email_receiver, em.as_string())

def read_csv():
    info=[]
    with open("login_info.csv") as login_info:
        read = csv.reader(login_info)
        for i in read:
            info.append(i)
    return info

def read_book():
    info=[]
    with open("books.csv") as login_info:
        read = csv.reader(login_info)
        for i in read:
            info.append(i)
    return info


app=Flask(__name__)
CORS(app)

@app.route('/signup/',methods=['POST',"GET"])
def signup():
    if request.method=="POST":
        print(request.values)
        a=request.data
        print(json.loads(a.decode()))
        a=json.loads(a.decode())
        #print(type(a),a["username"])
        email = a["email"]
        password = a['password']
        name=a['name']
        print(email, password)
        info = read_csv()
        for i in info:
            if len(i) == 0:
                continue
            if i[0] == email:
                print("HELLO")
                #return render_template("index.html", er="This email already exist \n please login here")
                return jsonify("Already exist")

        dict_info = {'email': email,'name':name, 'password': password}

        with open('login_info.csv','a') as linfo:
            dict_write=DictWriter(linfo,fieldnames=["email","name","password","recentbook","currentbooks"])
            dict_write.writerow(dict_info)
            linfo.close()
        print(a)
        return jsonify("Added successfully")


        return jsonify(d)
    if request.method=="GET":
        return jsonify([{"name":"mani","contact":969867},{"name": "mani", "contact": 969867}])


@app.route('/login/',methods=['POST',"GET"])
def signin():
    #print(json.loads(a.decode()))
    a = request.data
    a = json.loads(a.decode())
    print(type(a), a["name"])
    password = a['password']
    email = a['name']
    print(email, password)
    info=read_csv()

    for i in info:
        if len(i) == 0:
            continue
        if i[0] == email:
            if i[2]==password:
                return "login"
            else:
                return jsonify("password incorrect")
    return jsonify("no user exist")

@app.route("/getallbooks/",methods=["GET",'POST'])
def getallbooks():
    allbook=[]
    r=read_book()
    with open("books.csv") as login_info:
        read = csv.reader(login_info)
        for i in read:
            allbook.append({"name":i[1],"catalog":i[2],"src":i[6]})
    l=[]
    for j in range(1, len(allbook) - 3 - len(i) % 3, 3):
        l.append(allbook[j:j + 3])
    print(l)
    return jsonify(l)

@app.route("/getallnames/",methods=["GET",'POST'])
def getallname():
    allbook=[]
    r=read_book()
    with open("books.csv") as login_info:
        read = csv.reader(login_info)
        for i in read:
            allbook.append(i[1])
    l=[]
    return (allbook[1:])

@app.route("/getcatagory",methods=['POST',"GET"])
def getcatagory():
    allbook=[]
    a = request.data
    a = json.loads(a.decode())
    user=a['name']
    login=read_csv()
    book=""
    for i in login:
        #print(i[0],user)
        if len(i)==0:
            continue
        if user==i[0]:
            book=i[3][0]
            #print(book)

    with open("books.csv") as login_info:
        read = list(csv.reader(login_info))
        mydic={}
        booklist=list(read_book())
        book=booklist[int(book)][2]
        for i in read[1:]:
            print(book,i[0])
            if i[2] in mydic:
                mydic[i[2]].append({"name":i[1],"catagory":i[2],"road":i[3],"author":i[11]})
            else:
                mydic[i[2]]=[{"name":i[1],"catagory":i[2],"road":i[3],"author":i[11]}]

    for i in mydic:
            #print(i,mydic[i])
            if book in i:
                allbook.append(mydic[i])
                break
    allbook=sorted(*allbook,key=lambda x:x["road"])
    #print(allbook)
    l=[]
    for i in range(0,len(allbook)-1,2):
        l.append([allbook[i],allbook[i+1]])
    if len((allbook))%2!=0:
        l.append([allbook[len(allbook)-1]])
    print(l)
    return jsonify(l)

@app.route("/getrecentbook/",methods=['POST',"GET"])
def getrecentbook():
    allbook = []
    r = read_csv()
    a = request.data
    a = json.loads(a.decode())
    print(a)
    s = ""
    print("Recent")
    for i in r:
        if i[0] == a['name']:
            s = i[3]
            print(i)
            break
    print(s)
    l=[]
    for i in s.split(","):
        if(len(i)):
            l.append(int(i))
    a = read_book()
    info = []
    with open("books.csv") as login_info:
        read = csv.reader(login_info)
        read=list(read)
        for j in l:
            allbook.append({"name": read[j + 1][1], "catagory": read[j + 1][2], "src": read[j + 1][6]})
    l = []
    for j in range(0, len(allbook) - len(allbook) % 3, 3):
        l.append(allbook[j:j + 3])
    return l



@app.route("/getwishbook/",methods=['POST',"GET"])
def getwishbook():

        r=read_csv()
        a=request.data
        a = json.loads(a.decode())
        print(a)
        s=""
        print("WISHLIST")
        for i in r:
            if i[0]==a['name']:
                s=i[4]
                print(i)
                break
        l=list(map(int,s.split(",")))
        a=read_book()
        info=[]
        allbook = []
        with open("books.csv") as login_info:
            read = csv.reader(login_info)
            read=list(read)
            for j in l:
                        allbook.append({"name": read[j+1][1], "catagory": read[j+1][2], "src": read[j+1][6]})
        l = []
        #print({"name": i[1], "catagory": i[2], "src": i[6]})
        for j in range(0, len(allbook) - len(allbook) % 3, 3):
            l.append(allbook[j:j + 3])
        return l
        print(allbook,l,len(allbook))
        if len(allbook)==0:
            return jsonify("No wishlist")
        if len(allbook)<=3:
            print("HELLO")
            return jsonify([allbook])
        return jsonify(l)


@app.route("/getvalue/",methods=['POST',"GET"])
def getvalue():
        allbook=[]
        r=read_csv()
        a=request.data
        a = json.loads(a.decode())
        print(a)
        s=""
        with open("books.csv") as login_info:
            read = csv.reader(login_info)
            for i in read:
                print(i)
                if a.lower() in str(i[1]).lower():
                    print("HELLO")
                    allbook.append({"name":i[1],"category":i[2],"src":i[6]})
        print(allbook)
        return jsonify(allbook)

@app.route("/getsource/",methods=['POST',"GET"])
def getsource():
    allbook=[]
    a = request.data
    a = json.loads(a.decode())
    s=a["name"]
    print(s)
    with open("books.csv") as login_info:
        read = csv.reader(login_info)
        for i in read:
            if str(s) in i[1]:
                allbook.append({"name":i[1],"category":i[2],"path":i[9],"path":i[9],"cpath":i[10],"author":i[11]})
                break
    print(allbook)
    return jsonify(allbook)

@app.route('/getcmd/',methods=['POST',"GET"])
def getcmd():
    allbook=[]

    a = request.data
    a = json.loads(a.decode())
    book=a['book']
    command=""
    rating=0
    with open("books.csv") as login_info:
        read = csv.reader(login_info)
        for i in read:
            if i[1].lower()==book.lower():
                command=i[7]
                cmd=command.split("|||")
                rating=i[5]
                print(i[5],i[8])
                print([{"exist":"exist","rating":rating,"command":cmd}])
                return jsonify([{"exist":"exist","rating":rating,"command":cmd}])

    return jsonify({"exist":"no_exist"})

@app.route('/setcmd/',methods=['POST',"GET"])
def setcmd():
    allbook=[]
    a = request.data
    a = json.loads(a.decode())
    book=a['book']
    getcmd=a['command']
    getrating=a['rating']
    command=""
    rating=0
    with open("books.csv") as login_info:
        read = csv.reader(login_info)
        data = list(read)
        change = 0
        index = 0
        print("HI", data)
        for i in data:
            print(i[8], book.lower())
            if book.lower() in i[1].lower():
                change = 1
                command = i[7]
                cmd = command.split("|||")
                if not i[5]:
                    i[5] = 0
                rating = i[5]
                command += "|||" + getcmd
                if not i[8]:
                    i[8] = 0
                rating = (int(rating) * int(i[8]) + getrating)
                i[8] = int(i[8]) + 1
                data[index][7] = command
                data[index][8] = i[8]
                data[index][5] = rating//i[8]
                print(data[index][5])
            index += 1
    if change==0:
        return jsonify({"message":"fail"})
    with open("books.csv",'w',newline='') as file:
        writer=csv.writer(file)
        writer.writerows(data)
        return jsonify({"message":"success"})

#@app.route('/addrecent/',methods=['POST',"GET"])
@app.route('/addrecent/',methods=['POST',"GET"])
def addrecent():
    print("ADDRECENT")
    try:
        a = request.data
        a = json.loads(a.decode())
        print(a)
        user = a["name"]
        recent = a["recent"]
        book = recent
        s = read_book()
        for i in s:
            if recent.lower() in i[1].lower():
                recent = (i[0])
                break
        list = read_csv()
        index = 0
        print(list)
        for i in list:
            if len(i)==0:
                continue
            if i[0] == user:
                emailsender(i[0], i[1], book)
                if recent not in list[index][3]:
                    list[index][3] = recent + "," + i[3]
                else:
                    i[3] = i[3].replace(recent, "")
                    i[3] = i[3].replace(",,", ",")
                    list[index][3] = recent + "," + i[3]
            index += 1
        print(list)
        with open("login_info.csv", 'w', newline='') as file:
            writer = csv.writer(file)
            writer.writerows(list)

        return jsonify([{"success": "success"}])
    except Exception as e:
        print(e)

@app.route('/addwish/',methods=['POST',"GET"])
def addwish():
    print("ADDwish")
    a = request.data
    a = json.loads(a.decode())
    print(a)
    user=a["name"]
    wish=a["wish"]
    s=read_book()
    for i in s:
        if wish.lower() in i[1].lower():
            wish=(i[0])
            break
    list=read_csv()
    index=0
    print(list)
    for i in list:
        if i[0]==user:
            if wish not in list[index][4]:
                list[index][4]=wish+","+i[4]
            else:
                i[4]=i[4].replace(wish,"")
                i[4]=i[4].replace(",,",",")
                list[index][4]=wish+","+i[4]
        index+=1
    print(list)
    with open("login_info.csv", 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerows(list)

    return jsonify([{"success":"success"}])

@app.route('/addbook/',methods=['POST',"GET"])
def addbook():
    file=(request.files['file'])
    file.save("HELLO.pdf")
    print(request.values)
    print(request.data)
    return jsonify("HI")


pdf_address="D:\\Courses\\Angular\\angularsite\\d\\src\\assets\\pdf\\"
image_address="D:\\Courses\\Angular\\angularsite\\d\\src\\assets\\images\\"
def pdf_content(name,st,end):
    try:
        pdf_name = name
        base_name = pdf_name.replace(".pdf", "")
        pdf = PdfReader(pdf_address + pdf_name)

        pdfwriter = PdfWriter()
        for i in range(int(st), int(end) + 1):
            pdfwriter.add_page(pdf.pages[i])

        with open(pdf_address + "content\\{}_content.pdf".format(base_name), 'wb') as f:
            pdfwriter.write(f)
            f.close()
    except Exception as e:
        print(e,st,end,"at pdf_content")

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files
    print(request.files, request.form)
    a = request.form
    bookname = a["bookname"]
    authorname = a["authorname"]
    category = a["category"]
    contentst = a["contentst"]
    contentend = a["contentend"]
    upload = file['upload'].filename
    pdfname = file['pdfphoto'].filename
    books=list(read_book())
    for i in books[1:]:
        if len(i[0])!=0:
            sno=int(i[0])+1
    file['upload'].save(pdf_address+upload)
    image_path=image_address+pdfname
    file['pdfphoto'].save(image_path)
    print(image_path)
    pdf_content(upload,contentst,contentend)
    upload=upload.replace(".pdf","")
    books.append([sno,bookname+" - "+authorname+" - "+category,category,"",contentst+"to"+contentend,"","assets/images/"+pdfname,"","",upload,"{}_content".format(upload),authorname])
    #print(books)
    with open("books.csv", 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerows(books)

    response = jsonify({'message': 'File uploaded successfully!'})
    return response
if __name__=="__main__":
    app.run(debug=True)