from django.urls import path

from core.views import ProjectListCreate, ProjectRetrieve, SentenceListCreate

urlpatterns = [
    path("projects", ProjectListCreate.as_view(), name="create-project-translation"),
    path(
        "projects/<int:pk>",
        ProjectRetrieve.as_view(),
        name="retreive-project-sentences",
    ),
    path(
        "sentences/<int:pk>",
        SentenceListCreate.as_view(),
        name="sentence-read-update",
    ),
]
