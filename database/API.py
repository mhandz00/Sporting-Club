from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)  # السماح بطلبات CORS

# مسار ملف CSV
CSV_FILE = "confirmed_reservations.csv"

# التأكد من وجود ملف CSV وإضافة رؤوس الأعمدة
if not os.path.exists(CSV_FILE):
    df = pd.DataFrame(columns=["Reservation ID", "Stadium Name", "Day", "Date", "Time", "Mobile Number"])
    df.to_csv(CSV_FILE, index=False)

@app.route("/confirm", methods=["POST"])
def confirm_reservation():
    data = request.json
    if not data:
        return jsonify({"error": "Invalid data"}), 400

    new_reservation = {
        "Reservation ID": data.get("reservationId"),
        "Stadium Name": data.get("stadiumName"),
        "Day": data.get("reservationDay"),
        "Date": data.get("reservationDate"),
        "Time": data.get("reservationTime"),
        "Mobile Number": data.get("mobileNumber")
    }
    
    # تحميل البيانات الحالية
    df = pd.read_csv(CSV_FILE)

    # إضافة الحجز الجديد باستخدام concat
    df = pd.concat([df, pd.DataFrame([new_reservation])], ignore_index=True)

    # حفظ الملف
    df.to_csv(CSV_FILE, index=False)

    return jsonify({"message": "Reservation confirmed and saved!"}), 201

if __name__ == "__main__":
    app.run(debug=True)
