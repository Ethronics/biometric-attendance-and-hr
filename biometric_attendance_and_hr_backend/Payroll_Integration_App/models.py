from django.db import models
from Employee.models import Employee
from datetime import date
from calendar import monthrange
from Attendance.models import Attendance

class Payroll(models.Model):
    STATUS_CHOICES = [
        ('Paid', 'Paid'),
        ('Unpaid', 'Unpaid'),
    ]

    id = models.AutoField(primary_key=True)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='payrolls')
    basic_salary = models.DecimalField(max_digits=10, decimal_places=2)
    allowance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    deductions = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    gross_salary = models.DecimalField(max_digits=10, decimal_places=2, editable=False)
    net_salary = models.DecimalField(max_digits=10, decimal_places=2, editable=False)
    pay_period_start_date = models.DateField()
    pay_period_end_date = models.DateField()
    payment_date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Unpaid')
    absences_in_month = models.PositiveIntegerField(default=0)
    attendance_days_in_month = models.PositiveIntegerField(default=0)
    working_days_in_month = models.PositiveIntegerField(default=0)
    calculated_salary = models.DecimalField(max_digits=10, decimal_places=2, editable=False, default=0.0)
    overtime_hours = models.PositiveIntegerField(default=0)  # Added to track overtime
    bonus = models.DecimalField(max_digits=10, decimal_places=2, default=0)  # Added to track bonus

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # Set the start and end dates for the payroll period if not already set
        if not self.pay_period_start_date or not self.pay_period_end_date:
            today = date.today()
            self.pay_period_start_date = today.replace(day=1)
            self.pay_period_end_date = today.replace(day=monthrange(today.year, today.month)[1])

        # Calculate the number of working days in the month
        total_days_in_month = monthrange(self.pay_period_start_date.year, self.pay_period_start_date.month)[1]
        weekdays = [5, 6]  # Saturday (5) and Sunday (6)

        self.working_days_in_month = sum(
            1 for day in range(1, total_days_in_month + 1)
            if (self.pay_period_start_date.replace(day=day).weekday()) not in weekdays
        )

        # Calculate absences and attendance days
        attendance_records = Attendance.objects.filter(
            employee=self.employee,
            date__gte=self.pay_period_start_date,
            date__lte=self.pay_period_end_date
        )
        self.absences_in_month = attendance_records.filter(status='Absent').count()
        self.attendance_days_in_month = self.working_days_in_month - self.absences_in_month

        # Calculate salary based on attendance and overtime
        daily_salary = self.basic_salary / self.working_days_in_month
        self.calculated_salary = daily_salary * self.attendance_days_in_month + self.allowance - self.deductions + self.bonus

        # Set gross and net salary
        self.gross_salary = self.basic_salary + self.allowance
        self.net_salary = self.calculated_salary

        super().save(*args, **kwargs)

    def __str__(self):
        return f"Payroll for {self.employee.full_name} - {self.pay_period_start_date} to {self.pay_period_end_date}"

    class Meta:
        ordering = ['pay_period_end_date']
