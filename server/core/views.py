from rest_framework.generics import ListCreateAPIView, RetrieveAPIView

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


class SentenceListCreate(ListCreateAPIView): 
    # list and create both not required - can remove list
    serializer_class = SentenceSerializer

    def get_queryset(self):
        return Sentence.objects.filter(project=self.kwargs["project"]).all()
