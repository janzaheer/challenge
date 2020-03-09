from django.db import models
from haversine import haversine, Unit
from decimal import *


ROAD = 'road'
GRAVEL = 'gravel'
MTB = 'mtb'
SURFACE_CHOICES = [
    (ROAD, 'road'),
    (GRAVEL, 'gravel'),
    (MTB, 'mtb'),
]

SAG = 'sag'
FOOD_STOPS = 'food stops'
POST_RIDE_FEAST = 'post-ride feast'
SUPPROT_AMENITIES_CHOICES = [
    (SAG, 'sag'),
    (FOOD_STOPS, 'food stops'),
    (POST_RIDE_FEAST, 'post-ride feast')
]


class Event(models.Model):
    title = models.CharField(max_length=250)
    description = models.TextField()
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    event_date = models.DateField(null=True, blank=True)
    surface = models.CharField(
        max_length=20,
        choices=SURFACE_CHOICES,
        default=ROAD,
    )
    route_duration = models.IntegerField()
    # means climbing
    elevation_gain = models.IntegerField()
    # means steapness in percentage
    average_gradient = models.IntegerField()
    registration_fee = models.CharField(max_length=50)
    support_amenities = models.CharField(
        max_length=20,
        choices=SUPPROT_AMENITIES_CHOICES,
        default=SAG
    )

    def calculate_distance(self, lat, lng):
        from_dis = (self.latitude, self.longitude)
        to_dis = (Decimal(lat), Decimal(lng))
        return '%g' % haversine(from_dis, to_dis, unit='mi')

    def __str__(self):
        return self.title
