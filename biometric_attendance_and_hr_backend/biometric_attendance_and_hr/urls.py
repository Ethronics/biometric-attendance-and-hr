# urls.py
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path,include

from django.contrib import admin
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('employee/', include('Employee.urls')),
    path('attendance/', include('Attendance.urls')),
     path('payroll/', include('Payroll_Integration_App.urls')),
     path('training/', include('Training_App.urls')),
    path('leave/', include('Leave_Management_App.urls')),
        path('performances/', include('Performance.urls')),
         path('departments/', include('Departments.urls')),
         path('feedback/', include('Feedback_App.urls')),


]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
