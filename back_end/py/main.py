import socket
import pyttsx3





def speak(text):
    # Initialize the text-to-speech engine
    engine = pyttsx3.init()

    # Get available voices
    voices = engine.getProperty('voices')

    # Set the engine to use a female voice (usually voices[1] is female)
    engine.setProperty('voice', voices[1].id)

    # Set speaking rate (optional)
    engine.setProperty('rate', 100)  # Adjust speed (default ~200)

    # Set volume (optional)
    engine.setProperty('volume', 1.0)  # Full volume (0.0 to 1.0)


    # Speak the text
    engine.say(text)
    engine.runAndWait()
def start_client():
    host = "192.168.222.78"  # Replace with server's IP
    port = 12345

    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect((host, port))
    print("✅ Connected to server! Type 'exit' to disconnect.")

    


    while True:

        # def send_cmd(res):
        #     response = client_socket.sendall(res.encode())
            
        command = input("Enter command (cmd/bash): ")  # Accept any command
        if command.lower() == "exit":
            client_socket.sendall(command.encode())  # Send exit command
            break

        client_socket.sendall(command.encode())  # Send command to server
        response = client_socket.recv(4096).decode()  # Receive response
        print(f"📤 Server Response:\n{response}")

        if "Sorry bro" in response:
            txt = "Thank you Psycho"
            speak(txt)
            client_socket.sendall(txt.encode())
            response = client_socket.recv(4096).decode()
            store(response)
            
            
        

    client_socket.close()
    print("❌ Disconnected from server.")

start_client()
