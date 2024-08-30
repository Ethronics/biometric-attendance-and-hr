from django.db import models
from datetime import timedelta, datetime
from Employee.models import Employee
class Attendance(models.Model):
    STATUS_CHOICES = [
        ('On Time', 'On Time'),
        ('Late', 'Late'),
        ('Absent', 'Absent'),
        ('On Leave', 'On Leave'),
    ]

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    clock_in_time = models.TimeField()
    clock_out_time = models.TimeField(null=True, blank=True)
    lunch_out_time = models.TimeField(null=True, blank=True)
    lunch_in_time = models.TimeField(null=True, blank=True)
    date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.clock_out_time and self.clock_in_time:
            clock_in_datetime = datetime.combine(self.date, self.clock_in_time)
            default_clock_out_datetime = clock_in_datetime + timedelta(hours=8)
            self.clock_out_time = default_clock_out_datetime.time()
        
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.employee.full_name} - {self.date}"

    class Meta:
        ordering = ['date', 'employee']
