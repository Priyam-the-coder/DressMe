from flask_cors import CORS

from flask import Flask, request, jsonify
import json
from industry6 import SmartOutfitRecommender, register_user, authenticate_user, set_user_preferences

app = Flask(__name__, static_url_path='/wardrobe', static_folder='wardrobe')
CORS(app)

# Load wardrobe data
with open('wardrobe.json','r') as file:
    wardrobe = json.load(file)

recommender = SmartOutfitRecommender("wardrobe.json")

@app.route('/register_and_login', methods=['POST'])
def register_and_login():
    data = request.json

    username = data.get("username", "").strip().lower()
    password = data.get("password")
    age_group = data.get("age_group")
    gender = data.get("gender")

    # Try to register user
    try:
        register_user(username, password, {
            "age_group": age_group,
            "gender": gender
        })
    except ValueError:
        # If user already exists, just update preferences
        set_user_preferences(username, {
            "age_group": age_group,
            "gender": gender
        })

    # Authenticate after register/update
    if not authenticate_user(username, password):
        return jsonify({"error": "Authentication failed"}), 401

    return jsonify({"message": "Registered and authenticated"}), 200


@app.route('/get_recommendation', methods=['POST'])
def get_recommendation():
    data = request.json
    print("OK", request.json)
    username = request.json["username"]
    password = request.json["password"]
    gender = "female" #request.json.gender
    age_group = "adult" #request.json.age_group
    prompt = request.json["prompt"]

    print("GOOD", username)
    print("GOOD", prompt)

    try:
        register_user(username, password, {
            "age_group": age_group,
            "gender": gender
        })
    except ValueError:
        set_user_preferences(username, {
            "age_group": age_group,
            "gender": gender
        })

    if not authenticate_user(username, password):
        return jsonify({"Invalid User": {}}), 400

    try:
        result = recommender.recommend_outfits(prompt, username)

        print(result)

        result['original_prompt'] = prompt  # Show exactly what user typed
        return jsonify({
        "recommended_set": result['outfits'],
    }), 200
    except Exception as e:
        import traceback
        traceback.print_exc()  # This will show full error details in your terminal
        return jsonify({"Error": str(e)}), 500

@app.route('/get_wardrobe', methods=['POST'])
def get_wardrobe():
    bottoms = [{"name": item["name"], "image": item["image"]} for item in wardrobe if item["category"]== "bottomwear"]
    tops = [{"name": item["name"], "image": item["image"]} for item in wardrobe if item["category"]== "topwear"]
    layers = [{"name": item["name"], "image": item["image"]} for item in wardrobe if item["category"]== "layer"]
    swim_wr = [{"name": item["name"], "image": item["image"]} for item in wardrobe if item["category"]== "swimwear"]
    one_piece = [{"name": item["name"], "image": item["image"]} for item in wardrobe if item["category"]== "one-piece"]

    return jsonify({
        "tops": tops,
        "bottoms": bottoms,
        "layers": layers,
        "swim_wr": swim_wr,
        "one_piece": one_piece
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
