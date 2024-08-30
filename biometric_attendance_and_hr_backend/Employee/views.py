from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import Employee
from .serializers import EmployeeSerializer
from django.core.mail import send_mail
from django.conf import settings
from datetime import datetime, timedelta
from rest_framework.views import APIView
from Attendance.models import Attendance
from Leave_Management_App.models import Leave

@api_view(['POST'])
def create_employee(request):
    serializer = EmployeeSerializer(data=request.data)
    if serializer.is_valid():
        # Save the employee instance
        employee = serializer.save()
        
        # Extract the email and password from request data
        email = request.data.get('email')
        password = request.data.get('password')
        
        # Send email with password
        if email and password:
            send_mail(
                'Welcome to Our Company',
                f'Hello {request.data.get("full_name")},\n\nYour account has been created successfully. Here are your login details:\n\nUsername: {request.data.get("username")}\nPassword: {password}',
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )
            print('Email sent successfully:', email)
        else:
            print('Failed to send email')
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    print('Validation errors:', serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
from rest_framework import generics

class EmployeeListCreateView(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class EmployeeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
# @api_view(['GET'])
# def all_employees(request):
#     employees = Employee.objects.all()
#     data = [
#         {
#             'id': employee.id,
#             'full_name': employee.full_name,
#             'position': employee.position,
#             'employee_type': employee.employee_type,
#             'department': employee.department,
#         }
#         for employee in employees
#     ]
#     return JsonResponse(data, safe=False)

# from rest_framework import viewsets
# class EmployeeViewSet(viewsets.ModelViewSet):
#     queryset = Employee.objects.all()
#     serializer_class = EmployeeSerializer
    
def total_employees_count(request):
    count = Employee.objects.count()
    return JsonResponse({'count': count})

class DashboardData(APIView):
    def get(self, request):
        try:
            # Employee Statistics
            total_employees = Employee.objects.count()
            # total_training = TrainingSession.objects.count()
            total_attendance = Attendance.objects.filter(date=datetime.today()).count()
            total_leaves = Leave.objects.filter(status='Approved').count()

            # Calculate the date range for the last 5 days
            end_date = datetime.today()
            start_date = end_date - timedelta(days=4)
            date_range = [(start_date + timedelta(days=i)).strftime('%Y-%m-%d') for i in range(5)]

            # Attendance Overview
            attendance_data = Attendance.objects.filter(date__range=[start_date, end_date])
            on_time_count = attendance_data.filter(status='On Time').count()
            late_count = attendance_data.filter(status='Late').count()
            absent_count = total_employees - (on_time_count + late_count)
            leave_count = Leave.objects.filter(leave_from__lte=end_date, leave_to__gte=end_date, status='Approved').count()

            data = {
                'total_employees': total_employees,
                # 'total_training': total_training,
                'total_attendance': total_attendance,
                'total_leaves': total_leaves,
                'attendance_overview': {
                    'labels': date_range,
                    'on_time': [on_time_count],
                    'late': [late_count],
                    'absent': [absent_count],
                    'leave': [leave_count],
                }
            }
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class EmployeeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

from rest_framework.exceptions import NotFound

class EmployeeDirectorDetailView(generics.GenericAPIView):
    serializer_class = EmployeeSerializer

    def get(self, request, *args, **kwargs):
        email = kwargs.get('email')
        print ('email is',email)
        try:
            employee = Employee.objects.get(email=email)
            print(employee)
        except Employee.DoesNotExist:
            raise NotFound("Employee not found")
        
        serializer = self.get_serializer(employee)
        return Response(serializer.data)
    


from .models import Employee

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response({'error': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Authenticate the employee
            employee = Employee.objects.get(email=email)
            if employee.password == password:
                return Response({
                    'role': employee.role,  # Adjust this based on your role field
                    'email': email
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid email or password.'}, status=status.HTTP_401_UNAUTHORIZED)
        except Employee.DoesNotExist:
            return Response({'error': 'Invalid email or password.'}, status=status.HTTP_401_UNAUTHORIZED)

from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
import json
from django.shortcuts import get_object_or_404
@csrf_exempt
def change_password(request, email):
    if request.method == 'POST':
        data = json.loads(request.body)
        new_password = data.get('new_password', '')
        
        if not new_password:
            return JsonResponse({'error': 'New password is required'}, status=400)
        
        try:
            employee = get_object_or_404(Employee, email=email)
            employee.password = make_password(new_password)
            employee.save()
            return JsonResponse({'success': 'Password updated successfully'})
        except Employee.DoesNotExist:
            return JsonResponse({'error': 'Employee not found'}, status=404)
    return JsonResponse({'error': 'Invalid request method'}, status=405)