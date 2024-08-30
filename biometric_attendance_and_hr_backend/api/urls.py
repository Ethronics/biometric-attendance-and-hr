from django.urls import path
from .views import LoginView,SendOTPView,VerifyOTPView,UpdatePasswordView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
     path('send_otp/', SendOTPView.as_view(), name='send_otp'),
    path('verify_otp/', VerifyOTPView.as_view(), name='verify_otp'),
    path('update_password/', UpdatePasswordView.as_view(), name='update_password'),
]