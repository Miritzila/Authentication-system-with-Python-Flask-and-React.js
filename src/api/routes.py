from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

CORS(api)

@api.route('/sing_up', methods=['POST'])
def handle_sing_up():
    request_data = request.get_json()
    if 'email' not in request_data:
        return jsonify({"error": "The email is not present"}), 418
    if 'password' not in request_data:
        return jsonify({"error": "The password is not present"}), 418
    if 'passwordConfirmation' not in request_data:
        return jsonify({"error": "The password confirmation is not present"}), 418
    
    email = request_data['email']
    password = request_data['password']
    password_confirmation = request_data['passwordConfirmation']
    
    if password_confirmation != password:
       return jsonify({"error": "Passwords doesn't match"}), 400 
    
    user = User(email=email, password=password, is_active=True)
    db.session.add(user)
    db.session.commit() 

    response_body = {
        "message": "You sing up correctly!"
    }

    return jsonify(response_body), 200

@api.route('/sing_in', methods=['POST'])
def handle_sing_in():
    request_data = request.get_json()
    if 'email' not in request_data:
        return jsonify({"error": "The email is not present"}), 418
    if 'password' not in request_data:
        return jsonify({"error": "The password is not present"}), 418
    
    email = request_data['email']
    password = request_data['password']
    
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({"error": "The email or password are incorrect"}), 400

    response_body = {
        "message": "You sing in correctly!"
    }

    return jsonify(response_body), 200