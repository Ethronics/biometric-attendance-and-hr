# serializers.py

from rest_framework import serializers
from .models import Department, SubDepartment
from Employee.models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

class SubDepartmentSerializer(serializers.ModelSerializer):
    employees = EmployeeSerializer(many=True, read_only=True)

    class Meta:
        model = SubDepartment
        fields = '__all__'

class DepartmentSerializer(serializers.ModelSerializer):
    sub_departments = SubDepartmentSerializer(many=True, read_only=True)

    class Meta:
        model = Department
        fields = '__all__'
