from django.db.models.signals import post_save
from django.dispatch import receiver

from core.models import Project, Sentence
from core.utils.wiki import getSplittedSentences


@receiver(post_save, sender=Project)
def add_sentences(sender, instance, created, **kwargs):
    if not created:
        return

    l = getSplittedSentences(instance)
    Sentence.objects.bulk_create(l)
