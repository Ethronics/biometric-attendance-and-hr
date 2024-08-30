from rest_framework import generics, status
from rest_framework.response import Response
from .models import Leave
from Employee.models import Employee
from .serializers import LeaveSerializer, LeaveBalanceSerializer
from rest_framework.permissions import IsAuthenticated


class LeaveListCreateView(generics.ListCreateAPIView):
    serializer_class = LeaveSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        email = self.kwargs['email']
        employee = Employee.objects.get(email=email)
        return Leave.objects.filter(employee=employee)

class LeaveBalanceView(generics.RetrieveAPIView):
    serializer_class = LeaveBalanceSerializer
    # permission_classes = [IsAuthenticated]
    lookup_field = 'email'
    queryset = Employee.objects.all()

from rest_framework import viewsets
from rest_framework.decorators import action
class LeaveViewSet(viewsets.ModelViewSet):
    queryset = Leave.objects.all()
    serializer_class = LeaveSerializer

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        leave = self.get_object()
        leave.status = 'Approved'
        leave.save()
        return Response({'status': 'Leave approved'})

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        leave = self.get_object()
        leave.status = 'Rejected'
        leave.rejection_reason = request.data.get('rejection_reason', '')
        leave.save()
        return Response({'status': 'Leave rejected'})