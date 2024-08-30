from django.shortcuts import render
from django.contrib.auth import authenticate, login
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.contrib.auth.models import User
from rest_framework.views import APIView
from django.contrib.auth.hashers import make_password
from django.core.cache import cache
import random

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
class SendOTPView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'message': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if user exists
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'message': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)

        # Generate and send OTP
        otp = random.randint(1000, 9999)
        cache.set(email, otp, timeout=300)  # OTP valid for 5 minutes

        send_mail(
            'Your OTP Code',
            f'Your OTP code is {otp}',
            'your-email@example.com',
            [email],
            fail_silently=False,
        )

        return Response({'message': 'OTP sent successfully'}, status=status.HTTP_200_OK)

class VerifyOTPView(APIView):
    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')

        if not email or not otp:
            return Response({'message': 'Email and OTP are required'}, status=status.HTTP_400_BAD_REQUEST)

        cached_otp = cache.get(email)
        if cached_otp is None:
            return Response({'message': 'OTP expired or invalid'}, status=status.HTTP_400_BAD_REQUEST)

        if int(otp) == cached_otp:
            cache.delete(email)
            return Response({'message': 'OTP verified successfully'}, status=status.HTTP_200_OK)

        return Response({'message': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)

class UpdatePasswordView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response({'message': 'Email and Password are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(email=email)
            if user:
                print(f"Email: {email}")
                print(f"New Password: {password}")
                print(f"Old Hashed Password: {user.password}")
                
                user.set_password(password)
                user.save()
                
                print(f"Updated Hashed Password: {user.password}")
                
                return Response({'message': 'Password updated successfully'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'message': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f"Error: {str(e)}")
            return Response({'message': 'An error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)