from rest_framework import serializers
from .models import Attendance
from Employee.models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

class AttendanceSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer()

    class Meta:
        model = Attendance
        fields = '__all__'
