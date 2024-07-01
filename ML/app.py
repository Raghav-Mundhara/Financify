import pandas as pd
import numpy as np

# Define the possible values for each attribute
income_categories = ['>5Lakhs', '3-5Lakhs', '<3Lakhs']
roi_categories = ['Low', 'Med', 'High']
points_categories = ['3-5', '6-8', '>8']
literacy_categories = ['high', 'med', 'low']

# Define the number of samples in the dataset
num_samples = 1000

# Generate random data for each attribute
income_data = np.random.choice(income_categories, num_samples)
roi_data = np.random.choice(roi_categories, num_samples)
points_data = np.random.choice(points_categories, num_samples)
literacy_data = np.random.choice(literacy_categories, num_samples)

# Create a risk assessment based on other attributes (simple example)
def assess_risk(income, roi, points, literacy):
    if income == '>5Lakhs' and roi == 'High' and points == '>8' and literacy == 'high':
        return 'High'
    elif income == '<3Lakhs' and roi == 'Low' and points == '3-5' and literacy == 'low':
        return 'Low'
    else:
        return 'Medium'

risk_data = [assess_risk(income, roi, points, literacy) 
             for income, roi, points, literacy 
             in zip(income_data, roi_data, points_data, literacy_data)]

# Determine 'investin' based on income, risk, points, and roi
def determine_investin(income, risk, points, roi):
    if income == '<3Lakhs':
        return 'FD'
    elif income == '3-5Lakhs':
        if risk == 'Low':
            return 'FD'
        else:
            return 'Mutual Funds'
    elif income == '>5Lakhs':
        if risk == 'Low':
            return 'FD'
        elif risk == 'High' and points == '>8' and roi == 'High':
            return 'stocks'
        elif risk == 'High' and points in ['6-8', '>8'] and roi == 'Med':
            return 'Mutual Funds'
        elif risk == "Med" and points == '3-5' and roi == 'Low':
            return 'FD'
        else:
            return 'FD'
        

investin_data = [determine_investin(income, risk, points, roi) 
                 for income, risk, points, roi 
                 in zip(income_data, risk_data, points_data, roi_data)]

# Create a DataFrame
data = {
    'risk': risk_data,
    'income': income_data,
    'roi': roi_data,
    'points': points_data,
    'literacy': literacy_data,
    'investin': investin_data
}

df = pd.DataFrame(data)

# Save the DataFrame to a CSV file
df.to_csv('data.csv', index=False)

print("Dataset generated and saved to 'synthetic_dataset.csv'")
