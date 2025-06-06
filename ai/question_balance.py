# import time
# import os
# from pymongo import MongoClient
# from termcolor import colored

# # Setting up MongoDB client
# client = MongoClient('mongodb+srv://instasecur24:kick@flutterdata.cgalmbt.mongodb.net/?retryWrites=true&w=majority&appName=flutterdata')

# # Settings over
# os.system('cls')
# print('Welcome to staWro, The Knowledge Competition!')
# time.sleep(2)
# os.system('cls')
# print("This Arrange Questions from Easy to Tough, only in between 10 questions")

# db1 = client['your_database_name']
# collection1 = db1['questions_list']

# print('Let\'s start the Game AI')
# i1 = input('Yes/No: ').lower()

# ac_num = ""
# too_easy = []
# easy = []
# medium = []
# tough = []
# too_tough = []

# def Run_Fun(yes):
#     to_esy_dt_len = len(too_easy)

#     to_rng = to_esy_dt_len + int(ac_num)
#     to_rng_2 = to_rng + len(easy)
#     to_rng_3 = to_rng_2 + len(medium)
#     to_rng_4 = to_rng_3 + len(tough)
#     to_rng_5 = to_rng_4 + len(too_tough)

#     # Update questions for each difficulty level
#     intt = 0

#     print(too_easy)


#     # Updating "Too Easy" questions
#     # Loop to update "Too Easy" questions
#     if too_easy:  # Ensure the list is not empty
#         for index, to_esy_dt in enumerate(range(to_esy_dt_len, to_rng)):
#             current_qno = str(too_easy[index])  # Get the current question number
#             new_qno = str(to_esy_dt)  # Calculate the new question number
            
#             print(f"{new_qno} : {current_qno}")
            
#             # Prepare query filter and update values
#             query_filter = {"qno": current_qno, "lang": "English"}
#             new_value = {"$set": {"qno": new_qno}}
            
#             # Perform the update
#             result = collection.update_one(query_filter, new_value)
#             if result.modified_count > 0:
#                 print(f"Successfully updated question {current_qno} to {new_qno}")
#             else:
#                 print(f"Failed to update question {current_qno}")
#     print("--------------------------------")


    
#     # Updating "Easy" questions
#     for esy_dt in range(to_rng, to_rng_2):
#         print(f"{esy_dt} : {easy[intt]}")
#         query_filter = {"qno": str(easy[intt]), "lang" : "English"}  # Corrected query filter
#         new_value = {"$set": {"qno": str(esy_dt)}}  # Corrected update query
#         result = collection.update_one(query_filter, new_value)
#         if result.modified_count > 0:
#             print(f"Successfully updated question {easy[intt]}")
#         else:
#             print(f"Failed to update question {easy[intt]}")
#         intt += 1

#     intt = 0
#     print("--------------------------------")


#     # Updating "Medium" questions
#     for medm_dt in range(to_rng_2, to_rng_3):
#         print(f"{medm_dt} : {medium[intt]}")
#         query_filter = {"qno": str(medium[intt]), "lang" : "English"}  # Corrected query filter
#         new_value = {"$set": {"qno": str(medm_dt)}}  # Corrected update query
#         result = collection.update_one(query_filter, new_value)
#         if result.modified_count > 0:
#             print(f"Successfully updated question {medium[intt]}")
#         else:
#             print(f"Failed to update question {medium[intt]}")
#         intt += 1

#     intt = 0
#     print("--------------------------------")



#     # Updating "Tough" questions
#     for tough_dt in range(to_rng_3, to_rng_4):
#         print(f"{tough_dt} : {tough[intt]}")
#         query_filter = {"qno": str(tough[intt]), "lang" : "English"}  # Corrected query filter
#         new_value = {"$set": {"qno": str(tough_dt)}}  # Corrected update query
#         result = collection.update_one(query_filter, new_value)
#         if result.modified_count > 0:
#             print(f"Successfully updated question {tough[intt]}")
#         else:
#             print(f"Failed to update question {tough[intt]}")
#         intt += 1

