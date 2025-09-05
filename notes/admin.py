# notes/admin.py
from django.contrib import admin
from .models import State, University, Course, Semester, Subject, UGNote, Project

# Existing model registrations
admin.site.register(State)
admin.site.register(University)
admin.site.register(Course)
admin.site.register(Semester)
admin.site.register(Subject)

# UG Notes registration with display
@admin.register(UGNote)
class UGNoteAdmin(admin.ModelAdmin):
    list_display = ('title', 'subject', 'pdf_file')

# Project registration with display
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'pdf_file')
