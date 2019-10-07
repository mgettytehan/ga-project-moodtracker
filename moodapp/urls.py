from django.urls import include, path                    
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

router.register(r'moodscales', views.MoodScaleViewSet)
router.register(r'scaleitems', views.ScaleItemViewSet)
router.register(r'moodlogs', views.MoodLogViewSet)

urlpatterns = [
    path('currentuserdata/', views.currentuserdata),
    path('current_user/', views.current_user),
    path('users/', views.UserList.as_view()),
    path('', include(router.urls)),
]