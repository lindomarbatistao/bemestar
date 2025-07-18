from django.contrib.auth.models import User
from .models import PressaoArterial, Glicemia, Colesterol, Calendario
from rest_framework import serializers

class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user


class PressaoArterialSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = PressaoArterial
        fields = ['id', 'user', 'data', 'hora']

class GlicemiaSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Glicemia
        fields = ['id', 'user', 'data', 'hora']

class ColesterolSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Colesterol
        fields = ['id', 'user', 'data', 'hora']

class CalendarioSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Calendario
        fields = [
            'id', 'user', 'nome',
            'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab',
            'hora1', 'hora2', 'hora3', 'hora4', 'hora5'
        ]