import time
import os
from pymongo import MongoClient
from termcolor import colored

# Setting up MongoDB client
client = MongoClient('mongodb+srv://instasecur24:kick@flutterdata.cgalmbt.mongodb.net/?retryWrites=true&w=majority&appName=flutterdata')

# Settings over
os.system('cls')
print('Welcome to staWro, The Knowledge Competition!')
time.sleep(2)
os.system('cls')

##question setup
db = client['test']    
collection = db['qno_counts']
language_count = collection.count_documents({"lang": "English"})

##way list
db1 = client['your_database_name']
collection1 = db1['questions_list']

all_list = []

document = collection1.find_one({'comp': "yes"})
if document and 'List' in document:
    all_list.extend(document['List'])  # Use extend to add individual elements
    print(all_list)
else:
    print("Document not found or 'List' field is missing.")


a = len(all_list)


all_list_mn = []

for num in range(a):
    all_list_mn.append(all_list[num])

totl_c_t = all_list_mn[0]+10
totl_c_m = all_list_mn[0]

total_got_qno = []

for total in range(totl_c_m, totl_c_t):
    total_got_qno.append(total)

numb = total_got_qno[0]
summ = numb+10
# for data in collection.find_one({"qno" : "3"}):
#     print(data)

    
# print(summ)

too_eassy = []
easy = []
medium = []
tough = []
too_tough =[]


