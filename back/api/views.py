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
    def post(self, request):
        serializer = UserSignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Usuário criado com sucesso"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

############################################################################
class PressaoListCreateView(ListCreateAPIView):
    queryset = PressaoArterial.objects.all()
    serializer_class = PressaoArterialSerializer
    permission_classes = [IsAuthenticated]
            
    def get_queryset(self):
        return PressaoArterial.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PressaoDetailView(RetrieveUpdateDestroyAPIView):
    queryset = PressaoArterial.objects.all()
    serializer_class = PressaoArterialSerializer
    permission_classes = [IsAuthenticated]
        
    def get_queryset(self):
        return PressaoArterial.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

############################################################################
class GlicemiaListCreateView(ListCreateAPIView):
    queryset = Glicemia.objects.all()
    serializer_class = GlicemiaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Glicemia.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class GlicemiaDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Glicemia.objects.all()
    serializer_class = GlicemiaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Glicemia.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


############################################################################
class ColesterolListCreateView(ListCreateAPIView):
    queryset = Colesterol.objects.all()
    serializer_class = ColesterolSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Colesterol.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ColesterolDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Colesterol.objects.all()
    serializer_class = ColesterolSerializer
    permission_classes = [IsAuthenticated]
        
    def get_queryset(self):
        return Colesterol.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

############################################################################
class CalendarioListCreateView(ListCreateAPIView):
    serializer_class = CalendarioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Calendario.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



class CalendarioDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Calendario.objects.all()
    serializer_class = CalendarioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Calendario.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

############################################################################