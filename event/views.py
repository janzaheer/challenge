from django.shortcuts import render
from decimal import *
from django.core import serializers
from django.views.generic import TemplateView, View
from django.http import JsonResponse

from event.models import Event

def get_index_data(latitude, longitude):
    if latitude and longitude:
        latitude_m_1 = Decimal(latitude) - 1
        latitude_p_1 = Decimal(latitude) + 1

        longitude_m_1 = Decimal(longitude) - 1
        longitude_p_1 = Decimal(longitude) + 1

        events = Event.objects.filter(
            latitude__gte=latitude_m_1, latitude__lte=latitude_p_1,
            longitude__gte=longitude_m_1, longitude__lte=longitude_p_1,
        )
    else:
        latitude = 36.778259
        longitude = -119.417931
        events = Event.objects.all()

    data = {
        'events': events,
        'start_lat': latitude,
        'start_lng': longitude,
    }
    return data


def filter_nearby_events(request, lat, lng):
    event_date = request.GET.get('eventDate', '')
    surface = request.GET.get('surface', '')
    route_duration = request.GET.get('routeDuration', '')
    elevation_gain = request.GET.get('elevationGain', '')
    average_gradient = request.GET.get('averageGraident', '')
    support_amenities = request.GET.get('supportAmenties', '')
    sort = request.GET.get('sort', '')

    latitude = lat
    longitude = lng

    latitude_m_1 = Decimal(latitude) - 1
    latitude_p_1 = Decimal(latitude) + 1

    longitude_m_1 = Decimal(longitude) - 1
    longitude_p_1 = Decimal(longitude) + 1

    events = Event.objects.filter(
        latitude__gte=latitude_m_1, latitude__lte=latitude_p_1,
        longitude__gte=longitude_m_1, longitude__lte=longitude_p_1,
    )

    if event_date:
        event_date = event_date.split('-')
        events = events.filter(event_date__year=event_date[0],
                            event_date__month=event_date[1],
                            event_date__day=event_date[2],)

    if surface:
        events = events.filter(surface=surface)

    if route_duration:
        events = events.filter(route_duration=route_duration)

    if elevation_gain:
        events = events.filter(elevation_gain=elevation_gain)

    if support_amenities:
        events = events.filter(support_amenities=support_amenities)

    if sort and sort == 'asc':
        events = events.order_by('event_date')
    elif sort and sort == 'desc':
        events = events.order_by('-event_date')

    return {
        'events': events,
        'latitude': latitude,
        'longitude': longitude,
    }
    

class IndexView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        latitude = self.request.GET.get('latitude')
        longitude = self.request.GET.get('longitude')

        context = get_index_data(latitude, longitude)
        
        return context


class MapDragApiView(View):

    def get(self, request, *args, **kwargs):
        latitude = self.request.GET.get('latitude')
        longitude = self.request.GET.get('longitude')

        context = get_index_data(latitude, longitude)
        context['events'] = serializers.serialize('json', context.get('events'))

        return JsonResponse(context)



class NearbyEventsView(TemplateView):
    template_name = 'nearby_events.html'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.lat = 24.846980199999997
        self.lng = 67.082216

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context = filter_nearby_events(self.request, self.lat, self.lng)

        return context


class NearbyDynamicEvents(NearbyEventsView):
    

    def dispatch(self, request, *args, **kwargs):
        self.lng = self.request.GET.get('longitude', 67.082216)
        self.lat = self.request.GET.get('latitude', 24.846980199999997)
        return super().dispatch(request, *args, **kwargs)



class NaerByEventsApiView(View):

    def get(self, request, *args, **kwargs):
        longitude = self.request.GET.get('longitude')
        latitude = self.request.GET.get('latitude')

        if not longitude:
            longitude = 67.082216

        if not latitude:
            latitude = 24.846980199999997

        data = filter_nearby_events(self.request, latitude, longitude)
        data['events'] = serializers.serialize('json', data.get('events'))

        return JsonResponse(data)
