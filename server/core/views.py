from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView

from core.models import Project, Sentence
from core.serializers import (
    ProjectSentenceSerializer,
    ProjectSerializer,
    SentenceSerializer,
)
from core.utils.wiki import getSplittedSentences, getWikiSummary


class ProjectListCreate(ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    # def create(self, request):
    #     project_serializer = ProjectSerializer(data=request.data)
    #     project_serializer.is_valid(raise_exception=True)

    #     summary = getWikiSummary(project_serializer.validated_data.get("wiki_title"))

    #     if not summary:
    #         return Response(
    #             data={"Wiki Summary": "Summary not available"},
    #             status=HTTP_400_BAD_REQUEST,
    #         )

    #     project_serializer.save()

    #     sentences = getSplittedSentences(
    #         project_serializer.data.get("id"), project_serializer.data.get("wiki_title")
    #     )
    #     objs = Sentence.objects.bulk_create(sentences)
    #     print("bulk create --> ", objs)

    #     return Response(data=project_serializer.data, status=HTTP_201_CREATED)


class ProjectRetrieve(RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSentenceSerializer
    lookup_field = "pk"


class SentenceListCreate(ListCreateAPIView):
    # list and create both not required - can remove list
    serializer_class = SentenceSerializer

    def get_queryset(self):
        return Sentence.objects.filter(project=self.kwargs["project"]).all()
