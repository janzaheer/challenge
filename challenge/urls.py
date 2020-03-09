from django.conf import settings
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static

from event.views import IndexView, NearbyEventsView, NearbyDynamicEvents

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('nearby-events', NearbyEventsView.as_view(), name='nearby_events'),
    path(
        'nearby-dynamic-events', NearbyDynamicEvents.as_view(),
        name='nearby_dynamic_events'
    ),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
