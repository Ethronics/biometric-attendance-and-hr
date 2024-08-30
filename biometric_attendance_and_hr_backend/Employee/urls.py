from django.urls import path
from .views import create_employee,total_employees_count,DashboardData
from .views import EmployeeListCreateView, EmployeeDetailView,LoginView,EmployeeDirectorDetailView,change_password
urlpatterns = [
    path('create/', create_employee, name='create_employee'),
   
       path('count/', total_employees_count, name='total_employees_count'),
       path('dashboard/', DashboardData.as_view(), name='dashboard-data'),
        path('employees/', EmployeeListCreateView.as_view(), name='employee-list'),
        path('employees/<int:pk>/', EmployeeDetailView.as_view(), name='employee-detail'),
         path('login/', LoginView.as_view(), name='login'),
         path('<str:email>/', EmployeeDirectorDetailView.as_view(), name='employee-director-detail'),
          path('<str:email>/change-password/', change_password, name='change-password'),
]
