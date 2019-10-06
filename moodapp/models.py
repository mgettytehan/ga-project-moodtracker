from django.db import models
from django.contrib.auth.models import User

class MoodScale(models.Model):
    scaleName = models.CharField(max_length=30)
    scaleType = models.CharField(max_length=15)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='moodScales')

class ScaleItem(models.Model):
    class Meta:
        unique_together = ['moodScale', 'index']

    index = models.PositiveSmallIntegerField()
    alias = models.CharField(max_length=25)
    moodScale = models.ForeignKey('MoodScale', on_delete=models.CASCADE, related_name='scaleItems')

class MoodLog(models.Model):
    madeOn = models.DateTimeField(auto_now_add=True)
    notes = models.CharField(max_length=400)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='moodLogs')

class MoodInMoodLog(models.Model):
    class Meta:
        unique_together = ['moodLog', 'scaleItem']
    
    moodLog = models.ForeignKey('MoodLog', on_delete=models.CASCADE, related_name='moodInMoodLogs')
    scaleItem = models.ForeignKey('ScaleItem', on_delete=models.CASCADE, related_name='moodInMoodLogs')