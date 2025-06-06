# import time
# import os
# from pymongo import MongoClient
# from termcolor import colored

# # Setting up MongoDB client
# client = MongoClient('mongodb+srv://instasecur24:kick@flutterdata.cgalmbt.mongodb.net/?retryWrites=true&w=majority&appName=flutterdata')

# # Welcome message
# os.system('cls')
# print('Welcome to staWro, The Knowledge Competition!')
# time.sleep(2)
# os.system('cls')
# print("Use this tool After the Half Game, and Make ready Questions in the Waiting DB")

# # Database setup
# db = client['test']
# collection = db['qno_counts']
# db1 = client['your_database_name']
# collection1 = db1['questions_list']

# # Retrieve question list
# document = collection1.find_one({'comp': "yes"})
# all_list = document['List'] if document and 'List' in document else []

# if not all_list:
#     print("No questions found in the list.")
#     exit()

# # Determine question range
# numb = all_list[0]
# summ = numb + 10
# total_got_qno = list(range(numb, summ))

# print(numb)
# print(summ)

# for i in range(numb, summ):
#     # Find a single document in the collection
#     data = collection.find_one({"lang": "English", "qno": str(i)})
#     if data['tough'] == "Too Easy":
#         print(f"{data['qno']} : {data['tough']}")
#     elif data['tough'] == "Easy":
#         print(f"{data['qno']} : {data['tough']}")
#     elif data['tough'] == "Medium":
#         print(f"{data['qno']} : {data['tough']}")
#     elif data['tough'] == "Tough":
#         print(f"{data['qno']} : {data['tough']}")
#     else:
#         print(f"{data['qno']} : {data['tough']}")



































# # import time
# # import os
# # from pymongo import MongoClient
# # from termcolor import colored

# # # Setting up MongoDB client
# # client = MongoClient('mongodb+srv://instasecur24:kick@flutterdata.cgalmbt.mongodb.net/?retryWrites=true&w=majority&appName=flutterdata')

# # # Welcome message
# # os.system('cls')
# # print('Welcome to staWro, The Knowledge Competition!')
# # time.sleep(2)
# # os.system('cls')
# # print("Use this tool After the Half Game, and Make ready Questions in the Waiting DB")

# # # Database setup
# # db = client['test']
# # collection = db['qno_counts']
# # db1 = client['your_database_name']
# # collection1 = db1['questions_list']

# # # Retrieve question list
# # document = collection1.find_one({'comp': "yes"})
# # all_list = document['List'] if document and 'List' in document else []

# # if not all_list:
# #     print("No questions found in the list.")
# #     exit()

# # # Determine question range
# # numb = all_list[0]
# # summ = numb + 10
# # total_got_qno = list(range(numb, summ))

# # # Categorize questions based on difficulty
# # categories = {"Too Easy": [], "Easy": [], "Medium": [], "Tough": [], "Too Tough": []}

# # def categorize_question(data):
# #     """Categorizes a question based on the percentage of 'yes' responses."""
# #     a, b = len(data['yes']), len(data['no'])
# #     total = a + b
# #     yes_percentage = (a / total) * 100 if total else 0

# #     if yes_percentage >= 90:
# #         return "Too Easy"
# #     elif yes_percentage >= 70:
# #         return "Easy"
# #     elif yes_percentage >= 50:
# #         return "Medium"
# #     elif yes_percentage >= 30:
# #         return "Tough"
# #     else:
# #         return "Too Tough"

# # def print_question(data, category):
# #     """Prints question details."""
# #     yes_percentage = int((len(data['yes']) / (len(data['yes']) + len(data['no']))) * 100)
# #     print(colored(f"{category} Question", 'yellow' if category == "Medium" else 'red'))
# #     print("_________")
# #     print(colored(f"Total Percentage : {yes_percentage}%", 'light_magenta'))
# #     print(colored(f"Total Answered : {len(data['yes'])}", 'green'))
# #     print(colored(f"Total Out : {len(data['no'])}", 'red'))
# #     print(colored(f"Qno : {data['qno']}", 'cyan'))
# #     print(colored(f"Question : {data['Questio']}", 'cyan'))
# #     print("--------------------------------------------------")

# # # Process each question
# # for i in total_got_qno:
# #     data = collection.find_one({"qno": str(i)})
# #     if not data:
# #         continue

