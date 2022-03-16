from django.http import HttpResponse, HttpResponseForbidden, HttpResponseRedirect
from django.shortcuts import render
from rest_framework import routers, serializers, viewsets, fields
from .models import Period
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
import json
from django.http import JsonResponse
from django_filters import rest_framework as django_filters
from rest_framework.utils.serializer_helpers import ReturnList, ReturnDict


class PeriodFilter(django_filters.FilterSet):
    class Meta:
        model = Period
        fields = {
            'name': ['icontains', ],
        }


class PeriodListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Period
        fields = ['id', 'name', 'comment', 'created_datetime']


class PeriodDetailedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Period
        fields = ['id', 'name', 'comment', 'created_datetime', 'flowchart_json']


class PeriodViewSet(viewsets.ModelViewSet):
    queryset = Period.objects.all().order_by('-created_datetime')
    serializer_class = PeriodDetailedSerializer
    filter_backends = [django_filters.DjangoFilterBackend, ]
    filter_class = PeriodFilter

    def finalize_response(self, request, response, *args, **kwargs):
        if type(response.data) == ReturnList:
            response.data = list(response.data[:5])
        return super().finalize_response(request, response, *args, **kwargs)

    action_serializers = {
        'retrieve': PeriodDetailedSerializer,
        'list': PeriodListSerializer,
        'create': PeriodDetailedSerializer,
        'update': PeriodDetailedSerializer,
        'partial_update': PeriodDetailedSerializer
    }


def login_view(request):
    print(request.body)
    if request.method == 'POST':
        credentials = json.loads(request.body)
        username = credentials['username']
        user = authenticate(username=username,
                            password=credentials['password'])

        if user is not None:
            login(request, user)
            stored_user = User.objects.get(username=username)
            return JsonResponse({'id': stored_user.id, 'username': stored_user.username})
    return HttpResponseForbidden()
