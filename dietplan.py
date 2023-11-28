from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from pydantic import BaseModel
import json
from typing import List, Optional
from passlib.context import CryptContext

user_filename = "user.json"

diet_recommendation_filename = "diet_recommendation.json"

auth_filename = "auth.json"

with open(user_filename, "r") as read_file:
    datauser = json.load(read_file)

with open(diet_recommendation_filename, "r") as read_file:
    datarecom = json.load(read_file)

with open(auth_filename, "r") as read_file:
    dataauth = json.load(read_file)


class UserData(BaseModel):
    user_id: str
    name: str
    weight_kg: float
    height_cm: int
    age: int
    gender: str
    activity_level: str
    goal: str

class DietRecommendation(BaseModel):
    user_id: str
    calories_per_day: int
    protein_grams_per_day: int
    carbohydrates_grams_per_day: int
    fat_grams_per_day: int
    fiber_grams_per_day: int
    breakfast: str
    lunch: str
    dinner: str
    snack: str

##########################################
class User(BaseModel):
    username: str
    password: str
    
# JWT token authentication
ADMIN = "Admin123"
SECRET_KEY = "DietPlan-TST"
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    return username

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)
###########################################

app = FastAPI()

##########################################
@app.post('/register')
async def register(user:User):
    user_dict = user.dict()
    user_found = False
    for user_item in dataauth['auth']:
        if user_item['username'] == user_dict['username']:
            user_found = True
            return "User ID "+str(user_dict['username'])+" exists."
    
    if not user_found:
        user_dict['password'] = hash_password(user_dict['password'])
        dataauth['auth'].append(user_dict)
        with open(auth_filename,"w") as write_file:
            json.dump(dataauth, write_file)
            
        return user_dict
    raise HTTPException(
		status_code=404, detail=f'Registrasi Gagal'
	)

@app.post('/signin')
async def signin(user:User):
    user_dict = user.dict()
    user_found = False
    for user_item in dataauth['auth']:
        if user_item['username'] == user_dict['username']:
            user_found = True
            if verify_password(user_dict['password'], user_item['password']):
                token_data = {"sub": user_item['username']}  
                token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
                return {"token": token, "message": "Signin successful"}
            else:
                raise HTTPException(status_code=404, detail="Password Anda Salah")
    raise HTTPException(
		status_code=404, detail=f'User Tidak Ditemukan'
	)

@app.get('/token/{username}')
async def return_token(username: str):
    token_data = {"sub": username}
    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
    return {"token": token}
##########################################
@app.get("/user", dependencies=[Depends(get_current_user)])
def get_all_users():
    return datauser["user"]

# Additional endpoint to get all diet recommendations
@app.get("/diet_recommendation", dependencies=[Depends(get_current_user)])
def get_all_diet_recommendations():
    return datarecom

# Read User endpoint
@app.get("/user/{user_id}", response_model=UserData, dependencies=[Depends(get_current_user)])
def read_user(user_id: str):
    for user in datauser["user"]:
        if user["user_id"] == user_id:
            return user
    raise HTTPException(status_code=404, detail="User not found")

# Read Diet Recommendation endpoint
@app.get("/diet_recommendation/{user_id}", response_model=DietRecommendation, dependencies=[Depends(get_current_user)])
def read_diet_recommendation(user_id: str):
    for diet in datarecom["diet_recommendation"]:
        if diet["user_id"] == user_id:
            return diet
    raise HTTPException(status_code=404, detail="Data recommendation not found")

# Update User endpoint
@app.put("/user/{user_id}", response_model=UserData)
def update_user(user_id: str, updated_user: UserData, current_user: str = Depends(get_current_user)):
    for user in datauser["user"]:
        if user["user_id"] == user_id:
            user.update(updated_user.dict())
            with open(user_filename, "w") as write_file:
                json.dump(datauser, write_file, indent=2)
            return updated_user
    raise HTTPException(status_code=404, detail="User not found")

# Update Diet Recommendation endpoint
@app.put("/diet_recommendation/{user_id}", response_model=DietRecommendation)
def update_diet_recommendation(user_id: str, updated_diet_recommendation: DietRecommendation, current_user: str = Depends(get_current_user)):
    for diet in datarecom["diet_recommendation"]:
        if diet["user_id"] == user_id:
            diet.update(updated_diet_recommendation.dict())
            with open(diet_recommendation_filename, "w") as write_file:
                json.dump(datarecom, write_file, indent=2)
            return updated_diet_recommendation
    raise HTTPException(status_code=404, detail="Data recommendation not found")

# Create User endpoint
@app.post("/user", response_model=UserData)
def create_user(user: UserData, current_user: str = Depends(get_current_user)):
    datauser["user"].append(user.dict())
    with open(user_filename, "w") as write_file:
        json.dump(datauser, write_file, indent=2)
    return user

# Create Diet Recommendation endpoint
@app.post("/diet_recommendation", response_model=DietRecommendation)
def create_diet_recommendation(diet_recommendation: DietRecommendation, current_user: str = Depends(get_current_user)):
    datarecom["diet_recommendation"].append(diet_recommendation.dict())
    with open(diet_recommendation_filename, "w") as write_file:
        json.dump(datarecom, write_file, indent=2)
    return diet_recommendation


# Delete User endpoint
@app.delete("/user/{user_id}", response_model=UserData)
def delete_user(user_id: str, current_user: str = Depends(get_current_user)):
    for index, user in enumerate(datauser["user"]):
        if user["user_id"] == user_id:
            deleted_user = datauser["user"].pop(index)
            with open(user_filename, "w") as write_file:
                json.dump(datauser, write_file, indent=2)
            return deleted_user
    raise HTTPException(status_code=404, detail="User not found")

# Delete Diet Recommendation endpoint
@app.delete("/diet_recommendation/{user_id}", response_model=DietRecommendation)
def delete_diet_recommendation(user_id: str, current_user: str = Depends(get_current_user)):
    for index, user in enumerate(datarecom["diet_recommendation"]):
        if user["user_id"] == user_id:
            deleted_user = datarecom["diet_recommendation"].pop(index)
            with open(diet_recommendation_filename, "w") as write_file:
                json.dump(datarecom, write_file, indent=2)
            return deleted_user
    raise HTTPException(status_code=404, detail="Diet Recommendation not found")