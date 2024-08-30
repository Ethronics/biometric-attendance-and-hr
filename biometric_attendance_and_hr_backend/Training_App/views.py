# views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Training
from .serializers import TrainingSerializer
from rest_framework import generics

class TrainingCreateView(APIView):
    def post(self, request):
        serializer = TrainingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)  # Log the errors for debugging
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class TrainingListView(generics.ListAPIView):
    serializer_class = TrainingSerializer
    queryset = Training.objects.all()