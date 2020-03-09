from django.contrib import admin
from event.models import Event


class EventAdmin(admin.ModelAdmin):
    list_display = (
        '__str__',
        'latitude',
        'longitude',
        'event_date',
        'surface',
        'route_duration',
        'elevation_gain',
        'average_gradient',
        'registration_fee',
        'support_amenities',
    )


admin.site.register(Event, EventAdmin)
