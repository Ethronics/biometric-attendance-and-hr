from django.urls import path
from .views import AttendanceList,today_attendance_count,AttendanceDetailView,AttendanceListByEmployeeView

urlpatterns = [
    path('', AttendanceList.as_view(), name='attendance-list'),
    path('count/', today_attendance_count, name='today_attendance_count'),
    path('<int:pk>/',AttendanceDetailView.as_view(),name='attendance-detail'),
     path('<str:email>/', AttendanceListByEmployeeView.as_view(), name='attendance-list-by-email'),
]
