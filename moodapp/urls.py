from django.urls import include, path                    
from rest_framework import routers
from .views import current_user, UserList

router = routers.DefaultRouter()

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    # path('', include(router.urls)),
]