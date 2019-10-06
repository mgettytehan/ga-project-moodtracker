from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from .models import *
from .serializers import *

class MoodScaleViewSet(viewsets.ModelViewSet):
    queryset = MoodScale.objects.all()
    serializer_class = MoodScaleSerializer

class ScaleItemViewSet(viewsets.ModelViewSet):
    queryset = ScaleItem.objects.all()
    serializer_class = ScaleItemSerializer

class MoodLogViewSet(viewsets.ModelViewSet):
    queryset = MoodLog.objects.all()
    serializer_class = MoodLogSerializer

# Note: current format is from tutorial.
# To refactor and normalize according to regular pattern

@api_view(['GET'])
# for user refreshing, visiting while still logged in
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    # must be allowany so they can sign up without a login
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)