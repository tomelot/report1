import json
import hashlib

USERS_FILE = "users.json"
global_users = {}


def login(user, password):
    if not user in global_users:
        return None
    cipher_password = hashlib.sha3_512()
    cipher_user = hashlib.sha3_512()
    cipher_cookie = hashlib.sha3_512()
    cipher_user.update(user)
    cipher_password.update(password)
    if global_users[user][0] == cipher_password.hexdigest():
        update_file()
        cipher_cookie.update(cipher_password.hexdigest() +
                             cipher_user.hexdigest())
        return cipher_cookie.hexdigest()
    return None


def register(user, password, cookie):
    if user in global_users:
        return False
    cipher_password = hashlib.sha3_512()
    cipher_password.update(password)
    global_users[user] = [cipher_password.hexdigest(), cookie]
    update_file()
    return True


def change_cookie(user, cookie):
    if not user in global_users:
        return False
    global_users[user][1] = cookie
    update_file()
    return True


def update_file():
    open(USERS_FILE, "w").write(json.dumps(global_users))
