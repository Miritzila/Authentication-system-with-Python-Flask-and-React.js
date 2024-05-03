from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_jwt_extended import create_access_token


api = Blueprint('api', __name__)

CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

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

@api.route('/token', methods=['POST'])
def handle_token():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if email is None or password is None:
        return jsonify({"error": "The email or password is not present"}), 400
    
    user = User.query.filter_by(email=email).first()
    
    if user is None or not user.check_password(password):
        return jsonify({"error": "Invalid email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200 

@api.route("/sing_in", methods=["POST"])
def handle_sing_in():
    request_data = request.get_json()
    if 'email' not in request_data:
        return jsonify({"error": "The email is not present"}), 418
    if 'password' not in request_data:
        return jsonify({"error": "The password is not present"}), 418
    
    current_user = User.query.filter_by(email=request_data['email'], password=request_data['password']).first()
    
    if current_user is None:
        return jsonify({"error": "Invalid email or password"}), 401
    token = create_access_token(identity=current_user.id)
    return jsonify(token=token), 200

@api.route('/profile', methods=['GET'])
@jwt_required()
def handle_profile():
    current_user = User.query.get(get_jwt_identity())

    if current_user is None:
        raise APIException("User not found", status_code=404)

    return jsonify("User identificated"), 200
