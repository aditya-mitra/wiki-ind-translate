from rest_framework import serializers

from core.models import Sentence, Project


class ProjectSerializer(serializers.ModelSerializer):
    target_lang = serializers.CharField(source='get_target_lang_display')
    
    class Meta:
        model = Project
        fields = ("wiki_title", "target_lang")


class SentenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sentence
        fields = ("project", "original", "translated")


class SentenceOwnFieldsSerializer(SentenceSerializer):
    class Meta:
        model = Sentence
        fields = ("original", "translated")

class ProjectSentenceSerializer(serializers.ModelSerializer):
    sentences = SentenceOwnFieldsSerializer(
        many=True, read_only=True, source="sentence_set"
    )
    target_lang = serializers.CharField(source='get_target_lang_display')

    class Meta:
        model = Project
        fields = ("wiki_title", "target_lang", "sentences")
