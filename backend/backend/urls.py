from django.contrib import admin
from django.views.static import serve
from django.urls import path, include, re_path
from rest_framework import routers
from core.views import PeriodViewSet, login_view
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'periods', PeriodViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/login/', login_view),
    path('api/logout/', auth_views.LogoutView.as_view(), name='logout'),
    re_path('^assets/(?P<path>.*)$', serve, {'document_root': settings.ASSETS_DIR}),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + [
    path('', include('core.urls')),
]