# #     category = categorize_question(data)
# #     print_question(data, category)

# #     if data['tough'] != category:
# #         print(colored(f"Change this to: {category}", 'cyan'))
# #         categories[category].append(data['qno'])
# #     else:
# #         categories[category].append(data['qno'])

# # def update_qno_tough(cat, qnos):
# #     qno_list = []
# #     qno_list.extend(qnos)

# #     for i in qno_list:
# #         # Find the existing document
# #         find_exist_data = collection.find_one({"qno": i, "lang": "English"})
# #         if find_exist_data:
# #             print(find_exist_data['Questio'])  # Print the existing question
            
# #             # Generate a new qno (example: increment by 100)

# #             # Update the qno in the database
# #         #     result = collection.update_one(
# #         #         {"qno": i, "lang": "English"},  # Filter to find the document
# #         #         {"$set": {"qno": "wait"}},      # Update the qno field
# #         #         {"$set": {"tough": str(cat)}},
# #         #     )

# #         #     if result.modified_count > 0:
# #         #         print(f"Updated qno for document with original qno {i} to Reserve")
# #         #     else:
# #         #         print(f"Failed to update qno for document with original qno {i}")
# #         # else:
# #         #     print(f"No document found for qno {i}")

# # # Example usage:
# # update_qno_tough("Category1", [1, 2, 3])



# # # Summary
# # for cat, qnos in categories.items():
# #     if len(qnos) > 2:
# #         removed_values = qnos[2:]  # Get the values that will be removed
# #         print(f"{cat} More: {qnos}")
# #         print(f"Removed Values: {removed_values}")
# #         qnos = qnos[:2]  # Keep only the first two elements
# #         categories[cat] = qnos  # Update the dictionary
# #         print(f"Updated {cat} List: {qnos}")
# #         update_qno_tough(cat, removed_values)
# #     elif len(qnos) < 2:
# #         print(f"{cat} Shortage: {2 - len(qnos)} Questions Needed")
# #     else:
# #         print(f"{cat} Equal: {qnos}")


# # # Final categories summary
# # print("\nFinal Categories Summary:")
# # for cat, qnos in categories.items():
# #     print(f"{cat}: {len(qnos)} : {qnos} questions")

# # missing_qstion = []
# # found_qstion = []

# # for i in total_got_qno:
# #     found = False
# #     for qnos in categories.values():
# #         if str(i) in qnos:
# #             found = True
# #             break
# #     if found:
# #         found_qstion.append(i)
# #     else:
# #         missing_qstion.append(i)

# # print(missing_qstion)
# # print(found_qstion)

















# # import time
# # import os
# # from pymongo import MongoClient
# # from termcolor import colored

# # # MongoDB Client Setup
# # client = MongoClient('mongodb+srv://instasecur24:kick@flutterdata.cgalmbt.mongodb.net/?retryWrites=true&w=majority&appName=flutterdata')

# # # Welcome Message
# # os.system('cls')
# # print('Welcome to staWro, The Knowledge Competition!')
# # time.sleep(2)
# # os.system('cls')
# # print("Use this tool after the Half Game, and make ready Questions in the Waiting DB")

# # # Database Setup
# # db = client['test']
# # collection = db['qno_counts']
# # db1 = client['your_database_name']
# # collection1 = db1['questions_list']

# # # Retrieve Question List
# # document = collection1.find_one({'comp': "yes"})
# # all_list = document['List'] if document and 'List' in document else []

# # if not all_list:
# #     print("No questions found in the list.")
# #     exit()

# # # Determine Question Range
# # numb = all_list[0]
# # summ = numb + 10
# # total_got_qno = list(range(numb, summ))

# # # Categorize Questions Based on Difficulty
# # categories = {"Too Easy": [], "Easy": [], "Medium": [], "Tough": [], "Too Tough": []}

# # def categorize_question(data):
# #     """Categorizes a question based on the percentage of 'yes' responses."""
# #     a, b = len(data.get('yes', [])), len(data.get('no', []))
# #     total = a + b
# #     yes_percentage = (a / total) * 100 if total else 0

