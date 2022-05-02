from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView,
)

from core.models import Project, Sentence
from core.serializers import (
    ProjectSentenceSerializer,
    ProjectSerializer,
    SentenceSerializer,
)


class ProjectListCreate(ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ProjectRetrieve(RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSentenceSerializer
    lookup_field = "pk"


class SentenceReadUpdate(RetrieveUpdateAPIView):
    queryset = Sentence.objects.all()
    serializer_class = SentenceSerializer
    lookup_field = "pk"
