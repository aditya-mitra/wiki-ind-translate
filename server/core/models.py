from django.db import models


class Project(models.Model):
    TARGET_LANG_CHOICES = [
        ("bn", "Bengali"),
        ("gu", "Gujarati"),
        ("hi", "Hindi"),
        ("kn", "Kannada"),
        ("ml", "Malayalam"),
        ("mr", "Marathi"),
        ("ne", "Nepali"),
        ("or", "Oriya"),
        ("pa", "Panjabi"),
        ("si", "Sinhala"),
        ("ta", "Tamil"),
        ("te", "Telugu"),
        ("ur", "Urdu"),
    ]

    wiki_title = models.CharField(blank=False, max_length=256)
    target_lang = models.CharField(
        blank=False, max_length=2, choices=TARGET_LANG_CHOICES
    )

    class Meta:
        unique_together = ["wiki_title", "target_lang"]


class Sentence(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, editable=False)
    original = models.TextField(editable=False)
    translated = models.TextField()
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["order"]
