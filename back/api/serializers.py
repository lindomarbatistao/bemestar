from django.contrib.auth.models import User
from .models import PressaoArterial, Glicemia, Colesterol, Calendario
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password

class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )


class PressaoArterialSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = PressaoArterial
        fields = '__all__'

class GlicemiaSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Glicemia
        fields = '__all__'

class ColesterolSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Colesterol
        fields = '__all__'

class CalendarioSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Calendario
        fields = '__all__'