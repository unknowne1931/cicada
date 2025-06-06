from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb+srv://instasecur24:kick@flutterdata.cgalmbt.mongodb.net/?retryWrites=true&w=majority&appName=flutterdata')
db = client['test']    
collection = db['qno_counts']

# Fetch all questions for the specified language
lang = "English"  # Replace with the desired language
total_questions = list(collection.find({"lang": lang}))

# Calculate the sum and generate specific numbers
sum_value = len(total_questions) - 9
specific_numbers = [i for i in range(sum_value, 0, -10)]

print("Specific Numbers:", specific_numbers)
