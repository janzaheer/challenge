from django import template

register = template.Library()


@register.simple_tag
def calculate_event_dist(event, lat, lng):
    return event.calculate_distance(lat, lng)
