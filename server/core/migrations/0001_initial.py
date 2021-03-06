# Generated by Django 4.0.4 on 2022-05-02 06:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Project",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("wiki_title", models.CharField(max_length=256)),
                (
                    "target_lang",
                    models.CharField(
                        choices=[
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
                        ],
                        max_length=2,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Sentence",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("original", models.TextField()),
                ("translated", models.TextField()),
                (
                    "project",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="core.project"
                    ),
                ),
            ],
        ),
    ]
