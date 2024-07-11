import pandas as pd
import numpy as np

# Define the possible values for each attribute
income_categories = ['>5Lakhs', '3-5Lakhs', '<3Lakhs']
roi_categories = ['Low', 'Med', 'High']
points_categories = ['3-5', '6-8', '>8']
literacy_categories = ['high', 'med', 'low']

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
points_data = np.random.choice(points_categories, num_samples)
literacy_data = np.random.choice(literacy_categories, num_samples)

# Convert categorical income data to numerical data
income_data_numerical = [np.random.randint(*income_ranges[cat]) for cat in income_data_categorical]

# Create a risk assessment based on other attributes (adjusted for more high-risk cases)
def assess_risk(income, roi, points, literacy):
    if income > 500000 and roi == 'High' and points == '>8' and literacy == 'high':
        return 'High'
    elif income > 500000 and roi == 'Med' and points == '>8':
        return 'High'
    elif income < 300000 and roi == 'Low' and points == '3-5' and literacy == 'low':
        return 'Low'
    else:
        return 'Medium'

risk_data = [assess_risk(income, roi, points, literacy) 
             for income, roi, points, literacy 
             in zip(income_data_numerical, roi_data, points_data, literacy_data)]

# Determine 'investin' based on income, risk, points, and roi (adjusted for more stocks)
def determine_investin(income, risk, points, roi):
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
        elif risk == 'High' and points == '>8' and roi == 'High':
            return 'stocks'
        elif risk == 'High' and points in ['6-8', '>8'] and roi == 'Med':
            return 'stocks'
        elif risk == 'High' and points == '6-8' and roi == 'High':
            return 'stocks'
        elif risk == "Med" and points == '3-5' and roi == 'Low':
            return 'FD'
        else:
            return 'Mutual Funds'

investin_data = [determine_investin(income, risk, points, roi) 
                 for income, risk, points, roi 
                 in zip(income_data_numerical, risk_data, points_data, roi_data)]

# Create a DataFrame
data = {
    'risk': risk_data,
    'income': income_data_numerical,
    'roi': roi_data,
    'points': points_data,
    'literacy': literacy_data,
    'investin': investin_data
}

df = pd.DataFrame(data)

# Save the DataFrame to a CSV file
df.to_csv('improved_dataset.csv', index=False)

print("Dataset generated and saved to 'improved_dataset.csv'")
