from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from .models import *


class ScaleItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScaleItem
        fields = ['index', 'alias', 'moodScale']

class MoodScaleSerializer(serializers.ModelSerializer):
    scaleItems = ScaleItemSerializer(many=True, read_only=True)
    class Meta:
        model = MoodScale
        fields = ['scaleName', 'scaleType', 'scaleItems', 'user']

class MoodLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodLog
        fields = ['madeOn', 'notes', 'user']

class UserDataSerializer(serializers.ModelSerializer):
    moodScales = MoodScaleSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ['username', 'id', 'moodScales']

# credit to tutorial https://medium.com/@dakota.lillie/django-react-jwt-authentication-5015ee00ef9a
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'id']

class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ['token', 'username', 'password']