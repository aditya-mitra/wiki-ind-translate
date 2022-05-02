# Generated by Django 4.0.4 on 2022-05-02 20:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0003_alter_sentence_options_alter_project_unique_together"),
    ]

    operations = [
        migrations.AlterField(
            model_name="sentence",
            name="original",
            field=models.TextField(editable=False),
        ),
        migrations.AlterField(
            model_name="sentence",
            name="project",
            field=models.ForeignKey(
                editable=False,
                on_delete=django.db.models.deletion.CASCADE,
                to="core.project",
            ),
        ),
    ]
