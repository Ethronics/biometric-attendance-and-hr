from django.db import models

class Department(models.Model):
    department_name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.department_name

class SubDepartment(models.Model):
    department = models.ForeignKey(Department, related_name='sub_departments', on_delete=models.CASCADE)
    sub_department_name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.sub_department_name
