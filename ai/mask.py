# import cv2
# import mediapipe as mp
# import numpy as np
# import os

# # Load face detection, landmarks, and segmentation models
# mp_face_mesh = mp.solutions.face_mesh
# face_mesh = mp_face_mesh.FaceMesh(static_image_mode=False, max_num_faces=1, min_detection_confidence=0.5)
# mp_selfie_segmentation = mp.solutions.selfie_segmentation
# segmentation = mp_selfie_segmentation.SelfieSegmentation(model_selection=1)  # Use model_selection=1 for better accuracy

# # Load mask image (ensure it's a PNG with transparency)
# mask_path = os.path.abspath("./ai/mask.png")
# mask_image = cv2.imread(mask_path, cv2.IMREAD_UNCHANGED)

# # Load custom background image
# background_path = os.path.abspath("./ai/background.gif")
# background_image = cv2.imread(background_path)

# # Check if images are loaded
# if mask_image is None:
#     print(f"Error: Mask image not found at {mask_path}!")
#     exit()
# if background_image is None:
#     print(f"Error: Background image not found at {background_path}!")
#     exit()

# # Capture video from webcam
# cap = cv2.VideoCapture(0)

# def rotate_image(image, angle):
#     """Rotate the image by the given angle around its center."""
#     h, w = image.shape[:2]
#     center = (w // 2, h // 2)
#     rotation_matrix = cv2.getRotationMatrix2D(center, angle, 1.0)
#     rotated = cv2.warpAffine(image, rotation_matrix, (w, h), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT)
#     return rotated

# while cap.isOpened():
#     ret, frame = cap.read()
#     if not ret:
#         break

#     # Flip frame for natural mirroring
#     frame = cv2.flip(frame, 1)
#     h, w, _ = frame.shape

#     # Resize background to match frame size
#     bg_resized = cv2.resize(background_image, (w, h))

#     # Convert to RGB for Mediapipe
#     rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

#     # Apply segmentation to remove background
#     segment_result = segmentation.process(rgb_frame)
#     mask = segment_result.segmentation_mask
#     mask = np.expand_dims(mask, axis=-1)

#     # Blend the new background
#     frame = (mask * frame + (1 - mask) * bg_resized).astype(np.uint8)

#     # Detect facial landmarks
#     result = face_mesh.process(rgb_frame)

#     if result.multi_face_landmarks:
#         for face_landmarks in result.multi_face_landmarks:
#             points = face_landmarks.landmark

#             # Key landmarks for mask positioning
#             forehead_x, forehead_y = int(points[10].x * w), int(points[10].y * h)  # Upper forehead
#             chin_x, chin_y = int(points[152].x * w), int(points[152].y * h)  # Chin
#             left_cheek_x, left_cheek_y = int(points[234].x * w), int(points[234].y * h)  # Left cheek
#             right_cheek_x, right_cheek_y = int(points[454].x * w), int(points[454].y * h)  # Right cheek
#             nose_x, nose_y = int(points[1].x * w), int(points[1].y * h)  # Nose tip (for centering)

#             # Calculate mask size (width based on cheeks, height from forehead to chin)
#             mask_width = int(abs(right_cheek_x - left_cheek_x) * 3)
#             mask_height = int(abs(chin_y - forehead_y) * 2)

#             # Calculate face rotation angle using left and right cheek positions
#             angle = np.degrees(np.arctan2(right_cheek_y - left_cheek_y, right_cheek_x - left_cheek_x))

#             # Resize the mask image
#             if mask_width > 0 and mask_height > 0:
#                 mask_resized = cv2.resize(mask_image, (mask_width, mask_height), interpolation=cv2.INTER_AREA)

#                 # Rotate the mask to match face tilt
#                 mask_rotated = rotate_image(mask_resized, angle)

#                 # Adjust x_offset and y_offset to center the mask on the nose
#                 x_offset = nose_x - mask_width // 2
#                 y_offset = forehead_y - mask_height // 4

#                 # Ensure mask fits within frame
#                 x_offset = max(0, x_offset)
#                 y_offset = max(0, y_offset)
#                 x_end = min(x_offset + mask_width, w)
#                 y_end = min(y_offset + mask_height, h)

#                 # Extract valid mask region
#                 mask_region = mask_rotated[: y_end - y_offset, : x_end - x_offset]

#                 # Blend using alpha channel
#                 if mask_region.shape[2] == 4:
#                     mask_alpha = mask_region[:, :, 3] / 255.0  # Normalize alpha
#                     mask_rgb = mask_region[:, :, :3]

#                     # Blend mask with frame
#                     for c in range(3):
#                         frame[y_offset:y_end, x_offset:x_end, c] = (
#                             mask_alpha * mask_rgb[:, :, c] + (1 - mask_alpha) * frame[y_offset:y_end, x_offset:x_end, c]
#                         )

#     # Show output frame
#     cv2.imshow("Live Background & Mask Filter", frame)

#     if cv2.waitKey(1) & 0xFF == ord("q"):
#         break

# cap.release()
# cv2.destroyAllWindows()



import cv2
import mediapipe as mp
import numpy as np
from PIL import Image, ImageSequence
import os

# Load face detection and segmentation models
mp_selfie_segmentation = mp.solutions.selfie_segmentation
segmentation = mp_selfie_segmentation.SelfieSegmentation(model_selection=1)  # Model selection = 1 for better accuracy

# Load GIF and extract frames
background_path = os.path.abspath("./ai/background1.gif")
try:
    gif = Image.open(background_path)
    bg_frames = [np.array(frame.convert('RGB')) for frame in ImageSequence.Iterator(gif)]
    bg_index = 0  # To cycle through frames
except Exception as e:
    print(f"Error loading background GIF: {e}")
    exit()

# Capture video from webcam
cap = cv2.VideoCapture(0)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Flip frame for natural mirroring
    frame = cv2.flip(frame, 1)
    h, w, _ = frame.shape

    # Get current GIF frame and resize
    bg_frame = cv2.resize(bg_frames[bg_index], (w, h))
    bg_index = (bg_index + 1) % len(bg_frames)  # Cycle through GIF frames

    # Convert frame to RGB for Mediapipe
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Apply segmentation to remove background
    segment_result = segmentation.process(rgb_frame)
    mask = segment_result.segmentation_mask
    mask = np.expand_dims(mask, axis=-1)

    # Blend the new background
    frame = (mask * frame + (1 - mask) * bg_frame).astype(np.uint8)

    # Show output frame
    cv2.imshow("Live Background Replacement", frame)

    if cv2.waitKey(30) & 0xFF == ord("q"):  # Adjust delay to match GIF speed
        break

cap.release()
cv2.destroyAllWindows()
