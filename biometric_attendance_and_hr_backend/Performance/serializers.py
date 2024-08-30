from rest_framework import serializers
from .models import Performance
from Employee.models import Employee
from Employee.serializers import EmployeeSerializer

class PerformanceSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer()

    class Meta:
        model = Performance
        fields = ['id', 'employee', 'performance_rating', 'feedback', 'date','evaluator']
