from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', SignupView.as_view(), name='signup'),

    path('pressao/', PressaoListCreateView.as_view(), name='pressao_list_create'),
    path('pressao/<int:pk>/', PressaoDetailView.as_view(), name='pressao_detail'),

    path('glicemia/', GlicemiaListCreateView.as_view(), name='glicemia_list_create'),
    path('glicemia/<int:pk>/', GlicemiaDetailView.as_view(), name='glicemia_detail'),

    path('colesterol/', ColesterolListCreateView.as_view(), name='colesterol_list_create'),
    path('colesterol/<int:pk>/', ColesterolDetailView.as_view(), name='colesterol_detail'),

    path('calendario/', CalendarioListCreateView.as_view(), name='calendario_list_create'),
    path('calendario/<int:pk>/', CalendarioDetailView.as_view(), name='calendario_detail'),
]

