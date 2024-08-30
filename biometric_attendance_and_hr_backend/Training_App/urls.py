from django.urls import path
from .views import TrainingCreateView,TrainingListView
urlpatterns = [
   path('add/', TrainingCreateView.as_view(), name='training-create'),
path('', TrainingListView.as_view(), name='training-list'),
]
