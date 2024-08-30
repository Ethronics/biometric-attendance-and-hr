# Leave/serializers.py

from rest_framework import serializers
from .models import Leave
from Employee.models import Employee


class LeaveSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True)  # Accept email as input, but don't include it in output.

    class Meta:
        model = Leave
        fields = '__all__'
        extra_kwargs = {
            'employee': {'required': False}  # Make employee not required since we'll set it manually.
        }

    def validate(self, data):
        email = data.get('email')
        if not email:
            raise serializers.ValidationError({"email": "This field is required."})

        try:
            employee = Employee.objects.get(email=email)
        except Employee.DoesNotExist:
            raise serializers.ValidationError({"email": "Employee with this email does not exist."})

        data['employee'] = employee
        return data

    def create(self, validated_data):
        validated_data.pop('email')  # Remove email after using it to set employee
        return super().create(validated_data)
class LeaveBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = [
            'annual_leave_balance',
            'sick_leave_balance',
            'maternity_leave_balance',
            'paternity_leave_balance',
            'unpaid_leave_balance',
        ]
