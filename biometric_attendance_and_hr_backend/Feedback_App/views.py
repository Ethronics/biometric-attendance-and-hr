# feedback/views.py
from rest_framework import generics
from .models import Feedback
from .serializers import FeedbackSerializer
from rest_framework.permissions import IsAuthenticated

class FeedbackListCreateView(generics.ListCreateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    

    def get_queryset(self):
        email = self.request.query_params.get('email')
        if email:
            return self.queryset.filter(giver__email=email)
        return self.queryset

    def perform_create(self, serializer):
        serializer.save(giver=self.request.user)  # Save the current user as the feedback giver
