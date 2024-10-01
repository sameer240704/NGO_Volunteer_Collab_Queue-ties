import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import requests
from flask import Flask, jsonify
from geopy.geocoders import Nominatim

app = Flask(__name__)
geolocator = Nominatim(user_agent="volunteer_matchmaker")

def fetch_ngo_data(api_url):
    response = requests.get(api_url)
    response.raise_for_status() 
    return pd.DataFrame(response.json())

def fetch_volunteer_data(api_url):
    response = requests.get(api_url)
    response.raise_for_status() 
    return pd.DataFrame(response.json())

def get_coordinates(city, state):
    location = geolocator.geocode(f"{city}, {state}")
    if location:
        return (location.latitude, location.longitude)
    return None

def encode_skills(skills, all_skills):
    return [1 if skill in skills else 0 for skill in all_skills]

def match_volunteers_to_ngos(ngo_data, volunteer_data):
    all_skills = list(set(
        sum(ngo_data['skills_required'].tolist() + volunteer_data['skills'].tolist(), [])
    ))

    ngo_data['skills_vector'] = ngo_data['skills_required'].apply(lambda x: encode_skills(x, all_skills))
    volunteer_data['skills_vector'] = volunteer_data['skills'].apply(lambda x: encode_skills(x, all_skills))

    ngo_data['coordinates'] = ngo_data.apply(lambda x: get_coordinates(x['city'], x['state']), axis=1)

    volunteer_data['coordinates'] = volunteer_data.apply(lambda x: get_coordinates(x['city'], x['state']), axis=1)

    skills_similarity_matrix = cosine_similarity(
        list(ngo_data['skills_vector']),
        list(volunteer_data['skills_vector'])
    )

    matches = []
    for i, ngo_row in ngo_data.iterrows():
        for j, volunteer_row in volunteer_data.iterrows():
            if ngo_row['coordinates'] and volunteer_row['coordinates']:
                distance = geodesic(ngo_row['coordinates'], volunteer_row['coordinates']).km
                if distance <= 50:  
                    if volunteer_row['availability'] >= ngo_row['time_needed']:
                        match_score = skills_similarity_matrix[i][j]
                        matches.append({
                            'ngo': ngo_row['project_name'],
                            'volunteer': volunteer_row['volunteer_name'],
                            'match_score': match_score,
                            'distance': distance
                        })

    return pd.DataFrame(matches)

@app.route('/matchVolunteers/<projectId>', methods=['GET'])
def match_volunteers(projectId):
    project_api_url = f'http://localhost:4224/project/{projectId}'
    volunteer_api_url = 'http://localhost:4224/auth/getAllVolunteers'

    ngo_data = fetch_ngo_data(project_api_url)
    volunteer_data = fetch_volunteer_data(volunteer_api_url)

    print(ngo_data, volunteer_data)

    matches = match_volunteers_to_ngos(ngo_data, volunteer_data)

    if not matches.empty:
        response_data = matches.to_dict(orient='records')
        return jsonify(response_data), 200
    else:
        return jsonify({'message': 'No matches found.'}), 404

if __name__ == '__main__':
    app.run(debug=True)
