from rest_framework.status import HTTP_201_CREATED
from rest_framework.response import Response
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

    def create(self, request):
        serializer = ProjectSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(data=serializer.data, status=HTTP_201_CREATED)


class ProjectRetrieve(RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSentenceSerializer
    lookup_field = "pk"


class SentenceListCreate(ListCreateAPIView):
    # list and create both not required - can remove list
    serializer_class = SentenceSerializer

    def get_queryset(self):
        return Sentence.objects.filter(project=self.kwargs["project"]).all()
