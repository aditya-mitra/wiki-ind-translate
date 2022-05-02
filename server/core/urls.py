from django.urls import path

from core.views import ProjectListCreate, ProjectRetrieve, SentenceReadUpdate

urlpatterns = [
    path("projects", ProjectListCreate.as_view(), name="create-project-translation"),
    path(
        "projects/<int:pk>",
        ProjectRetrieve.as_view(),
        name="retreive-project-sentences",
    ),
    path(
        "sentences/<int:pk>",
        SentenceReadUpdate.as_view(),
        name="sentence-read-update",
    ),
]
