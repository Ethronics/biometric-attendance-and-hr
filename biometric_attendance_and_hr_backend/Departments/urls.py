# Departments/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DepartmentViewSet, SubDepartmentViewSet

router = DefaultRouter()
router.register(r'departments', DepartmentViewSet)
router.register(r'subdepartments', SubDepartmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
