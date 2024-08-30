from django.db import models
from Employee.models import Employee
from django.utils import timezone

class Performance(models.Model):
    id = models.AutoField(primary_key=True)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='performances')
    performance_rating = models.PositiveIntegerField(default=0)
    feedback = models.CharField(max_length=100)
    date = models.DateField(default=timezone.now)
    evaluator = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='evaluation')

    def __str__(self):
        return f"Performance review for {self.employee.full_name} by {self.evaluator.full_name} on {self.date}"

    class Meta:
        ordering = ['-date']
