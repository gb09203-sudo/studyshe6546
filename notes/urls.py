from django.urls import path
from . import views

urlpatterns = [
    path("ug-notes/", views.ug_notes_view, name="ug_notes"),
    path("api/states/", views.get_states),
    path("api/universities/<int:state_id>/", views.get_universities),
    path("api/courses/<int:university_id>/", views.get_courses),
    path("api/semesters/<int:course_id>/", views.get_semesters),
    path("api/subjects/<int:course_id>/<int:semester_id>/", views.get_subjects),
    path("api/get-notes/", views.get_notes),
    path("projects/", views.projects_view, name="projects"),

]
