# Leave/urls.py

from django.urls import path
from .views import LeaveListCreateView, LeaveBalanceView
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LeaveViewSet

router = DefaultRouter()
router.register(r'leaves', LeaveViewSet)

urlpatterns = [
    path('leaves/<str:email>/', LeaveListCreateView.as_view(), name='leave-list-create'),
    path('employee/<str:email>/leave-balance/', LeaveBalanceView.as_view(), name='leave-balance'),
    path('', include(router.urls)),
]
