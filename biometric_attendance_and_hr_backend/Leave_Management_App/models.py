# Leave/models.py

from django.db import models
from Employee.models import Employee

class Leave(models.Model):
    LEAVE_TYPE_CHOICES = [
        ('Annual', 'Annual'),
        ('Sick', 'Sick'),
        ('Maternity', 'Maternity'),
        ('Paternity', 'Paternity'),
        ('Unpaid', 'Unpaid'),
    ]

    LEAVE_STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='leaves')
    leave_type = models.CharField(max_length=20, choices=LEAVE_TYPE_CHOICES)
    leave_from = models.DateField()
    leave_to = models.DateField()
    reason = models.TextField()
    status = models.CharField(max_length=20, choices=LEAVE_STATUS_CHOICES, default='Pending')
    rejection_reason = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.employee.full_name} - {self.leave_type} ({self.status})"

    def save(self, *args, **kwargs):
        # Automatically update leave balance if the status is 'Approved'
        if self.status == 'Approved':
            days = (self.leave_to - self.leave_from).days + 1
            self.employee.update_leave_balance(self.leave_type, days)
        super().save(*args, **kwargs)
