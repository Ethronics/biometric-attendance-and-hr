from rest_framework import generics
from .models import Payroll
from .serializers import PayrollSerializer
from datetime import date
from calendar import monthrange
class PayrollListView(generics.ListCreateAPIView):
    queryset = Payroll.objects.all()
    serializer_class = PayrollSerializer
    def perform_create(self, serializer):
        today = date.today()
        payroll_start_date = today.replace(day=1)
        payroll_end_date = today.replace(day=monthrange(today.year, today.month)[1])
        
        serializer.save(
            pay_period_start_date=payroll_start_date,
            pay_period_end_date=payroll_end_date
        )

class EmployeePayrollList(generics.ListAPIView):
    serializer_class = PayrollSerializer

    def get_queryset(self):
        email = self.request.query_params.get('email')
        if email:
            return Payroll.objects.filter(employee__email=email)
        return Payroll.objects.none()