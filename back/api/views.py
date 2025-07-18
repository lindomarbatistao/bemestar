from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSignupSerializer
from rest_framework import viewsets
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .models import PressaoArterial, Glicemia, Colesterol, Calendario
from .serializers import (
    PressaoArterialSerializer,
    GlicemiaSerializer,
    ColesterolSerializer,
    CalendarioSerializer
)
from rest_framework.permissions import IsAuthenticated

class SignupView(APIView):
    permission_classes = [AllowAny]  # Permite acesso sem autenticação

    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if not username or not email or not password:
            return Response({"error": "Todos os campos são obrigatórios."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Usuário já existe."}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, password=password)
        return Response({"message": "Usuário criado com sucesso."}, status=status.HTTP_201_CREATED)


class PressaoListCreateView(ListCreateAPIView):
    queryset = PressaoArterial.objects.all()
    serializer_class = PressaoArterialSerializer
    permission_classes = [IsAuthenticated]

class PressaoDetailView(RetrieveUpdateDestroyAPIView):
    queryset = PressaoArterial.objects.all()
    serializer_class = PressaoArterialSerializer
    permission_classes = [IsAuthenticated]

class GlicemiaListCreateView(ListCreateAPIView):
    queryset = Glicemia.objects.all()
    serializer_class = GlicemiaSerializer
    permission_classes = [IsAuthenticated]

class GlicemiaDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Glicemia.objects.all()
    serializer_class = GlicemiaSerializer
    permission_classes = [IsAuthenticated]

class ColesterolListCreateView(ListCreateAPIView):
    queryset = Colesterol.objects.all()
    serializer_class = ColesterolSerializer
    permission_classes = [IsAuthenticated]

class ColesterolDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Colesterol.objects.all()
    serializer_class = ColesterolSerializer
    permission_classes = [IsAuthenticated]

class CalendarioListCreateView(ListCreateAPIView):
    queryset = Calendario.objects.all()
    serializer_class = CalendarioSerializer
    permission_classes = [IsAuthenticated]

class CalendarioDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Calendario.objects.all()
    serializer_class = CalendarioSerializer
    permission_classes = [IsAuthenticated]

