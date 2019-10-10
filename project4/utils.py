from moodapp.serializers import UserDataSerializer

# courtesy of https://medium.com/@dakota.lillie/django-react-jwt-authentication-5015ee00ef9a
# returns user details as well as JWT
def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserDataSerializer(user, context={'request': request}).data
    }