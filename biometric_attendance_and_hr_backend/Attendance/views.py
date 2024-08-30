
from rest_framework import generics
from .models import Attendance
from .serializers import AttendanceSerializer

from Employee.models import Employee
class AttendanceList(generics.ListAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

from django.http import JsonResponse

from django.utils import timezone

def today_attendance_count(request):
    today = timezone.now().date()
    count = Attendance.objects.filter(date=today).count()
    return JsonResponse({'count': count})
class AttendanceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

class AttendanceListByEmployeeView(generics.ListAPIView):
    serializer_class = AttendanceSerializer
    
    def get_queryset(self):
        email = self.kwargs.get('email')
        print('for attendance  email is',email)
        employee = Employee.objects.get(email=email)
        print(employee)
        return Attendance.objects.filter(employee=employee)