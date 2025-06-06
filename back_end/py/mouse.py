import cv2
import mediapipe as mp
import pyautogui
import time

# Initialize Mediapipe Hands
mp_hands = mp.solutions.hands
mp_draw = mp.solutions.drawing_utils
hands = mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence=0.7)

# Get screen size
screen_width, screen_height = pyautogui.size()

# Start video capture
cap = cv2.VideoCapture(0)

# Click state tracking
prev_click = False
prev_right_click = False
prev_drag = False

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Flip the frame for natural interaction
    frame = cv2.flip(frame, 1)
    h, w, _ = frame.shape

    # Convert frame to RGB
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    result = hands.process(rgb_frame)

    if result.multi_hand_landmarks:
        for hand_landmarks in result.multi_hand_landmarks:
            # Get fingertip positions
            index_finger = hand_landmarks.landmark[8]
            thumb_tip = hand_landmarks.landmark[4]
            middle_finger = hand_landmarks.landmark[12]

            # Convert to screen coordinates
            index_x, index_y = int(index_finger.x * w), int(index_finger.y * h)
            screen_x = int(index_finger.x * screen_width)
            screen_y = int(index_finger.y * screen_height)

            # Move the mouse cursor
            pyautogui.moveTo(screen_x, screen_y)

            # Calculate distances for pinch detection
            pinch_distance = abs(index_finger.x - thumb_tip.x) + abs(index_finger.y - thumb_tip.y)
            right_click_distance = abs(middle_finger.x - thumb_tip.x) + abs(middle_finger.y - thumb_tip.y)

            # Left Click (Pinch with thumb and index)
            if pinch_distance < 0.03:
                if not prev_click:
                    pyautogui.click()
                    prev_click = True
            else:
                prev_click = False  # Reset click state when fingers separate

            # Right Click (Thumb & Middle Finger)
            if right_click_distance < 0.03:
                if not prev_right_click:
                    pyautogui.rightClick()
                    prev_right_click = True
            else:
                prev_right_click = False  # Reset right-click state

            # Drag (Keep pinching while moving)
            if pinch_distance < 0.03:
                if not prev_drag:
                    pyautogui.mouseDown()
                    prev_drag = True
            else:
                if prev_drag:
                    pyautogui.mouseUp()
                    prev_drag = False  # Reset drag state

            # Draw hand landmarks
            mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

    # Display video feed
    cv2.imshow("Hand Tracking Mouse", frame)

    # Exit on 'q' key
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