# #     if yes_percentage >= 90:
# #         return "Too Easy"
# #     elif yes_percentage >= 70:
# #         return "Easy"
# #     elif yes_percentage >= 50:
# #         return "Medium"
# #     elif yes_percentage >= 30:
# #         return "Tough"
# #     else:
# #         return "Too Tough"

# # def print_question(data, category):
# #     """Prints question details."""
# #     yes_percentage = int((len(data.get('yes', [])) / (len(data.get('yes', [])) + len(data.get('no', [])))) * 100)
# #     print(colored(f"{category} Question", 'yellow' if category == "Medium" else 'red'))
# #     print("_________")
# #     print(colored(f"Total Percentage : {yes_percentage}%", 'light_magenta'))
# #     print(colored(f"Total Answered : {len(data.get('yes', []))}", 'green'))
# #     print(colored(f"Total Out : {len(data.get('no', []))}", 'red'))
# #     print(colored(f"Qno : {data['qno']}", 'cyan'))
# #     print(colored(f"Question : {data['Questio']}", 'cyan'))
# #     print("--------------------------------------------------")

# # # Process Each Question
# # for i in total_got_qno:
# #     data = collection.find_one({"qno": str(i)})
# #     if not data:
# #         continue

# #     category = categorize_question(data)
# #     print_question(data, category)

# #     if data.get('tough') != category:
# #         print(colored(f"Change this to: {category}", 'cyan'))
# #         categories[category].append(data['qno'])
# #     else:
# #         categories[category].append(data['qno'])

# # def update_qno_tough(cat, qnos):
# #     for i in qnos:
# #         find_exist_data = collection.find_one({"qno": i, "lang": "English"})
# #         if find_exist_data:
# #             print(find_exist_data.get('Questio', 'No Question Found'))
            
# #             # Update the qno and tough fields
# #             result = collection.update_one(
# #                 {"qno": i, "lang": "English"},
# #                 {"$set": {"qno": "wait", "tough": str(cat)}}
# #             )

# #             if result.modified_count > 0:
# #                 print(f"Updated qno for document with original qno {i} to 'wait'")
# #             else:
# #                 print(f"Failed to update qno for document with original qno {i}")
# #         else:
# #             print(f"No document found for qno {i}")

# # # Summary
# # for cat, qnos in categories.items():
# #     if len(qnos) > 2:
# #         removed_values = qnos[2:]  # Get the values that will be removed
# #         print(f"{cat} More: {qnos}")
# #         print(f"Removed Values: {removed_values}")
# #         qnos = qnos[:2]  # Keep only the first two elements
# #         categories[cat] = qnos  # Update the dictionary
# #         update_qno_tough(cat, removed_values)
# #     elif len(qnos) < 2:
# #         print(f"{cat} Shortage: {2 - len(qnos)} Questions Needed")
# #         find_exist_data = collection.find({"qno": "wait", "lang": "English", "tough" : cat})
# #         da1 = len(qnos)
# #         for i in range(da1):
# #             print(find_exist_data[i])

# #     else:
# #         print(f"{cat} Equal: {qnos}")



# # # Final Categories Summary

# # print(colored("\nFinal Categories Summary and Update :", 'green'))
# # for cat, qnos in categories.items():
# #     print(f"\nQstion Len : {len(qnos)} , Question List :   {qnos} , Tough : ", colored(f"{cat}", "green"))
# #     for i in qnos:
# #         find_exist_data = collection.find_one({"qno": i, "lang": "English"})
# #         if find_exist_data['tough'] != cat:
# #             result = collection.update_one(
# #                 {"qno": i, "lang": "English"},
# #                 {"$set": {"tough": str(cat)}}
# #             )
# #             if result.modified_count > 0:
# #                 print(f"Updated {find_exist_data['tough']} to {cat} ")
# #             else:
# #                 print(f"Failed Updated {find_exist_data['tough']} to {cat} ")

# #         else:
# #             print(f"Have {len(qnos)} Questions, ", colored("OK", 'green') )
        



# # missing_question = []
# # found_question = []

# # for i in total_got_qno:
# #     found = False
# #     for qnos in categories.values():
# #         if str(i) in qnos:
# #             found = True
# #             break
# #     if found:
# #         found_question.append(i)
# #     else:
# #         missing_question.append(i)

# # # print(f"Missing Questions: {missing_question}")
# # # print(f"Found Questions: {found_question}")

# # # print(categories.items())






