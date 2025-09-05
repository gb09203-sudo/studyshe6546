# notes/views.py
from django.http import JsonResponse
from django.shortcuts import render
from django.conf import settings
from .models import State, University, Course, Semester, Subject, UGNote, Project  # Project add kiya

# ---------------- API Endpoints ----------------

def get_states(request):
    states = list(State.objects.values("id", "name"))
    return JsonResponse(states, safe=False)

def get_universities(request, state_id):
    universities = list(University.objects.filter(state_id=state_id).values("id", "name"))
    return JsonResponse(universities, safe=False)

def get_courses(request, university_id):
    courses = list(Course.objects.filter(university_id=university_id).values("id", "name"))
    return JsonResponse(courses, safe=False)

def get_semesters(request, course_id):
    semesters = list(Semester.objects.filter(course_id=course_id).values("id", "number"))
    return JsonResponse(semesters, safe=False)

def get_subjects(request, course_id, semester_id):
    subjects = list(Subject.objects.filter(course_id=course_id, semester_id=semester_id).values("id", "name"))
    return JsonResponse(subjects, safe=False)

def get_notes(request):
    subject_id = request.GET.get("subject_id")
    notes = UGNote.objects.filter(subject_id=subject_id)

    data = []
    for note in notes:
        data.append({
            "id": note.id,
            "title": note.title,
            "pdf_file": settings.MEDIA_URL + str(note.pdf_file) if note.pdf_file else "",
        })
    return JsonResponse(data, safe=False)

# ---------------- Page Views ----------------

def landing_page(request):
    """
    Landing page view for '/'
    """
    return render(request, "notes/home.html")  # home page

def ug_notes_view(request):
    """
    UG Notes page (untouched)
    """
    return render(request, "notes/ug_notes.html")

def projects_view(request):
    """
    Projects page: list all projects with title + pdf links
    """
    projects = Project.objects.all()
    return render(request, "notes/projects.html", {"projects": projects})
