from django.db import models
from datetime import timedelta, datetime
from Departments.models import Department  # Adjust the import to match your actual app name

class Employee(models.Model):
    id = models.AutoField(primary_key=True)
    full_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    date_of_birth = models.DateField()
    marital_status = models.CharField(max_length=20)
    gender = models.CharField(max_length=20)
    address = models.TextField()
    # username = models.CharField(max_length=255)
    employee_type = models.CharField(max_length=50)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)
    joining_date = models.DateField()
    position = models.CharField(max_length=50)
    cv = models.FileField(upload_to='documents/')
    educational_document = models.FileField(upload_to='documents/')
    experience_letter = models.FileField(upload_to='documents/')
    email = models.EmailField()
    password = models.CharField(max_length=255)
    profile_picture = models.FileField(upload_to='profile_pictures/',null=True)
    
    # Leave balance attributes
    annual_leave_balance = models.PositiveIntegerField(default=100)
    sick_leave_balance = models.PositiveIntegerField(default=100)
    maternity_leave_balance = models.PositiveIntegerField(default=100)
    paternity_leave_balance = models.PositiveIntegerField(default=100)
    unpaid_leave_balance = models.PositiveIntegerField(default=100)

    # New fields
    average_working_hours = models.DurationField(default=timedelta(hours=8))
    average_in_time = models.TimeField(default=datetime.strptime("20:00", "%H:%M").time())
    average_out_time = models.TimeField(default=datetime.strptime("06:00", "%H:%M").time())
    average_break_time = models.DurationField(default=timedelta(hours=1))
    basic_salary = models.DecimalField(max_digits=10, decimal_places=2)
    role = models.CharField(max_length=50, choices=[('director', 'director'), ('employee', 'employee')])
    emergency_person_name=models.CharField(max_length=50)
    emergency_phone_number=models.CharField(max_length=12)

    def __str__(self):
        return self.full_name

    def update_leave_balance(self, leave_type, days):
        """
        Update leave balance based on the leave type and number of days.
        """
        if leave_type == 'Annual':
            self.annual_leave_balance -= days
        elif leave_type == 'Sick':
            self.sick_leave_balance -= days
        elif leave_type == 'Maternity':
            self.maternity_leave_balance -= days
        elif leave_type == 'Paternity':
            self.paternity_leave_balance -= days
        elif leave_type == 'Unpaid':
            self.unpaid_leave_balance -= days
        self.save()

    def get_leave_balance(self, leave_type):
        """
        Get leave balance based on the leave type.
        """
        if leave_type == 'Annual':
            return self.annual_leave_balance
        elif leave_type == 'Sick':
            return self.sick_leave_balance
        elif leave_type == 'Maternity':
            return self.maternity_leave_balance
        elif leave_type == 'Paternity':
            return self.paternity_leave_balance
        elif leave_type == 'Unpaid':
            return self.unpaid_leave_balance
        return 0
