from models import UserModel


def user_factory(email: str, name: str) -> UserModel:
    if not email:
        raise ValueError("email is required")
    if not name:
        raise ValueError("name is required")

    return UserModel(**{
        "email": email,
        "name": name,
    })
