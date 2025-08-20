from django.db import models
from django.contrib.auth.models import User

class PressaoArterial(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    data = models.DateField()
    hora = models.TimeField()
    alta = models.IntegerField()
    baixa = models.IntegerField()

class Glicemia(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    data = models.DateField()
    hora = models.TimeField()
    glic = models.IntegerField()

class Colesterol(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    data = models.DateField()
    hora = models.TimeField()
    ldl = models.IntegerField()
    hdl = models.IntegerField()

class Calendario(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    nome = models.CharField(max_length=100)
    dom = models.BooleanField(default=False)
    seg = models.BooleanField(default=False)
    ter = models.BooleanField(default=False)
    qua = models.BooleanField(default=False)
    qui = models.BooleanField(default=False)
    sex = models.BooleanField(default=False)
    sab = models.BooleanField(default=False)
    hora1 = models.TimeField(null=True, blank=True)
    hora2 = models.TimeField(null=True, blank=True)
    hora3 = models.TimeField(null=True, blank=True)
    hora4 = models.TimeField(null=True, blank=True)
    hora5 = models.TimeField(null=True, blank=True)