for i in range(numb, summ):
    to_str = str(i)
    
    data = collection.find_one({"qno": to_str})  # Use find for multiple documents
    a = len(data['yes'])
    b = len(data['no'])
    c = a + b
    d = (b /c)*100
    pe = (a /c)*100
    pe_data = int(pe)
    pe_data_no = int(d)

    if pe_data >= 90:
        print(colored("Too Easy Question", 'red'))
        print('_________')
        print(colored(f"Total Percentage : {pe_data}%", "light_magenta"))
        print(colored(f"Total Answerd : {len(data['yes'])}", 'red'))
        print(colored(f"Total out : {len(data['no'])}", 'red'))
        print(colored(f"Qno : {data['qno']}", 'red'))
        print(colored(f"Question : {data['Questio']}", 'red'))
        
        if data['tough'] == "Too Easy" :
            print(colored(f"Type : {data['tough']}", 'light_green'))
        elif data['tough'] == "Easy":
            print(colored(f"Type : {data['tough']}", 'green'))
        elif data['tough'] == "Medium":
            print(colored(f"Type : {data['tough']}", 'yellow'))
        elif data['tough'] == "Tough":
            print(colored(f"Type : {data['tough']}", 'light_red'))
        elif data['tough'] == "Too Tough":
            print(colored(f"Type : {data['tough']}", 'red'))
        
        if data['tough'] != "Too Easy":
            too_eassy.append(data['qno'])
            print(colored(f"Change this to : Too Easy",'cyan'))
        
        
        print("--------------------------------------------------")


    elif pe_data >= 70:
        print(colored("Easy Question", 'light_red'))
        print('_________')
        print(colored(f"Total Percentage : {pe_data}%", "light_magenta"))
        print(colored(f"Total Answerd : {len(data['yes'])}", 'light_red'))
        print(colored(f"Total out : {len(data['no'])}", 'light_red'))
        print(colored(f"Qno : {data['qno']}", 'light_red'))
        print(colored(f"Question : {data['Questio']}", 'light_red'))
        
        if data['tough'] == "Too Easy" :
            print(colored(f"Type : {data['tough']}", 'light_green'))
        elif data['tough'] == "Easy":
            print(colored(f"Type : {data['tough']}", 'green'))
        elif data['tough'] == "Medium":
            print(colored(f"Type : {data['tough']}", 'yellow'))
        elif data['tough'] == "Tough":
            print(colored(f"Type : {data['tough']}", 'light_red'))
        elif data['tough'] == "Too Tough":
            print(colored(f"Type : {data['tough']}", 'red'))
        
        if data['tough'] != "Easy":
            easy.append(data['qno'])
            print(colored(f"Change this to : Easy",'cyan'))
        
        print("--------------------------------------------------")

    elif pe_data >= 50:
        print(colored("Medium Question", 'yellow'))
        print('_________')
        print(colored(f"Total Percentage : {pe_data}%", 'yellow'))
        print(colored(f"Total Answerd : {len(data['yes'])}", 'yellow'))
        print(colored(f"Total out : {len(data['no'])}", 'yellow'))
        print(colored(f"Qno : {data['qno']}", 'yellow'))
        print(colored(f"Question : {data['Questio']}", 'yellow'))
        
        if data['tough'] == "Too Easy" :
            print(colored(f"Type : {data['tough']}", 'light_green'))
        elif data['tough'] == "Easy":
            print(colored(f"Type : {data['tough']}", 'green'))
        elif data['tough'] == "Medium":
            print(colored(f"Type : {data['tough']}", 'yellow'))
        elif data['tough'] == "Tough":
            print(colored(f"Type : {data['tough']}", 'light_red'))
        elif data['tough'] == "Too Tough":
            print(colored(f"Type : {data['tough']}", 'red'))
        
        if data['tough'] != "Medium":
            medium.append(data['qno'])
            print(colored(f"Change this to : Medium ",'cyan'))
        
        print("--------------------------------------------------")
    
    elif pe_data >= 30:
        print(colored("Tough Question", 'light_red'))
        print('_________')
        print(colored(f"Total Percentage : {pe_data}%", 'light_red'))
        print(colored(f"Total Answerd : {len(data['yes'])}", 'light_red'))
        print(colored(f"Total out : {len(data['no'])}", 'light_red'))
        print(colored(f"Qno : {data['qno']}", 'light_red'))
        print(colored(f"Question : {data['Questio']}", 'light_red'))
        
        if data['tough'] == "Too Easy" :
            print(colored(f"Type : {data['tough']}", 'light_green'))
        elif data['tough'] == "Easy":
            print(colored(f"Type : {data['tough']}", 'green'))
        elif data['tough'] == "Medium":
            print(colored(f"Type : {data['tough']}", 'yellow'))
        elif data['tough'] == "Tough":
            print(colored(f"Type : {data['tough']}", 'light_red'))
        elif data['tough'] == "Too Tough":
            print(colored(f"Type : {data['tough']}", 'red'))

        if data['tough'] != "Tough":
            tough.append(data['qno'])
            print(colored(f"Change this to : Tough ",'cyan'))
        
        print("--------------------------------------------------")
    elif pe_data >= 1:
        print(colored("Too Tough Question", 'red'))
        print('_________')
        print(colored(f"Total Percentage : {pe_data}%", 'red'))
        print(colored(f"Total Answerd : {len(data['yes'])}", 'red'))
        print(colored(f"Total out : {len(data['no'])}", 'red'))
        print(colored(f"Qno : {data['qno']}", 'red'))
        print(colored(f"Question : {data['Questio']}", 'red'))
        
        if data['tough'] == "Too Easy" :
            print(colored(f"Type : {data['tough']}", 'light_green'))
        elif data['tough'] == "Easy":
            print(colored(f"Type : {data['tough']}", 'green'))
        elif data['tough'] == "Medium":
            print(colored(f"Type : {data['tough']}", 'yellow'))
        elif data['tough'] == "Tough":
            print(colored(f"Type : {data['tough']}", 'light_red'))
        elif data['tough'] == "Too Tough":
            print(colored(f"Type : {data['tough']}", 'red'))

        if data['tough'] != "Too Tough":
            too_tough.append(data['qno'])
            print(colored(f"Change this to : Too Tough ",'cyan'))
        
        print("--------------------------------------------------")
    else:
        print(f"This Question is Hiden from all users {data['qno']}")