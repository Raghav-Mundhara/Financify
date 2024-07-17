from flask import Flask, request, jsonify
from pymongo import MongoClient
import pandas as pd
import joblib
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Load the model and preprocessing objects
svm_model = joblib.load('svm_model (2).joblib')
scaler = joblib.load('scaler (2).joblib')
label_encoders = joblib.load('label_encoders (2).joblib')
target_encoder = joblib.load('target_encoder (2).joblib')

# MongoDB Atlas connection
MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://mundhararaghav16:o1kPLQI7sFeIvYcH@cluster0.l7nepr7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
client = MongoClient(MONGO_URI)
db = client['test']

features = ['income', 'roi', 'risk', 'literacyRate']
categorical_features = ['roi', 'risk', 'literacyRate']
numerical_features = ['income']

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    df = pd.DataFrame([data])

    # Preprocess the data
    for feature in categorical_features:
        if feature in df.columns:
            df[feature] = label_encoders[feature].transform(df[feature])
    
    for feature in numerical_features:
        if feature in df.columns:
            df[feature] = df[feature].astype(float)

    # Ensure all required features are present
    missing_features = [feature for feature in features if feature not in df.columns]
    if missing_features:
        return jsonify({'error': f'Missing features: {missing_features}'}), 400

    X_new = df[features]
    X_new.loc[:, 'income'] = scaler.transform(X_new[['income']])

    # Predict
    predictions = svm_model.predict(X_new)
    prediction = target_encoder.inverse_transform(predictions)[0]

    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)


#"MONGO_URI", "mongodb+srv://mundhararaghav16:o1kPLQI7sFeIvYcH@cluster0.l7nepr7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"