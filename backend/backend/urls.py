from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from core.views import PeriodViewSet, login_view
from django.contrib.auth import views as auth_views
from django.views.decorators.csrf import csrf_exempt

router = routers.DefaultRouter()
router.register(r'periods', PeriodViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/login/', login_view),
    path('api/logout/', auth_views.LogoutView.as_view(), name='logout'),
]
