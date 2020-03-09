# Explor Challenge

## SETUP

Note you must have `Python3.6` installed on your system along with `pip`.

To get started

```shell
$ cd challenge

$ pip install -r requirments.txt

$ python manage.py runserver
```

Now you can access the application by visiting `localhost:8000`

## Task 1

To complete the Task 1 we have made used of JS and Leaflet. We have added a customer icon marker in the leaflet to achieve the opacity effect on the marker when the div is hovered. And also when the marker on the map gets hovered we hightlighed the div.

## Task 2

We have used both Django and JS for this task whenever user changes the center of the map to look for new events. We fetch new data based on the new center of the map.

## Task 3

We have used both JS and Django to implement all the filter requirements. We first get data based on users current location which we get using browsers GeoLocation api. And then whenever you will click on the filter button a model will be opened where you can define your search criteria. You can also filter data based on the event data.

### Note

Using static location cordinates in `Task 3`, In order to run the challenge successfully.
