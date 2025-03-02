import sys
import whisper
import os

def process_audio(filename,lang="en"):
  model = whisper.load_model("base")  # Load the Whisper model

  # Ensure the correct absolute path
  file_path = os.path.join(os.getcwd(), "uploads", "audios", filename)

  if not os.path.exists(file_path):
    print(f"Error: File '{file_path}' does not exist.")
    sys.exit(1)

  # Transcribe the file
  result = model.transcribe(file_path)

  # Save the output
  report_path = os.path.join(os.getcwd(), "reports", f"{filename.split('.')[0]}.txt")
  with open(report_path, "w", encoding="UTF-8") as f:
    f.write(result['text'])

if __name__ == "__main__":
  if len(sys.argv) < 2:
    print("Error: No filename provided")
    sys.exit(1)

  filename = sys.argv[1]  # Get filename from Node.js
  process_audio(filename, lang="az")
