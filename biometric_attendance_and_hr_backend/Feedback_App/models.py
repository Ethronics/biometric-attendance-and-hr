from django.db import models


from Employee.models import Employee  

class Feedback(models.Model):
  
   

    id = models.AutoField(primary_key=True)
    giver = models.CharField(max_length=100)
    
    message = models.TextField()
    
    date = models.DateField(auto_now_add=True)
    
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Feedback from {self.giver}  on {self.date}"

    class Meta:
        ordering = ['-date']