#     intt = 0
#     print("--------------------------------")


#     # Updating "Too Tough" questions
#     for too_tough_dt in range(to_rng_4, to_rng_5):
#         print(f"{too_tough_dt} : {too_tough[intt]}")
#         query_filter = {"qno": str(too_tough[intt]), "lang" : "English"}  # Corrected query filter
#         new_value = {"$set": {"qno": str(too_tough_dt)}}  # Corrected update query
#         result = collection.update_one(query_filter, new_value)
#         if result.modified_count > 0:
#             print(f"Successfully updated question {too_tough[intt]}")
#         else:
#             print(f"Failed to update question {too_tough[intt]}")
#         intt += 1

#     if yes == "yes":
#         print("Done")
#     else:

#         collection1.update_one(
#             {"comp": "yes"},               # Query to find the document
#             {"$addToSet": {"List": num}}   # Add the value if not already in the array
#         )
#         print("Done")
    




# if i1 == "y" or i1 == "yes":
#     os.system('cls')
#     print("AI is setting up......")
    
#     db = client['test']    
#     collection = db['qno_counts']

#     # Counting documents directly with count_documents()
#     total_questions = list(collection.find({"lang": "English"}))
#     sum = len(total_questions) - 9
#     specific_no = []

#     specific_no = [i for i in range(sum, 0, -10)]

#     print(specific_no)


#     get_Language_data = collection1.find({"lang": "English"})
#     language_qnos = [item['qno'] for item in get_Language_data]  # Extract question numbers
    
#     # Find common elements and filtered list
#     common_elements = [item for item in specific_no if item in language_qnos]
#     filterd_array = list(filter(lambda X : X not in common_elements, specific_no))
    
#     num = filterd_array[0]
#     ac_num = num
#     num2 = num + 10

#     # Loop through the range of question numbers
#     while len(specific_no) < 0 :
        
#         for i in range(num, num2):
#             Numb = str(i)
#             data = collection.find_one({"qno": Numb, "lang" : "English"})

#             if data:  # Ensure data exists
#                 data_type = data['tough']
#                 print(data["lang"] + " " + data["qno"] + " " + data["tough"])

#                 if data["tough"] == "Too Easy":
#                     too_easy.append(data['qno'])
#                 elif data["tough"] == "Easy":
#                     easy.append(data['qno']) 
#                 elif data["tough"] == "Medium":
#                     medium.append(data['qno'])
#                 elif data["tough"] == "Tough":
#                     tough.append(data['qno'])
#                 elif data["tough"] == "Too Tough":
#                     too_tough.append(data['qno'])

#         find_exist_data = collection1.find_one({"comp": "yes"})
#         if find_exist_data and 'List' in find_exist_data and num in find_exist_data['List']:
#             print(f"All Set in the way of {num}")
#         elif find_exist_data and 'List' in find_exist_data and num not in find_exist_data['List']:
#             Run_Fun("no")
#         elif not find_exist_data:
#             docum = {
#                 "comp": "yes",
#                 "List": [num]
#             }
#             collection1.insert_one(docum)  # Insert the new document
#             Run_Fun("yes")
        
#         specific_no.pop(0)





# elif i1 == "n" or i1 == "no":
#     print("AI is shutting down...")
#     os.system('cls')


# else:
#     print("AI is shutting down...")
#     os.system('cls')


























import time
import os
from pymongo import MongoClient
from termcolor import colored

# Setting up MongoDB client
client = MongoClient('mongodb+srv://instasecur24:kick@flutterdata.cgalmbt.mongodb.net/?retryWrites=true&w=majority&appName=flutterdata')

# Database and collection setup
db1 = client['your_database_name']
collection1 = db1['questions_list']

# Welcome message
os.system('cls')
print('Welcome to staWro, The Knowledge Competition!')
time.sleep(2)
os.system('cls')
print("This Arrange Questions from Easy to Tough, only in between 10 questions")

