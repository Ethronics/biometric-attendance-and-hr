from rest_framework import serializers
from .models import Payroll
from Employee.serializers import EmployeeSerializer  # Adjust import if necessary

class PayrollSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer()

    class Meta:
        model = Payroll
        fields = '__all__'
