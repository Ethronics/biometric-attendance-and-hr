from django.db import models
from Employee.models import Employee
import datetime
# Define choices for location and status


status_choices = [
    ('inprogress', 'In Progress'),
    ('completed', 'Completed'),
]

class Training(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='trainings',null=True)
    id = models.AutoField(primary_key=True)
    program = models.CharField(max_length=50)
    description = models.CharField(max_length=100)
    trainer = models.CharField(max_length=50)
    start_date = models.DateField()
    end_date = models.DateField()
    location = models.CharField(max_length=50,)
    status = models.CharField(max_length=50, choices=status_choices, default='inprogress')
    cirtificate=models.FileField(upload_to='cirtificates/',null=True,blank=True)


    def save(self, *args, **kwargs):
        # Update the status based on the end date
        if self.end_date < datetime.date.today():
            self.status = 'completed'
        else:
            self.status = 'inprogress'
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.program} by {self.trainer}"

    class Meta:
        ordering = ['end_date']
