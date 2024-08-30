from django.urls import path
from .views import  PerformanceListCreateView,PerformanceListView

urlpatterns = [
   
    path('', PerformanceListCreateView.as_view(), name='performance-list-create'),
     path('<str:email>/', PerformanceListView.as_view(), name='performance-list'),
]
