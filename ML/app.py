import pandas as pd
import numpy as np

# Define the possible values for each attribute
income_categories = ['>5Lakhs', '3-5Lakhs', '<3Lakhs']
roi_categories = ['Low', 'Med', 'High']
literacy_categories = ['high', 'med', 'low']
risk_categories = ['Low', 'Medium', 'High']  # Updated to use direct risk categories

# Define the number of samples in the dataset
num_samples = 1000

# Define the numerical ranges for income
income_ranges = {
    '>5Lakhs': (500001, 1000000),
    '3-5Lakhs': (300000, 500000),
    '<3Lakhs': (100000, 299999)
}

# Generate random categorical data for each attribute
income_data_categorical = np.random.choice(income_categories, num_samples)
roi_data = np.random.choice(roi_categories, num_samples)
literacy_data = np.random.choice(literacy_categories, num_samples)

# Convert categorical income data to numerical data
income_data_numerical = [np.random.randint(*income_ranges[cat]) for cat in income_data_categorical]

# Generate random risk data
risk_data = np.random.choice(risk_categories, num_samples)

# Determine 'investin' based on income, risk, and roi
def determine_investin(income, risk, roi):
    if income < 300000:
        return 'FD'
    elif 300000 <= income <= 500000:
        if risk == 'Low':
            return 'FD'
        else:
            return 'Mutual Funds'
    elif income > 500000:
        if risk == 'Low':
            return 'FD'
        elif risk == 'High' and roi == 'High':
            return 'stocks'
        elif risk == 'High' and roi == 'Med':
            return 'stocks'
        elif risk == 'Medium' and roi == 'Low':
            return 'FD'
        else:
            return 'Mutual Funds'

investin_data = [determine_investin(income, risk, roi) 
                 for income, risk, roi 
                 in zip(income_data_numerical, risk_data, roi_data)]

# Create a DataFrame
data = {
    'risk': risk_data,
    'income': income_data_numerical,
    'roi': roi_data,
    'literacy': literacy_data,
    'investin': investin_data
}

df = pd.DataFrame(data)

# Save the DataFrame to a CSV file
df.to_csv('improved_dataset.csv', index=False)

print("Dataset generated and saved to 'improved_dataset.csv'")

