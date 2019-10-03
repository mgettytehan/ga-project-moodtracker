from rest_framework import serializers
from .models import *

class MoodScaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodScale
        fields = ['scaleName', 'scaleType']

class ScaleItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScaleItem
        fields = ['index', 'alias', 'moodScale']

class MoodLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodLog
        fields = ['madeOn', 'notes']