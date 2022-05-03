from rest_framework import serializers

from core.models import Sentence, Project


class ProjectSerializer(serializers.ModelSerializer):
    target_lang = serializers.CharField(source="get_target_lang_display")

    class Meta:
        model = Project
        fields = ("id", "wiki_title", "target_lang")
        read_only_fields = ["id"]


class SentenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sentence
        fields = ("id", "project", "original", "translated")


class SentenceForeignSerializer(SentenceSerializer):
    class Meta:
        model = Sentence
        fields = ("id", "original", "translated")


class ProjectSentenceSerializer(serializers.ModelSerializer):
    sentences = SentenceForeignSerializer(
        many=True, read_only=True, source="sentence_set"
    )
    target_lang = serializers.CharField(source="get_target_lang_display")

    class Meta:
        model = Project
        fields = ("id", "wiki_title", "target_lang", "sentences")
        read_only_fields = ["id"]
