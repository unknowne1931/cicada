# import cv2
# import mediapipe as mp
# import numpy as np
# from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume
# from comtypes import CLSCTX_ALL

# # Initialize MediaPipe Hand module
# mp_hands = mp.solutions.hands
# mp_draw = mp.solutions.drawing_utils
# hands = mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence=0.7)

# # Access system volume
# devices = AudioUtilities.GetSpeakers()
# interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
# volume = interface.QueryInterface(IAudioEndpointVolume)

# # Get volume range
# vol_range = volume.GetVolumeRange()
# min_vol, max_vol = vol_range[:2]

# # Open webcam
# cap = cv2.VideoCapture(0)

# while cap.isOpened():
#     ret, frame = cap.read()
#     if not ret:
#         break

#     # Convert to RGB
#     frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#     results = hands.process(frame_rgb)

#     if results.multi_hand_landmarks:
#         for hand_landmarks in results.multi_hand_landmarks:
#             mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

#             # Get landmark positions
#             landmarks = hand_landmarks.landmark
#             h, w, _ = frame.shape

#             thumb_tip = np.array([int(landmarks[4].x * w), int(landmarks[4].y * h)])
#             index_tip = np.array([int(landmarks[8].x * w), int(landmarks[8].y * h)])

#             # Calculate Euclidean distance
#             distance = np.linalg.norm(thumb_tip - index_tip)

#             # Normalize distance to volume range
#             volume_level = np.interp(distance, [20, 200], [min_vol, max_vol])
#             volume.SetMasterVolumeLevel(volume_level, None)

#             # Display volume level
#             cv2.putText(frame, f'Volume: {int(np.interp(volume_level, [min_vol, max_vol], [0, 100]))}%',
#                         (50, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

#     # Show the webcam feed
#     cv2.imshow("Hand Volume Control", frame)

#     # Press 'q' to exit
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# cap.release()
# cv2.destroyAllWindows()


import cv2
import mediapipe as mp
import numpy as np
import pyttsx3
from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume
from comtypes import CLSCTX_ALL

# Initialize Text-to-Speech Engine
engine = pyttsx3.init()
engine.setProperty('rate', 150)  # Speed of speech
engine.setProperty('volume', 1.0)  # Max volume

# Initialize MediaPipe Hand module
mp_hands = mp.solutions.hands
mp_draw = mp.solutions.drawing_utils
hands = mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence=0.7)

# Access system volume
devices = AudioUtilities.GetSpeakers()
interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
volume = interface.QueryInterface(IAudioEndpointVolume)

# Get volume range
vol_range = volume.GetVolumeRange()
min_vol, max_vol = vol_range[:2]

# Open webcam
cap = cv2.VideoCapture(0)
hand_detected = False

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Convert to RGB
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(frame_rgb)

    if results.multi_hand_landmarks:
        if not hand_detected:
            engine.say("Hand detected")
            engine.runAndWait()
            hand_detected = True  # To avoid repeated announcements

        for hand_landmarks in results.multi_hand_landmarks:
            mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

            # Get landmark positions
            landmarks = hand_landmarks.landmark
            h, w, _ = frame.shape

            thumb_tip = np.array([int(landmarks[4].x * w), int(landmarks[4].y * h)])
            index_tip = np.array([int(landmarks[8].x * w), int(landmarks[8].y * h)])

            # Calculate Euclidean distance
            distance = np.linalg.norm(thumb_tip - index_tip)

            # Normalize distance to volume range
            volume_level = np.interp(distance, [20, 200], [min_vol, max_vol])
            volume.SetMasterVolumeLevel(volume_level, None)

            # Display volume level
            cv2.putText(frame, f'Volume: {int(np.interp(volume_level, [min_vol, max_vol], [0, 100]))}%',
                        (50, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    else:
        hand_detected = False  # Reset when no hand is detected

    # Show the webcam feed
    cv2.imshow("Hand Volume Control", frame)

    # Press 'q' to exit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
