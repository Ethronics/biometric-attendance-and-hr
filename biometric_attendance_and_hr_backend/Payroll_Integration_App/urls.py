from django.urls import path
from .views import PayrollListView,EmployeePayrollList

urlpatterns = [
    path('all/', PayrollListView.as_view(), name='payroll-list'),
     path('<str:eamil>/', EmployeePayrollList.as_view(), name='Employee=payroll-list'),

]
