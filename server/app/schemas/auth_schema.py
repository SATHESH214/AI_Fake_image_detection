from pydantic import BaseModel, EmailStr, Field

class RegisterSchema(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)

class LoginSchema(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)

class TokenResponseSchema(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UserResponseSchema(BaseModel):
    id: str
    name: str
    email: EmailStr