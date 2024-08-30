from rest_framework import generics, status
from rest_framework.response import Response
from .models import Performance
from .serializers import PerformanceSerializer
from Employee.models import Employee
from Employee.serializers import EmployeeSerializer
from django.core.exceptions import ObjectDoesNotExist
from django.utils import timezone

class PerformanceListCreateView(generics.ListCreateAPIView):
    queryset = Performance.objects.all()
    serializer_class = PerformanceSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        print(data)
        employee_id = data.get('employee')
        print(employee_id)

        try:
            employee = Employee.objects.get(id=employee_id['id'])
        except ObjectDoesNotExist:
            return Response({"error": "Employee does not exist."}, status=status.HTTP_400_BAD_REQUEST)

        performance_data = {
            'employee':employee_id['id']
                
              ,
            'performance_rating': data.get('performance_rating'),
            'feedback': data.get('feedback'),
            'date': data.get('date', timezone.now().date()),
        }
        print(performance_data)
        serializer = self.get_serializer(data=performance_data)
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class PerformanceListView(generics.ListAPIView):
    serializer_class = PerformanceSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        email = self.kwargs.get('email')
        return Performance.objects.filter(employee__email=email).order_by('-date')