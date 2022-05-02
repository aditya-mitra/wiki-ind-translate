from django.db import models


class Project(models.Model):
    TARGET_LANG_CHOICES = [
        ("Bengali", "bn"),
        ("Gujarati", "gu"),
        ("Hindi", "hi"),
        ("Kannada", "kn"),
        ("Malayalam", "ml"),
        ("Marathi", "mr"),
        ("Nepali", "ne"),
        ("Oriya", "or"),
        ("Panjabi", "pa"),
        ("Sinhala", "si"),
        ("Tamil", "ta"),
        ("Telugu", "te"),
        ("Urdu", "ur"),
    ]

    wiki_title = models.CharField(blank=False, max_length=256)
    target_lang = models.CharField(
        blank=False, max_length=2, choices=TARGET_LANG_CHOICES
    )


class Sentences(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    original = models.TextField()
    translated = models.TextField()