i1 = input('Let\'s start the Game AI (Yes/No): ').strip().lower()

# Initialize variables
ac_num = ""
too_easy, easy, medium, tough, too_tough = [], [], [], [], []

def Run_Fun(yes):
    """Function to update question difficulties in the database."""
    to_esy_dt_len = len(too_easy)
    to_rng = to_esy_dt_len + int(ac_num)
    to_rng_2 = to_rng + len(easy)
    to_rng_3 = to_rng_2 + len(medium)
    to_rng_4 = to_rng_3 + len(tough)
    to_rng_5 = to_rng_4 + len(too_tough)

    # Updating "Too Easy" questions
    if too_easy:  # Ensure the list is not empty
        for index, to_esy_dt in enumerate(range(to_esy_dt_len, to_rng)):
            if index >= len(too_easy):  # Safeguard against out-of-range index
                print("Error: 'too_easy' index out of range.")
                break
            current_qno = str(too_easy[index])
            new_qno = str(to_esy_dt)
            
            print(f"{new_qno} : {current_qno}")
            
            query_filter = {"qno": current_qno, "lang": "English"}
            new_value = {"$set": {"qno": new_qno}}
            
            result = collection1.update_one(query_filter, new_value)
            if result.modified_count > 0:
                print(f"Successfully updated question {current_qno} to {new_qno}")
            else:
                print(f"Failed to update question {current_qno}")
    else:
        print("Warning: 'too_easy' list is empty. Skipping updates for 'Too Easy' questions.")




if i1 in ("y", "yes"):
    os.system('cls')
    print("AI is setting up......")
    
    db = client['test']    
    collection = db['qno_counts']

    # Fetch all questions for "English" language
    total_questions = list(collection.find({"lang": "English"}))
    sum_questions = len(total_questions) - 9
    specific_no = [i for i in range(sum_questions, 0, -10)]
    print(f"Specific Numbers: {specific_no}")

    get_Language_data = collection1.find({"lang": "English"})
    language_qnos = [item['qno'] for item in get_Language_data]

    common_elements = [item for item in specific_no if item in language_qnos]
    filtered_array = list(filter(lambda x: x not in common_elements, specific_no))
    
    if not filtered_array:
        print("No specific numbers left to process!")
        exit()

    num = filtered_array[0]
    ac_num = num
    num2 = num + 10

    for i in range(num, num2):
        Numb = str(i)
        data = collection.find_one({"qno": Numb, "lang": "English"})
        if data:
            print(f"{data['lang']} {data['qno']} {data['tough']}")
            if data["tough"] == "Too Easy":
                too_easy.append(data['qno'])
            elif data["tough"] == "Easy":
                easy.append(data['qno'])
            elif data["tough"] == "Medium":
                medium.append(data['qno'])
            elif data["tough"] == "Tough":
                tough.append(data['qno'])
            elif data["tough"] == "Too Tough":
                too_tough.append(data['qno'])

    find_exist_data = collection1.find_one({"comp": "yes"})
    if find_exist_data and 'List' in find_exist_data and num in find_exist_data['List']:
        print(f"All Set in the way of {num}")
    else:
        if not find_exist_data:
            docum = {"comp": "yes", "List": [num]}
            collection1.insert_one(docum)
        Run_Fun("yes")

elif i1 in ("n", "no"):
    print("AI is shutting down...")
    os.system('cls')

else:
    print("Invalid input. AI is shutting down...")
    os.system('cls')







# print(len(too_easy))
# print(len(easy))
# print(len(medium))
# print(len(tough))
# print(len(too_tough))

# print("----------------------------")

























# # for i in range(sum, 0, -10):
#     #     specific_no.append(i)

    
    
#     # if  specific_no in get_Language_data['oldlist']:
#     #     print("IN")
#     # else:
#     #     document1 = {
#     #         "lang" : "English",
#     #         "oldlist" : specific_no
#     #     }

#     #     insert1 = collection1.insert_one(document1)








